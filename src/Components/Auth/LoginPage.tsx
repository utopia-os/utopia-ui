import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorText from '../Typography/ErrorText'
import { TextInput } from '../Input/TextInput'
import * as React from 'react'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'
import { MapOverlayPage} from '../Templates'

export function LoginPage() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { login, loading } = useAuth();

    const navigate = useNavigate();

    const onLogin = async () => {
        await toast.promise(
            login({ email: email, password: password }),
            {
                success: {
                    render({ data }) {
                        navigate(`/`);
                        return `Hi ${data?.first_name}`
                    },
                    // other options
                    icon: "✌️",
                },
                error: {
                    render({ data }) {
                        return `${data}`
                    },
                    autoClose: 10000,
                },
                pending: 'logging in ...',
            });
    }


    

    useEffect(() => {
        const keyDownHandler = event => {   
          if (event.key === 'Enter') {
            event.preventDefault();
            onLogin();
          }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, [onLogin]);

    return (
        <MapOverlayPage backdrop className='tw-max-w-xs tw-h-fit'>
            <h2 className='tw-text-2xl tw-font-semibold tw-mb-2 tw-text-center'>Login</h2>
            <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} className="tw-input tw-input-bordered tw-w-full tw-max-w-xs" />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="tw-input tw-input-bordered tw-w-full tw-max-w-xs" />
            <div className='tw-text-right tw-text-primary'><Link to="/reset-password"><span className="tw-text-sm  tw-inline-block  hover:tw-text-primary hover:tw-underline hover:tw-cursor-pointer tw-transition tw-duration-200">Forgot Password?</span></Link>
                        </div>
            <div className="tw-card-actions">
                <button className={loading ? 'tw-btn tw-btn-disabled tw-btn-block tw-btn-primary' : 'tw-btn tw-btn-primary tw-btn-block'} onClick={() => onLogin()}>{loading ? <span className="tw-loading tw-loading-spinner"></span> : 'Login'}</button>
            </div>
        </MapOverlayPage>
    )
}

