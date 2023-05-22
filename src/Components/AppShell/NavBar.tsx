import { useState } from "react";
//import { useAuth } from "../api/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import QuestionMarkIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon'
import * as React from "react";


export default function NavBar({name, useAuth} : {name: string, useAuth : any}) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isAuthenticated, user, login, loading, logout, token } = useAuth();

  const onLogin = () => {
    toast.promise(
      login({ email: email, password: password }),
      {
        success: {
          render({data}){
            return `Hi ${data?.first_name}`
          },
          // other options
          icon: "✌️",
        },
        error: 'Error'
      });
  }

  return (
    <>
      <div className="tw-navbar tw-bg-base-100 tw-z-1000">
        <button className="tw-btn tw-btn-square tw-btn-ghost"
          data-te-sidenav-toggle-ref
          data-te-target="#sidenav"
          aria-controls="#sidenav"
          aria-haspopup="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="tw-inline-block tw-w-5 tw-h-5 tw-stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <div className="tw-flex-1 tw-mr-2">
        <div className="tw-flex-1 tw-truncate  tw-grid tw-grid-flow-col tw-max-w-72">
          <Link className="tw-btn tw-btn-ghost tw-px-2 tw-normal-case tw-text-xl tw-flex-1 tw-truncate" to={"/"}><p className="tw-truncate">{name}</p></Link>
          <label htmlFor="my-modal" className="tw-cursor-pointer"><div className="tw-btn tw-px-2  tw-btn-ghost "><QuestionMarkIcon className="tw-h-5 tw-w-5"/></div></label>
        </div>
        </div>


        
        {isAuthenticated && token ?
          <div className="tw-flex-none">
            <div className="tw-avatar">
              <div className="tw-w-10 tw-rounded-full">
                <img src={"https://map.api.free-planet-earth.org/assets/"+user?.avatar+"?access_token="+token} />
              </div>
            </div>
            <div className='tw-ml-2 tw-mr-2'>{user?.first_name}</div>
            <div className="tw-dropdown tw-dropdown-end">
              <label tabIndex={0} className="tw-btn tw-btn-ghost tw-btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </label>
              <ul tabIndex={0} className="tw-menu tw-menu-compact tw-dropdown-content tw-mt-3 tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box tw-w-52 !tw-z-[1000]">
                <li><Link to={"/settings"}>Settings</Link></li>
                <li><a onClick={() => { logout() }}>Logout</a></li>
              </ul>
            </div>
          </div>
          :
          <div className="tw-dropdown tw-dropdown-end tw-mr-2">
            <label tabIndex={0} className="tw-btn tw-btn-ghost">
              Login
            </label>
            <div tabIndex={0} className="tw-mt-3 tw-card tw-card-compact tw-dropdown-content tw-w-72 tw-bg-base-100 tw-shadow !tw-z-[1000]">
              <div className="tw-card-body">
                <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} className="tw-input tw-input-bordered tw-w-full tw-max-w-xs" />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="tw-input tw-input-bordered tw-w-full tw-max-w-xs" />
                <div className="tw-card-actions">
                  <button className={loading ? 'tw-btn tw-loading tw-btn-disabled tw-btn-block tw-btn-primary' : 'tw-btn tw-btn-primary tw-btn-block'} onClick={() => onLogin()}>Login</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
