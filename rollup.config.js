import path from 'path'
import { fileURLToPath } from 'url'

import alias from '@rollup/plugin-alias'
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
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
    ],
    plugins: [
      aliasConfig,
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
    ],
  },
  {
    input: 'src/index.tsx',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [aliasConfig, dts()],
    external: [/\.css$/],
  },
]
