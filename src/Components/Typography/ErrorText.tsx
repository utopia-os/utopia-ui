import * as React from "react"

function ErrorText({styleClass, children}){
    return(
        <p className={`tw-text-center  tw-text-error ${styleClass}`}>{children}</p>
    )
}

export default ErrorText