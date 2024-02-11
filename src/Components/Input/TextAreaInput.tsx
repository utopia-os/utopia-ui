import * as React from "react"
import { useEffect, useRef } from "react";
import Tribute from "tributejs";
import { useTags } from "../Map/hooks/useTags";


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

interface KeyValue {
    [key: string]: string;
}


export function TextAreaInput({ labelTitle, dataField, labelStyle, containerStyle, inputStyle, defaultValue, placeholder, updateFormValue }: TextAreaProps) {

    const ref = useRef<HTMLTextAreaElement>(null);

    // prevent react18 from calling useEffect twice
    const init = useRef(false)

    const tags = useTags();

    let values: KeyValue[] = [];

    tags.map(tag => {
        values.push({ key: tag.name, value: tag.name, color: tag.color })
    })

    var tribute = new Tribute({
        containerClass: 'tw-z-3000 tw-bg-base-100 tw-p-2 tw-rounded-lg tw-shadow',
        selectClass: 'tw-font-bold',
        trigger: "#",
        values: values,
        menuShowMinLength: 3,
        noMatchTemplate: () => {
            return ""
        },
        menuItemTemplate: function (item) {
            return `<span style="color: ${item.original.color}; padding: 5px; boarder-radius: 3px;">#${item.string}</span>`;
        }
    });


    useEffect(() => {
        if (!init.current) {
            if (ref.current) {
                tribute.attach(ref.current);
            }
            init.current = true;
        }    
    }, [ref])

    return (
        <div className={`tw-form-control tw-w-full ${containerStyle ? containerStyle : ""}`}>
            {labelTitle ? <label className="tw-label">
                <span className={"tw-label-text tw-text-base-content " + labelStyle}>{labelTitle}</span>
            </label> : ""}
            <textarea required ref={ref} defaultValue={defaultValue} name={dataField} className={`tw-textarea tw-textarea-bordered tw-w-full  tw-leading-5 ${inputStyle ? inputStyle : ""}`} placeholder={placeholder || ""} onChange={(e) => updateFormValue && updateFormValue(e.target.value)}></textarea>
        </div>
    )
}


