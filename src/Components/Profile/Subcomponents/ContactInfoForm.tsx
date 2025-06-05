import { TextInput } from '#components/Input'

import type { FormState } from '#types/FormState'

export const ContactInfoForm = ({
  state,
  setState,
}: {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<FormState>>
}) => {
  return (
    <div className='tw:mt-4 tw:space-y-4'>
      <div>
        <label
          htmlFor='email'
          className='tw:block tw:text-sm tw:font-medium tw:text-gray-500 tw:mb-1'
        >
          Email-Adresse (Kontakt):
        </label>
        <TextInput
          placeholder='Email'
          type='email'
          required={false}
          defaultValue={state.contact}
          updateFormValue={(v) =>
            setState((prevState) => ({
              ...prevState,
              contact: v,
            }))
          }
        />
      </div>

      <div>
        <label
          htmlFor='telephone'
          className='tw:block tw:text-sm tw:font-medium tw:text-gray-500 tw:mb-1'
        >
          Telefonnummer (Kontakt):
        </label>
        <TextInput
          placeholder='Telefonnummer'
          type='tel'
          required={false}
          pattern='^\+?[0-9\s\-]{7,15}$'
          defaultValue={state.telephone}
          updateFormValue={(v) =>
            setState((prevState) => ({
              ...prevState,
              telephone: v,
            }))
          }
        />
      </div>
    </div>
  )
}
