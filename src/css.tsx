import 'leaflet/dist/leaflet.css'
import 'leaflet.locatecontrol/dist/L.Control.Locate.css'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-photo-album/rows.css'
import 'react-toastify/dist/ReactToastify.css'
import 'yet-another-react-lightbox/styles.css'

import '#assets/css/tailwind.css'
import '#assets/css/masonry.css'
import '#assets/css/toastify.css'
import '#assets/css/custom-file-upload.css'
import '#assets/css/misc.css'
import '#assets/css/marker-icons.css'
import '#assets/css/leaflet.css'
import '#assets/css/color-picker.css'

// MD Editor
import '#assets/css/easymde.css'

import { dom, library } from '@fortawesome/fontawesome-svg-core'
import {
  faBold,
  faItalic,
  faHeading,
  faQuoteLeft,
  faListUl,
  faListOl,
  faLink,
  faImage,
  faEye,
  faColumns,
  faArrowsAlt,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add([
  faBold,
  faItalic,
  faHeading,
  faQuoteLeft,
  faListUl,
  faListOl,
  faLink,
  faImage,
  faEye,
  faColumns,
  faArrowsAlt,
  faQuestionCircle,
])

dom.insertCss()
