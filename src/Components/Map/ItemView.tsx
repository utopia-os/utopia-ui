import { Children, cloneElement, isValidElement } from 'react'

import type { Item } from '#types/Item'

export const ItemView = ({ children, item }: { children?: React.ReactNode; item?: Item }) => {
  return (
    <div>
      {children
        ? Children.toArray(children).map((child) =>
            isValidElement<{ item: Item }>(child) ? cloneElement(child, { item }) : null,
          )
        : null}
    </div>
  )
}

ItemView.__TYPE = 'ItemView'
