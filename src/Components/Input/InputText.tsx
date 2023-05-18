import { useEffect, useState } from "react"
import * as React from "react"

type InputTextProps = {
    labelTitle?: string;
    labelStyle?: string;
    type?: string;
    containerStyle?: string;
    defaultValue: string;
    placeholder?: string;
    updateFormValue: (value: string ) => void;
}


function InputText({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue} : InputTextProps){

    const [value, setValue] = useState<string>(defaultValue)

    useEffect(() => {
      setValue(defaultValue)
    }, [defaultValue])
    

    const updateInputValue = (val : string) => {
        setValue(val)
        updateFormValue(val)

    }

    return(
        <div className={`tw-form-control tw-w-full ${containerStyle}`}>
            {labelTitle ? <label className="tw-label">
                <span className={"tw-label-text tw-text-base-content " + labelStyle}>{labelTitle}</span>
             </label> 
             : " "} 
            <input type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)}className="tw-input  tw-input-bordered tw-w-full " />
        </div>
    )
}


export default InputText