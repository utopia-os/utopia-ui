import { useEffect, useState } from "react"
import * as React from "react"


type TextAreaProps = {
    labelTitle?: string;
    labelStyle?: string;
    containerStyle?: string;
    dataField?: string;
    inputStyle?: string;
    defaultValue: string;
    placeholder?: string;
    updateFormValue?: (value: string) => void;
}



function TextAreaInput({ labelTitle, dataField, labelStyle, containerStyle, inputStyle, defaultValue, placeholder, updateFormValue }: TextAreaProps) {

    const [value, setValue] = useState<string>(defaultValue)

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])


    const updateInputValue = (val: string) => {
        setValue(val)
        if (updateFormValue)
            updateFormValue(val)
    }

    return (
        <div className={`tw-form-control tw-w-full ${containerStyle ? containerStyle : ""}`}>
            {labelTitle ? <label className="tw-label">
                <span className={"tw-label-text tw-text-base-content " + labelStyle}>{labelTitle}</span>
            </label> : ""}
            <textarea value={value} name={dataField} className={`tw-textarea tw-textarea-bordered tw-w-full tw-leading-5 ${inputStyle ? inputStyle : ""}`} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)}></textarea>
        </div>
    )
}


export default TextAreaInput