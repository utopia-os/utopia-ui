import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({manifest: {
      "short_name": "Utopia Game",
      "name": "Utopia Game: The Real Life Manifestation Game",
      "icons": [
        {
          "src": "3markers-globe.svg",
          "sizes": "any",
          "type": "image/svg+xml"
        }
      ],
      "start_url": "/",
      "display": "fullscreen",
      "orientation": "natural"
    }})
  ]
})
