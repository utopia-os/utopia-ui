import { createContext } from 'react'

import type { MarkerIcon } from '#types/MarkerIcon'

interface LayerContextType {
  name: string
  markerDefaultColor: string
  markerDefaultColor2: string
  markerShape: string
  menuText: string
  markerIcon?: MarkerIcon
}

const LayerContext = createContext<LayerContextType>({
  name: '',
  markerDefaultColor: '',
  markerDefaultColor2: '',
  markerShape: '',
  menuText: '',
})

export default LayerContext
