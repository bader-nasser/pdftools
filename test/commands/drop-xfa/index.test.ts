import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-1.pdf';
const outputWithoutXfa = 'test/pdfs/output-1-without-xfa.pdf';

describe('drop-xfa', () => {
	test
		.stdout()
		.command(['drop-xfa', input])
		.it('runs drop-xfa cmd', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/input-1-no-xfa.pdf...');
		});

	test
		.stdout()
		.command(['drop-xfa', input, '-o', outputWithoutXfa])
		.it('runs drop-xfa cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-1-without-xfa.pdf...',
			);
		});
});
