import Bars3Icon from '@heroicons/react/16/solid/Bars3Icon'
import EllipsisVerticalIcon from '@heroicons/react/16/solid/EllipsisVerticalIcon'
import QuestionMarkIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '#components/Auth/useAuth'
import { useItems } from '#components/Map/hooks/useItems'

import { useAppState, useSetAppState } from './hooks/useAppState'

import type { Item } from '#types/Item'

export default function NavBar({ appName }: { appName: string }) {
  const { isAuthenticated, user, logout } = useAuth()

  const [userProfile, setUserProfile] = useState<Item>({} as Item)
  const items = useItems()

  const appState = useAppState()
  const setAppState = useSetAppState()

  const toggleSidebar = () => {
    setAppState({ sideBarOpen: !appState.sideBarOpen })
  }

  useEffect(() => {
    const profile =
      user && items.find((i) => i.user_created?.id === user.id && i.layer?.userProfileLayer)
    profile
      ? setUserProfile(profile)
      : setUserProfile({ id: crypto.randomUUID(), name: user?.first_name ?? '', text: '' })
  }, [user, items])

  const nameRef = useRef<HTMLHeadingElement>(null)
  const [nameWidth, setNameWidth] = useState<number>(0)
  const location = useLocation()
  const [showNav, setShowNav] = useState<boolean>(false)

  useEffect(() => {
    showNav && nameRef.current && setNameWidth(nameRef.current.scrollWidth)
  }, [nameRef, appName, showNav])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const embedded = params.get('embedded')
    embedded !== 'true' && setShowNav(true)
  }, [location])

  const onLogout = async () => {
    await toast.promise(logout(), {
      success: {
        render() {
          return 'Bye bye'
        },
        // other options
        icon: '👋',
      },
      error: {
        render({ data }) {
          return JSON.stringify(data)
        },
      },
      pending: 'logging out ..',
    })
  }

  if (showNav) {
    return (
      <>
        <div className='tw:navbar tw:bg-base-100 tw:z-9998 tw:shadow-xl tw:relative tw:p-0'>
          <button
            className='tw:btn tw:btn-square tw:btn-ghost tw:ml-3'
            aria-controls='#sidenav'
            aria-haspopup='true'
            onClick={() => toggleSidebar()}
          >
            <Bars3Icon className='tw:inline-block tw:w-5 tw:h-5' />
          </button>
          <div className='tw:flex-1 tw:mr-2'>
            <div
              className={'tw:flex-1 tw:truncate tw:grid tw:grid-flow-col'}
              style={{ maxWidth: nameWidth + 60 }}
            >
              <Link
                className='tw:btn tw:btn-ghost tw:px-2 tw:normal-case tw:text-xl tw:flex-1 tw:truncate'
                to={'/'}
              >
                <h1 ref={nameRef} className='tw:truncate'>
                  {appName}
                </h1>
              </Link>
              <button
                className='tw:btn tw:px-2  tw:btn-ghost'
                onClick={() => window.my_modal_3.showModal()}
              >
                <QuestionMarkIcon className='tw:h-5 tw:w-5' />
              </button>
            </div>
          </div>

          {isAuthenticated ? (
            <div className='tw:flex tw:mr-2'>
              <Link
                to={`${userProfile.id && '/item/' + userProfile.id}`}
                className='tw:flex tw:items-center'
              >
                {userProfile.image && (
                  <div className='tw:avatar'>
                    <div className='tw:w-10 tw:rounded-full'>
                      <img src={appState.assetsApi.url + userProfile.image} />
                    </div>
                  </div>
                )}
                <div className='tw:ml-2 tw:mr-2'>{userProfile.name || user?.first_name}</div>
              </Link>
              <div className='tw:dropdown tw:dropdown-end'>
                <label tabIndex={0} className='tw:btn tw:btn-ghost tw:btn-square'>
                  <EllipsisVerticalIcon className='tw:h-5 tw:w-5' />
                </label>
                <ul
                  tabIndex={0}
                  className='tw:menu tw:menu-compact tw:dropdown-content tw:mt-4 tw:p-2 tw:shadow tw:bg-base-100 tw:rounded-box tw:w-52 tw:z-10000!'
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
                        void onLogout()
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className='tw:mr-2 tw:flex tw:items-center'>
              <div className='tw:hidden tw:md:flex'>
                <Link to={'/login'}>
                  <div className='tw:self-center tw:btn tw:btn-ghost tw:mr-2'>Login</div>
                </Link>

                <Link to={'/signup'}>
                  <div className='tw:btn tw:btn-ghost tw:mr-2'>Sign Up</div>
                </Link>
              </div>
              <div className='tw:dropdown tw:dropdown-end'>
                <label tabIndex={1} className='tw:btn tw:btn-ghost tw:md:hidden'>
                  <EllipsisVerticalIcon className='tw:h-5 tw:w-5' />
                </label>
                <ul
                  tabIndex={1}
                  className='tw:menu tw:dropdown-content tw:mt-4 tw:p-2 tw:shadow tw:bg-base-100 tw:rounded-box tw:w-52 tw:z-10000!'
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
