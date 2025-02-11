import { Children, cloneElement, isValidElement, useEffect } from 'react'

import type { Item } from '#types/Item'

export const ItemForm = ({
  children,
  item,
  title,
  setPopupTitle,
}: {
  children?: React.ReactNode
  item?: Item
  title?: string
  setPopupTitle?: React.Dispatch<React.SetStateAction<string>>
}) => {
  useEffect(() => {
    setPopupTitle && title && setPopupTitle(title)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  return (
    <div>
      {children
        ? Children.toArray(children).map((child) =>
            isValidElement<{ item: Item; test: string }>(child)
              ? cloneElement(child, { item, test: 'test' })
              : '',
          )
        : ''}
    </div>
  )
}

ItemForm.__TYPE = 'ItemForm'
