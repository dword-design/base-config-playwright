import { Base } from '@dword-design/base';
import { expect, test as base } from '@playwright/test';
import fs from 'fs-extra';
import withLocalTmpDir from 'with-local-tmp-dir';

const test = base.extend({
  localTmpDir: [
    async ({}, use) => {
      const reset = await withLocalTmpDir();
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
  await fs.outputFile('src/index.js', 'export default 1 |> x => x * 2');
  const baseInstance = new Base({ name: '../src/index.js' });
  await baseInstance.prepare();
  await baseInstance.run('prepublishOnly');
  expect(await fs.readFile('dist/index.js', 'utf8')).toMatchSnapshot();
});
