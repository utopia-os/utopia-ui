import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function SidebarSubmenu({
  submenu,
  name,
  icon,
}: {
  path: string
  // eslint-disable-next-line no-undef
  icon: JSX.Element
  name: string
  submenu?: any | undefined
}) {
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)

  /** Open Submenu list if path found in routes, this is for directly loading submenu routes  first time */
  useEffect(() => {
    if (
      submenu.filter((m) => {
        return m.path === location.pathname
      })[0]
    )
      setIsExpanded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex-col'>
      {/** Route header */}
      <div className='w-full' onClick={() => setIsExpanded(!isExpanded)}>
        {icon}{' '}
        <span
          className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:hidden"
          data-te-sidenav-slim='false'
        >
          {name}{' '}
        </span>
        <ChevronDownIcon
          className={
            'w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all  ' +
            (isExpanded ? 'rotate-180' : '')
          }
        />
      </div>

      {/** Submenu list */}
      <div className={' w-full data-[te-collapse-show]:!hidden ' + (isExpanded ? '' : 'hidden')}>
        <ul className={'menu menu-compact'}>
          {submenu.map((m, k) => {
            return (
              <li key={k}>
                <Link to={m.path} className=''>
                  {m.icon}
                  <span className='' data-te-sidenav-slim='false'>
                    {m.name}
                  </span>
                  {location.pathname === m.path ? (
                    <span
                      className='absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary '
                      aria-hidden='true'
                    ></span>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SidebarSubmenu
