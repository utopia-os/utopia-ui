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

  const [embedded, setEmbedded] = useState<boolean>(true)


  useEffect(() => {
      let params = new URLSearchParams(location.search);
      let embedded = params.get("embedded");
      embedded != "true" && setEmbedded(false)
  }, [location]);

  let params = new URLSearchParams(window.location.search);

  return (
      <nav
          id="sidenav"
          className={`group tw-fixed tw-left-0 tw-top-0 tw-z-[10035] tw-h-[var(--sidebar-height)] tw--translate-x-full tw-overflow-hidden tw-shadow-xl data-[te-sidenav-slim='true']:tw-hidden data-[te-sidenav-slim-collapsed='true']:tw-w-[56px] data-[te-sidenav-slim='true']:tw-w-[56px] data-[te-sidenav-hidden='false']:tw-translate-x-0 dark:tw-bg-zinc-800 [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='false']]:tw-hidden [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='true']]:[display:unset]`}
          style={{
            height: embedded ? '100vh' : 'calc(100vh - 64px)',
            marginTop: embedded ? '0' : '64px'
          }}
          data-te-sidenav-init
          data-te-sidenav-hidden="true"
          data-te-sidenav-mode="side"
          data-te-sidenav-slim="true"
          data-te-sidenav-content="#app-content"
          data-te-sidenav-slim-collapsed="true"
          data-te-sidenav-slim-width="56"
          data-te-sidenav-width="160">
        <div className='tw-flex tw-flex-col tw-h-full'>
          <div className='tw-flex-grow tw-overflow-y-auto'>
            <ul className="tw-menu tw-w-full tw-bg-base-100 tw-text-base-content tw-p-0" data-te-sidenav-menu-ref>
              {routes.map((route, k) => (
                  <li className="" key={k}>
                    {route.submenu ? (
                        <SidebarSubmenu {...route} />
                    ) : (
                        <NavLink
                            end
                            target={route.blank ? "_blank" : "_self"}
                            to={`${route.path}${params && '?'+params}`}
                            className={({ isActive }) => `${isActive ? 'tw-font-semibold tw-bg-base-200 !tw-rounded-none' : 'tw-font-normal !tw-rounded-none'}`}
                            onClick={() => {
                              if (screen.width < 640 && !slim) instance.toggle();
                            }}>
                          {route.icon}
                          <span className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:tw-hidden" data-te-sidenav-slim="false">{route.name}</span>
                          {(location.pathname.includes(route.path) && route.path.length > 1) || location.pathname === route.path ? (
                              <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-w-1 tw-rounded-tr-md tw-rounded-br-md tw-bg-primary" aria-hidden="true"></span>
                          ) : null}
                        </NavLink>
                    )}
                  </li>
              ))}
            </ul>

            <ul className="tw-menu tw-w-full tw-bg-base-100 tw-text-base-content tw-p-0 tw-mb-0" data-te-sidenav-menu-ref>
              {bottomRoutes?.map((route, k) => (
                  <li className="" key={k}>
                    {route.submenu ? (
                        <SidebarSubmenu {...route} />
                    ) : (
                        <NavLink
                            end
                            target={route.blank ? "_blank" : "_self"}
                            to={route.path}
                            className={({ isActive }) => `${isActive ? 'tw-font-semibold tw-bg-base-200 !tw-rounded-none' : 'tw-font-normal !tw-rounded-none'}`}
                            onClick={() => {
                              if (screen.width < 640 && !slim) instance.toggle();
                            }}>
                          {route.icon}
                          <span className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:tw-hidden" data-te-sidenav-slim="false">{route.name}</span>
                          {(location.pathname.includes(route.path) && route.path.length > 1) || location.pathname === route.path ? (
                              <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-w-1 tw-rounded-tr-md tw-rounded-br-md tw-bg-primary" aria-hidden="true"></span>
                          ) : null}
                        </NavLink>
                    )}
                  </li>
              ))}
            </ul>
          </div>

          <div className="tw-mt-auto tw-p-4 tw-bg-base-100">
            <ChevronRightIcon
                className={`tw-w-5 tw-h-5 tw-cursor-pointer tw-float-right tw-delay-400 tw-duration-500 tw-transition-all ${!slim ? "tw-rotate-180" : ''}`}
                onClick={() => toggleSlim()}
            />
          </div>
        </div>
      </nav>
  )
}
