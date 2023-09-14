// credit:
// https://oclif.io/docs/global_flags
import {Flags} from '@oclif/core';
import {BaseCommand} from './base-command.js';

export abstract class BaseCommandWithCompression extends BaseCommand {
	static baseFlags = {
		// Todo: revise
		...BaseCommand.baseFlags,
		compress: Flags.boolean({
			char: 'c',
			description: `Reduce file size
See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
You also may want to try: https://www.ilovepdf.com/compress_pdf`,
		}),
	};
}
