import { useState } from 'react'
import SVG from 'react-inlinesvg'
import { Link, useNavigate } from 'react-router-dom'

import { useLayers } from '#components/Map/hooks/useLayers'
import { AvatarWidget } from '#components/Profile/Subcomponents/AvatarWidget'

import type { LayerProps } from '#src/index'

// Schritt-Komponenten
const Step1 = () => {
  const layers = useLayers()
  return (
    <div>
      <h2 className='tw:text-lg tw:font-bold tw:mb-2'>
        Willkommen auf der Karte der Menschlich Wirtschaften eG
      </h2>
      <p className='tw:mb-2'>
        Diese interaktiven Karte zeigt das Netzwerk von Menschlich Wirtschaften eG.
      </p>
      <p className='tw:mb-4'>Hier findest du verschiedene Layer:</p>
      {layers.map((layer: LayerProps) => (
        <span className='tw:flex tw:flex-row tw:mt-2 tw:pl-4' key={layer.name}>
          <SVG
            src={layer.menuIcon}
            className='tw:w-6 tw:h-6 tw:mr-2'
            preProcessor={(code: string) => code.replace(/fill=".*?"/g, 'fill="currentColor"')}
          />
          <p>{layer.name}</p>
        </span>
      ))}
      <p className='tw:mt-4'>Erstelle dir im nächsten Schritt dein Profil zu erstellen </p>
    </div>
  )
}

const Step2 = () => {
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <div className='tw:space-y-2'>
      <h3 className='tw:text-lg tw:font-bold'>Erstelle dir deinen Acount</h3>
      <p className='tw:my-4'>
        Werde Teil des Netzwerks und erstelle dir dein Profil und zeige dich auf der Karte!
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
        onChange={(e) => setPassword(e.target.value)}
        className='tw:input tw:input-bordered tw:w-full tw:max-w-xs'
      />
      <p className='tw:mt-4 tw:mb-8'>
        Du hast schon einen Account?{' '}
        <Link
          className='tw:inline-block tw:hover:text-primary tw:hover:underline tw:hover:cursor-pointer tw:transition tw:duration-200 tw:text-primary'
          onClick={() => close()}
          to='/login'
        >
          Dann logge dich ein!
        </Link>
      </p>
    </div>
  )
}

const Step3 = () => {
  const [avatar, setAvatar] = useState<string>('')
  return (
    <div>
      <h3 className='tw:text-lg tw:font-bold tw:text-center'>Lade ein Bild von dir hoch</h3>
      <div className='tw:mt-4 tw:flex tw:justify-center tw:items-center'>
        <AvatarWidget avatar={avatar} setAvatar={setAvatar} />
      </div>
      <div className='tw:mt-4 tw:flex tw:justify-center'>
        <button className='tw:btn tw:justify-center' onClick={() => setAvatar('')}>
          Select
        </button>
      </div>
    </div>
  )
}

const Step4 = () => (
  <div>
    <h3 className='tw:text-lg tw:font-bold'>Place your Profile on the Map!</h3>
    <p>Let&apos;s get started! Add your first project or profile.</p>
  </div>
)

const stepsTitles = ['Willkommen', 'Account', 'Avatar', 'Marker']

export const Onboarding = () => {
  const close = () => {
    navigate('/')
  }

  const navigate = useNavigate()

  const [stepIndex, setStepIndex] = useState(0)

  const steps = [<Step1 key={1} />, <Step2 key={2} />, <Step3 key={3} />, <Step4 key={4} />]

  const isLast = stepIndex === steps.length - 1
  const isFirst = stepIndex === 0

  return (
    <div className='tw:max-w-xl tw:w-full tw:mx-auto tw:p-4'>
      <div>
        {steps[stepIndex]}

        <div className='tw:flex tw:justify-between tw:mt-6'>
          <button
            className={`${isFirst ? 'tw:invisible' : 'tw:btn'}`}
            onClick={() => setStepIndex((i) => i - 1)}
          >
            Back
          </button>
          <div className='tw:flex tw:items-center tw:justify-center tw:my-4 tw:gap-2'>
            {Array.from({ length: steps.length }).map((_, i) => (
              <div
                key={i}
                className={`tw:w-3 tw:h-3 tw:rounded-full ${
                  i <= stepIndex ? 'tw:bg-primary' : 'tw:bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          {!isLast ? (
            <button className='tw:btn tw:btn-primary' onClick={() => setStepIndex((i) => i + 1)}>
              Next
            </button>
          ) : (
            <button className='tw:btn tw:btn-success' onClick={() => close()}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
