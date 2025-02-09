import { dts } from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

export default [
  {
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
      postcss({
        plugins: [],
      }),
      typescript(),
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
    input: 'types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]
