import { TextAreaInput } from '#components/Input'

import type { Item } from '#types/Item'

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
