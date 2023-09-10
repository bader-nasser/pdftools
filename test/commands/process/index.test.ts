import {normalize} from 'node:path';
import {expect, test} from '@oclif/test';

const fileWithShareAndCompress = 'test/docs/data.json';
const fileWithoutShare = 'test/docs/data-no-share.json';
const fileWithManyInputFiles = 'test/docs/data-big-data.json';
const fileWithShareAndInYaml = 'test/docs/data.yaml';
const fileWithShareCompressAndInToml = 'test/docs/data.toml';
const fileWithYamlKeep = 'test/docs/keep.yaml';

describe('process', () => {
	test
		.stdout()
		.command(['process', fileWithShareAndCompress])
		.it('runs process cmd will produce extra share file', (ctx) => {
			expect(ctx.stdout).to.contain(
				`Output files: ${normalize(
					'test/pdfs/output-compressed.pdf',
				)}, ${normalize('test/pdfs/output-share-compressed.pdf')}`,
			);
		});

	test
		.stdout()
		.command(['process', fileWithoutShare])
		.it('runs process cmd will NOT produce extra share file', (ctx) => {
			expect(ctx.stdout).to.contain(
				`Output files: ${normalize('test/docs/aaa/output.pdf')}`,
			);
		});

	test
		.stdout()
		.command(['process', fileWithManyInputFiles])
		.it(
			'runs process cmd will handle big data and give extra share file',
			(ctx) => {
				expect(ctx.stdout).to.contain(
					`Output files: ${normalize(
						'test/pdfs/output-big-compressed.pdf',
					)}, ${normalize('test/pdfs/output-big-share-compressed.pdf')}`,
				);
			},
		);

	test
		.stdout()
		.command(['process', fileWithShareAndInYaml])
		.it('runs process cmd will handle YAML and share', (ctx) => {
			expect(ctx.stdout).to.contain(
				`Output files: ${normalize('test/pdfs/output-yaml.pdf')}, ${normalize(
					'test/pdfs/output-yaml-share.pdf',
				)}`,
			);
		});

	test
		.stdout()
		.command(['process', fileWithShareCompressAndInToml])
		.it('runs process cmd will handle TOML, compress and share', (ctx) => {
			expect(ctx.stdout).to.contain(
				`Output files: ${normalize(
					'test/pdfs/output-toml-compressed.pdf',
				)}, ${normalize('test/pdfs/output-toml-share-compressed.pdf')}`,
			);
		});

	test
		.stdout()
		.command(['process', fileWithYamlKeep, '-k'])
		.it(
			'runs process cmd will handle TOML, compress, share and keep',
			(ctx) => {
				expect(ctx.stdout).to.contain(
					`Output files: ${normalize(
						'test/pdfs/output-yaml-keep.pdf',
					)}, ${normalize('test/pdfs/output-yaml-keep-share.pdf')}`,
				);
			},
		);
});
