import {open} from 'node:fs/promises';
import fs from 'fs-extra';
import {PDFDocument} from 'pdf-lib';
import {type Metadata} from './commands/process/index.js';

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

export function pad(number: string): string {
	/* eslint-disable-next-line unicorn/prefer-number-properties */ // @ts-expect-error silence the error!
	if (isNaN(number)) {
		return `${number}`;
	}

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
					parsedData.shared = [...parsedData.all];
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

export async function updateMetadata({
	filePath,
	meta: {
		title,
		author,
		subject,
		keywords,
		producer,
		creator = 'pdftools (https://npmjs.com/package/@bader-nasser/pdftools)',
		creationDate,
		modificationDate,
	},
	dryRun,
}: {
	filePath: string;
	meta: Metadata;
	dryRun: boolean;
}) {
	if (dryRun) {
		return;
	}

	const existingPdfBytes = await fs.readFile(filePath);
	// Load a PDFDocument without updating its existing metadata
	const pdfDoc = await PDFDocument.load(existingPdfBytes, {
		updateMetadata: false,
	});

	if (title) {
		pdfDoc.setTitle(title);
	}

	if (author) {
		pdfDoc.setAuthor(author);
	}

	if (subject) {
		pdfDoc.setSubject(subject);
	}

	if (keywords) {
		pdfDoc.setKeywords(keywords);
	}

	if (producer) {
		pdfDoc.setProducer(producer);
	}

	if (creator) {
		pdfDoc.setCreator(creator);
	}

	if (creationDate) {
		pdfDoc.setCreationDate(new Date(creationDate));
	}

	if (modificationDate) {
		pdfDoc.setModificationDate(new Date(modificationDate));
	}

	// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save();
	await fs.writeFile(filePath, pdfBytes);
}
