// CSS
import '#assets/css/tailwind.css'
import '#assets/css/masonry.css'
import '#assets/css/toastify.css'
import '#assets/css/custom-file-upload.css'
import '#assets/css/misc.css'
import '#assets/css/icons.css'
import '#assets/css/leaflet.css'

// TSX
export * from './Components/Map'
export * from './Components/AppShell'
export * from './Components/Auth'
export * from './Components/Profile'
export * from './Components/Gaming'
export * from './Components/Templates'
export * from './Components/Input'

declare global {
  interface Window {
    my_modal_3: {
      showModal(): void
    }
  }
}
