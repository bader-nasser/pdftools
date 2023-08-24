import {normalize} from 'node:path';
import {expect, test} from '@oclif/test';

const fileWithShareAndCompress = 'test/docs/data.json';
const fileWithoutShare = 'test/docs/data-no-share.json';
const fileWithManyInputFiles = 'test/docs/data-big-data.json';

describe('process', () => {
	test
		.stdout()
		.command(['process', fileWithShareAndCompress])
		.it('runs process cmd will produce extra share file', (ctx) => {
			expect(ctx.stdout).to.contain(
				`Output files: ${normalize(
					'test/pdfs/output-compress.pdf',
				)}, ${normalize('test/pdfs/output-share-compress.pdf')}`,
			);
		});

	test
		.stdout()
		.command(['process', fileWithoutShare])
		.it('runs process cmd will NOT produce extra share file', (ctx) => {
			expect(ctx.stdout).to.contain(
				`Output files: ${normalize('test/docs/aaa/output.pdf')}`,
			);
		});

	test
		.stdout()
		.command(['process', fileWithManyInputFiles])
		.it(
			'runs process cmd will handle big data and give extra share file',
			(ctx) => {
				expect(ctx.stdout).to.contain(
					`Output files: ${normalize(
						'test/pdfs/output-big-compress.pdf',
					)}, ${normalize('test/pdfs/output-big-share-compress.pdf')}`,
				);
			},
		);
});
