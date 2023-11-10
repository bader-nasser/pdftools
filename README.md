# pdftools

[![Version](https://img.shields.io/npm/v/@bader-nasser/pdftools.svg)](https://npmjs.org/package/@bader-nasser/pdftools)
[![Tests](https://github.com/bader-nasser/pdftools/actions/workflows/tests.yml/badge.svg)](https://github.com/bader-nasser/pdftools/actions/workflows/tests.yml)
[![Downloads/week](https://img.shields.io/npm/dw/@bader-nasser/pdftools.svg)](https://img.shields.io/npm/dw/@bader-nasser/pdftools.svg)
[![Downloads/month](https://img.shields.io/npm/dm/@bader-nasser/pdftools.svg)](https://img.shields.io/npm/dm/@bader-nasser/pdftools.svg)
[![Downloads/total](https://img.shields.io/npm/dt/@bader-nasser/pdftools.svg)](https://img.shields.io/npm/dt/@bader-nasser/pdftools.svg)

PDF tools to merge PDF files (using [JSON5](test/docs/data.json) or
[YAML](test/docs/data.yaml) or [TOML](test/docs/data.toml) file) and
extract pages (from command line or using a [text file](test/docs/data.txt)).
This cli exposes two binaries: `pdftools` and `pdf-tools`.

It can be used to update PDF's metadata using the `process` command,
see [test/docs/example.yaml](test/docs/example.yaml) for more details.

<!-- toc -->

- [pdftools](#pdftools)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

[اقرأ عن المشروع بالعربية](README-ar.md).

## Requirements

- [Node.js](https://nodejs.org/en/download) (at least v18.11.0)
- [PDFtk server](https://www.pdflabs.com/tools/pdftk-server/)
  or [`pdftk-java`](https://gitlab.com/pdftk-java/pdftk):

  - Official:
    - Windows & macOS: https://www.pdflabs.com/tools/pdftk-server/
    - Windows ([winget](https://github.com/microsoft/winget-cli)):
      `winget install PDFLabs.PDFtk.Server`
  - pdftk-java:

    - Ubuntu: `sudo apt install pdftk-java`
    - macOS & Linux ([Homebrew](https://brew.sh/)): `brew install pdftk-java`
    - Windows ([Chocolatey](https://docs.chocolatey.org/en-us/choco/setup)):
      `choco install pdftk-java --params "'/AddToUserPath:yes /AddToSystemPath:yes'"`

  - Note: You might be interested in a GUI like
    [PDF Chain](https://pdfchain.sourceforge.io/index.html).

- [mutool](https://mupdf.com/releases/index.html) for some commands:
  - Ubuntu: `sudo apt install mupdf-tools`
  - macOS & Linux ([Homebrew](https://brew.sh/)): `brew install mupdf`
  - Windows:
    - [winget](https://github.com/microsoft/winget-cli):
      `winget install ArtifexSoftware.mutool` (maybe just `mutool`)
    - [Chocolatey](https://docs.chocolatey.org/en-us/choco/setup):
      `choco install mupdf`

Let me know if I should use any other program or library to perform the current tasks
or any other [suggested tasks](https://github.com/bader-nasser/pdftools/issues).

# Usage

<!-- usage -->

```sh-session
$ npm install -g @bader-nasser/pdftools
$ pdftools COMMAND
running command...
$ pdftools (--version|-v)
@bader-nasser/pdftools/4.0.0 linux-x64 node-v21.1.0
$ pdftools --help [COMMAND]
USAGE
  $ pdftools COMMAND
...
```

<!-- usagestop -->

# Commands

There are many commands but the most important ones are:

- [`extract`](#pdftools-extract)
  - aliases: `ext`, `ex` & `e`
- [`process`](#pdftools-process-file)
  - alias: `p`

<!-- commands -->

- [`pdftools autocomplete [SHELL]`](#pdftools-autocomplete-shell)
- [`pdftools compress INPUT`](#pdftools-compress-input)
- [`pdftools compress2 INPUT`](#pdftools-compress2-input)
- [`pdftools convert INPUT`](#pdftools-convert-input)
- [`pdftools decompress INPUT`](#pdftools-decompress-input)
- [`pdftools decompress2 INPUT`](#pdftools-decompress2-input)
- [`pdftools drop-xfa INPUT`](#pdftools-drop-xfa-input)
- [`pdftools extract`](#pdftools-extract)
- [`pdftools help [COMMANDS]`](#pdftools-help-commands)
- [`pdftools merge INPUT`](#pdftools-merge-input)
- [`pdftools merge2 INPUT`](#pdftools-merge2-input)
- [`pdftools plugins`](#pdftools-plugins)
- [`pdftools plugins:inspect PLUGIN...`](#pdftools-pluginsinspect-plugin)
- [`pdftools plugins:install PLUGIN...`](#pdftools-pluginsinstall-plugin)
- [`pdftools plugins:link PLUGIN`](#pdftools-pluginslink-plugin)
- [`pdftools plugins reset`](#pdftools-plugins-reset)
- [`pdftools plugins:uninstall PLUGIN...`](#pdftools-pluginsuninstall-plugin)
- [`pdftools plugins update`](#pdftools-plugins-update)
- [`pdftools process FILE`](#pdftools-process-file)
- [`pdftools repair INPUT`](#pdftools-repair-input)
- [`pdftools split INPUT`](#pdftools-split-input)
- [`pdftools update-metadata INPUT`](#pdftools-update-metadata-input)

## `pdftools autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ pdftools autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ pdftools autocomplete

  $ pdftools autocomplete bash

  $ pdftools autocomplete zsh

  $ pdftools autocomplete powershell

  $ pdftools autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.0.1/src/commands/autocomplete/index.ts)_

## `pdftools compress INPUT`

Restore page stream compression

```
USAGE
  $ pdftools compress INPUT [-D] [-s] [-o <value>]

ARGUMENTS
  INPUT  Uncompressed PDF file

FLAGS
  -D, --dry-run         Pretend to work!
  -o, --output=<value>  Output file
  -s, --silent          Work silently unless there is an error!

DESCRIPTION
  Restore page stream compression

ALIASES
  $ pdftools c

EXAMPLES
  $ pdftools compress uncompressed.pdf

  $ pdftools compress uncompressed.pdf -o compressed.pdf
```

_See code: [src/commands/compress/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/compress/index.ts)_

## `pdftools compress2 INPUT`

Compress streams [mutool]

```
USAGE
  $ pdftools compress2 INPUT [-D] [-s] [-o <value>] [-l] [-p <value>] [-m]

ARGUMENTS
  INPUT  Uncompressed PDF file

FLAGS
  -D, --dry-run           Pretend to work!
  -l, --linearize         Linearize PDF (optimize for web browsers) (ALIASES: -O, --optimize)
  -m, --metadata          Preserve metadata
  -o, --output=<value>    Output file
  -p, --pages=<value>...  Comma/space separated list of page numbers and ranges (1,3-5 12-9 N)
  -s, --silent            Work silently unless there is an error!

DESCRIPTION
  Compress streams [mutool]

ALIASES
  $ pdftools c2

EXAMPLES
  $ pdftools compress2 uncompressed.pdf

  $ pdftools compress2 uncompressed.pdf -o compressed.pdf
```

_See code: [src/commands/compress2/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/compress2/index.ts)_

## `pdftools convert INPUT`

Convert PDF to text file

```
USAGE
  $ pdftools convert INPUT [-D] [-s] [-o <value>]

ARGUMENTS
  INPUT  PDF file to convert

FLAGS
  -D, --dry-run         Pretend to work!
  -o, --output=<value>  Output file
  -s, --silent          Work silently unless there is an error!

DESCRIPTION
  Convert PDF to text file

EXAMPLES
  $ pdftools convert file.pdf

  $ pdftools convert file.pdf -o file-text.txt
```

_See code: [src/commands/convert/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/convert/index.ts)_

## `pdftools decompress INPUT`

Decompress PDF page streams for editing the PDF in a text editor

```
USAGE
  $ pdftools decompress INPUT [-D] [-s] [-o <value>]

ARGUMENTS
  INPUT  Compressed PDF file

FLAGS
  -D, --dry-run         Pretend to work!
  -o, --output=<value>  Output file
  -s, --silent          Work silently unless there is an error!

DESCRIPTION
  Decompress PDF page streams for editing the PDF in a text editor

ALIASES
  $ pdftools d
  $ pdftools uncompress
  $ pdftools u

EXAMPLES
  $ pdftools decompress doc.pdf

  $ pdftools decompress doc.pdf -o doc-uncompressed.pdf
```

_See code: [src/commands/decompress/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/decompress/index.ts)_

## `pdftools decompress2 INPUT`

Decompress streams [mutool]

```
USAGE
  $ pdftools decompress2 INPUT [-D] [-s] [-o <value>] [-p <value>] [-m]

ARGUMENTS
  INPUT  Compressed PDF file

FLAGS
  -D, --dry-run           Pretend to work!
  -m, --metadata          Preserve metadata
  -o, --output=<value>    Output file
  -p, --pages=<value>...  Comma/space separated list of page numbers and ranges (1,3-5 12-9 N)
  -s, --silent            Work silently unless there is an error!

DESCRIPTION
  Decompress streams [mutool]

ALIASES
  $ pdftools d2
  $ pdftools uncompress2
  $ pdftools u2

EXAMPLES
  $ pdftools decompress2 compressed.pdf

  $ pdftools decompress2 compressed.pdf -o decompressed.pdf
```

_See code: [src/commands/decompress2/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/decompress2/index.ts)_

## `pdftools drop-xfa INPUT`

Remove the form's XFA data

```
USAGE
  $ pdftools drop-xfa INPUT [-D] [-s] [-o <value>]

ARGUMENTS
  INPUT  PDF with XFA data

FLAGS
  -D, --dry-run         Pretend to work!
  -o, --output=<value>  Output file
  -s, --silent          Work silently unless there is an error!

DESCRIPTION
  Remove the form's XFA data

ALIASES
  $ pdftools drop

EXAMPLES
  $ pdftools drop-xfa pdf-with-xfa.pdf

  $ pdftools drop-xfa pdf-with-xfa.pdf -o pdf-no-xfa.pdf
```

_See code: [src/commands/drop-xfa/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/drop-xfa/index.ts)_

## `pdftools extract`

Extract pages from PDF file

```
USAGE
  $ pdftools extract -i <value> -o <value> [-D] [-s] [-c] [-f <value> | -p <value> | -d <value>] [-l <value>
    |  | ] [-q even|odd] [-r north|south|east|west|left|right|down] [-k]

FLAGS
  -D, --dry-run              Pretend to work!
  -c, --compress             Reduce file size
                             See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                             You also may want to try: https://www.ilovepdf.com/compress_pdf
  -d, --data=<value>         Data file (lines of page ranges)
                             See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
  -f, --first-page=<value>   First page (defaults to last-page)
  -i, --input=<value>        (required) Relative or absolute path to the PDF file to be used.
                             Use / in the path. On Windows, \ can be changed to either / or \\.
                             Surround the path by " or ' if it contains spaces.
  -k, --keep                 Keep output's name
  -l, --last-page=<value>    Last page (defaults to first-page)
  -o, --output=<value>       (required) Relative or absolute path to the PDF file to be created.
                             Use / in the path. On Windows, \ can be changed to either / or \\.
                             Surround the path by " or ' if it contains spaces.
  -p, --page-ranges=<value>  Comma/Space-seperated list of page ranges (eg. "1-3, 5east, 4, 7-10even, 22-11odd")
                             See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                             See also: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
  -q, --qualifier=<option>   See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                             <options: even|odd>
  -r, --rotation=<option>    See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
                             <options: north|south|east|west|left|right|down>
  -s, --silent               Work silently unless there is an error!

DESCRIPTION
  Extract pages from PDF file

ALIASES
  $ pdftools ext
  $ pdftools ex
  $ pdftools e

EXAMPLES
  Extract page number 5 from input.pdf to output.pdf

    $ pdftools extract --input input.pdf --output output.pdf -f 5

  Extract page number 5 from input.pdf to output.pdf

    $ pdftools extract -i input.pdf -o output.pdf -l 5

  Extract pages from 1 to 3 from input.pdf to output.pdf

    $ pdftools extract -i input.pdf -o output.pdf -f 1 -l 3

  Extract *even* pages from 9 to 4, compress it and rotate it to the left

    $ pdftools extract -i input.pdf -o output.pdf -f 9 -l 4 -c -r left -q even

  Extract pages from 1 to 3, with the 5th page rotated to the east, and *odd* pages from 7 to 4

    $ pdftools extract -i input.pdf -o output.pdf -p "1-3, 5east, 7-4odd"

  Extract pages as declared in file.txt

    $ pdftools extract -i input.pdf -o output.pdf --data file.txt
```

_See code: [src/commands/extract/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/extract/index.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.5/src/commands/help.ts)_

## `pdftools merge INPUT`

Merge PDFs

```
USAGE
  $ pdftools merge INPUT [-D] [-s] [-c] [-o <value>] [-k]

ARGUMENTS
  INPUT  Input files (e.g. cover.pdf part-*.pdf)

FLAGS
  -D, --dry-run         Pretend to work!
  -c, --compress        Reduce file size
                        See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                        You also may want to try: https://www.ilovepdf.com/compress_pdf
  -k, --keep            Keep output's name
  -o, --output=<value>  [default: merged.pdf] Output file
  -s, --silent          Work silently unless there is an error!

DESCRIPTION
  Merge PDFs

ALIASES
  $ pdftools m
  $ pdftools join
  $ pdftools j

EXAMPLES
  Merge all .pdf files

    $ pdftools merge *.pdf

  Merge all .pdf files

    $ pdftools merge *.pdf -o output.pdf

  Merge all .pdf files that start with input- & compress the output

    $ pdftools merge input-*.pdf -o output.pdf -c

  Merge cover.pdf with all .pdf files that start with input-, and notes.pdf

    $ pdftools merge cover.pdf input-*.pdf notes.pdf -o output.pdf
```

_See code: [src/commands/merge/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/merge/index.ts)_

## `pdftools merge2 INPUT`

Merge PDFs [mutool]

```
USAGE
  $ pdftools merge2 INPUT [-D] [-s] [-c | -d] [-o <value>] [-F | ] [-I | ] [-l] [-g] [-C] [-G] [-k]

ARGUMENTS
  INPUT  PDF files followed by comma-seperated page numbers or ranges
         (e.g. cover.pdf part-*.pdf file.pdf 2,11,4-6,10-8,13-N otherfile.pdf)

FLAGS
  -C, --garbage-compact      ... and compact cross reference table (ALIASES: --gc, --compact)
  -D, --dry-run              Pretend to work!
  -F, --compress-fonts       Compress embedded fonts (ALIASES: --cf)
  -G, --garbage-deduplicate  ... and remove duplicate objects (ALIASES: --gd, --deduplicate)
  -I, --compress-images      Compress images (ALIASES: --ci)
  -c, --compress             Compress all streams
  -d, --decompress           Decompress all streams (except compress-fonts/images)
  -g, --garbage              Garbage collect unused objects
  -k, --keep                 Keep output's name
  -l, --linearize            Optimize for web browsers (ALIASES: -O, --optimize)
  -o, --output=<value>       [default: merged.pdf] Output file
  -s, --silent               Work silently unless there is an error!

DESCRIPTION
  Merge PDFs [mutool]

  Note: Compression & garbage collection flags do NOT seem to work!

ALIASES
  $ pdftools m2
  $ pdftools join2
  $ pdftools j2

EXAMPLES
  Merge all .pdf files

    $ pdftools merge2 *.pdf

  Merge all .pdf files

    $ pdftools merge2 *.pdf -o output.pdf

  Merge all .pdf files that start with input- & compress the output

    $ pdftools merge2 input-*.pdf -o output.pdf -c

  Merge cover.pdf with all .pdf files that start with input-, and notes.pdf

    $ pdftools merge2 cover.pdf input-*.pdf notes.pdf -o output.pdf

  Merge all .pdf files and optimize the output for web browsers

    $ pdftools merge2 input-*.pdf -o output -l
```

_See code: [src/commands/merge2/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/merge2/index.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.2/src/commands/plugins/index.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.2/src/commands/plugins/inspect.ts)_

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
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.2/src/commands/plugins/install.ts)_

## `pdftools plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ pdftools plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help      Show CLI help.
  -v, --verbose
  --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ pdftools plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.2/src/commands/plugins/link.ts)_

## `pdftools plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ pdftools plugins reset
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.2/src/commands/plugins/reset.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.2/src/commands/plugins/uninstall.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.2/src/commands/plugins/update.ts)_

## `pdftools process FILE`

Merge PDFs, extract pages and update metadata using simple file

```
USAGE
  $ pdftools process FILE [-D] [-s] [-c] [-k]

ARGUMENTS
  FILE  Data file to process (JSON5 or YAML or TOML)
        See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.json (or .yaml or .toml)
        Use / in the paths. On Windows, \ can be changed to either / or \\

FLAGS
  -D, --dry-run   Pretend to work!
  -c, --compress  Reduce file size
                  See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
                  You also may want to try: https://www.ilovepdf.com/compress_pdf
  -k, --keep      Keep output's name
  -s, --silent    Work silently unless there is an error!

DESCRIPTION
  Merge PDFs, extract pages and update metadata using simple file

ALIASES
  $ pdftools p

EXAMPLES
  $ pdftools process data.json
```

_See code: [src/commands/process/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/process/index.ts)_

## `pdftools repair INPUT`

Repair a PDF's corrupted XREF table and stream lengths, if possible

```
USAGE
  $ pdftools repair INPUT [-D] [-s] [-o <value>]

ARGUMENTS
  INPUT  Broken PDF

FLAGS
  -D, --dry-run         Pretend to work!
  -o, --output=<value>  Output file
  -s, --silent          Work silently unless there is an error!

DESCRIPTION
  Repair a PDF's corrupted XREF table and stream lengths, if possible

ALIASES
  $ pdftools r

EXAMPLES
  $ pdftools repair broken.pdf

  $ pdftools repair broken.pdf -o fixed.pdf
```

_See code: [src/commands/repair/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/repair/index.ts)_

## `pdftools split INPUT`

Split each page into many tiles [mutool]

```
USAGE
  $ pdftools split INPUT [-D] [-s] [-o <value>] [-x <value>] [-y <value>] [-r]

ARGUMENTS
  INPUT  Input PDF file

FLAGS
  -D, --dry-run         Pretend to work!
  -o, --output=<value>  Output file
  -r, --r               Split horizontally from right to left (default splits from left to right). (v1.23.0+)
  -s, --silent          Work silently unless there is an error!
  -x, --x=<value>       [default: 2] Pieces to horizontally divide each page into. (Uses default only if --y is NOT
                        used)
  -y, --y=<value>       Pieces to vertically divide each page into.

DESCRIPTION
  Split each page into many tiles [mutool]

ALIASES
  $ pdftools s

EXAMPLES
  $ pdftools split input.pdf

  $ pdftools split input.pdf -x 2

  $ pdftools split input.pdf -o splitted.pdf -y 2

  $ pdftools split input.pdf -x 2 -y 3 -r
```

_See code: [src/commands/split/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/split/index.ts)_

## `pdftools update-metadata INPUT`

Update PDF's metadata

```
USAGE
  $ pdftools update-metadata INPUT [-D] [-s] [-f <value>] [-t <value>] [-a <value>] [-S <value>] [-k <value>] [-p
    <value>] [-c <value>] [-d <value>] [-m <value>] [-o <value>]

ARGUMENTS
  INPUT  Input PDF to update

FLAGS
  -D, --dry-run                    Pretend to work!
  -S, --subject=<value>
  -a, --author=<value>
  -c, --creator=<value>
  -d, --creation-date=<value>
  -f, --file=<value>               Metadata file (JSON5 or YAML or TOML)
                                   See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/meta-only.json (or
                                   .yaml or .toml)
  -k, --keywords=<value>...
  -m, --modification-date=<value>
  -o, --output=<value>             Output file
  -p, --producer=<value>
  -s, --silent                     Work silently unless there is an error!
  -t, --title=<value>

DESCRIPTION
  Update PDF's metadata

ALIASES
  $ pdftools up-meta
  $ pdftools meta

EXAMPLES
  $ pdftools update-metadata input.pdf -f meta.json

  $ pdftools update-metadata input.pdf -f meta.toml -o updated.pdf

  $ pdftools update-metadata input.pdf -o updated.pdf -f meta.yaml -a "Bader Nasser" -t awesome
```

_See code: [src/commands/update-metadata/index.ts](https://github.com/bader-nasser/pdftools/blob/v4.0.0/src/commands/update-metadata/index.ts)_

<!-- commandsstop -->

## Spread the word

If you find the app useful, let others know about it :)
