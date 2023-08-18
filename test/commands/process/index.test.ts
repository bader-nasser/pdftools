import { expect, test } from '@oclif/test';

const fileWithShareAndCompress = 'test/docs/data.json';
const fileWithoutShare = 'test/docs/data-no-share.json';

describe('process', () => {
  test
    .stdout()
    .command(['process', fileWithShareAndCompress])
    .it('runs process cmd will produce extra share file', (ctx) => {
      expect(ctx.stdout).to.contain(
        'Output files: test/pdfs/output-compress.pdf, test/pdfs/output-share-compress.pdf',
      );
    });

  test
    .stdout()
    .command(['process', fileWithoutShare])
    .it('runs process cmd will NOT produce extra share file', (ctx) => {
      expect(ctx.stdout).to.contain('Output files: test/docs/aaa/output.pdf');
    });
});
