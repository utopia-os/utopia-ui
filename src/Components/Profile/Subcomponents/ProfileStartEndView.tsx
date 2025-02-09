import { StartEndView } from '#components/Map'

import type { Item } from '#src/types/Item'

export const ProfileStartEndView = ({ item }: { item: Item }) => {
  return (
    <div className='tw-mt-2 tw-px-6 tw-max-w-xs'>
      <StartEndView item={item}></StartEndView>
    </div>
  )
}
