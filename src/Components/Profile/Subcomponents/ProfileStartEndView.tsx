import * as React from 'react'
import { StartEndView } from '../../Map'
import { Item } from '../../../types'

export const ProfileStartEndView = ({ item }: { item: Item }) => {
  return (
    <div className='tw-mt-2 tw-px-6 tw-max-w-xs'>
      <StartEndView item={item}></StartEndView>
    </div>
  )
}
