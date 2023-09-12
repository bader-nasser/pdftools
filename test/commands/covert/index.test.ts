import {expect, test} from '@oclif/test';

const input1 = 'test/pdfs/input-1.pdf';
const output = 'test/pdfs/output.txt';

describe('convert', () => {
	test
		.stdout()
		.command(['convert', input1])
		.it('runs convert cmd', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/input-1-text.txt...');
		});

	test
		.stdout()
		.command(['convert', input1, '-o', output])
		.it('runs convert cmd w/ --output', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/output.txt...');
		});
});
