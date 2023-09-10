import path from 'node:path';
import {Args, Flags} from '@oclif/core';
import fs from 'fs-extra';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Compress extends BaseCommand {
	static aliases = ['c'];

	static description = `Restore page stream compression`;

	static examples = [
		'<%= config.bin %> <%= command.id %> uncompressed.pdf -o compressed.pdf',
	];

	static args = {
		input: Args.string({
			description: `Uncompressed PDF file`,
			required: true,
		}),
	};

	// https://oclif.io/docs/flags
	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
			required: true,
		}),
		compress: Flags.boolean({
			hidden: true,
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Compress);
		const {input} = args;
		const {output, dryRun, silent} = flags;
		let finalOutput = removeExtension(output);

		try {
			const outputDirname = path.dirname(finalOutput);
			await fs.ensureDir(outputDirname);
		} catch (error) {
			console.error(error);
			this.exit(1);
		}

		finalOutput = addExtension(finalOutput);
		const args2 = [input, 'output', finalOutput, 'compress'];

		this.logger(`Creating ${finalOutput}...`, silent);
		await this.execute('pdftk', args2, dryRun);
		this.logger('Done.', silent);
	}
}
