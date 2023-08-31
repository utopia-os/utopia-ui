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
      "name": "Utopia Game: A Cooperative Real Life Manifestation Game",
      "icons": [
        {
          "src": "3markers.svg",
          "sizes": "192x192",
          "type": "image/svg"
        }
      ],
      "start_url": "/index.html",
      "display": "fullscreen",
      "orientation": "portrait"
    }})
  ]
})
