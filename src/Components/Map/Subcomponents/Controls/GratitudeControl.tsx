import { useNavigate } from 'react-router-dom'

import { useAuth } from '#components/Auth/useAuth'

export const GratitudeControl = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <div className='tw-card tw-bg-base-100 tw-shadow-xl tw-mt-2 tw-w-fit'>
        {
          <div
            className='tw-card-body hover:tw-bg-slate-300 tw-card tw-p-2 tw-h-10 tw-w-10 tw-transition-all tw-duration-300 hover:tw-cursor-pointer'
            onClick={() => {
              navigate('/select-user')
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
              />
            </svg>
          </div>
        }
      </div>
    )
  } else return <></>
}
