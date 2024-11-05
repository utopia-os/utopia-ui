/* eslint-disable camelcase */
import { Item } from '../../../types'
import { getValue } from '../../../Utils/GetValue'
import { TextView } from '../../Map'

export const ProfileTextView = ({
  item,
  data_field,
  section_name,
}: {
  item: Item
  data_field: string
  section_name: string
}) => {
  return (
    <div className='tw-my-10 tw-mt-2 tw-px-6'>
      <h2 className='tw-text-lg tw-font-semibold'>{section_name}</h2>
      <div className='tw-mt-2 tw-text-sm'>
        <TextView rawText={data_field ? getValue(item, data_field) : getValue(item, 'text')} />
      </div>
    </div>
  )
}
