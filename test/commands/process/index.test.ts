import { expect, test } from '@oclif/test';
import { normalize } from 'node:path';

const fileWithShareAndCompress = 'test/docs/data.json';
const fileWithoutShare = 'test/docs/data-no-share.json';

describe('process', () => {
  test
    .stdout()
    .command(['process', fileWithShareAndCompress])
    .it('runs process cmd will produce extra share file', (ctx) => {
      expect(ctx.stdout).to.contain(
        `Output files: ${normalize(
          'test/pdfs/output-compress.pdf',
        )}, ${normalize('test/pdfs/output-share-compress.pdf')}`,
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
});
