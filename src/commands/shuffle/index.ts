import {Args, Flags} from '@oclif/core';
import {globby} from 'globby';
import {addExtension, removeExtension} from '../../utils.js';
import {BaseCommandWithCompression} from '../../base-command-with-compression.js';

export default class Shuffle extends BaseCommandWithCompression {
	static aliases = ['sh', 'collate'];

	static summary = `Collate pages from input PDFs to create a new PDF`;

	static description =
		'It takes one page at a time from each PDF to assemble the output PDF';

	static examples = [
		'<%= config.bin %> <%= command.id %> *.pdf',
		'<%= config.bin %> <%= command.id %> *.pdf -o collated',
		'<%= config.bin %> <%= command.id %> *.pdf -c',
	];

	static strict = false;

	static args = {
		input: Args.string({
			description: `PDF files`,
			required: true,
		}),
	};

	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
			default: 'shuffled.pdf',
		}),
		keep: Flags.boolean({
			char: 'k',
			description: `Keep output's name`,
		}),
	};

	async run(): Promise<void> {
		const {argv, flags} = await this.parse(Shuffle);
		const input = argv as string[];
		const {output, 'dry-run': dryRun, silent, compress, keep} = flags;
		let finalOutput = removeExtension(output);
		await this.ensureDirExists(finalOutput);
		const extraArgs = [];

		if (compress) {
			extraArgs.push('compress');
			if (!keep) {
				finalOutput = `${finalOutput}-compressed`;
			}
		}

		finalOutput = addExtension(finalOutput);
		const files = await globby(input);
		const args = [...files, 'shuffle', 'output', finalOutput];
		args.push(...extraArgs);

		this.logger(`Creating ${finalOutput}...`, silent);
		await this.execute('pdftk', args, dryRun);
		this.logger('Done.', silent);
	}
}
