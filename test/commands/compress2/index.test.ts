import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-2.pdf';
const outputCompressed = 'test/pdfs/output-2-compressed.pdf';

describe('compress2', () => {
	test
		.stdout()
		.command(['compress2', input])
		.it('runs compress2 cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-2-compressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['compress2', input, '-o', outputCompressed])
		.it('runs compress2 cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-2-compressed.pdf...',
			);
		});
});
