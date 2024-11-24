import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.tsx',
  output: [
    {
      dir: 'dist/',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto', // <---- this solves default issue
    }),
    json(),
    postcss(),
    image(),
    typescript({
      compilerOptions: {
        declaration: true,
        declarationDir: './dist/types',
        emitDeclarationOnly: true,
      },
    }),
  ],
  // Consider to implement the rest of https://github.com/rollup/rollup/issues/4699#issuecomment-2115967396
  // is required for @tanstack/react-query and react-toastify
  onwarn: (warning, warn) => {
    if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
      warn(warning)
    }
  },
  external: ['react/jsx-runtime', 'react'],
}
