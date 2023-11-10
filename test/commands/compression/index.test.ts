import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-1.pdf';
const outputCompressed = 'test/pdfs/output-1-compressed.pdf';
const outputUncompressed = 'test/pdfs/output-1-decompressed.pdf';

describe('compression', () => {
	test
		.stdout()
		.command(['compress', input])
		.it('runs compress cmd without --output flag', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-1-compressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['compress', input, '-o', outputCompressed])
		.it('runs compress cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-1-compressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['decompress', input])
		.it('runs decompress cmd without -o flag', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-1-decompressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['decompress', input, '-o', outputUncompressed])
		.it('runs decompress cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-1-decompressed.pdf...',
			);
		});
});
