import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-1.pdf';
const output = 'test/pdfs/output-fixed.pdf';

describe('repair', () => {
	test
		.stdout()
		.command(['repair', input])
		.it('runs repair cmd without -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/input-1-repaired.pdf...',
			);
		});

	test
		.stdout()
		.command(['repair', input, '-o', output])
		.it('runs repair cmd', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/output-fixed.pdf...');
		});
});
