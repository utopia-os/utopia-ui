/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { useState } from 'react'
import { timeAgo } from '../../Utils/TimeAgo'
import { Item } from '../../types'

export const DateUserInfo = ({ item }: { item: Item }) => {
  const [infoExpanded, setInfoExpanded] = useState<boolean>(false)
  return (
    <div
      className='tw-flex -tw-mb-1 tw-flex-row tw-mr-2 -tw-mt-2'
      onClick={(e) => e.stopPropagation()}
    >
      {infoExpanded ? (
        <p
          className={'tw-italic tw-min-h-[21px] !tw-my-0 tw-text-gray-500'}
          onClick={() => setInfoExpanded(false)}
        >{`${item.date_updated && item.date_updated !== item.date_created ? 'updated' : 'posted'} ${item && item.user_created && item.user_created.first_name ? `by ${item.user_created.first_name}` : ''} ${item.date_updated ? timeAgo(item.date_updated) : timeAgo(item.date_created!)}`}</p>
      ) : (
        <p
          className='!tw-my-0 tw-min-h-[21px] tw-font-bold tw-cursor-pointer tw-text-gray-500'
          onClick={() => setInfoExpanded(true)}
        >
          ⓘ
        </p>
      )}
      <div className='tw-grow '></div>
    </div>
  )
}
