import { Base } from '@dword-design/base';
import { expect } from '@playwright/test';
import fs from 'fs-extra';
import { test } from 'playwright-local-tmp-dir';

test('works', async () => {
  await fs.outputFile('src/index.js', 'export default 1 |> x => x * 2');
  const baseInstance = new Base({ name: '../src/index.js' });
  await baseInstance.prepare();
  await baseInstance.run('prepublishOnly');
  expect(await fs.readFile('dist/index.js', 'utf8')).toMatchSnapshot();
});
