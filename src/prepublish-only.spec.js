import { execaCommand } from 'execa';
import { expect } from '@playwright/test';
import fs from 'fs-extra';
import outputFiles from 'output-files';
import { test } from 'playwright-local-tmp-dir';

test('works', async () => {
  await outputFiles({
    'src/index.js': 'export default 1 |> x => x * 2',
    '.baserc.json': JSON.stringify('../src/index.js'),
  });
  await execaCommand('base prepare');
  await execaCommand('base prepublishOnly');
  expect(await fs.readFile('dist/index.js', 'utf8')).toMatchSnapshot();
});
