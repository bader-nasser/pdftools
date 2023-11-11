import {Args, Flags} from '@oclif/core';
import {globby} from 'globby';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommandWithCompression} from '../../base-command-with-compression.js';

export default class Merge2 extends BaseCommandWithCompression {
	static aliases = ['m2', 'join2', 'j2'];

	static summary = `Merge PDFs [mutool]`;

	static description =
		'Note: Compression & garbage collection flags do NOT seem to work!';

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
		{
			description:
				'Merge all .pdf files and optimize the output for web browsers',
			command: `<%= config.bin %> <%= command.id %> input-*.pdf -o output -l`,
		},
	];

	static strict = false;

	static args = {
		input: Args.string({
			description: `PDF files followed by comma-seperated page numbers or ranges
(e.g. cover.pdf part-*.pdf file.pdf 2,11,4-6,10-8,13-N otherfile.pdf)`,
			required: true,
			// multiple: true,
		}),
	};

	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
			default: 'merged.pdf',
		}),
		decompress: Flags.boolean({
			char: 'd',
			description: 'Decompress all streams (except compress-fonts/images)',
			exclusive: ['compress', 'compress-fonts', 'compress-images'],
		}),
		compress: Flags.boolean({
			char: 'c',
			description: 'Compress all streams',
			exclusive: ['decompress'],
		}),
		'compress-fonts': Flags.boolean({
			char: 'F',
			aliases: ['cf'],
			description: 'Compress embedded fonts (ALIASES: --cf)',
			exclusive: ['decompress'],
		}),
		'compress-images': Flags.boolean({
			char: 'I',
			aliases: ['ci'],
			description: 'Compress images (ALIASES: --ci)',
			exclusive: ['decompress'],
		}),
		linearize: Flags.boolean({
			char: 'l',
			aliases: ['optimize'],
			charAliases: ['O'],
			description: 'Optimize for web browsers (ALIASES: -O, --optimize)',
		}),
		garbage: Flags.boolean({
			char: 'g',
			description: 'Garbage collect unused objects',
		}),
		'garbage-compact': Flags.boolean({
			char: 'C',
			aliases: ['compact', 'gc'],
			description:
				'... and compact cross reference table (ALIASES: --gc, --compact)',
		}),
		'garbage-deduplicate': Flags.boolean({
			char: 'G',
			aliases: ['deduplicate', 'gd'],
			description:
				'... and remove duplicate objects (ALIASES: --gd, --deduplicate)',
		}),
		keep: Flags.boolean({
			char: 'k',
			description: `Keep output's name`,
		}),
	};

	async run(): Promise<void> {
		const {argv, flags} = await this.parse(Merge2);
		const input = argv as string[];
		const {
			output,
			'dry-run': dryRun,
			silent,
			decompress,
			compress,
			'compress-fonts': compressFonts,
			'compress-images': compressImages,
			garbage,
			'garbage-compact': garbageCompact,
			'garbage-deduplicate': garbageDeduplicate,
			linearize,
			keep,
		} = flags;
		let finalOutput = removeExtension(output);
		await this.ensureDirExists(finalOutput);
		const outputOptions = [];

		if (linearize) {
			outputOptions.push('linearize');
			if (!keep) {
				finalOutput = `${finalOutput}-linearized`;
			}
		}

		if (compress || compressFonts || compressImages) {
			outputOptions.push('compress');
			if (!keep) {
				finalOutput = `${finalOutput}-compressed`;
			}
		}

		if (compressFonts) {
			outputOptions.push('compress-fonts');
			if (!keep) {
				finalOutput = `${finalOutput}-cf`;
			}
		}

		if (compressImages) {
			outputOptions.push('compress-images');
			if (!keep) {
				finalOutput = `${finalOutput}-ci`;
			}
		}

		if (decompress) {
			outputOptions.push('decompress');
			if (!keep) {
				finalOutput = `${finalOutput}-decompressed`;
			}
		}

		if (garbage || garbageCompact || garbageDeduplicate) {
			outputOptions.push('garbage');
			if (!keep) {
				finalOutput = `${finalOutput}-garbaged`;
			}
		}

		if (garbageCompact) {
			outputOptions.push('garbage=compact');
			if (!keep) {
				finalOutput = `${finalOutput}-gc`;
			}
		}

		if (garbageDeduplicate) {
			outputOptions.push('garbage=deduplicate');
			if (!keep) {
				finalOutput = `${finalOutput}-gd`;
			}
		}

		finalOutput = addExtension(finalOutput);
		const inputWithPages: string[] = [];
		for (const fileOrPage of input) {
			const files = await globby(fileOrPage);
			if (files.length > 0) {
				inputWithPages.push(...files);
			} else {
				inputWithPages.push(fileOrPage);
			}
		}

		const args = ['merge', '-o', finalOutput];
		if (outputOptions.length > 0) {
			args.push('-O', outputOptions.join(','));
		}

		args.push(...inputWithPages);

		this.logger(`Creating ${finalOutput}...`, silent);
		await this.execute('mutool', args, dryRun);
		this.logger('Done.', silent);
	}
}
