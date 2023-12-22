import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidenav,
  initTE,
} from "tw-elements";
import SidebarSubmenu from './SidebarSubmenu';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import * as React from 'react';

type route = {
  path: string;
  icon: JSX.Element;
  name: string;
  submenu?: route;
  blank?: boolean
}


export function SideBar({ routes, bottomRoutes }: { routes: route[], bottomRoutes?: route[] }) {

  // prevent react18 from calling useEffect twice
  const init = useRef(false)

  const location = useLocation();

  const [instance, setInstance] = useState<any>(null);
  const [slim, setSlim] = useState<boolean>(false);



  const toggleSlim = () => {
    setSlim(!slim);
    instance.toggleSlim();
  }



  useEffect(() => {
    if (!init.current) {
      initTE({ Sidenav });
      const instance = Sidenav.getInstance(
        document.getElementById("sidenav")
      );
      setInstance(instance);
      instance.toggleSlim();
      init.current = true;
    }
  }, [])

  return (
    <nav
      id="sidenav"
      className="group tw-fixed tw-left-0  tw-mt-16 tw-top-0 tw-z-[1035] tw-h-[calc(100dvh-64px)] tw--translate-x-full tw-overflow-hidden tw-shadow-xl data-[te-sidenav-slim='true']:tw-hidden data-[te-sidenav-slim-collapsed='true']:tw-w-[56px] data-[te-sidenav-slim='true']:tw-w-[56px] data-[te-sidenav-hidden='false']:tw-translate-x-0 dark:tw-bg-zinc-800 [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='false']]:tw-hidden [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='true']]:[display:unset]"
      data-te-sidenav-init
      data-te-sidenav-hidden="true"
      data-te-sidenav-mode="side"
      data-te-sidenav-slim="true"
      data-te-sidenav-content="#app-content"
      data-te-sidenav-slim-collapsed="true"
      data-te-sidenav-slim-width="56"
      data-te-sidenav-width="160">
      <div className='tw-flex tw-flex-col tw-h-[calc(100dvh-64px)]'>
        <ul className="tw-menu tw-w-full tw-bg-base-100 tw-text-base-content tw-p-0" data-te-sidenav-menu-ref>
          {
            routes.map((route, k) => {
              return (
                <li className="" key={k}>
                  {
                    route.submenu ?
                      <SidebarSubmenu {...route} /> :
                      (<NavLink
                        end
                        to={route.path}
                        className={({ isActive }) => `${isActive ? 'tw-font-semibold  tw-bg-base-200 !tw-rounded-none' : 'tw-font-normal !tw-rounded-none'}`} onClick={() => {
                          if (screen.width < 640 && !slim) instance.toggle();
                        }}>
                        {route.icon}<span className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:tw-hidden" data-te-sidenav-slim="false">{route.name}</span>
                        {
                          location.pathname.includes(route.path) && route.path.length > 1 || location.pathname === route.path ? (<span className="tw-absolute tw-inset-y-0 tw-left-0 tw-w-1 tw-rounded-tr-md tw-rounded-br-md tw-bg-primary "
                            aria-hidden="true"></span>) : null
                        }
                      </NavLink>)
                  }

                </li>
              )
            })
          }
        </ul>

        <div id="slim-toggler" className='tw-w-full  tw-flex-1 tw-grid tw-place-items-end' aria-haspopup="true" >
          <div className='tw-w-full'>

            <ul className="tw-menu tw-w-full tw-bg-base-100 tw-text-base-content tw-p-0 tw-mb-0" data-te-sidenav-menu-ref>
              {
                bottomRoutes?.map((route, k) => {
                  return (
                    <li className="" key={k}>
                      {
                        route.submenu ?
                          <SidebarSubmenu {...route} /> :
                          (<NavLink
                            end
                            target={route.blank ? "_blank" : "_self"}
                            to={route.path}
                            className={({ isActive }) => `${isActive ? 'tw-font-semibold  tw-bg-base-200 !tw-rounded-none' : 'tw-font-normal !tw-rounded-none'}`} onClick={() => {
                              if (screen.width < 640 && !slim) instance.toggle();
                            }}>
                            {route.icon}<span className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:tw-hidden" data-te-sidenav-slim="false">{route.name}</span>
                            {
                              location.pathname.includes(route.path) && route.path.length > 1 || location.pathname === route.path ? (<span className="tw-absolute tw-inset-y-0 tw-left-0 tw-w-1 tw-rounded-tr-md tw-rounded-br-md tw-bg-primary "
                                aria-hidden="true"></span>) : null
                            }
                          </NavLink>)
                      }

                    </li>
                  )
                })
              }
            </ul>

            <ChevronRightIcon className={"tw-w-5 tw-h-5 tw-mb-4 tw-mr-4  tw-cursor-pointer tw-float-right tw-delay-400 tw-duration-500 tw-transition-all " + (!slim ? "tw-rotate-180" : '')} onClick={() => toggleSlim()} />

          </div>
        </div>
      </div>
    </nav>
  )
}
