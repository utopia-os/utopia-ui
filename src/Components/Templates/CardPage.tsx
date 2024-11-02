import { Link } from 'react-router-dom'
import * as React from 'react'
import { TitleCard } from './TitleCard'

export function CardPage({
  title,
  hideTitle,
  children,
  parents,
}: {
  title: string
  hideTitle?: boolean
  children?: React.ReactNode
  parents?: { name: string; path: string }[]
}) {
  return (
    <main className='tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden tw-pt-2 tw-px-6 tw-min-w-80 tw-flex tw-justify-center'>
      <div className='tw-w-full xl:tw-max-w-6xl '>
        <div className='tw-text-sm tw-breadcrumbs'>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            {parents?.map((b, i) => (
              <li key={i}>
                <Link to={b.path}>{b.name}</Link>
              </li>
            ))}
            <li>{title}</li>
          </ul>
        </div>
        <TitleCard hideTitle={hideTitle} title={title} topMargin='tw-my-2' className=' tw-mb-4'>
          {children}
        </TitleCard>
      </div>
    </main>
  )
}
