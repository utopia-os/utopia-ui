import { useContext } from 'react'

import { PopupButton } from '#components/Map/Subcomponents/ItemPopupComponents'

import ItemContext from './TemplateItemContext'

import type { JSXElementConstructor } from 'react'

type OmitItem<T extends keyof React.JSX.IntrinsicElements | JSXElementConstructor<unknown>> = Omit<
  React.ComponentProps<T>,
  'item'
>

/**
 * @category Map
 */
export const TemplatePopupButton = (props: OmitItem<typeof PopupButton>) => {
  const item = useContext(ItemContext)

  return <PopupButton {...props} item={item} />
}
