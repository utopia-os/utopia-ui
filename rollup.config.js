import path from 'path'
import { fileURLToPath } from 'url'

import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const aliasConfig = alias({
  entries: [{ find: '#types', replacement: path.resolve(__dirname, 'src/types') }],
})

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      aliasConfig,
      resolve({
        extensions: ['.ts', '.tsx'],
      }),
      postcss({
        plugins: [],
      }),
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
    external: [
      'react',
      'react-dom',
      'react-markdown',
      'react/jsx-runtime',
      'remark-breaks',
      'leaflet',
      'react-leaflet',
      'react-toastify',
      'react-string-replace',
      'react-toastify/dist/ReactToastify.css',
      'tw-elements',
      'react-router-dom',
      'react-leaflet-cluster',
      '@tanstack/react-query',
      'tributejs',
      'prop-types',
      'leaflet/dist/leaflet.css',
      '@heroicons/react/20/solid',
      '@heroicons/react/24/outline/ChevronRightIcon',
      '@heroicons/react/24/outline',
      'date-fns',
      '@heroicons/react/24/outline/InformationCircleIcon',
      '@heroicons/react/24/outline/QuestionMarkCircleIcon',
      '@heroicons/react/24/outline/ChevronDownIcon',
      'axios',
      'react-image-crop',
      'react-image-crop/dist/ReactCrop.css',
      'react-colorful',
      'leaflet.locatecontrol/dist/L.Control.Locate.css',
      'yet-another-react-lightbox',
      'react-photo-album',
    ],
  },
  {
    input: 'dist/types/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      aliasConfig,
      dts({
        respectExternal: true,
        compilerOptions: {
          skipLibCheck: true,
        },
      }),
    ],
    external: [/\.css$/, /\.d\.ts$/],
  },
]
