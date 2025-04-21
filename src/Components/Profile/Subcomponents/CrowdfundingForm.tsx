/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { TextInput } from '#components/Input'

import type { FormState } from '#types/FormState'

export const CrowdfundingForm = ({
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
          htmlFor='OpenCollectiveSlug'
          className='tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1'
        >
          Open Collective Slug:
        </label>
        <TextInput
          placeholder='Open Collective Slug'
          type='text'
          required={false}
          defaultValue={state.openCollectiveSlug}
          updateFormValue={(v) =>
            setState((prevState) => ({
              ...prevState,
              openCollectiveSlug: v,
            }))
          }
        />
      </div>
    </div>
  )
}
