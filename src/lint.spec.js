import { Base } from '@dword-design/base';
import { endent } from '@dword-design/functions';
import { test as base } from '@playwright/test';
import packageName from 'depcheck-package-name';
import fs from 'fs-extra';
import withLocalTmpDir from 'with-local-tmp-dir';

const test = base.extend({
  localTmpDir: [
    async ({}, use) => {
      const reset = await withLocalTmpDir();
      process.on('SIGINT', () => reset());

      try {
        await use();
      } finally {
        await reset();
      }
    },
    { auto: true },
  ],
});

test('fixture', async () => {
  await fs.outputFile(
    'src/index.js',
    endent`
      import { test as base } from '${packageName`@playwright/test`}';

      export default base.extend({ _: [({}, use) => use(), { auto: true }] });\n
    `,
  );

  new Base({ name: '../src/index.js' }).lint();
});
