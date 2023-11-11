import {Args, Flags} from '@oclif/core';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Linearize extends BaseCommand {
	static aliases = ['l', 'optimize', 'o'];

	static description = `Optimize for web browsers [mutool]`;

	static examples = [
		'<%= config.bin %> <%= command.id %> input.pdf',
		'<%= config.bin %> <%= command.id %> input.pdf -o input-linearized.pdf',
	];

	static args = {
		input: Args.string({
			description: `Input PDF file`,
			required: true,
		}),
	};

	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
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
		const {args, flags} = await this.parse(Linearize);
		const {input} = args;
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
			keep,
		} = flags;
		let finalOutput: string;
		if (output) {
			finalOutput = removeExtension(output);
		} else {
			finalOutput = removeExtension(input);
			finalOutput = `${finalOutput}-linearized`;
		}

		const outputOptions = ['linearize'];
		if (compress) {
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
		await this.ensureDirExists(finalOutput);
		this.logger(`Creating ${finalOutput}...`, silent);
		const args2 = ['convert', '-o', finalOutput];
		args2.push('-O', outputOptions.join(','), input);
		await this.execute('mutool', args2, dryRun);
		this.logger('Done.', silent);
	}
}
