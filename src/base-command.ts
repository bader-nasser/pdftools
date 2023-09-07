// credit:
// https://oclif.io/docs/global_flags
import {Command, Flags} from '@oclif/core';
import {type ExecaError, execa} from 'execa';

export abstract class BaseCommand extends Command {
	static baseFlags = {
		compress: Flags.boolean({
			char: 'c',
			description: `Reduce file size
See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
You also may want to try: https://www.ilovepdf.com/compress_pdf`,
		}),
		dryRun: Flags.boolean({
			char: 'D',
			description: 'Pretend to work!',
			aliases: ['dry-run'],
		}),
		silent: Flags.boolean({
			char: 's',
			description: 'Work silently unless there is an error!',
		}),
	};

	async execute(
		command: string,
		args: readonly string[] | undefined,
		dryRun: boolean,
	) {
		if (!dryRun) {
			try {
				await execa(command, args);
			} catch (error) {
				const error_ = error as ExecaError;
				console.error(error_.stderr);
				this.exit(1);
			}
		}
	}

	logger(message: string, silent: boolean): void {
		if (!silent) {
			this.log(message);
		}
	}
}
