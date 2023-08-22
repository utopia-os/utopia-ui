import { useEffect, useState } from "react"
import * as React from "react"

type InputTextProps = {
    labelTitle?: string;
    labelStyle?: string;
    type?: string;
    dataField?: string;
    containerStyle?: string;
    defaultValue?: string;
    placeholder?: string;
    updateFormValue?: (value: string ) => void;
}


export function TextInput({labelTitle, labelStyle, type, dataField, containerStyle, defaultValue, placeholder, updateFormValue} : InputTextProps){

    return(
        <div className={`tw-form-control tw-w-full ${containerStyle}`}>
            {labelTitle ? <label className="tw-label">
                <span className={"tw-label-text tw-text-base-content " + labelStyle}>{labelTitle}</span>
             </label> 
             : " "} 
            <input type={type || "text"} name={dataField} defaultValue={defaultValue} placeholder={placeholder || ""} onChange={(e) => updateFormValue&& updateFormValue(e.target.value)}className="tw-input  tw-input-bordered tw-w-full " />
        </div>
    )
}


