import {
  TextView as PlainTextView,
  StartEndView as PlainStartEndView,
  PopupTextInput as PlainPopupTextInput,
  PopupButton as PlainPopupButton,
  PopupCheckboxInput as PlainPopupCheckboxInput,
  PopupTextAreaInput as PlainPopupTextAreaInput,
  PopupStartEndInput as PlainPopupStartEndInput,
} from '#components/Map/Subcomponents/ItemPopupComponents'

import { Templateify } from './Templateify'

export { CardForm } from './CardForm'
export { CardView } from './CardView'

export const TextView = Templateify(PlainTextView)
export const StartEndView = Templateify(PlainStartEndView)
export const PopupTextInput = Templateify(PlainPopupTextInput)
export const PopupButton = Templateify(PlainPopupButton)
export const PopupCheckboxInput = Templateify(PlainPopupCheckboxInput)
export const PopupTextAreaInput = Templateify(PlainPopupTextAreaInput)
export const PopupStartEndInput = Templateify(PlainPopupStartEndInput)

export const Test = () => {
  return <TextView truncate />
}
