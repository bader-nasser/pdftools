import path from 'node:path';
import {Flags} from '@oclif/core';
import fs from 'fs-extra';
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
			command: '<%= config.bin %> <%= command.id %> -i *.pdf -o output.pdf',
		},
		{
			description:
				'Merge all .pdf files that start with input- & compress the output',
			command: `<%= config.bin %> <%= command.id %> -i input-*.pdf -o output.pdf -c`,
		},
		{
			description:
				'Merge cover.pdf with all .pdf files that start with input-, and notes.pdf',
			command: `<%= config.bin %> <%= command.id %> -i cover.pdf input-*.pdf notes.pdf -o output.pdf`,
		},
	];

	// https://oclif.io/docs/flags
	static flags = {
		input: Flags.string({
			char: 'i',
			description: `Input files (e.g. cover.pdf part-*.pdf)`,
			required: true,
			multiple: true,
		}),
		output: Flags.string({
			char: 'o',
			description: 'Output file',
			required: true,
		}),
	};

	async run(): Promise<void> {
		const {flags} = await this.parse(Merge);
		const {input, output, compress, dryRun, silent} = flags;
		let finalOutput = removeExtension(output);

		try {
			const outputDirname = path.dirname(finalOutput);
			await fs.ensureDir(outputDirname);
		} catch (error) {
			console.error(error);
			this.exit(1);
		}

		if (compress) {
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
