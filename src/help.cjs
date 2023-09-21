// https://oclif.io/docs/help_classes/
const {Help} = require('@oclif/core');

/** @typedef {import("@oclif/core").Command.Loadable} Loadable */
/** @typedef {import("@oclif/core").Command.Class} Class */
/** @typedef {import("@oclif/core").Command.Cached} Cached */

module.exports = class HelpClass extends Help {
	// credit:
	// https://github.com/oclif/oclif/issues/888#issuecomment-1370961228
	/**
	 * @param {Array<Loadable | Class | Cached>} commands
	 * @returns {string}
	 */
	formatCommands(commands) {
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
};
