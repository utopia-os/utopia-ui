import * as React from 'react'
import { Item } from '../../../types'

const StartEndView = ({item} : {item:Item}) => {
  return (
    <div className="tw-flex tw-flex-row">
    <div className="tw-basis-2/5">
      <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6 tw-mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className='tw-align-middle'>{new Date(item.start!).toISOString().substring(0, 10) || ""}</span>
    </div>
    <div className="tw-basis-1/5 tw-place-content-center">
      <span>-</span>
    </div>
    <div className="tw-basis-2/5">
      <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6 tw-mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className='tw-align-middle tw-leading-6'>{new Date(item.end!).toISOString().substring(0, 10) || ""}</span>
    </div>
  </div>
  )
}

export default StartEndView