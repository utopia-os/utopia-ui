import { TextAreaInput } from '#components/Input'
import { Item } from '#src/types'

export const PopupTextAreaInput = ({
  dataField,
  placeholder,
  style,
  item,
}: {
  dataField: string
  placeholder: string
  style?: string
  item?: Item
}) => {
  return (
    <TextAreaInput
      defaultValue={item?.text ? item.text : ''}
      dataField={dataField}
      placeholder={placeholder}
      inputStyle={style}
    ></TextAreaInput>
  )
}
