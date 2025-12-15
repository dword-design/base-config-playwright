import { Base } from '@dword-design/base';
import { test } from '@playwright/test';
import packageName from 'depcheck-package-name';
import endent from 'endent';
import outputFiles from 'output-files';

test('fixture', async ({}, testInfo) => {
  const cwd = testInfo.outputPath();

  await outputFiles(cwd, {
    'package.json': JSON.stringify({
      dependencies: { '@playwright/test': '*' },
    }),
    'src/index.ts': endent`
      import { test as base } from '${packageName`@playwright/test`}';

      export default base.extend({ _: [({}, use) => use(), { auto: true }] });\n
    `,
  });

  const base = new Base('../../src', { cwd });
  await base.prepare();
  await base.lint();
});
