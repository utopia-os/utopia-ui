// DynamicHeroIcon.tsx
// Simple Dynamic HeroIcons Component for React (typescript / tsx)
// by: Mike Summerfeldt (IT-MikeS - https://github.com/IT-MikeS)

import { FC } from 'react'
import * as HIcons from '@heroicons/react/20/solid'
import * as React from 'react'

const DynamicHeroIcon: FC<{icon: string}> = (props) => {
  const {...icons} = HIcons
  
  const TheIcon: JSX.Element = icons[props.icon]

  if(!TheIcon) {
    console.log(`Icon ${props.icon} doesn't exist`);
  } 

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className="tw-h-6 tw-w-6 tw-text-white" aria-hidden="true" /> 
    </>
  )
}

export default DynamicHeroIcon