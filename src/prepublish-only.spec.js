import { Base } from '@dword-design/base';
import { expect, test as base } from '@playwright/test';
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
  await fs.outputFile('src/index.js', 'export default 1 |> x => x * 2');
  new Base({ name: '../src/index.js' }).run('prepublishOnly');
  expect(await fs.readFile('src/index.js', 'utf8')).toMatchSnapshot();
});
