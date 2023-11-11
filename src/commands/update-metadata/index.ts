import path from 'node:path';
import process from 'node:process';
import {Args, Flags} from '@oclif/core';
import fs from 'fs-extra';
import JSON5 from 'json5';
import YAML from 'yaml';
import TOML from '@ltd/j-toml';
import {
	addExtension,
	removeExtension,
	updateMetadata,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';
import {type Metadata} from '../process/index.js';

export default class UpdateMetadata extends BaseCommand {
	static aliases = ['up-meta', 'meta'];

	static description = "Update PDF's metadata";

	static examples = [
		'<%= config.bin %> <%= command.id %> input.pdf -f meta.json',
		'<%= config.bin %> <%= command.id %> input.pdf -f meta.toml -o updated.pdf',
		'<%= config.bin %> <%= command.id %> input.pdf -o updated.pdf -f meta.yaml -a "Bader Nasser" -t awesome',
	];

	static args = {
		input: Args.string({
			description: `Input PDF to update`,
			required: true,
		}),
	};

	// https://oclif.io/docs/flags
	static flags = {
		file: Flags.string({
			char: 'f',
			description: `Metadata file (JSON5 or YAML or TOML)
See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/meta-only.json (or .yaml or .toml)
			`,
		}),
		title: Flags.string({
			char: 't',
		}),
		author: Flags.string({
			char: 'a',
		}),
		subject: Flags.string({
			char: 'S',
		}),
		keywords: Flags.string({
			char: 'k',
			multiple: true,
		}),
		producer: Flags.string({
			char: 'p',
		}),
		creator: Flags.string({
			char: 'c',
		}),
		'creation-date': Flags.string({
			char: 'd',
			aliases: ['creationDate'],
		}),
		'modification-date': Flags.string({
			char: 'm',
			aliases: ['modificationDate'],
		}),
		output: Flags.string({
			char: 'o',
			description: 'Output file',
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(UpdateMetadata);
		const {input} = args;
		const {output, 'dry-run': dryRun, silent, file, ...meta} = flags;
		const metadata: Metadata = {
			...meta,
			creationDate: meta['creation-date'],
			modificationDate: meta['modification-date'],
		};
		let finalOutput: string;
		if (output) {
			finalOutput = removeExtension(output);
			finalOutput = addExtension(finalOutput);
			fs.copyFileSync(input, finalOutput);
		} else {
			finalOutput = input;
		}

		await this.ensureDirExists(finalOutput);
		this.logger(`Updating metadata for ${finalOutput}...`, silent);

		if (file) {
			try {
				const filePath = path.join(process.cwd(), file);
				// credit:
				// https://github.com/vercel/next.js/blob/962ce0dcee7993cedeb949c7f31ef34afc829578/packages/next/src/lib/find-config.ts#L53-L56
				const fileContents = await fs.readFile(filePath, 'utf8');
				let fileObject: Metadata;
				if (filePath.endsWith('.json') || filePath.endsWith('.json5')) {
					fileObject = JSON5.parse<Metadata>(fileContents);
				} else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
					fileObject = YAML.parse(fileContents) as Metadata;
				} else if (filePath.endsWith('.toml')) {
					fileObject = TOML.parse(fileContents) as Metadata;
				} else {
					this.log('Supported formats are: JSON, YAML and TOML.');
					this.log(
						'Allowed extensions are: .json, .json5, .yaml, .yml and .toml.',
					);
					this.exit(1);
				}

				await updateMetadata({filePath: finalOutput, meta: fileObject, dryRun});
			} catch (error) {
				console.error(error);
			}
		}

		await updateMetadata({filePath: finalOutput, meta: metadata, dryRun});
		this.logger('Done.', silent);
	}
}
