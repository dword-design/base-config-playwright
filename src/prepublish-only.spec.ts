import pathLib from 'node:path';

import { Base } from '@dword-design/base';
import { expect, test } from '@playwright/test';
import fs from 'fs-extra';

test('works', async ({}, testInfo) => {
  const cwd = testInfo.outputPath();

  await fs.outputFile(
    pathLib.join(cwd, 'src', 'index.ts'),
    'export const foo: number = 1;',
  );

  const base = new Base('../../src', { cwd });
  await base.prepare();
  await base.run('prepublishOnly');

  expect(
    await fs.readFile(pathLib.join(cwd, 'dist', 'index.js'), 'utf8'),
  ).toEqual('export const foo = 1;');
});
