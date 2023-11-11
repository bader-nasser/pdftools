import {Args, Flags} from '@oclif/core';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Repair extends BaseCommand {
	static aliases = ['r'];

	static description = `Repair a PDF's corrupted XREF table and stream lengths, if possible`;

	static examples = [
		'<%= config.bin %> <%= command.id %> broken.pdf',
		'<%= config.bin %> <%= command.id %> broken.pdf -o fixed.pdf',
	];

	static args = {
		input: Args.string({
			description: `Broken PDF`,
			required: true,
		}),
	};

	// https://oclif.io/docs/flags
	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Repair);
		const {input} = args;
		const {output, 'dry-run': dryRun, silent} = flags;
		let finalOutput: string;
		if (output) {
			finalOutput = removeExtension(output);
		} else {
			finalOutput = removeExtension(input);
			finalOutput = `${finalOutput}-repaired`;
		}

		finalOutput = addExtension(finalOutput);
		await this.ensureDirExists(finalOutput);
		this.logger(`Creating ${finalOutput}...`, silent);
		const args2 = [input, 'output', finalOutput];
		await this.execute('pdftk', args2, dryRun);
		this.logger('Done.', silent);
	}
}
