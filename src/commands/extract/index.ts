import { Args, Command, Flags } from '@oclif/core';
import path from 'node:path';
import fs from 'fs-extra';
import { ExecaError, execa } from 'execa';
import {
  addExtension,
  isUndefinedOrEmptyString,
  pad,
  parseDataFile,
  removeExtension,
  /* eslint-disable-next-line node/no-missing-import */
} from '../../utils.js';

export default class Extract extends Command {
  static aliases = ['ext', 'ex', 'e', 'split', 's'];

  static description = 'Extract pages from PDF file';

  static examples = [
    '<%= config.bin %> <%= command.id %> input.pdf output.pdf -f 1',
    '<%= config.bin %> <%= command.id %> input.pdf output.pdf -f 1 -l 3',
    '<%= config.bin %> <%= command.id %> input.pdf output.pdf -f 9 -l 5 -c -r left -q even',
    '<%= config.bin %> <%= command.id %> input.pdf output.pdf -p "1-3, 5east, 7-4odd"',
    '<%= config.bin %> <%= command.id %> input.pdf output.pdf --data file.txt',
  ];

  static args = {
    input: Args.string({ required: true }),
    output: Args.string({ required: true }),
  };

  // https://oclif.io/docs/flags
  static flags = {
    firstPage: Flags.string({
      char: 'f',
      description: 'First page (defaults to lastPage)',
      // this flag cannot be specified alongside these other flags
      exclusive: ['pageRanges', 'data'],
    }),
    lastPage: Flags.string({
      char: 'l',
      description: 'Last page (defaults to firstPage)',
      // this flag cannot be specified alongside these other flags
      exclusive: ['pageRanges', 'data'],
    }),
    pageRanges: Flags.string({
      char: 'p',
      description: `Comma/Space-seperated list of page ranges (eg. 1-3, 5east, 4, 7-10even, 22-11odd)
    See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat`,
      // this flag cannot be specified alongside these other flags
      exclusive: ['firstPage', 'lastPage', 'data'],
    }),
    data: Flags.string({
      char: 'd',
      description: 'Data file (lines of page ranges)',
      // this flag cannot be specified alongside these other flags
      exclusive: ['firstPage', 'lastPage', 'pageRanges'],
    }),
    qualifier: Flags.string({
      char: 'q',
      options: ['even', 'odd'],
      description:
        'See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat',
      relationships: [
        // Make this flag dependent on at least one of these flags
        { type: 'some', flags: ['firstPage', 'lastPage'] },
        // Make this flag exclusive of all these flags
        { type: 'none', flags: ['pageRanges', 'data'] },
      ],
    }),
    rotation: Flags.string({
      char: 'r',
      options: ['north', 'south', 'east', 'west', 'left', 'right', 'down'],
      description:
        'See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat',
      relationships: [
        // Make this flag dependent on at least one of these flags
        { type: 'some', flags: ['firstPage', 'lastPage'] },
        // Make this flag exclusive of all these flags
        { type: 'none', flags: ['pageRanges', 'data'] },
      ],
    }),
    compress: Flags.boolean({
      char: 'c',
      description: `Reduce file size
    See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
    You also may want to try: https://www.ilovepdf.com/compress_pdf`,
      relationships: [
        // Make this flag dependent on at least one of these flags
        {
          type: 'some',
          flags: ['firstPage', 'lastPage', 'pageRanges', 'data'],
        },
      ],
    }),
    dryRun: Flags.boolean({
      char: 'D',
      description: 'Pretend to extract pages!',
      relationships: [
        // Make this flag dependent on at least one of these flags
        {
          type: 'some',
          flags: ['firstPage', 'lastPage', 'pageRanges', 'data'],
        },
      ],
    }),
    silent: Flags.boolean({
      char: 's',
      relationships: [
        // Make this flag dependent on at least one of these flags
        {
          type: 'some',
          flags: ['firstPage', 'lastPage', 'pageRanges', 'data'],
        },
      ],
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Extract);
    const { input, output } = args;
    const {
      pageRanges,
      data,
      qualifier = '',
      rotation = '',
      compress,
      dryRun,
      silent,
    } = flags;
    let { firstPage, lastPage } = flags;

    firstPage = firstPage ?? lastPage;
    lastPage = lastPage ?? firstPage;

    if (firstPage && isUndefinedOrEmptyString(lastPage)) {
      lastPage = firstPage;
    }

    if (lastPage && isUndefinedOrEmptyString(firstPage)) {
      firstPage = lastPage;
    }

    if (
      isUndefinedOrEmptyString(firstPage) &&
      isUndefinedOrEmptyString(lastPage) &&
      isUndefinedOrEmptyString(pageRanges) &&
      isUndefinedOrEmptyString(data)
    ) {
      this.log(
        'This command is useless without using one of the following flags:',
      );
      this.log('--firstPage, --lastPage, --pageRanges, --data');
      this.log('See more help with --help');
    } else {
      let finalOutput = removeExtension(output);

      try {
        const outputDirname = path.dirname(finalOutput);
        await fs.ensureDir(outputDirname);
      } catch (error) {
        console.error(error);
        this.exit(1);
      }

      if (data) {
        finalOutput = `${finalOutput}-data`;

        const parsedData = await parseDataFile(data);
        if (parsedData.error) {
          console.error(parsedData.error);
          this.exit(1);
        }

        if (parsedData.all) {
          if (compress) {
            finalOutput = `${finalOutput}-compress`;
          }

          finalOutput = addExtension(finalOutput);
          this.logger(
            `Creating ${finalOutput} using data file: ${data}...`,
            silent,
          );
          const args = [input, 'cat', ...parsedData.all, 'output', finalOutput];
          compress && args.push('compress');
          await this.execute('pdftk', args, dryRun);
        }

        if (parsedData.shared) {
          finalOutput = removeExtension(finalOutput);
          finalOutput = `${finalOutput}-share`;
          if (compress) {
            finalOutput = `${finalOutput}-compress`;
          }

          finalOutput = addExtension(finalOutput);
          this.logger(
            `Creating ${finalOutput} using data file: ${data}...`,
            silent,
          );
          const args = [
            input,
            'cat',
            ...parsedData.shared,
            'output',
            finalOutput,
          ];
          compress && args.push('compress');
          await this.execute('pdftk', args, dryRun);
        }
      } else if (pageRanges) {
        const ranges = pageRanges.split(/[\s,]+/);
        finalOutput = `${finalOutput}-${ranges.join('_')}`;
        if (compress) {
          finalOutput = `${finalOutput}-compress`;
        }

        finalOutput = addExtension(finalOutput);
        this.logger(
          `Creating ${finalOutput} using pages: "${pageRanges}"...`,
          silent,
        );
        const args = [input, 'cat', ...ranges, 'output', finalOutput];
        compress && args.push('compress');
        await this.execute('pdftk', args, dryRun);
      } else if (firstPage && lastPage) {
        finalOutput = `${finalOutput}-${pad(firstPage)}`;
        if (firstPage !== lastPage) {
          finalOutput = `${finalOutput}-${pad(lastPage)}`;
        }

        if (qualifier) {
          finalOutput = `${finalOutput}-${qualifier}`;
        }

        if (rotation) {
          finalOutput = `${finalOutput}-${rotation}`;
        }

        if (compress) {
          finalOutput = `${finalOutput}-compress`;
        }

        finalOutput = addExtension(finalOutput);

        this.logger(`Creating ${finalOutput}...`, silent);
        const args = [
          input,
          'cat',
          `${firstPage}-${lastPage}${qualifier}${rotation}`,
          'output',
          finalOutput,
        ];
        compress && args.push('compress');
        await this.execute('pdftk', args, dryRun);
      } else {
        this.log('Something went wrong!');
        this.exit(1);
      }

      this.logger('Done.', silent);
    }
  }

  private async execute(
    command: string,
    args: readonly string[] | undefined,
    dryRun: boolean,
  ) {
    if (!dryRun) {
      try {
        await execa(command, args);
      } catch (error) {
        const err = error as ExecaError;
        console.error(err.stderr);
        this.exit(1);
      }
    }
  }

  private logger(message: string, silent: boolean): void {
    if (!silent) {
      this.log(message);
    }
  }
}
