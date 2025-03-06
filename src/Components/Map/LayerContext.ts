import { createContext } from 'react'

import type { ItemFormPopupProps } from '#types/ItemFormPopupProps'

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
  markerDefaultColor: '',
  markerDefaultColor2: '',
  markerShape: '',
  markerIcon: '',
  itemFormPopup: undefined,
  setItemFormPopup: undefined,
})

export default LayerContext
