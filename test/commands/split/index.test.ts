import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-3.pdf';
const output = 'test/pdfs/output-splitted.pdf';

describe('split', () => {
	test
		.stdout()
		.command(['split', input])
		.it('runs split cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-3-splitted.pdf...',
			);
		});

	test
		.stdout()
		.command(['split', input, '-o', output])
		.it('runs split cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-splitted.pdf...',
			);
		});
});
