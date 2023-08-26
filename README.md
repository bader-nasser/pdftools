# pdftools

[![Version](https://img.shields.io/npm/v/@bader-nasser/pdftools.svg)](https://npmjs.org/package/@bader-nasser/pdftools)
[![Downloads/week](https://img.shields.io/npm/dw/@bader-nasser/pdftools.svg)](https://npmjs.org/package/@bader-nasser/pdftools)
[![GitHub license](https://img.shields.io/github/license/bader-nasser/pdftools)](https://github.com/bader-nasser/pdftools/blob/main/LICENSE)
[![Tests](https://github.com/bader-nasser/pdftools/actions/workflows/test.yml/badge.svg)](https://github.com/bader-nasser/pdftools/actions/workflows/test.yml)

PDF tools to merge PDF files and extract pages.
This cli exposes two binaries: `pdftools` and `pdf-tools`.

[اقرأ عن المشروع بالعربية](./README-ar.md).

<!-- toc -->

- [pdftools](#pdftools)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

## Requirements

- [Node.js](https://nodejs.org/en/download) (at least v 18.11.0)
- [PDFtk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/)

# Usage

<!-- usage -->

```sh-session
$ npm install -g @bader-nasser/pdftools
$ pdftools COMMAND
running command...
$ pdftools (--version|-v)
@bader-nasser/pdftools/0.9.1 linux-x64 node-v20.5.1
$ pdftools --help [COMMAND]
USAGE
  $ pdftools COMMAND
...
```

<!-- usagestop -->

# Commands

There are two main commands: [`extract`](#pdftools-extract-input-output)
and [`process`](#pdftools-process-file).
These commands have many aliases: `ext`, `ex`, `e`, `split`, `s` and `p`!

In the [JSON data file](test/docs/data.json) you can add:

```json
"$schema": "https://github.com/bader-nasser/pdftools/raw/main/data.schema.json",
```

to get some help in your [editor](https://json-schema.org/implementations.html#editors).

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
                            See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. "1-3, 5east, 4, 7-10even, 22-11odd")
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            See also: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
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
  Extract page number 5 from input.pdf to output.pdf

    $ pdftools e input.pdf output.pdf -f 5

  Extract page number 5 from input.pdf to output.pdf

    $ pdftools e input.pdf output.pdf -l 5

  Extract pages from 1 to 3 from input.pdf to output.pdf

    $ pdftools e input.pdf output.pdf -f 1 -l 3

  Extract *even* pages from 9 to 4, compress it and rotate it to the left

    $ pdftools e input.pdf output.pdf -f 9 -l 4 -c -r left -q even

  Extract pages from 1 to 3, with the 5th page rotated to the east, and *odd* pages from 7 to 4

    $ pdftools e input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  Extract pages as declared in file.txt

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
                            See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. "1-3, 5east, 4, 7-10even, 22-11odd")
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            See also: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
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
  Extract page number 5 from input.pdf to output.pdf

    $ pdftools ex input.pdf output.pdf -f 5

  Extract page number 5 from input.pdf to output.pdf

    $ pdftools ex input.pdf output.pdf -l 5

  Extract pages from 1 to 3 from input.pdf to output.pdf

    $ pdftools ex input.pdf output.pdf -f 1 -l 3

  Extract *even* pages from 9 to 4, compress it and rotate it to the left

    $ pdftools ex input.pdf output.pdf -f 9 -l 4 -c -r left -q even

  Extract pages from 1 to 3, with the 5th page rotated to the east, and *odd* pages from 7 to 4

    $ pdftools ex input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  Extract pages as declared in file.txt

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
                            See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. "1-3, 5east, 4, 7-10even, 22-11odd")
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            See also: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
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
  Extract page number 5 from input.pdf to output.pdf

    $ pdftools ext input.pdf output.pdf -f 5

  Extract page number 5 from input.pdf to output.pdf

    $ pdftools ext input.pdf output.pdf -l 5

  Extract pages from 1 to 3 from input.pdf to output.pdf

    $ pdftools ext input.pdf output.pdf -f 1 -l 3

  Extract *even* pages from 9 to 4, compress it and rotate it to the left

    $ pdftools ext input.pdf output.pdf -f 9 -l 4 -c -r left -q even

  Extract pages from 1 to 3, with the 5th page rotated to the east, and *odd* pages from 7 to 4

    $ pdftools ext input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  Extract pages as declared in file.txt

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
                            See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. "1-3, 5east, 4, 7-10even, 22-11odd")
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            See also: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
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
  Extract page number 5 from input.pdf to output.pdf

    $ pdftools extract input.pdf output.pdf -f 5

  Extract page number 5 from input.pdf to output.pdf

    $ pdftools extract input.pdf output.pdf -l 5

  Extract pages from 1 to 3 from input.pdf to output.pdf

    $ pdftools extract input.pdf output.pdf -f 1 -l 3

  Extract *even* pages from 9 to 4, compress it and rotate it to the left

    $ pdftools extract input.pdf output.pdf -f 9 -l 4 -c -r left -q even

  Extract pages from 1 to 3, with the 5th page rotated to the east, and *odd* pages from 7 to 4

    $ pdftools extract input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  Extract pages as declared in file.txt

    $ pdftools extract input.pdf output.pdf --data file.txt
```

_See code: [dist/commands/extract/index.ts](https://github.com/bader-nasser/pdftools/blob/v0.9.1/dist/commands/extract/index.ts)_

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
        See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.json
        Set "$schema" to "https://github.com/bader-nasser/pdftools/raw/main/data.schema.json"

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.3.0/src/commands/plugins/index.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.3.0/src/commands/plugins/inspect.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.3.0/src/commands/plugins/install.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.3.0/src/commands/plugins/link.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.3.0/src/commands/plugins/uninstall.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.3.0/src/commands/plugins/update.ts)_

## `pdftools process FILE`

Mess with PDF files using JSON file!

```
USAGE
  $ pdftools process FILE [-c] [-D] [-s]

ARGUMENTS
  FILE  JSON file to process
        See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.json
        Set "$schema" to "https://github.com/bader-nasser/pdftools/raw/main/data.schema.json"

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

_See code: [dist/commands/process/index.ts](https://github.com/bader-nasser/pdftools/blob/v0.9.1/dist/commands/process/index.ts)_

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
                            See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. "1-3, 5east, 4, 7-10even, 22-11odd")
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            See also: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
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
  Extract page number 5 from input.pdf to output.pdf

    $ pdftools s input.pdf output.pdf -f 5

  Extract page number 5 from input.pdf to output.pdf

    $ pdftools s input.pdf output.pdf -l 5

  Extract pages from 1 to 3 from input.pdf to output.pdf

    $ pdftools s input.pdf output.pdf -f 1 -l 3

  Extract *even* pages from 9 to 4, compress it and rotate it to the left

    $ pdftools s input.pdf output.pdf -f 9 -l 4 -c -r left -q even

  Extract pages from 1 to 3, with the 5th page rotated to the east, and *odd* pages from 7 to 4

    $ pdftools s input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  Extract pages as declared in file.txt

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
                            See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
  -f, --firstPage=<value>   First page (defaults to lastPage)
  -l, --lastPage=<value>    Last page (defaults to firstPage)
  -p, --pageRanges=<value>  Comma/Space-seperated list of page ranges (eg. "1-3, 5east, 4, 7-10even, 22-11odd")
                            See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                            See also: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
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
  Extract page number 5 from input.pdf to output.pdf

    $ pdftools split input.pdf output.pdf -f 5

  Extract page number 5 from input.pdf to output.pdf

    $ pdftools split input.pdf output.pdf -l 5

  Extract pages from 1 to 3 from input.pdf to output.pdf

    $ pdftools split input.pdf output.pdf -f 1 -l 3

  Extract *even* pages from 9 to 4, compress it and rotate it to the left

    $ pdftools split input.pdf output.pdf -f 9 -l 4 -c -r left -q even

  Extract pages from 1 to 3, with the 5th page rotated to the east, and *odd* pages from 7 to 4

    $ pdftools split input.pdf output.pdf -p "1-3, 5east, 7-4odd"

  Extract pages as declared in file.txt

    $ pdftools split input.pdf output.pdf --data file.txt
```

<!-- commandsstop -->
