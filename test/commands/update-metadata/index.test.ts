import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-4.pdf';
const meta = 'test/docs/meta-only.toml';
const output = 'test/pdfs/output-updated.pdf';
const output2 = 'test/pdfs/output-meta-updated.pdf';

describe('update-metadata', () => {
	test
		.stdout()
		.command(['update-metadata', input, '-o', output])
		.it('runs update-metadata cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Updating metadata for test/pdfs/output-updated.pdf...',
			);
		});

	test
		.stdout()
		.command(['update-metadata', input, '-o', output2, '-f', meta])
		.it('runs update-metadata cmd w/ -o & -f', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Updating metadata for test/pdfs/output-meta-updated.pdf...',
			);
		});
});
