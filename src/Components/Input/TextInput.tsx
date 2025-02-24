import { useEffect, useState } from 'react'

interface InputTextProps {
  labelTitle?: string
  labelStyle?: string
  type?: string
  dataField?: string
  containerStyle?: string
  inputStyle?: string
  defaultValue?: string
  placeholder?: string
  autocomplete?: string
  pattern?: string
  required?: boolean
  updateFormValue?: (value: string) => void
}

/**
 * @category Input
 */
export function TextInput({
  labelTitle,
  labelStyle,
  type,
  dataField,
  containerStyle,
  inputStyle,
  defaultValue,
  placeholder,
  autocomplete,
  pattern,
  required = true,
  updateFormValue,
}: InputTextProps) {
  const [inputValue, setInputValue] = useState<string>(defaultValue ?? '')

  useEffect(() => {
    setInputValue(defaultValue ?? '')
  }, [defaultValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (updateFormValue) {
      updateFormValue(newValue)
    }
  }

  return (
    <div className={`tw-form-control ${containerStyle ?? ''}`}>
      {labelTitle ? (
        <label className='tw-label'>
          <span className={`tw-label-text tw-text-base-content ${labelStyle ?? ''}`}>
            {labelTitle}
          </span>
        </label>
      ) : null}
      <input
        required={required}
        pattern={pattern}
        type={type ?? 'text'}
        name={dataField}
        value={inputValue}
        placeholder={placeholder ?? ''}
        autoComplete={autocomplete}
        onChange={handleChange}
        className={`tw-input tw-input-bordered tw-w-full ${inputStyle ?? ''}`}
      />
    </div>
  )
}
