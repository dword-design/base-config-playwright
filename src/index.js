import baseConfigNode from '@dword-design/base-config-node';
import defu from '@dword-design/defu';

export default config =>
  defu(
    {
      /* eslintConfig: { rules: { 'no-object-pattern': 'off' } } */
    },
    baseConfigNode(config),
  );
