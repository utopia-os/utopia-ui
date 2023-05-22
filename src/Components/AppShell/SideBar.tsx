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
}


export function SideBar({routes} : {routes : route[]}) {

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
      className="tw-group tw-fixed tw-left-0  tw-mt-16 tw-top-0 tw-z-[1035] tw-h-full -translate-x-full tw-overflow-hidden tw-bg-white tw-shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-slim='true']:tw-hidden data-[te-sidenav-slim-collapsed='true']:tw-w-[56px] data-[te-sidenav-slim='true']:tw-w-[56px] data-[te-sidenav-hidden='false']:tw-translate-x-0 dark:tw-bg-zinc-800 [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='false']]:tw-hidden [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='true']]:[display:unset]"
      data-te-sidenav-init
      data-te-sidenav-hidden="false"
      data-te-sidenav-mode="side"
      data-te-sidenav-slim="true"
      data-te-sidenav-content="#app-content"
      data-te-sidenav-slim-collapsed="true"
      data-te-sidenav-slim-width ="56"
      data-te-sidenav-width ="160">
        <div className='tw-flex tw-flex-col tw-h-full' style={{height: "calc(100vh - 64px)"}}>
      <ul className="tw-menu tw-w-full tw-bg-base-100 tw-text-base-content" data-te-sidenav-menu-ref>
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
                      className={({ isActive }) => `${isActive ? 'tw-font-semibold  tw-bg-base-200 ' : 'tw-font-normal'}`} onClick={ () => {if(screen.width < 640 && !slim) instance.toggle();
                      }}>
                      {route.icon}<span className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:tw-hidden" data-te-sidenav-slim="false">{route.name}</span>
                      {
                        location.pathname.includes(route.path) && route.path.length>1 || location.pathname === route.path? (<span className="tw-absolute tw-inset-y-0 tw-left-0 tw-w-1 tw-rounded-tr-md tw-rounded-br-md tw-bg-primary "
                          aria-hidden="true"></span>) : null
                      }
                    </NavLink>)
                }

              </li>
            )
          })
        }

        {/* 
        <li className="relative">
          <a
            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            data-te-sidenav-link-ref>
            <span
              className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                  clipRule="evenodd" />
              </svg>
            </span>
            <span
              className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:hidden"
              data-te-sidenav-slim="false"
            >Category 1</span>
            <span
              className="absolute right-0 ml-auto mr-[0.5rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
              data-te-sidenav-rotate-icon-ref>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd" />
              </svg>
            </span>
          </a>
          <ul
            className="!visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
            data-te-sidenav-collapse-ref>
            <li className="relative">
              <a
                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
              >Link 2</a>
            </li>
            <li className="relative">
              <a
                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
              >Link 3</a>
            </li>
          </ul>
        </li>
        <li className="relative">
          <a
            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            data-te-sidenav-link-ref>
            <span
              className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                  clipRule="evenodd" />
              </svg>
            </span>
            <span
              className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:hidden"
              data-te-sidenav-slim="false"
            >Category 2</span
            >
            <span
              className="absolute right-0 ml-auto mr-[0.5rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
              data-te-sidenav-rotate-icon-ref>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd" />
              </svg>
            </span>
          </a>
          <ul
            className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
            data-te-sidenav-collapse-ref>
            <li className="relative">
              <a
                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
              >Link 4</a
              >
            </li>
            <li className="relative">
              <a
                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
              >Link 5</a
              >
            </li>
          </ul>
        </li>
              */}
      </ul>
      <div id="slim-toggler" className='tw-w-full tw-pr-4  tw-flex-1 tw-grid tw-place-items-end' aria-haspopup="true" >
        
        <ChevronRightIcon className={"tw-w-5 tw-h-5 tw-mb-4  tw-cursor-pointer tw-float-right tw-delay-400 tw-duration-500 tw-transition-all " + (!slim ? "tw-rotate-180" : '')} onClick={   () =>   toggleSlim()}/>
      </div>
      </div>
    </nav>
  )
}
