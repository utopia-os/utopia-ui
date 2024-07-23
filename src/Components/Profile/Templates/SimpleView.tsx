import * as React from 'react'
import { TextView } from '../../Map'
import { Item } from '../../../types'

export const SimpleView = ({item}:{item: Item}) => {
  return (
    <div className='tw-mt-8 tw-h-full tw-overflow-y-auto fade tw-px-6'>
    <TextView item={item} />
</div>
  )
}
