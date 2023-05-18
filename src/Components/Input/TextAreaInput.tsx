import { useEffect, useState } from "react"
import * as React from "react"


type TextAreaProps = {
    labelTitle: string;
    labelStyle?: string;
    containerStyle?: string;
    defaultValue: string;
    placeholder?: string;
    updateFormValue: (value: string ) => void;
}



function TextAreaInput({labelTitle, labelStyle, containerStyle, defaultValue, placeholder, updateFormValue} : TextAreaProps){

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
            <label className="tw-label">
                <span className={"tw-label-text tw-text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <textarea value={value} className="tw-textarea tw-textarea-bordered tw-w-full tw-min-h-64" placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)}></textarea>
        </div>
    )
}


export default TextAreaInput