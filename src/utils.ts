import {open} from 'node:fs/promises';

export function isUndefinedOrEmptyString(value: string | undefined): boolean {
	return value === undefined || value.trim() === '';
}

export function removeExtension(string_: string, extension = 'pdf'): string {
	const re = new RegExp(`.${extension}$`);
	return string_.replace(re, '');
}

export function addExtension(string_: string, extension = 'pdf'): string {
	return `${string_}.${extension}`;
}

export function pad(number: string | number): string {
	return `${number}`.padStart(4, '0');
}

type ParsedData = {
	all: string[];
	shared: string[];
	error: unknown;
};

export async function parseDataFile(dataFile: string): Promise<ParsedData> {
	const parsedData: ParsedData = {shared: [], all: [], error: ''};
	try {
		const file = await open(dataFile);
		for await (const line of file.readLines({encoding: 'utf8'})) {
			if (line) {
				if (line.startsWith('#') && line.includes('share')) {
					parsedData.shared.push(...parsedData.all);
				} else if (!line.startsWith('#')) {
					const pageRange = line.trim().replaceAll(/[\s-]+/g, '-');
					parsedData.all.push(pageRange);
				}
			}
		}
	} catch (error) {
		// @ts-expect-error silent ts
		parsedData.error = error.message ?? error;
	}

	return parsedData;
}
