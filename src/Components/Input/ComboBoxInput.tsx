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
      className='tw:select'
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
