import { TextAreaInput } from "../../Input"

export const SimpleForm = (item, setState) => {
  return (
    <TextAreaInput placeholder="About me ..." defaultValue={item?.text ? item.text : ""} updateFormValue={(v) => setState(prevState => ({
      ...prevState,
      text: v
  }))} containerStyle='tw-mt-8 tw-h-full' inputStyle='tw-h-full' />
  )
}
