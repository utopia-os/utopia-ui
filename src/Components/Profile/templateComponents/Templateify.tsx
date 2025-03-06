import { useContext } from 'react'

import ItemContext from './TemplateItemContext'

import type { Item } from '#types/Item'

export function Templateify<T extends { item?: Item }>(Component: React.ComponentType<T>) {
  const TemplateComponent = (props: T) => {
    const item = useContext(ItemContext)

    return <Component {...props} item={item} />
  }

  return TemplateComponent as React.ComponentType<Omit<T, 'item'>>
}
