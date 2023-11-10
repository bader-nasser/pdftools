import path from 'node:path';
import process from 'node:process';
import fs from 'fs-extra';
import {Args, Flags} from '@oclif/core';
import JSON5 from 'json5';
import YAML from 'yaml';
import TOML from '@ltd/j-toml';
// Removing the extension will make the built cli crash
import {
	addExtension,
	parseDataFile,
	removeExtension,
	updateMetadata,
} from '../../utils.js';
import {BaseCommandWithCompression} from '../../base-command-with-compression.js';

function parsePageRanges(pageRanges: string): string[] {
	const splittedRanges = pageRanges.split(/,+/);
	return splittedRanges.map((range) => range.trim().replaceAll(/[\s-]+/g, '-'));
}

export default class Process extends BaseCommandWithCompression {
	static aliases = ['p'];

	static description =
		'Merge PDFs, extract pages and update metadata using simple file';

	static examples = ['<%= config.bin %> <%= command.id %> data.json'];

	static args = {
		file: Args.string({
			description: `Data file to process (JSON5 or YAML or TOML)
See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.json (or .yaml or .toml)
Use / in the paths. On Windows, \\ can be changed to either / or \\\\`,
			required: true,
		}),
	};

	static flags = {
		keep: Flags.boolean({
			char: 'k',
			description: `Keep output's name`,
		}),
	};

	async run(): Promise<void> {
		const {args, flags} = await this.parse(Process);
		const {compress, 'dry-run': dryRun, silent, keep} = flags;
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
			let fileObject: JsonFileObject;
			if (filePath.endsWith('.json') || filePath.endsWith('.json5')) {
				fileObject = JSON5.parse<JsonFileObject>(fileContents);
			} else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
				fileObject = YAML.parse(fileContents) as JsonFileObject;
			} else if (filePath.endsWith('.toml')) {
				fileObject = TOML.parse(fileContents) as JsonFileObject;
			} else {
				this.log('Supported formats are: JSON, YAML and TOML.');
				this.log(
					'Allowed extensions are: .json, .json5, .yaml, .yml and .toml.',
				);
				this.exit(1);
			}

			const {
				output,
				files,
				compress: compressJson = false,
				dryRun: dryRunJson = false,
				silent: silentJson = false,
				...meta
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
					// @ts-expect-error Silence TS error!
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
						console.log(file);
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

			if (isCompressing && !keep) {
				relativeOutput = `${relativeOutput}-compressed`;
				relativeShareOutput = `${relativeShareOutput}-compressed`;
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
			await updateMetadata({
				filePath: relativeOutput,
				meta,
				dryRun: isDryRunning,
			});

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
				await updateMetadata({
					filePath: relativeShareOutput,
					meta,
					dryRun: isDryRunning,
				});
			}
		} catch (error) {
			console.error(error);
		}

		this.logger('Done.', isSilencing);
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

type InputFileObject =
	| {
			/**
			 * Name of input file.
			 */
			name: string;
			/**
			 * Page ranges.
			 * See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
			 */
			pages: NumberOrString | NumberOrString[];
	  }
	| {
			/**
			 * Name of input file.
			 */
			name: string;
			/**
			 * A text file that contains page ranges.
			 * See: https://github.com/bader-nasser/pdftools/blob/main/test/docs/data.txt
			 */
			data: string;
	  };

export type Metadata = {
	title?: string;
	author?: string;
	subject?: string;
	keywords?: string[];
	producer?: string;
	/**
	 * @default 'pdftools (https://github.com/bader-nasser/pdftools)'
	 */
	creator?: string;
	creationDate?: string;
	modificationDate?: string;
};

export type JsonFileObject = Metadata & {
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
	compress?: boolean;
	/**
	 * Pretend to work!
	 */
	dryRun?: boolean;
	/**
	 * Work silently.
	 */
	silent?: boolean;
};
