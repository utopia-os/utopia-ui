// DynamicHeroIcon.tsx
// Simple Dynamic HeroIcons Component for React (typescript / tsx)
// by: Mike Summerfeldt (IT-MikeS - https://github.com/IT-MikeS)

import { FC } from 'react'
import * as React from 'react'

const DynamicHeroIcon: FC<{icon: string, type: "solid" | "outline", className?: string}> = (props) => {

  const [TheIcon, setTheIcon] = React.useState<JSX.Element>()

  import(`@heroicons/react/24/solid`).then(i => {

    const {...icons} = i    
  
    setTheIcon(icons[props.icon])
    if(!TheIcon) {
      console.log(`Icon ${props.icon} doesn't exist`);
    } 

  })
  
  if(TheIcon)
  return (
    <>
              {/* @ts-ignore */}
              <TheIcon className={props.className? props.className : "tw-h-6 tw-w-6 tw-text-white" }aria-hidden="true" /> 
    </>
  )
  else return(
    <></>
  )




}

export default DynamicHeroIcon