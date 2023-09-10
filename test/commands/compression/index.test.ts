import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-1.pdf';
const outputCompressed = 'test/pdfs/output-1-compressed.pdf';
const outputUncompressed = 'test/pdfs/output-1-uncompressed.pdf';

describe('compression', () => {
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
		.command(['uncompress', input, '-o', outputUncompressed])
		.it('runs uncompress cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-1-uncompressed.pdf...',
			);
		});
});
