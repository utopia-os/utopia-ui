import { TextAreaInput } from "../../Input";

// eslint-disable-next-line react/prop-types
export const SimpleForm = ({ state, setState }) => {
  return (
    <TextAreaInput
      placeholder="About me ..."
      // eslint-disable-next-line react/prop-types
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
