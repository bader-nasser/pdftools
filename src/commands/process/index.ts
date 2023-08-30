import path from 'node:path';
import process from 'node:process';
import fs from 'fs-extra';
import {Command, Args, Flags} from '@oclif/core';
import JSON5 from 'json5';
import {type ExecaError, execa} from 'execa';
// Removing the extension will crash the built cli
import {addExtension, parseDataFile, removeExtension} from '../../utils.js';

function parsePageRanges(pageRanges: string): string[] {
	const splittedRanges = pageRanges.split(/,+/);
	return splittedRanges.map((range) => range.trim().replaceAll(/[\s-]+/g, '-'));
}

export default class Process extends Command {
	static aliases = ['p'];

	static description =
		'Merge PDF files using JSON file. Can be used to merge some pages from each file.';

	static examples = ['<%= config.bin %> <%= command.id %> data.json'];

	static args = {
		file: Args.string({
			description: `JSON file to process
See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.json
Set "$schema" to "https://github.com/bader-nasser/pdftools/raw/main/data.schema.json"
Use / in the paths. On Windows, \\ can be changed to either / or \\\\`,
			required: true,
		}),
	};

	static flags = {
		compress: Flags.boolean({
			char: 'c',
			description: `Reduce file size
See: https://www.pdflabs.com/docs/pdftk-man-page/#dest-compress
You also may want to try: https://www.ilovepdf.com/compress_pdf`,
		}),
		dryRun: Flags.boolean({
			char: 'D',
			description: 'Pretend to process something!',
		}),
		silent: Flags.boolean({
			char: 's',
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Process);
		const {compress, dryRun, silent} = flags;
		const {file} = args;

		let isCompressing = compress;
		let isDryRunning = dryRun;
		let isSilencing = silent;

		try {
			const filePath = path.join(process.cwd(), file);
			const fileDirname = path.dirname(filePath);
			// credit:
			// https://github.com/vercel/next.js/blob/962ce0dcee7993cedeb949c7f31ef34afc829578/packages/next/src/lib/find-config.ts#L53-L56
			const fileContents = await fs.readFile(filePath, 'utf8');
			const fileObject = JSON5.parse<JsonFileObject>(fileContents);
			const {
				output,
				files,
				compress: compressJson = false,
				dryRun: dryRunJson = false,
				silent: silentJson = false,
			} = fileObject;
			isCompressing = compress || compressJson;
			isDryRunning = dryRun || dryRunJson;
			isSilencing = silent || silentJson;
			let relativeOutput = path.relative(
				process.cwd(),
				path.resolve(fileDirname, output),
			);

			const processedData: ProcessedDataType = {data: [], useShare: false};
			let outerIndex = 0;
			let innerIndex = 0;
			for (const file of files) {
				const fileHandle = `${String.fromCodePoint(
					65 + outerIndex,
				)}${String.fromCodePoint(65 + innerIndex)}`;
				innerIndex += 1;
				if (innerIndex > 25) {
					innerIndex = 0;
					outerIndex += 1;
				}

				let fileName = file as string;
				const pageRanges: PageRanges = {all: [], shared: []};
				if (typeof file === 'object') {
					const {name, pages, data} = file;
					if (pages && data) {
						console.log(file);
						this.log(
							'File object can NOT contain pages & data at the same time!',
						);
						this.exit(1);
					}

					if (pages ?? data) {
						fileName = name;
						if (pages) {
							if (Array.isArray(pages)) {
								for (const page of pages) {
									const parsedPage = parsePageRanges(`${page}`);
									pageRanges.all.push(...parsedPage);
								}
							} else {
								// number or string
								const parsedPage = parsePageRanges(`${pages}`);
								pageRanges.all.push(...parsedPage);
							}
						} else {
							const dataPath = path.resolve(fileDirname, `${data}`);
							const parsedData = await parseDataFile(dataPath);
							if (parsedData.error) {
								throw new Error(`Error while parsing data file: ${dataPath}`);
							}

							if (parsedData.all) {
								pageRanges.all.push(...parsedData.all);
							}

							if (parsedData.shared) {
								processedData.useShare = true;
								pageRanges.shared.push(...parsedData.shared);
							}
						}
					} else {
						throw new Error(
							'File object should have either pages or data attriute!',
						);
					}
				}

				fileName = path.relative(
					process.cwd(),
					path.resolve(fileDirname, fileName),
				);
				const fileData: FileData = {fileHandle, fileName, pageRanges};
				// console.log(fileData)
				processedData.data.push(fileData);
			}

			const {useShare, data} = processedData;
			const handles = data.map(
				({fileHandle, fileName}) => `${fileHandle}=${fileName}`,
			);
			const allRanges = data
				.map(
					({fileHandle, pageRanges}) =>
						`${fileHandle}${pageRanges.all.join(' ' + fileHandle)}`,
				)
				.join(' ')
				.split(' ');

			relativeOutput = removeExtension(relativeOutput);
			let relativeShareOutput = `${relativeOutput}-share`;

			if (isCompressing) {
				relativeOutput = `${relativeOutput}-compress`;
				relativeShareOutput = `${relativeShareOutput}-compress`;
			}

			relativeOutput = addExtension(relativeOutput);
			relativeShareOutput = addExtension(relativeShareOutput);

			const outputDirname = path.dirname(relativeOutput);
			await fs.ensureDir(outputDirname);

			if (useShare) {
				this.logger(
					`Output files: ${relativeOutput}, ${relativeShareOutput}`,
					isSilencing,
				);
			} else {
				this.logger(`Output files: ${relativeOutput}`, isSilencing);
			}

			this.logger(
				`Creating ${relativeOutput} using file: ${file}...`,
				isSilencing,
			);
			const args = [...handles, 'cat', ...allRanges, 'output', relativeOutput];
			if (compress) {
				args.push('compress');
			}

			await this.execute('pdftk', args, isDryRunning);

			if (useShare) {
				const outputShareStrings: string[] = [];
				for (const {fileHandle, pageRanges} of data) {
					let catString = `${fileHandle}`;
					const ranges = [];
					if (pageRanges.shared && pageRanges.shared.length > 0) {
						ranges.push(...pageRanges.shared);
					} else {
						ranges.push(...pageRanges.all);
					}

					catString = `${catString}${ranges.join(' ' + fileHandle)}`;
					outputShareStrings.push(catString);
				}

				// console.log('Shared:')
				const allShareRanges = outputShareStrings.join(' ').split(' ');

				this.logger(
					`Creating ${relativeShareOutput} using file: ${file}...`,
					isSilencing,
				);
				const args = [
					...handles,
					'cat',
					...allShareRanges,
					'output',
					relativeShareOutput,
				];
				if (compress) {
					args.push('compress');
				}

				await this.execute('pdftk', args, isDryRunning);
			}
		} catch (error) {
			console.error(error);
		}

		this.logger('Done.', isSilencing);
	}

	private async execute(
		command: string,
		args: readonly string[] | undefined,
		dryRun: boolean,
	) {
		if (!dryRun) {
			try {
				const extension = process.platform === 'win32' ? '' : '';
				await execa(`${command}${extension}`, args);
			} catch (error) {
				const error_ = error as ExecaError;
				console.error(error_.stderr);
				this.exit(1);
			}
		}
	}

	private logger(message: string, silent: boolean): void {
		if (!silent) {
			this.log(message);
		}
	}
}

type PageRanges = {
	all: string[];
	shared: string[];
};

type FileData = {
	fileHandle: string;
	fileName: string;
	pageRanges: PageRanges;
};

type ProcessedDataType = {
	data: FileData[];
	useShare: boolean;
};

type NumberOrString = number | string;

type InputFileObject = {
	/**
	 * Name of input file.
	 */
	name: string;
	/**
	 * Page ranges.
	 * See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
	 */
	pages?: NumberOrString | NumberOrString[];
	/**
	 * A text file that contains page ranges.
	 * See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
	 */
	data?: string;
};

export type JsonFileObject = {
	$schema?: string;
	output: string;
	/**
	 * An array of file entries that forms the output.
	 * The entry can be a simple string of file name or an object which specifies
	 * the file name with selected pages OR applied data file.
	 */
	files: Array<string | InputFileObject>;
	/**
	 * Reduce file size
	 */
	compress?: true;
	/**
	 * Pretend to work!
	 */
	dryRun?: true;
	/**
	 * Work silently.
	 */
	silent?: true;
};
