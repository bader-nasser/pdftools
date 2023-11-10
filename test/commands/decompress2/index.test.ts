import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-2.pdf';
const outputDecompressed = 'test/pdfs/output-2-decompressed.pdf';

describe('decompress2', () => {
	test
		.stdout()
		.command(['decompress2', input])
		.it('runs decompress2 cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-2-decompressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['decompress2', input, '-o', outputDecompressed])
		.it('runs decompress2 cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-2-decompressed.pdf...',
			);
		});
});
