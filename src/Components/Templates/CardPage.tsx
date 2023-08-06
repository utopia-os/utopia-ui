import { Link } from "react-router-dom"
import * as React from "react"
import {TitleCard} from "./TitleCard"


export function CardPage({title,children} : { 
  title: string,
  children?: React.ReactNode,
}) {


  return (
    <main className="tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden tw-pt-2 tw-px-6 tw-bg-base-200 tw-min-w-80 tw-flex tw-justify-center" >
      <div className='tw-w-full xl:tw-max-w-6xl'>
        <div className="tw-text-sm tw-breadcrumbs">
          <ul>
            <li><Link to={'/'} >Home</Link></li>
            <li>FAQ</li>
          </ul>
        </div>
        <TitleCard title={title} topMargin="mt-2">
          {children}
        </TitleCard>
      </div>
    </main>
  )
}
