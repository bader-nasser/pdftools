import {Args, Flags} from '@oclif/core';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Decompress extends BaseCommand {
	static aliases = ['d', 'uncompress', 'u'];

	static description = `Decompress PDF page streams for editing the PDF in a text editor`;

	static examples = [
		'<%= config.bin %> <%= command.id %> doc.pdf',
		'<%= config.bin %> <%= command.id %> doc.pdf -o doc-decompressed.pdf',
	];

	static args = {
		input: Args.string({
			description: `Compressed PDF file`,
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
		const {args, flags} = await this.parse(Decompress);
		const {input} = args;
		const {output, 'dry-run': dryRun, silent} = flags;
		let finalOutput: string;
		if (output) {
			finalOutput = removeExtension(output);
		} else {
			finalOutput = removeExtension(input);
			finalOutput = `${finalOutput}-decompressed`;
		}

		finalOutput = addExtension(finalOutput);
		await this.ensureDirExists(finalOutput);
		this.logger(`Creating ${finalOutput}...`, silent);
		const args2 = [input, 'output', finalOutput, 'uncompress'];
		await this.execute('pdftk', args2, dryRun);
		this.logger('Done.', silent);
	}
}
