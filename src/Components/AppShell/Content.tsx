import * as React from 'react'

type ContentProps = {
  children?: React.ReactNode
}

export function Content({ children }: ContentProps) {
  return (
    <div className='tw-flex tw-flex-col tw-w-full tw-h-full tw-bg-base-200 tw-relative'>
      {children}
    </div>
  )
}
