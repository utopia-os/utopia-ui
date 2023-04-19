import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

export default {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
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
    external: ['react', 'react-dom', 'leaflet', 'react-leaflet', 'react-leaflet-cluster', 'leaflet/dist/leaflet.css', '@heroicons/react/solid']
  }