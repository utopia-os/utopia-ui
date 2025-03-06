import { useContext } from 'react'

import ItemContext from './TemplateItemContext'

import type { Item } from '#types/Item'
import type { JSXElementConstructor } from 'react'

type OmitItem<T extends keyof React.JSX.IntrinsicElements | JSXElementConstructor<unknown>> = Omit<
  React.ComponentProps<T>,
  'item'
>

export function Templateify<
  T extends keyof React.JSX.IntrinsicElements | JSXElementConstructor<unknown>,
>(Component: React.JSXElementConstructor<React.PropsWithChildren<{ item?: Item }>>) {
  const TemplateComponent = (props: OmitItem<T>) => {
    const item = useContext(ItemContext)

    return <Component {...props} item={item} />
  }

  return TemplateComponent
}
