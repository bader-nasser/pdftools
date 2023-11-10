import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-1.pdf';
const outputDecompressed = 'test/pdfs/output-1-decompressed.pdf';

describe('decompress', () => {
	test
		.stdout()
		.command(['decompress', input])
		.it('runs decompress cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-1-decompressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['decompress', input, '-o', outputDecompressed])
		.it('runs decompress cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-1-decompressed.pdf...',
			);
		});
});
