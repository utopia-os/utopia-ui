import * as React from 'react'
import { MapOverlayPage } from '../Templates'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserItem } from '../../types'
import { toast } from 'react-toastify'
import { useAuth } from '../Auth'
import { TextInput } from '../Input'

export function UserSettings() {
  const { user, updateUser, loading /* token */ } = useAuth()

  const [id, setId] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [passwordChanged, setPasswordChanged] = useState<boolean>(false)

  const navigate = useNavigate()

  React.useEffect(() => {
    setId(user?.id ? user.id : '')
    setEmail(user?.email ? user.email : '')
    setPassword(user?.password ? user.password : '')
  }, [user])

  const onUpdateUser = () => {
    let changedUser = {} as UserItem

    changedUser = { id, email, ...(passwordChanged && { password }) }

    toast
      .promise(updateUser(changedUser), {
        pending: 'updating Profile  ...',
        success: 'Profile updated',
        error: {
          render({ data }) {
            return `${data}`
          },
        },
      })
      .then(() => navigate('/'))
  }

  return (
    <MapOverlayPage
      backdrop
      className='tw-mx-4 tw-mt-4 tw-max-h-[calc(100dvh-96px)] tw-h-fit md:tw-w-[calc(50%-32px)] tw-w-[calc(100%-32px)] tw-max-w-xl !tw-left-auto tw-top-0 tw-bottom-0'
    >
      <div className={'tw-text-xl tw-font-semibold'}>Settings</div>
      <div className='tw-divider tw-mt-2'></div>
      <div className='tw-grid tw-grid-cols-1 tw-gap-6'>
        <TextInput
          type='email'
          placeholder='new E-Mail'
          defaultValue={user?.email ? user.email : ''}
          updateFormValue={(v) => setEmail(v)}
        />
        <TextInput
          type='password'
          placeholder='new Password'
          defaultValue={user?.password ? user.password : ''}
          updateFormValue={(v) => {
            setPassword(v)
            setPasswordChanged(true)
          }}
        />
        {/* <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/> */}
      </div>

      <div className='tw-mt-8'>
        <button
          className={
            loading
              ? ' tw-loading tw-btn-disabled tw-btn tw-btn-primary tw-float-right'
              : 'tw-btn tw-btn-primary tw-float-right'
          }
          onClick={() => onUpdateUser()}
        >
          Update
        </button>
      </div>
    </MapOverlayPage>
  )
}
