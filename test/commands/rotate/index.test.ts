import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-3.pdf';
const output = 'test/pdfs/output-rotated.pdf';

describe('rotate', () => {
	test
		.stdout()
		.command(['rotate', input])
		.it('runs rotate cmd', (ctx) => {
			expect(ctx.stdout).to.contain('Creating rotated.pdf...');
		});

	test
		.stdout()
		.command(['rotate', input, '-o', output])
		.it('runs rotate cmd w/ -o', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/output-rotated.pdf...');
		});

	test
		.stdout()
		.command(['rotate', input, '-o', output, '-p', '1'])
		.it('runs rotate cmd w/ -o & -p 1', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/output-rotated.pdf...');
		});

	test
		.stdout()
		.command([
			'rotate',
			input,
			'-o',
			output,
			'-p',
			'1east',
			'2west',
			'end-10oddright',
			'-d',
			'-',
		])
		.it(
			'runs rotate cmd w/ -o & -p 1east 2west end-10oddright & -d -',
			(ctx) => {
				expect(ctx.stdout).to.contain(
					'Creating test/pdfs/output-rotated.pdf...',
				);
			},
		);

	test
		.stdout()
		.command(['rotate', input, '-o', output, '-c'])
		.it('runs rotate cmd w/ -o & -c', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-rotated-compressed.pdf...',
			);
		});
});
