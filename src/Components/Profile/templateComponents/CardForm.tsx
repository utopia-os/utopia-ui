import { useContext } from 'react'

import { ItemFormPopup } from '#components/Map/Subcomponents/ItemFormPopup'

import LayerContext from './LayerContext'
import TemplateItemContext from './TemplateItemContext'

/**
 * @category Map
 */
export const CardForm = ({ children }: { children?: React.ReactNode }) => {
  const { itemFormPopup, setItemFormPopup } = useContext(LayerContext)

  return (
    itemFormPopup && (
      <ItemFormPopup
        key={setItemFormPopup?.name}
        position={itemFormPopup.position}
        layer={itemFormPopup.layer}
        setItemFormPopup={setItemFormPopup}
        item={itemFormPopup.item}
      >
        <TemplateItemContext.Provider value={itemFormPopup.item}>
          {children}
        </TemplateItemContext.Provider>
      </ItemFormPopup>
    )
  )
}
