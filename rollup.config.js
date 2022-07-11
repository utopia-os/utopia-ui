import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      }
    ],
    plugins: [
      postcss({
        plugins: []
      }),
      typescript()
    ],
    external: ['react', 'react-dom', 'leaflet', 'react-leaflet', 'react-leaflet-cluster', 'leaflet/dist/leaflet.css']
  }