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



export function TextAreaInput({ labelTitle, dataField, labelStyle, containerStyle, inputStyle, defaultValue, placeholder, updateFormValue }: TextAreaProps) {





    return (
        <div className={`tw-form-control tw-w-full ${containerStyle ? containerStyle : ""}`}>
            {labelTitle ? <label className="tw-label">
                <span className={"tw-label-text tw-text-base-content " + labelStyle}>{labelTitle}</span>
            </label> : ""}
            <textarea defaultValue={defaultValue} name={dataField} className={`tw-textarea tw-textarea-bordered tw-w-full tw-leading-5 ${inputStyle ? inputStyle : ""}`} placeholder={placeholder || ""} onChange={(e) => updateFormValue&& updateFormValue(e.target.value)}></textarea>
        </div>
    )
}


