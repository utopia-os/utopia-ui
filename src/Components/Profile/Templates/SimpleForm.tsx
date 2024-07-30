import { TextAreaInput } from "../../Input";

export const SimpleForm = ({ state, setState }) => {
  return (
    <TextAreaInput
      placeholder="About me ..."
      defaultValue={state?.text || ""}
      updateFormValue={(v) => setState(prevState => ({
        ...prevState,
        text: v
      }))}
      containerStyle='tw-mt-8 tw-h-full'
      inputStyle='tw-h-full'
    />
  );
};
