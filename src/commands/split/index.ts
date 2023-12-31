import {Args, Flags} from '@oclif/core';
import {
	addExtension,
	removeExtension,
	// Removing the extension will make the built cli crash
} from '../../utils.js';
import {BaseCommand} from '../../base-command.js';

export default class Split extends BaseCommand {
	static aliases = ['s'];

	static description = `Split each page into many tiles [mutool]`;

	static examples = [
		'<%= config.bin %> <%= command.id %> input.pdf',
		'<%= config.bin %> <%= command.id %> input.pdf -x 2',
		'<%= config.bin %> <%= command.id %> input.pdf -o splitted.pdf -y 2',
		'<%= config.bin %> <%= command.id %> input.pdf -x 2 -y 3 -r',
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
		x: Flags.integer({
			char: 'x',
			description:
				'Pieces to horizontally divide each page into. (Uses default only if --y is NOT used)',
			async default(context) {
				if (!context.flags.y) {
					return 2;
				}
			},
		}),
		y: Flags.integer({
			char: 'y',
			description: 'Pieces to vertically divide each page into.',
		}),
		r: Flags.boolean({
			char: 'r',
			description:
				'Split horizontally from right to left (default splits from left to right). (v1.23.0+)',
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Split);
		const {input} = args;
		const {x, y, r, output, 'dry-run': dryRun, silent} = flags;
		let finalOutput: string;
		if (output) {
			finalOutput = removeExtension(output);
		} else {
			finalOutput = removeExtension(input);
			finalOutput = `${finalOutput}-splitted`;
		}

		finalOutput = addExtension(finalOutput);
		await this.ensureDirExists(finalOutput);
		this.logger(`Creating ${finalOutput}...`, silent);
		const args2 = ['poster'];
		if (x) {
			args2.push('-x', `${x}`);
		}

		if (y) {
			args2.push('-y', `${y}`);
		}

		if (r) {
			args2.push('-r');
		}

		args2.push(input, finalOutput);
		await this.execute('mutool', args2, dryRun);
		this.logger('Done.', silent);
	}
}
