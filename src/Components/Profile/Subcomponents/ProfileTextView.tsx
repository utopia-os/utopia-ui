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
      {/* eslint-disable-next-line security/detect-object-injection */}
      {!(item[dataField] === '' && hideWhenEmpty) && (
        <h2 className='tw-text-lg tw-font-semibold'>{heading}</h2>
      )}
      <div className='tw-mt-2 tw-text-sm'>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, security/detect-object-injection */}
        <TextView itemId={item.id} rawText={dataField ? item[dataField] : item.text} />
      </div>
    </div>
  )
}
