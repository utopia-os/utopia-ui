/* eslint-disable react/prop-types */
import { TextInput } from "../../Input"
import { AvatarWidget } from "./AvatarWidget"
import { ColorPicker } from "./ColorPicker"

export const FormHeader = ({item, state, setState}) => {
  return (
    <div className="tw-flex">
    <AvatarWidget avatar={state.image} setAvatar={(i) => setState(prevState => ({
        ...prevState,
        image: i
    }))} />
    <ColorPicker color={state.color} onChange={(c) => setState(prevState => ({
        ...prevState,
        color: c
    }))} className={"-tw-left-6 tw-top-14 -tw-mr-6"} />
    <div className='tw-grow tw-mr-4'>
        <TextInput placeholder="Name" defaultValue={item?.name ? item.name : ""} updateFormValue={(v) => setState(prevState => ({
            ...prevState,
            name: v
        }))} containerStyle='tw-grow tw-input-md' />
        <TextInput placeholder="Subtitle" defaultValue={item?.subname ? item.subname : ""} updateFormValue={(v) => setState(prevState => ({
            ...prevState,
            subname: v
        }))} containerStyle='tw-grow tw-input-sm tw-px-4 tw-mt-1' />
    </div>
</div>
  )
}
