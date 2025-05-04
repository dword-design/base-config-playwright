import { endent } from '@dword-design/functions';
import packageName from 'depcheck-package-name';
import { execaCommand } from 'execa';
import outputFiles from 'output-files';
import { test } from 'playwright-local-tmp-dir';

test('fixture', async () => {
  await outputFiles({
    '.baserc.json': JSON.stringify({ name: '../src/index.js' }),
    'package.json': JSON.stringify({
      dependencies: { '@playwright/test': '*' },
    }),
    'src/index.js': endent`
      import { test as base } from '${packageName`@playwright/test`}';

      export default base.extend({ _: [({}, use) => use(), { auto: true }] });\n
    `,
  });

  await execaCommand('base prepare');
  await execaCommand('base lint');
});
