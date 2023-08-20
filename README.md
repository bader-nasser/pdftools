# pdftools

PDF tools to merge PDF files and extract pages.
This cli exposes two binaries: `pdftools` and `pdf-tools`.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/bader-nasser/pdftools)](https://github.com/bader-nasser/pdftools/blob/main/LICENSE)

[Read about the project in Arabic](./README-ar.md).

[اقرأ عن المشروع باللغة العربية](./README-ar.md).

<!-- toc -->

- [pdftools](#pdftools)
- [Requirements](#requirements)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Requirements

- [Node.js](https://nodejs.org/en/download) (at least v 18.11.0)
- [PDFtk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/)

# Usage

Installing from `npm` is not ready yet! Use the following command instead:

```bash
$ npm i -g https://github.com/bader-nasser/pdftools/raw/main/pdftools-0.6.0.tgz
```

<!-- usage -->

```sh-session
$ npm install -g pdftools
$ pdftools COMMAND
running command...
$ pdftools (--version|-v)
pdftools/0.6.0 linux-x64 node-v20.5.1
$ pdftools --help [COMMAND]
USAGE
  $ pdftools COMMAND
...
```

<!-- usagestop -->

# Commands

There are two main commands: [`extract`](#pdftools-extract-input-output) and [`process`](#pdftools-process-file).
These two commands have many aliases: `ext`, `ex`, `e`, `split`, `s` and `p`!

<!-- commands -->

- [`pdftools autocomplete [SHELL]`](#pdftools-autocomplete-shell)
- [`pdftools e INPUT OUTPUT`](#pdftools-e-input-output)
- [`pdftools ex INPUT OUTPUT`](#pdftools-ex-input-output)
- [`pdftools ext INPUT OUTPUT`](#pdftools-ext-input-output)
- [`pdftools extract INPUT OUTPUT`](#pdftools-extract-input-output)
- [`pdftools help [COMMANDS]`](#pdftools-help-commands)
- [`pdftools p FILE`](#pdftools-p-file)
- [`pdftools plugins`](#pdftools-plugins)
- [`pdftools plugins:install PLUGIN...`](#pdftools-pluginsinstall-plugin)
- [`pdftools plugins:inspect PLUGIN...`](#pdftools-pluginsinspect-plugin)
- [`pdftools plugins:install PLUGIN...`](#pdftools-pluginsinstall-plugin-1)
- [`pdftools plugins:link PLUGIN`](#pdftools-pluginslink-plugin)
- [`pdftools plugins:uninstall PLUGIN...`](#pdftools-pluginsuninstall-plugin)
- [`pdftools plugins:uninstall PLUGIN...`](#pdftools-pluginsuninstall-plugin-1)
- [`pdftools plugins:uninstall PLUGIN...`](#pdftools-pluginsuninstall-plugin-2)
- [`pdftools plugins update`](#pdftools-plugins-update)
- [`pdftools process FILE`](#pdftools-process-file)
- [`pdftools s INPUT OUTPUT`](#pdftools-s-input-output)
- [`pdftools split INPUT OUTPUT`](#pdftools-split-input-output)
- [`pdftools update [CHANNEL]`](#pdftools-update-channel)

## `pdftools autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ pdftools autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ pdftools autocomplete

  $ pdftools autocomplete bash

  $ pdftools autocomplete zsh

  $ pdftools autocomplete powershell

  $ pdftools autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v2.3.6/src/commands/autocomplete/index.ts)_

## `pdftools e INPUT OUTPUT`

Extract pages from PDF file

```
USAGE
  $ pdftools e INPUT OUTPUT [-f <value> | -p <value> | -d <value>] [-l <value> |  | ] [-q even|odd] [-r
    north|south|east|west|left|right|down] [-c] [-D] [-s]

FLAGS
  -D, --dryRun              Pretend to extract pages!
  -c, --compress            Reduce file size
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                            You also may want to try: https://www.ilovepdf.com/compress_pdf
  -d, --data=<value>        Data file (lines of page ranges)
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. 1-3, 5east, 4, 7-10even, 22-11odd)
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
  -q, --qualifier=<option>  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: even|odd>
  -r, --rotation=<option>   See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: north|south|east|west|left|right|down>
  -s, --silent

DESCRIPTION
  Extract pages from PDF file

ALIASES
  $ pdftools ext
  $ pdftools ex
  $ pdftools e
  $ pdftools split
  $ pdftools s

EXAMPLES
  $ pdftools e input.pdf output.pdf -f 1

  $ pdftools e input.pdf output.pdf -f 1 -l 3

  $ pdftools e input.pdf output.pdf -f 9 -l 5 -c -r left -q even

  $ pdftools e input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  $ pdftools e input.pdf output.pdf --data file.txt
```

## `pdftools ex INPUT OUTPUT`

Extract pages from PDF file

```
USAGE
  $ pdftools ex INPUT OUTPUT [-f <value> | -p <value> | -d <value>] [-l <value> |  | ] [-q even|odd] [-r
    north|south|east|west|left|right|down] [-c] [-D] [-s]

FLAGS
  -D, --dryRun              Pretend to extract pages!
  -c, --compress            Reduce file size
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                            You also may want to try: https://www.ilovepdf.com/compress_pdf
  -d, --data=<value>        Data file (lines of page ranges)
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. 1-3, 5east, 4, 7-10even, 22-11odd)
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
  -q, --qualifier=<option>  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: even|odd>
  -r, --rotation=<option>   See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: north|south|east|west|left|right|down>
  -s, --silent

DESCRIPTION
  Extract pages from PDF file

ALIASES
  $ pdftools ext
  $ pdftools ex
  $ pdftools e
  $ pdftools split
  $ pdftools s

EXAMPLES
  $ pdftools ex input.pdf output.pdf -f 1

  $ pdftools ex input.pdf output.pdf -f 1 -l 3

  $ pdftools ex input.pdf output.pdf -f 9 -l 5 -c -r left -q even

  $ pdftools ex input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  $ pdftools ex input.pdf output.pdf --data file.txt
```

## `pdftools ext INPUT OUTPUT`

Extract pages from PDF file

```
USAGE
  $ pdftools ext INPUT OUTPUT [-f <value> | -p <value> | -d <value>] [-l <value> |  | ] [-q even|odd] [-r
    north|south|east|west|left|right|down] [-c] [-D] [-s]

FLAGS
  -D, --dryRun              Pretend to extract pages!
  -c, --compress            Reduce file size
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                            You also may want to try: https://www.ilovepdf.com/compress_pdf
  -d, --data=<value>        Data file (lines of page ranges)
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. 1-3, 5east, 4, 7-10even, 22-11odd)
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
  -q, --qualifier=<option>  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: even|odd>
  -r, --rotation=<option>   See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: north|south|east|west|left|right|down>
  -s, --silent

DESCRIPTION
  Extract pages from PDF file

ALIASES
  $ pdftools ext
  $ pdftools ex
  $ pdftools e
  $ pdftools split
  $ pdftools s

EXAMPLES
  $ pdftools ext input.pdf output.pdf -f 1

  $ pdftools ext input.pdf output.pdf -f 1 -l 3

  $ pdftools ext input.pdf output.pdf -f 9 -l 5 -c -r left -q even

  $ pdftools ext input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  $ pdftools ext input.pdf output.pdf --data file.txt
```

## `pdftools extract INPUT OUTPUT`

Extract pages from PDF file

```
USAGE
  $ pdftools extract INPUT OUTPUT [-f <value> | -p <value> | -d <value>] [-l <value> |  | ] [-q even|odd] [-r
    north|south|east|west|left|right|down] [-c] [-D] [-s]

FLAGS
  -D, --dryRun              Pretend to extract pages!
  -c, --compress            Reduce file size
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                            You also may want to try: https://www.ilovepdf.com/compress_pdf
  -d, --data=<value>        Data file (lines of page ranges)
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. 1-3, 5east, 4, 7-10even, 22-11odd)
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
  -q, --qualifier=<option>  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: even|odd>
  -r, --rotation=<option>   See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: north|south|east|west|left|right|down>
  -s, --silent

DESCRIPTION
  Extract pages from PDF file

ALIASES
  $ pdftools ext
  $ pdftools ex
  $ pdftools e
  $ pdftools split
  $ pdftools s

EXAMPLES
  $ pdftools extract input.pdf output.pdf -f 1

  $ pdftools extract input.pdf output.pdf -f 1 -l 3

  $ pdftools extract input.pdf output.pdf -f 9 -l 5 -c -r left -q even

  $ pdftools extract input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  $ pdftools extract input.pdf output.pdf --data file.txt
```

_See code: [dist/commands/extract/index.ts](https://github.com/bader-nasser/pdftools/blob/v0.6.0/dist/commands/extract/index.ts)_

## `pdftools help [COMMANDS]`

Display help for pdftools.

```
USAGE
  $ pdftools help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for pdftools.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.17/src/commands/help.ts)_

## `pdftools p FILE`

Mess with PDF files using JSON file!

```
USAGE
  $ pdftools p FILE [-c] [-D] [-s]

ARGUMENTS
  FILE  JSON file to process

FLAGS
  -D, --dryRun    Pretend to process something!
  -c, --compress  Reduce file size
                  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                  You also may want to try: https://www.ilovepdf.com/compress_pdf
  -s, --silent

DESCRIPTION
  Mess with PDF files using JSON file!

ALIASES
  $ pdftools p

EXAMPLES
  $ pdftools p data.json
```

## `pdftools plugins`

List installed plugins.

```
USAGE
  $ pdftools plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ pdftools plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/index.ts)_

## `pdftools plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ pdftools plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ pdftools plugins add

EXAMPLES
  $ pdftools plugins:install myplugin

  $ pdftools plugins:install https://github.com/someuser/someplugin

  $ pdftools plugins:install someuser/someplugin
```

## `pdftools plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ pdftools plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ pdftools plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/inspect.ts)_

## `pdftools plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ pdftools plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ pdftools plugins add

EXAMPLES
  $ pdftools plugins:install myplugin

  $ pdftools plugins:install https://github.com/someuser/someplugin

  $ pdftools plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/install.ts)_

## `pdftools plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ pdftools plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ pdftools plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/link.ts)_

## `pdftools plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pdftools plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pdftools plugins unlink
  $ pdftools plugins remove
```

## `pdftools plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pdftools plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pdftools plugins unlink
  $ pdftools plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/uninstall.ts)_

## `pdftools plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pdftools plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pdftools plugins unlink
  $ pdftools plugins remove
```

## `pdftools plugins update`

Update installed plugins.

```
USAGE
  $ pdftools plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/update.ts)_

## `pdftools process FILE`

Mess with PDF files using JSON file!

```
USAGE
  $ pdftools process FILE [-c] [-D] [-s]

ARGUMENTS
  FILE  JSON file to process

FLAGS
  -D, --dryRun    Pretend to process something!
  -c, --compress  Reduce file size
                  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                  You also may want to try: https://www.ilovepdf.com/compress_pdf
  -s, --silent

DESCRIPTION
  Mess with PDF files using JSON file!

ALIASES
  $ pdftools p

EXAMPLES
  $ pdftools process data.json
```

_See code: [dist/commands/process/index.ts](https://github.com/bader-nasser/pdftools/blob/v0.6.0/dist/commands/process/index.ts)_

## `pdftools s INPUT OUTPUT`

Extract pages from PDF file

```
USAGE
  $ pdftools s INPUT OUTPUT [-f <value> | -p <value> | -d <value>] [-l <value> |  | ] [-q even|odd] [-r
    north|south|east|west|left|right|down] [-c] [-D] [-s]

FLAGS
  -D, --dryRun              Pretend to extract pages!
  -c, --compress            Reduce file size
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                            You also may want to try: https://www.ilovepdf.com/compress_pdf
  -d, --data=<value>        Data file (lines of page ranges)
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. 1-3, 5east, 4, 7-10even, 22-11odd)
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
  -q, --qualifier=<option>  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: even|odd>
  -r, --rotation=<option>   See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: north|south|east|west|left|right|down>
  -s, --silent

DESCRIPTION
  Extract pages from PDF file

ALIASES
  $ pdftools ext
  $ pdftools ex
  $ pdftools e
  $ pdftools split
  $ pdftools s

EXAMPLES
  $ pdftools s input.pdf output.pdf -f 1

  $ pdftools s input.pdf output.pdf -f 1 -l 3

  $ pdftools s input.pdf output.pdf -f 9 -l 5 -c -r left -q even

  $ pdftools s input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  $ pdftools s input.pdf output.pdf --data file.txt
```

## `pdftools split INPUT OUTPUT`

Extract pages from PDF file

```
USAGE
  $ pdftools split INPUT OUTPUT [-f <value> | -p <value> | -d <value>] [-l <value> |  | ] [-q even|odd] [-r
    north|south|east|west|left|right|down] [-c] [-D] [-s]

FLAGS
  -D, --dryRun              Pretend to extract pages!
  -c, --compress            Reduce file size
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                            You also may want to try: https://www.ilovepdf.com/compress_pdf
  -d, --data=<value>        Data file (lines of page ranges)
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. 1-3, 5east, 4, 7-10even, 22-11odd)
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
  -q, --qualifier=<option>  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: even|odd>
  -r, --rotation=<option>   See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            <options: north|south|east|west|left|right|down>
  -s, --silent

DESCRIPTION
  Extract pages from PDF file

ALIASES
  $ pdftools ext
  $ pdftools ex
  $ pdftools e
  $ pdftools split
  $ pdftools s

EXAMPLES
  $ pdftools split input.pdf output.pdf -f 1

  $ pdftools split input.pdf output.pdf -f 1 -l 3

  $ pdftools split input.pdf output.pdf -f 9 -l 5 -c -r left -q even

  $ pdftools split input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  $ pdftools split input.pdf output.pdf --data file.txt
```

## `pdftools update [CHANNEL]`

update the pdftools CLI

```
USAGE
  $ pdftools update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
  --force                Force a re-download of the requested version.

DESCRIPTION
  update the pdftools CLI

EXAMPLES
  Update to the stable channel:

    $ pdftools update stable

  Update to a specific version:

    $ pdftools update --version 1.0.0

  Interactively select version:

    $ pdftools update --interactive

  See available versions:

    $ pdftools update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.1.32/src/commands/update.ts)_

<!-- commandsstop -->
