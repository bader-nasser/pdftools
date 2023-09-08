import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-*.pdf';
const output = 'test/pdfs/output-merged.pdf';

describe('merge', () => {
	test
		.stdout()
		.command(['merge', input, '-o', output])
		.it('runs merge cmd', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/output-merged.pdf...');
		});

	test
		.stdout()
		.command(['merge', input, '-o', output, '-c'])
		.it('runs merge cmd & compress the output', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-merged-compressed.pdf...',
			);
		});
});
