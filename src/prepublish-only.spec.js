import { expect } from '@playwright/test';
import { execaCommand } from 'execa';
import fs from 'fs-extra';
import outputFiles from 'output-files';
import { test } from 'playwright-local-tmp-dir';

test('works', async () => {
  await outputFiles({
    '.baserc.json': JSON.stringify('../src/index.js'),
    'src/index.js': 'export default 1 |> x => x * 2',
  });

  await execaCommand('base prepare');
  await execaCommand('base prepublishOnly');
  expect(await fs.readFile('dist/index.js', 'utf8')).toMatchSnapshot();
});
