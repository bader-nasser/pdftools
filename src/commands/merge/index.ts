import path from 'node:path';
import {Args, Flags} from '@oclif/core';
import fs from 'fs-extra';
import {globby} from 'globby';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Merge extends BaseCommand {
	static aliases = ['m'];

	static description = 'Merge PDFs';

	static examples = [
		{
			description: 'Merge all .pdf files',
			command: '<%= config.bin %> <%= command.id %> "*.pdf" -o output.pdf',
		},
		{
			description:
				'Merge all .pdf files that start with input- & compress the output',
			command: `<%= config.bin %> <%= command.id %> 'input-*.pdf' -o output.pdf -c`,
		},
	];

	static args = {
		input: Args.string({
			description: `Input files (i.e. '*.pdf' or "file*.pdf")`,
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
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Merge);
		const {input} = args;
		const {output, compress, dryRun, silent} = flags;
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
		const args2 = [...files, 'cat', 'output', finalOutput];
		if (compress) {
			args2.push('compress');
		}

		this.logger(`Creating ${finalOutput}...`, silent);
		await this.execute('pdftk', args2, dryRun);
		this.logger('Done.', silent);
	}
}
