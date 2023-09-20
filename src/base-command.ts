// credit:
// https://oclif.io/docs/global_flags
import {Command, Flags} from '@oclif/core';
import {type ExecaError, execa} from 'execa';

export abstract class BaseCommand extends Command {
	static baseFlags = {
		'dry-run': Flags.boolean({
			char: 'D',
			description: 'Pretend to work!',
			aliases: ['dryRun'],
		}),
		silent: Flags.boolean({
			char: 's',
			description: 'Work silently unless there is an error!',
		}),
	};

	protected async execute(
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

	protected logger(message: string, silent: boolean): void {
		if (!silent) {
			this.log(message);
		}
	}
}
