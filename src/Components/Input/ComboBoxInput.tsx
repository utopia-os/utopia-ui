interface ComboBoxProps {
  id?: string
  options: string[]
  value: string
  onValueChange: (newValue: string) => void
}

const ComboBoxInput = ({ id, options, value, onValueChange }: ComboBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(e.target.value)
  }

  return (
    <select
      id={id}
      className='tw:form-select tw:block tw:w-full tw:py-2 tw:px-4 tw:border tw:border-gray-300 rounded-md tw:shadow-sm tw:text-sm tw:focus:outline-hidden tw:focus:ring-indigo-500 tw:focus:border-indigo-500 tw:sm:text-sm'
      onChange={handleChange}
      value={value} // ← hier controlled statt defaultValue
    >
      {options.map((o) => (
        <option value={o} key={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

export default ComboBoxInput
