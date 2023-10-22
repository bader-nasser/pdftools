// https://oclif.io/docs/help_classes/
import {type Command, Help} from '@oclif/core';

export default class HelpClass extends Help {
	// credit:
	// https://github.com/oclif/oclif/issues/888#issuecomment-1370961228
	protected formatCommands(commands: Command.Loadable[]): string {
		if (commands.length === 0) {
			return '';
		}

		const body = this.renderList(
			commands
				// if aliases do not contain the current command's id,
				// it is the "main" command
				.filter((c) => !c.aliases.includes(c.id))
				.map((c) => {
					if (this.config.topicSeparator !== ':')
						c.id = c.id.replaceAll(':', this.config.topicSeparator);
					// Add aliases at the end of summary
					const summary =
						c.aliases.length > 0
							? `${this.summary(c)} (ALIASES: ${c.aliases.join(', ')})`
							: this.summary(c);
					return [c.id, summary];
				}),
			{
				spacer: '\n',
				stripAnsi: this.opts.stripAnsi,
				indentation: 2,
			},
		);

		return this.section('COMMANDS', body);
	}
}
