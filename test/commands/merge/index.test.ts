import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-*.pdf';
const input1 = 'test/pdfs/input-1.pdf';
const output = 'test/pdfs/output-merged.pdf';
const output2 = 'test/pdfs/output-merged-with-1.pdf';

describe('merge', () => {
	test
		.stdout()
		.command(['merge', '-i', input, '-o', output])
		.it('runs merge cmd', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/output-merged.pdf...');
		});

	test
		.stdout()
		.command(['merge', '-i', input, '-o', output, '-c'])
		.it('runs merge cmd & compress the output', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-merged-compressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['merge', '-i', output, input1, '-o', output2])
		.it('runs merge cmd with inputs: output-merged & input-1', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-merged-with-1.pdf...',
			);
		});
});
