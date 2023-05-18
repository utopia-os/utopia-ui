 import * as React from "react"

 function Subtitle({styleClass, children}){
    return(
        <div className={`tw-text-xl tw-font-semibold ${styleClass}`}>{children}</div>
    )
}

export default Subtitle