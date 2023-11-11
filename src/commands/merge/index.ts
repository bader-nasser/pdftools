import {Args, Flags} from '@oclif/core';
import {globby} from 'globby';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommandWithCompression} from '../../base-command-with-compression.js';

export default class Merge extends BaseCommandWithCompression {
	static aliases = ['m', 'join', 'j'];

	static description = 'Merge PDFs';

	static examples = [
		{
			description: 'Merge all .pdf files',
			command: '<%= config.bin %> <%= command.id %> *.pdf',
		},
		{
			description: 'Merge all .pdf files',
			command: '<%= config.bin %> <%= command.id %> *.pdf -o output.pdf',
		},
		{
			description:
				'Merge all .pdf files that start with input- & compress the output',
			command: `<%= config.bin %> <%= command.id %> input-*.pdf -o output.pdf -c`,
		},
		{
			description:
				'Merge cover.pdf with all .pdf files that start with input-, and notes.pdf',
			command: `<%= config.bin %> <%= command.id %> cover.pdf input-*.pdf notes.pdf -o output.pdf`,
		},
	];

	// Todo: revise
	// For variable length arguments,
	// disable argument validation
	static strict = false;

	static args = {
		input: Args.string({
			required: true,
			// multiple: true,
			description: `Input files (e.g. cover.pdf part-*.pdf)`,
		}),
	};

	// https://oclif.io/docs/flags
	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
			default: 'merged.pdf',
		}),
		keep: Flags.boolean({
			char: 'k',
			description: `Keep output's name`,
		}),
	};

	async run(): Promise<void> {
		// Todo: revise
		const {argv, flags} = await this.parse(Merge);
		const input = argv as string[];
		const {output, compress, keep, 'dry-run': dryRun, silent} = flags;
		let finalOutput = removeExtension(output);
		await this.ensureDirExists(finalOutput);
		if (compress && !keep) {
			finalOutput = `${finalOutput}-compressed`;
		}

		finalOutput = addExtension(finalOutput);
		const files = await globby(input);
		const args = [...files, 'cat', 'output', finalOutput];
		if (compress) {
			args.push('compress');
		}

		this.logger(`Creating ${finalOutput}...`, silent);
		await this.execute('pdftk', args, dryRun);
		this.logger('Done.', silent);
	}
}
