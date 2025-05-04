import { Base } from '@dword-design/base';
import { endent } from '@dword-design/functions';
import packageName from 'depcheck-package-name';
import fs from 'fs-extra';
import { test } from 'playwright-local-tmp-dir';

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
