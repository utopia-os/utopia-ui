import { createContext } from 'react'

import type { ItemFormPopupProps } from '#types/ItemFormPopupProps'

// Where should we define defaults, here or in Layer.tsx?

interface LayerContextType {
  name: string
  markerDefaultColor: string
  markerDefaultColor2: string
  markerShape: string
  markerIcon: string
  itemFormPopup: ItemFormPopupProps | null | undefined
  setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>> | undefined
}

const LayerContext = createContext<LayerContextType>({
  name: '',
  markerDefaultColor: '#777',
  markerDefaultColor2: 'RGBA(35, 31, 32, 0.2)',
  markerShape: 'circle',
  markerIcon: '',
  itemFormPopup: undefined,
  setItemFormPopup: undefined,
})

export default LayerContext
