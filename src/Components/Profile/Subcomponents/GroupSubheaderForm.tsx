import * as React from 'react'
import ComboBoxInput from '../../Input/ComboBoxInput'
import { Item } from '../../../types'
import { useEffect } from 'react'
import { FormState } from '../Templates/OnepagerForm'

const typeMapping = [
  { value: 'wuerdekompass', label: 'Regional-Gruppe' },
  { value: 'themenkompass', label: 'Themen-Gruppe' },
  { value: 'liebevoll.jetzt', label: 'liebevoll.jetzt' },
]
const statusMapping = [
  { value: 'active', label: 'aktiv' },
  { value: 'in_planning', label: 'in Planung' },
  { value: 'paused', label: 'pausiert' },
]

export const GroupSubheaderForm = ({
  state,
  setState,
  item,
}: {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<any>>
  item: Item
}) => {
  useEffect(() => {
    switch (state.group_type) {
      case 'wuerdekompass':
        setState((prevState) => ({
          ...prevState,
          color: item?.layer?.menuColor || '#1A5FB4',
          marker_icon: 'group',
          image: '59e6a346-d1ee-4767-9e42-fc720fb535c9',
        }))
        break
      case 'themenkompass':
        setState((prevState) => ({
          ...prevState,
          color: '#26A269',
          marker_icon: 'group',
          image: '59e6a346-d1ee-4767-9e42-fc720fb535c9',
        }))
        break
      case 'liebevoll.jetzt':
        setState((prevState) => ({
          ...prevState,
          color: '#E8B620',
          marker_icon: 'liebevoll.jetzt',
          image: 'e735b96c-507b-471c-8317-386ece0ca51d',
        }))

        break
      default:
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.group_type])

  return (
    <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6'>
      <div>
        <label
          htmlFor='groupType'
          className='tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1'
        >
          Gruppenart:
        </label>
        <ComboBoxInput
          id='groupType'
          options={typeMapping}
          value={state.group_type}
          onValueChange={(v) =>
            setState((prevState) => ({
              ...prevState,
              group_type: v,
            }))
          }
        />
      </div>
      <div>
        <label
          htmlFor='status'
          className='tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1'
        >
          Gruppenstatus:
        </label>
        <ComboBoxInput
          id='status'
          options={statusMapping}
          value={state.status}
          onValueChange={(v) =>
            setState((prevState) => ({
              ...prevState,
              status: v,
            }))
          }
        />
      </div>
    </div>
  )
}
