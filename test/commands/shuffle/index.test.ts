import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-*.pdf';
const output = 'test/pdfs/output-shuffled.pdf';

describe('shuffle', () => {
	test
		.stdout()
		.command(['shuffle', input])
		.it('runs shuffle cmd', (ctx) => {
			expect(ctx.stdout).to.contain('Creating shuffled.pdf...');
		});

	test
		.stdout()
		.command(['shuffle', input, '-o', output])
		.it('runs shuffle cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-shuffled.pdf...',
			);
		});

	test
		.stdout()
		.command(['shuffle', input, '-o', output, '-c'])
		.it('runs shuffle cmd w/ -o & -c', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-shuffled-compressed.pdf...',
			);
		});
});
