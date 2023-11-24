import {Args, Flags} from '@oclif/core';
import {globby} from 'globby';
import {addExtension, removeExtension} from '../../utils.js';
import {BaseCommandWithCompression} from '../../base-command-with-compression.js';

export default class Rotate extends BaseCommandWithCompression {
	static aliases = ['rot'];

	static summary = `Rotate specified pages of PDF`;

	static description = `Takes a single input PDF and rotates just the specified pages.
All other pages remain unchanged.`;

	static examples = [
		'<%= config.bin %> <%= command.id %> input.pdf',
		'<%= config.bin %> <%= command.id %> input.pdf -o rotated',
		'<%= config.bin %> <%= command.id %> input.pdf -c',
	];

	static args = {
		input: Args.string({
			description: `PDF files`,
			required: true,
		}),
	};

	static flags = {
		output: Flags.string({
			char: 'o',
			description: 'Output file',
			default: 'rotated.pdf',
		}),
		pages: Flags.string({
			char: 'p',
			description: `Space-seperated page ranges (eg. 1 end 2-9odd 10west 15-11evensouth)
Set --direction to - if you want to customize each page's direction!
See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-rotate`,
			default: ['1-end'],
			multiple: true,
		}),
		direction: Flags.string({
			char: 'd',
			options: ['north', 'south', 'east', 'west', 'left', 'right', 'down', '-'],
			default: 'east',
		}),
		keep: Flags.boolean({
			char: 'k',
			description: `Keep output's name`,
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Rotate);
		const {input} = args;
		const {
			output,
			'dry-run': dryRun,
			silent,
			compress,
			keep,
			pages,
			direction,
		} = flags;
		let finalOutput = removeExtension(output);
		await this.ensureDirExists(finalOutput);
		const pageRanges = pages.map((p) => {
			if (direction === '-') {
				return p;
			}

			return `${p}${direction}`;
		});
		const extraArgs = [];

		if (compress) {
			extraArgs.push('compress');
			if (!keep) {
				finalOutput = `${finalOutput}-compressed`;
			}
		}

		finalOutput = addExtension(finalOutput);
		const commandArgs = [input, 'rotate', ...pageRanges, 'output', finalOutput];
		commandArgs.push(...extraArgs);
		this.logger(`Creating ${finalOutput}...`, silent);
		await this.execute('pdftk', commandArgs, dryRun);
		this.logger('Done.', silent);
	}
}
