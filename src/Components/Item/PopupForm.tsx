import { ItemFormPopup } from '#components/Map/Subcomponents/ItemFormPopup'

import TemplateItemContext from './TemplateItemContext'

/**
 * @category Item
 */
export const PopupForm = ({ children }: { children?: React.ReactNode }) => {

  return (
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
