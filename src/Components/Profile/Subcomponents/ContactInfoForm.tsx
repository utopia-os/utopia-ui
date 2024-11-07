/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as React from 'react'
import { TextInput } from '../../Input'
import { FormState } from '../Templates/OnepagerForm'

export const ContactInfoForm = ({
  state,
  setState,
}: {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<any>>
}) => {
  return (
    <div className='tw-mt-4 tw-space-y-4'>
      <div>
        <label
          htmlFor='email'
          className='tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1'
        >
          Email-Adresse (Kontakt):
        </label>
        <TextInput
          placeholder='Email'
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
          className='tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1'
        >
          Telefonnummer (Kontakt):
        </label>
        <TextInput
          placeholder='Telefonnummer'
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
