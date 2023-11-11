import {Args, Flags} from '@oclif/core';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Compress2 extends BaseCommand {
	static aliases = ['c2'];

	static description = `Compress streams [mutool]`;

	static examples = [
		'<%= config.bin %> <%= command.id %> decompressed.pdf',
		'<%= config.bin %> <%= command.id %> decompressed.pdf -o compressed.pdf',
	];

	static args = {
		input: Args.string({
			required: true,
			description: `Decompressed PDF file`,
		}),
	};

	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
		}),
		linearize: Flags.boolean({
			char: 'l',
			aliases: ['optimize'],
			charAliases: ['O'],
			description:
				'Linearize PDF (optimize for web browsers) (ALIASES: -O, --optimize)',
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
		const {args, flags} = await this.parse(Compress2);
		const {input} = args;
		const {
			output,
			'dry-run': dryRun,
			silent,
			linearize,
			metadata,
			pages,
		} = flags;
		let finalOutput: string;
		if (output) {
			finalOutput = removeExtension(output);
		} else {
			finalOutput = removeExtension(input);
			finalOutput = `${finalOutput}-compressed`;
		}

		finalOutput = addExtension(finalOutput);

		const outputOptions = [
			// -g garbage collect unused objects
			// -gg in addition to -g compact xref table
			// -ggg in addition to -gg merge duplicate objects
			// -gggg in addition to -ggg check streams for duplication
			'-gggg',
			// -z deflate uncompressed streams
			'-z',
			// -f compress font streams
			'-f',
			// -i compress image streams
			'-i',
			// -c clean content streams
			'-c',
			// -s sanitize content streams
			'-s',
		];
		if (linearize) {
			outputOptions.push('-l');
		}

		if (metadata) {
			outputOptions.push('-m');
		}

		await this.ensureDirExists(finalOutput);
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
