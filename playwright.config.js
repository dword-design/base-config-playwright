import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotPathTemplate:
    '{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}',
});
