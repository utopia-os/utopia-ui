import { TextView } from '#components/Map'

import type { Item } from '#types/Item'

export const ProfileTextView = ({
  item,
  text,
  heading,
  hideWhenEmpty,
}: {
  item: Item
  text: string
  heading: string
  hideWhenEmpty: boolean
}) => {
  return (
    <div className='tw-my-10 tw-mt-2 tw-px-6'>
      {!(text === '' && hideWhenEmpty) && (
        <h2 className='tw-text-lg tw-font-semibold'>{heading}</h2>
      )}
      <div className='tw-mt-2 tw-text-sm'>
        <TextView itemId={item.id} rawText={text} />
      </div>
    </div>
  )
}
