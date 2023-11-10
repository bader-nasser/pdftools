import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-*.pdf';
const input1 = 'test/pdfs/input-1.pdf';
const output = 'test/pdfs/output-merged.pdf';
const output2 = 'test/pdfs/output-merged-with-1.pdf';

describe('merge2', () => {
	test
		.stdout()
		.command(['merge2', input])
		.it('runs merge2 cmd', (ctx) => {
			expect(ctx.stdout).to.contain('Creating merged.pdf...');
		});

	test
		.stdout()
		.command(['merge2', input, '-o', output])
		.it('runs merge2 cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/output-merged.pdf...');
		});

	test
		.stdout()
		.command(['merge2', input, '-o', output, '-c'])
		.it('runs merge2 cmd & compress the output', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-merged-compressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['merge2', input, '-o', output, '-c', '-l'])
		.it('runs merge2 cmd & compress the output w/ web optimization', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-merged-linearized-compressed.pdf...',
			);
		});

	test
		.stdout()
		.command(['merge2', output, input1, '-o', output2])
		.it('runs merge2 cmd with inputs: output-merged & input-1', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-merged-with-1.pdf...',
			);
		});
});
