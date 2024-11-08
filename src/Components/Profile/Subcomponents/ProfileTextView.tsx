/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Item } from '../../../types'
import { getValue } from '../../../Utils/GetValue'
import { TextView } from '../../Map'

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
      {!(getValue(item, dataField) === '' && hideWhenEmpty) && (
        <h2 className='tw-text-lg tw-font-semibold'>{heading}</h2>
      )}
      <div className='tw-mt-2 tw-text-sm'>
        <TextView rawText={dataField ? getValue(item, dataField) : getValue(item, 'text')} />
      </div>
    </div>
  )
}
