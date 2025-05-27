import baseConfigNode from '@dword-design/base-config-node';
import defu from '@dword-design/defu';
import dedent from 'dedent';

export default config =>
  defu(
    {
      eslintConfig: dedent`
        import config from '@dword-design/eslint-config';
        import { defineConfig, globalIgnores } from 'eslint/config';

        export default defineConfig([
          globalIgnores(['eslint.config.js']),
          config,
          {
            rules: { 'no-empty-pattern': 'off' },
          },
        ]);
      `,
    },
    baseConfigNode(config),
  );
