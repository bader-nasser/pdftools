import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-1.pdf';
const outputCompressed = 'test/pdfs/output-1-compressed.pdf';

describe('compress', () => {
	test
		.stdout()
		.command(['compress', input])
		.it('runs compress cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-1-compressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['compress', input, '-o', outputCompressed])
		.it('runs compress cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-1-compressed.pdf...',
			);
		});
});
