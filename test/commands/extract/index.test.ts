import {expect, test} from '@oclif/test';

const input = 'test/pdfs/input-1.pdf';
const output = 'test/pdfs/output.pdf';
const outputKeep = 'test/pdfs/output-extract-keep.pdf';
const outputDoesNotExist = 'test/pdfz/output.pdf';
const data = 'test/docs/data.txt';

describe('extract', () => {
	test
		.stdout()
		.command(['extract', '-i', input, '-o', output])
		.it('runs extract cmd without any required flags', (ctx) => {
			expect(ctx.stdout).to.contain(
				'This command is useless without using one of the following flags:',
			);
		});

	test
		.stdout()
		.command(['extract', '-i', input, '-o', output, '-f=1'])
		.it('runs extract cmd with flag: -f=1', (ctx) => {
			expect(ctx.stdout).to.contain('Creating test/pdfs/output-0001.pdf...');
		});

	test
		.stdout()
		.command(['extract', '-i', input, '-o', output, '-f=1', '-l=3'])
		.it('runs extract cmd with flags: -f=1 -l=3', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-0001-0003.pdf...',
			);
		});

	test
		.stdout()
		.command([
			'extract',
			'-i',
			input,
			'-o',
			output,
			'-f=1',
			'-l=7',
			'-q=even',
			'-r=north',
			'-c',
		])
		.it(
			'runs extract cmd with flags: -f=1 -l=7 and other flags in output',
			(ctx) => {
				expect(ctx.stdout).to.contain(
					'Creating test/pdfs/output-0001-0007-even-north-compressed.pdf...',
				);
			},
		);

	test
		.stdout()
		.command(['extract', '-i', input, '-o', output, '-p', '1 5-7,2-4even'])
		.it('runs extract cmd with flag: -p="1 5-7,2-4even"', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Creating test/pdfs/output-1_5-7_2-4even.pdf using pages: "1 5-7,2-4even"...',
			);
		});

	test
		.stdout()
		.command([
			'extract',
			'-i',
			input,
			'-o',
			output,
			'-p',
			'1 5-7,2-4even',
			'-s',
		])
		.it(
			'runs extract cmd with --pageRanges and respects --silent flag',
			(ctx) => {
				expect(ctx.stdout).to.contain('');
			},
		);

	test
		.stdout()
		.command(['extract', '-i', input, '-o', output, '-d', data])
		.it(`runs extract cmd with flag: -d=${data}`, (ctx) => {
			expect(ctx.stdout).to.contain(
				`Creating test/pdfs/output-data.pdf using data file: ${data}...`,
			);
		});

	test
		.stdout()
		.command(['extract', '-i', input, '-o', outputDoesNotExist, '-d', data])
		.it(
			`runs extract cmd with flag: -d=${data} and creates a new directory`,
			(ctx) => {
				expect(ctx.stdout).to.contain(
					`Creating test/pdfz/output-data.pdf using data file: ${data}...`,
				);
			},
		);

	test
		.stdout()
		.command(['extract', '-i', input, '-o', output, '-f', 'end', '-l', 'r5'])
		.it(`runs extract cmd with flags: -f=end -l=r5`, (ctx) => {
			expect(ctx.stdout).to.contain(`Creating test/pdfs/output-end-r5.pdf...`);
		});

	test
		.stdout()
		.command([
			'extract',
			'-i',
			input,
			'-o',
			outputKeep,
			'-f',
			'end',
			'-l',
			'r5',
			'-k',
		])
		.it(`runs extract cmd with flags: -f=end -l=r5 -k`, (ctx) => {
			expect(ctx.stdout).to.contain(
				`Creating test/pdfs/output-extract-keep.pdf...`,
			);
		});
});
