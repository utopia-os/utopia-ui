import * as React from 'react'

interface ComboBoxProps {
  id?: string
  options: string[]
  value: string
  onValueChange: (newValue: string) => void
}

const ComboBoxInput = ({ id, options, value, onValueChange }: ComboBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    onValueChange(value)
  }

  return (
    <select
      id={id}
      className='tw-form-select tw-block tw-w-full tw-py-2 tw-px-4 tw-border tw-border-gray-300 rounded-md tw-shadow-sm tw-text-sm focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm'
      onChange={handleChange}
    >
      {options.map((o) => (
        <option value={o} key={o} selected={o === value}>
          {o}
        </option>
      ))}
    </select>
  )
}

export default ComboBoxInput
