import path from 'node:path';
import {Args, Flags} from '@oclif/core';
import fs from 'fs-extra';
import {getTextExtractor} from 'office-text-extractor';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Convert extends BaseCommand {
	static description = `Convert PDF to text file`;

	static examples = [
		'<%= config.bin %> <%= command.id %> file.pdf',
		'<%= config.bin %> <%= command.id %> file.pdf -o file-text.txt',
	];

	static args = {
		input: Args.string({
			description: `PDF file to convert`,
			required: true,
		}),
	};

	// https://oclif.io/docs/flags
	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
		}),
		compress: Flags.boolean({
			hidden: true,
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Convert);
		const {input} = args;
		const {output, dryRun, silent} = flags;
		let finalOutput: string;
		if (output) {
			finalOutput = removeExtension(output, 'txt');
		} else {
			finalOutput = removeExtension(input);
			finalOutput = `${finalOutput}-text`;
		}

		finalOutput = addExtension(finalOutput, 'txt');

		try {
			const outputDirname = path.dirname(finalOutput);
			await fs.ensureDir(outputDirname);
		} catch (error) {
			console.error(error);
			this.exit(1);
		}

		this.logger(`Creating ${finalOutput}...`, silent);
		if (!dryRun) {
			const extractor = getTextExtractor();
			const text = await extractor.extractText({
				// this can be a file path or a buffer
				input,
				type: 'file',
			});
			await fs.writeFile(finalOutput, text);
		}

		this.logger('Done.', silent);
	}
}
