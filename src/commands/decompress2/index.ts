import path from 'node:path';
import {Args, Flags} from '@oclif/core';
import fs from 'fs-extra';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Decompress2 extends BaseCommand {
	static aliases = ['d2', 'uncompress2', 'u2'];

	static description = `Decompress streams [mutool]`;

	static examples = [
		'<%= config.bin %> <%= command.id %> compressed.pdf',
		'<%= config.bin %> <%= command.id %> compressed.pdf -o decompressed.pdf',
	];

	static args = {
		input: Args.string({
			required: true,
			description: `Compressed PDF file`,
		}),
	};

	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
		}),
		pages: Flags.string({
			char: 'p',
			multiple: true,
			description:
				'Comma/space separated list of page numbers and ranges (1,3-5 12-9 N)',
		}),
		metadata: Flags.boolean({
			char: 'm',
			description: 'Preserve metadata',
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Decompress2);
		const {input} = args;
		const {output, 'dry-run': dryRun, silent, metadata, pages} = flags;
		let finalOutput: string;
		if (output) {
			finalOutput = removeExtension(output);
		} else {
			finalOutput = removeExtension(input);
			finalOutput = `${finalOutput}-decompressed`;
		}

		finalOutput = addExtension(finalOutput);

		const outputOptions = [
			// -d decompress streams
			'-d',
		];

		if (metadata) {
			outputOptions.push('-m');
		}

		try {
			const outputDirname = path.dirname(finalOutput);
			await fs.ensureDir(outputDirname);
		} catch (error) {
			console.error(error);
			this.exit(1);
		}

		this.logger(`Creating ${finalOutput}...`, silent);
		const args2 = ['clean', ...outputOptions, input, finalOutput];
		if (pages) {
			let pagesOption = pages.join(',');
			pagesOption = pagesOption.replaceAll(/,+/g, ',');
			pagesOption = pagesOption.replace(/,$/, '');
			args2.push(pagesOption);
		}

		await this.execute('mutool', args2, dryRun);
		this.logger('Done.', silent);
	}
}
