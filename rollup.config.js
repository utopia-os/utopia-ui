import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

export default {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
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
    external: ['react', 'react-dom', 'leaflet', 'react-leaflet', 'react-toastify' , 'react-string-replace', 'react-toastify/dist/ReactToastify.css', 'tw-elements' ,'react-router-dom', 'react-leaflet-cluster', '@tanstack/react-query', 'tributejs', 'prop-types',  'leaflet/dist/leaflet.css', '@heroicons/react/20/solid']
  }