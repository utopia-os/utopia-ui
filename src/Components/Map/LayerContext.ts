import { createContext } from 'react'

interface LayerContextType {
  name: string
  markerDefaultColor: string
  markerDefaultColor2: string
  markerShape: string
  markerIcon: string
}

const LayerContext = createContext<LayerContextType>({
  name: '',
  markerDefaultColor: '',
  markerDefaultColor2: '',
  markerShape: '',
  markerIcon: '',
})

export default LayerContext
