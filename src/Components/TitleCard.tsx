import Subtitle from "./Typography/Subtitle"
import * as React from "react"

interface TitleCardProps {

  title: string,
  children : React.ReactNode,
  topMargin: string,
  TopSideButtons?: any
}
  
  function TitleCard({title, children, topMargin, TopSideButtons} : TitleCardProps){
      return(
          <div className={"tw-card tw-w-full tw-p-6 tw-mb-8 tw-bg-base-100 tw-shadow-xl tw-h-fit " + (topMargin || "tw-mt-6")}>

            {/* Title for Card */}
              <Subtitle styleClass={TopSideButtons ? "tw-inline-block" : ""}>
                {title}

                {/* Top side button, show only if present */}
                {
                    TopSideButtons && <div className="tw-inline-block tw-float-right">{TopSideButtons}</div>
                }
              </Subtitle>
              
              <div className="tw-divider tw-mt-2"></div>
          
              {/** Card Body */}
              <div className='tw-h-full tw-w-full tw-pb-6 tw-bg-base-100'>
                  {children}
              </div>
          </div>
          
      )
  }
  
  
  export default TitleCard