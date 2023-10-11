import * as React from 'react'

export const Control = ({children}) => {
  return (
    <div className='tw-absolute tw-bottom-4 tw-left-4 tw-z-[999] tw-flex-col'>{children}</div>
  )
}
