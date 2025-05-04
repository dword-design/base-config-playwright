import baseConfigNode from '@dword-design/base-config-node';
import defu from '@dword-design/defu';

export default config =>
  defu(
    { eslintConfig: { extends: '@dword-design/eslint-config', rules: { 'no-empty-pattern': 'off' } } },
    baseConfigNode(config),
  );
