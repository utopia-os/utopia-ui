/* eslint-disable @typescript-eslint/prefer-optional-chain */
import type { Item } from '#src/types/Item'

export const StartEndView = ({ item }: { item?: Item }) => {
  return (
    <div className='tw-flex tw-flex-row tw-mb-4 tw-mt-1'>
      <div className='tw-basis-2/5 tw-flex tw-flex-row'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='tw-h-4 tw-w-4 tw-mr-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
        <time
          className='tw-align-middle'
          dateTime={item && item.start ? item.start.substring(0, 10) : ''}
        >
          {item && item.start ? new Date(item.start).toLocaleDateString() : ''}
        </time>
      </div>
      <div className='tw-basis-1/5 tw-place-content-center'>
        <span>-</span>
      </div>
      <div className='tw-basis-2/5 tw-flex tw-flex-row'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='tw-h-4 tw-w-4 tw-mr-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
        <time
          className='tw-align-middle'
          dateTime={item && item.end ? item.end.substring(0, 10) : ''}
        >
          {item && item.end ? new Date(item.end).toLocaleDateString() : ''}
        </time>
      </div>
    </div>
  )
}
