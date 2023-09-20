import path from 'node:path';
import {Flags} from '@oclif/core';
import fs from 'fs-extra';
import {
	addExtension,
	isUndefinedOrEmptyString,
	pad,
	parseDataFile,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommandWithCompression} from '../../base-command-with-compression.js';

export default class Extract extends BaseCommandWithCompression {
	static aliases = ['ext', 'ex', 'e', 'split', 's'];

	static description = 'Extract pages from PDF file';

	static examples = [
		{
			description: 'Extract page number 5 from input.pdf to output.pdf',
			command:
				'<%= config.bin %> <%= command.id %> --input input.pdf --output output.pdf -f 5',
		},
		{
			description: 'Extract page number 5 from input.pdf to output.pdf',
			command:
				'<%= config.bin %> <%= command.id %> -i input.pdf -o output.pdf -l 5',
		},
		{
			description: 'Extract pages from 1 to 3 from input.pdf to output.pdf',
			command:
				'<%= config.bin %> <%= command.id %> -i input.pdf -o output.pdf -f 1 -l 3',
		},
		{
			description:
				'Extract *even* pages from 9 to 4, compress it and rotate it to the left',
			command:
				'<%= config.bin %> <%= command.id %> -i input.pdf -o output.pdf -f 9 -l 4 -c -r left -q even',
		},
		{
			description:
				'Extract pages from 1 to 3, with the 5th page rotated to the east, and *odd* pages from 7 to 4',
			command:
				'<%= config.bin %> <%= command.id %> -i input.pdf -o output.pdf -p "1-3, 5east, 7-4odd"',
		},
		{
			description: 'Extract pages as declared in file.txt',
			command:
				'<%= config.bin %> <%= command.id %> -i input.pdf -o output.pdf --data file.txt',
		},
	];

	// https://oclif.io/docs/flags
	static flags = {
		input: Flags.string({
			char: 'i',
			description: `Relative or absolute path to the PDF file to be used.
Use / in the path. On Windows, \\ can be changed to either / or \\\\.
Surround the path with " or ' if it contains spaces.`,
			required: true,
		}),
		output: Flags.string({
			char: 'o',
			description: `Relative or absolute path to the PDF file to be created.
Use / in the path. On Windows, \\ can be changed to either / or \\\\.
Surround the path with " or ' if it contains spaces.`,
			required: true,
		}),
		firstPage: Flags.string({
			char: 'f',
			description: 'First page (defaults to lastPage)',
			// This flag cannot be specified alongside these other flags
			exclusive: ['pageRanges', 'data'],
		}),
		lastPage: Flags.string({
			char: 'l',
			description: 'Last page (defaults to firstPage)',
			// This flag cannot be specified alongside these other flags
			exclusive: ['pageRanges', 'data'],
		}),
		pageRanges: Flags.string({
			char: 'p',
			description: `Comma/Space-seperated list of page ranges (eg. "1-3, 5east, 4, 7-10even, 22-11odd")
See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
See also: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt`,
			// This flag cannot be specified alongside these other flags
			exclusive: ['firstPage', 'lastPage', 'data'],
		}),
		data: Flags.string({
			char: 'd',
			description: `Data file (lines of page ranges)
See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt`,
			// This flag cannot be specified alongside these other flags
			exclusive: ['firstPage', 'lastPage', 'pageRanges'],
		}),
		qualifier: Flags.string({
			char: 'q',
			options: ['even', 'odd'],
			description:
				'See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat',
			relationships: [
				// Make this flag dependent on at least one of these flags
				{type: 'some', flags: ['firstPage', 'lastPage']},
				// Make this flag exclusive of all these flags
				{type: 'none', flags: ['pageRanges', 'data']},
			],
		}),
		rotation: Flags.string({
			char: 'r',
			options: ['north', 'south', 'east', 'west', 'left', 'right', 'down'],
			description:
				'See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat',
			relationships: [
				// Make this flag dependent on at least one of these flags
				{type: 'some', flags: ['firstPage', 'lastPage']},
				// Make this flag exclusive of all these flags
				{type: 'none', flags: ['pageRanges', 'data']},
			],
		}),
		keep: Flags.boolean({
			char: 'k',
			description: `Keep output's name`,
		}),
	};

	async run(): Promise<void> {
		const {flags} = await this.parse(Extract);
		const {
			input,
			output,
			pageRanges,
			data,
			qualifier = '',
			rotation = '',
			compress,
			'dry-run': dryRun,
			silent,
			keep,
		} = flags;
		let {firstPage, lastPage} = flags;

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
				if (!keep) {
					finalOutput = `${finalOutput}-data`;
				}

				const parsedData = await parseDataFile(data);
				if (parsedData.error) {
					console.error(parsedData.error);
					this.exit(1);
				}

				if (parsedData.all) {
					if (compress && !keep) {
						finalOutput = `${finalOutput}-compressed`;
					}

					finalOutput = addExtension(finalOutput);
					this.logger(
						`Creating ${finalOutput} using data file: ${data}...`,
						silent,
					);
					const args = [input, 'cat', ...parsedData.all, 'output', finalOutput];
					if (compress) {
						args.push('compress');
					}

					await this.execute('pdftk', args, dryRun);
				}

				if (parsedData.shared) {
					finalOutput = removeExtension(finalOutput);
					if (!keep) {
						finalOutput = `${finalOutput}-share`;
					}

					if (compress && !keep) {
						finalOutput = `${finalOutput}-compressed`;
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
					if (compress) {
						args.push('compress');
					}

					await this.execute('pdftk', args, dryRun);
				}
			} else if (pageRanges) {
				const ranges = pageRanges.split(/[\s,]+/);
				if (!keep) {
					finalOutput = `${finalOutput}-${ranges.join('_')}`;
				}

				if (compress && !keep) {
					finalOutput = `${finalOutput}-compressed`;
				}

				finalOutput = addExtension(finalOutput);
				this.logger(
					`Creating ${finalOutput} using pages: "${pageRanges}"...`,
					silent,
				);
				const args = [input, 'cat', ...ranges, 'output', finalOutput];
				if (compress) {
					args.push('compress');
				}

				await this.execute('pdftk', args, dryRun);
			} else if (firstPage && lastPage) {
				if (!keep) {
					finalOutput = `${finalOutput}-${pad(firstPage)}`;
				}

				if (firstPage !== lastPage && !keep) {
					finalOutput = `${finalOutput}-${pad(lastPage)}`;
				}

				if (qualifier && !keep) {
					finalOutput = `${finalOutput}-${qualifier}`;
				}

				if (rotation && !keep) {
					finalOutput = `${finalOutput}-${rotation}`;
				}

				if (compress && !keep) {
					finalOutput = `${finalOutput}-compressed`;
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
				if (compress) {
					args.push('compress');
				}

				await this.execute('pdftk', args, dryRun);
			} else {
				this.log('Something went wrong!');
				this.exit(1);
			}

			this.logger('Done.', silent);
		}
	}
}
