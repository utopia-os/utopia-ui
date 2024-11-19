/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import QuestionMarkIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '#components/Auth'
import { useItems } from '#components/Map/hooks/useItems'
import { Item } from '#src/types'

export default function NavBar({ appName, userType }: { appName: string; userType: string }) {
  const { isAuthenticated, user, logout } = useAuth()

  const [userProfile, setUserProfile] = useState<Item>({} as Item)
  const items = useItems()

  useEffect(() => {
    const profile =
      user &&
      items.find((i) => i.user_created?.id === user.id && i.layer?.itemType.name === userType)
    profile
      ? setUserProfile(profile)
      : setUserProfile({ id: crypto.randomUUID(), name: user?.first_name, text: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, items])

  useEffect(() => {}, [userProfile])

  const nameRef = useRef<any>(null)
  const [nameWidth, setNameWidth] = useState<number>(0)
  const location = useLocation()
  const [showNav, setShowNav] = useState<boolean>(false)

  useEffect(() => {
    showNav && nameRef && setNameWidth(nameRef.current.scrollWidth)
  }, [nameRef, appName, showNav])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const embedded = params.get('embedded')
    embedded !== 'true' && setShowNav(true)
  }, [location])

  const onLogout = () => {
    toast.promise(logout(), {
      success: {
        render() {
          return 'Bye bye'
        },
        // other options
        icon: '👋',
      },
      error: {
        render({ data }) {
          return `${data}`
        },
      },
      pending: 'logging out ..',
    })
  }

  if (showNav) {
    return (
      <>
        <div className='tw-navbar tw-bg-base-100 tw-z-[10000] tw-shadow-xl tw-relative'>
          <button
            className='tw-btn tw-btn-square tw-btn-ghost'
            data-te-sidenav-toggle-ref
            data-te-target='#sidenav'
            aria-controls='#sidenav'
            aria-haspopup='true'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='tw-inline-block tw-w-5 tw-h-5 tw-stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
          <div className='tw-flex-1 tw-mr-2'>
            <div
              className='tw-flex-1 tw-truncate tw-grid tw-grid-flow-col'
              style={{ maxWidth: nameWidth + 60 }}
            >
              <Link
                className='tw-btn tw-btn-ghost tw-px-2 tw-normal-case tw-text-xl tw-flex-1 tw-truncate'
                to={'/'}
              >
                <h1 ref={nameRef} className='tw-truncate'>
                  {appName}
                </h1>
              </Link>
              <button
                className='tw-btn tw-px-2  tw-btn-ghost'
                onClick={() => window.my_modal_3.showModal()}
              >
                <QuestionMarkIcon className='tw-h-5 tw-w-5' />
              </button>
            </div>
          </div>

          {isAuthenticated ? (
            <div className='tw-flex-none'>
              <Link
                to={`${userProfile.id && '/item/' + userProfile.id}`}
                className='tw-flex tw-items-center'
              >
                {userProfile?.image && (
                  <div className='tw-avatar'>
                    <div className='tw-w-10 tw-rounded-full'>
                      <img src={'https://api.utopia-lab.org/assets/' + userProfile.image} />
                    </div>
                  </div>
                )}
                <div className='tw-ml-2 tw-mr-2'>{userProfile.name || user?.first_name}</div>
              </Link>
              <div className='tw-dropdown tw-dropdown-end'>
                <label tabIndex={0} className='tw-btn tw-btn-ghost tw-btn-square'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='tw-h-5 tw-w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className='tw-menu tw-menu-compact tw-dropdown-content tw-mt-3 tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box tw-w-52 !tw-z-[10000]'
                >
                  <li>
                    <Link to={`${userProfile.id && '/edit-item/' + userProfile.id}`}>Profile</Link>
                  </li>
                  <li>
                    <Link to={'/user-settings'}>Settings</Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        onLogout()
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className='tw-hidden md:tw-flex'>
                <Link to={'/login'}>
                  <div className='tw-btn tw-btn-ghost tw-mr-2'>Login</div>
                </Link>

                <Link to={'/signup'}>
                  <div className='tw-btn tw-btn-ghost tw-mr-2'>Sign Up</div>
                </Link>
              </div>
              <div className='tw-dropdown tw-dropdown-end'>
                <label tabIndex={1} className='tw-btn tw-btn-ghost md:tw-hidden'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='tw-h-5 tw-w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                  </svg>
                </label>
                <ul
                  tabIndex={1}
                  className='tw-menu tw-dropdown-content tw-mt-3 tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box tw-w-52 !tw-z-[10000]'
                >
                  <li>
                    <Link to={'/login'}>Login</Link>
                  </li>
                  <li>
                    <Link to={'/signup'}>Sign Up</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </>
    )
  } else return <></>
}
