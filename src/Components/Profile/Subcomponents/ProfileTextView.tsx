import { get } from 'radash'

import { TextView } from '#components/Map'

import type { Item } from '#types/Item'

export const ProfileTextView = ({
  item,
  dataField = 'text',
  heading,
  hideWhenEmpty,
}: {
  item: Item
  dataField: string
  heading: string
  hideWhenEmpty: boolean
}) => {
  const text = get(item, dataField)

  if (typeof text !== 'string') {
    throw new Error('ProfileTextView: text is not a string')
  }

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
