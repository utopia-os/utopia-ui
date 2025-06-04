import { useState } from 'react'

import { SimpleEditor } from '#components/tiptap/components/tiptap-templates/simple/simple-editor'

interface TextAreaProps {
  labelTitle?: string
  labelStyle?: string
  containerStyle?: string
  dataField?: string
  inputStyle?: string
  defaultValue: string
  placeholder?: string
  required?: boolean
  size?: string
  updateFormValue?: (value: string) => void
}

/**
 * @category Input
 */
export function RichTextEditor({
  labelTitle,
  dataField,
  labelStyle,
  containerStyle,
  inputStyle,
  defaultValue,
  placeholder,
  required = true,
  updateFormValue,
}: TextAreaProps) {
  console.log(
    labelTitle,
    dataField,
    labelStyle,
    containerStyle,
    inputStyle,
    placeholder,
    required,
    updateFormValue,
  )

  // const ref = useRef<HTMLTextAreaElement>(null)
  const [inputValue, setInputValue] = useState<string>(defaultValue)

  /*
  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])
  */

  /* const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (updateFormValue) {
      updateFormValue(newValue)
    }
  } */

  return <SimpleEditor />
}
