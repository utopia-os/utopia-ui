import { useRef, useState } from 'react'
import SVG from 'react-inlinesvg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '#components/Auth/useAuth'
import { useLayers } from '#components/Map/hooks/useLayers'

import { SetAvatar } from './Steps/SetAvatar'
import { Signup } from './Steps/Signup'

import type { LayerProps, UserItem } from '#src/index'
import type { SignupHandle } from './Steps/Signup'

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

const Step4 = () => (
  <div>
    <h3 className='tw:text-lg tw:font-bold'>Place your Profile on the Map!</h3>
    <p>Let&apos;s get started! Add your first project or profile.</p>
  </div>
)

export const Onboarding = () => {
  const signupRef = useRef<SignupHandle>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleNext = async () => {
    const currentStep = steps[stepIndex]

    if (loading) return

    if (currentStep.onNext) {
      try {
        setLoading(true)
        const result = await currentStep.onNext()

        if (result) {
          const user = result as UserItem
          const successMessage = currentStep.toastSuccess?.message?.replace(
            '{firstName}',
            user.first_name ?? 'Traveler',
          )
          toast.success(successMessage ?? `Hi ${user.first_name ?? 'Traveler'}`, {
            icon: currentStep.toastSuccess?.icon ?? '✌️',
          })
          setStepIndex((i) => i + 1)
        }
        // eslint-disable-next-line no-catch-all/no-catch-all
      } catch (error) {
        toast.error(
          currentStep.toastError?.message ??
            (error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten'),
          {
            autoClose: currentStep.toastError?.autoClose ?? 10000,
          },
        )
      } finally {
        setLoading(false)
      }
    }
  }

  const [stepIndex, setStepIndex] = useState(0)

  interface StepDefinition {
    component: JSX.Element
    onNext?: () => Promise<unknown> | void
    toastSuccess?: {
      message?: string
      icon?: string
    }
    toastError?: {
      message?: string
      autoClose?: number
    }
    loading?: {
      message?: string
    }
  }

  const steps: StepDefinition[] = [
    {
      component: <Step1 />,
      onNext: () => setStepIndex((i) => i + 1),
    },
    {
      component: <Signup ref={signupRef} />,
      onNext: async () => {
        return await signupRef.current?.submit()
      },
      toastSuccess: {
        message: 'Hi {firstName}!',
        icon: '✌️',
      },
      toastError: {
        message: 'Registration failed. Please try again.',
        autoClose: 8000,
      },
      loading: {
        message: 'Creating your account...',
      },
    },
    {
      component: <SetAvatar />,
      onNext: () => setStepIndex((i) => i + 1),
      toastSuccess: {
        message: 'Avatar uploaded successfully!',
        icon: '🖼️',
      },
      loading: {
        message: 'Uploading avatar...',
      },
    },
    {
      component: <Step4 />,
      onNext: () => navigate('/'),
      toastSuccess: {
        message: 'Welcome to the community!',
        icon: '🎉',
      },
      loading: {
        message: 'Finalizing your profile...',
      },
    },
  ]

  const isLast = stepIndex === steps.length - 1
  const isFirst = stepIndex === 0

  return (
    <div className='tw:max-w-xl tw:w-full tw:mx-auto tw:p-4'>
      <div>
        {steps[stepIndex].component}

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
            <button
              className={`tw:btn ${loading ? 'tw:btn-disabled' : 'tw:btn-primary'}`}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleNext}
            >
              {loading ? <span className='tw:loading tw:loading-spinner'></span> : 'Next'}
            </button>
          ) : (
            <button className='tw:btn tw:btn-success' onClick={close}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
