import { forwardRef, useImperativeHandle, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '#components/Auth/useAuth'

import type { UserItem } from '#components/Auth/useAuth'

export interface SignupHandle {
  submit: () => Promise<UserItem | undefined>
}

export const Signup = forwardRef<SignupHandle>((_, ref) => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { register } = useAuth()

  useImperativeHandle(ref, () => ({
    submit: async () => {
      return register({ email, password }, userName)
    },
  }))

  return (
    <div className='tw:space-y-2'>
      <h3 className='tw:text-lg tw:font-bold'>Erstelle dir deinen Account</h3>
      <p className='tw:my-4'>
        Werde Teil des Netzwerks und erstelle dein Profil und zeige dich auf der Karte!
      </p>
      <input
        type='text'
        placeholder='Name'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className='tw:input tw:input-bordered tw:w-full tw:max-w-xs'
      />
      <input
        type='email'
        placeholder='E-Mail'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='tw:input tw:input-bordered tw:w-full tw:max-w-xs'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='tw:input tw:input-bordered tw:w-full tw:max-w-xs'
      />
      <p className='tw:mt-4 tw:mb-8'>
        Du hast schon einen Account?{' '}
        <Link
          className='tw:inline-block tw:hover:text-primary tw:hover:underline tw:hover:cursor-pointer tw:transition tw:duration-200 tw:text-primary'
          to='/login'
        >
          Dann logge dich ein!
        </Link>
      </p>
    </div>
  )
})
Signup.displayName = 'Signup'
