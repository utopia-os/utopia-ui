import { TextView } from '#components/Map'

import type { Item } from '#types/Item'

export const ProfileTextView = ({
  item,
  dataField,
  heading,
  hideWhenEmpty,
}: {
  item: Item
  dataField: string
  heading: string
  hideWhenEmpty: boolean
}) => {
  return (
    <div className='tw-my-10 tw-mt-2 tw-px-6'>
      {!(item.data === '' && hideWhenEmpty) && (
        <h2 className='tw-text-lg tw-font-semibold'>{heading}</h2>
      )}
      <div className='tw-mt-2 tw-text-sm'>
        <TextView itemId={item.id} rawText={dataField ? item.data : item.text} />
      </div>
    </div>
  )
}
