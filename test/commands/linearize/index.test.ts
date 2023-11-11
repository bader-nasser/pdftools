import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-4.pdf';
const output = 'test/pdfs/output-linearized.pdf';

describe('linearize', () => {
	test
		.stdout()
		.command(['linearize', input])
		.it('runs linearize cmd', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-4-linearized.pdf...',
			);
		});

	test
		.stdout()
		.command(['linearize', input, '-o', output])
		.it('runs linearize cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-linearized.pdf...',
			);
		});

	test
		.stdout()
		.command(['linearize', input, '-o', output, '-c'])
		.it('runs linearize cmd w/ -o & -c', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-linearized-compressed.pdf...',
			);
		});
});
