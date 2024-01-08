import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorText from '../Typography/ErrorText'
import { TextInput } from '../Input/TextInput'
import * as React from 'react'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'
import { MapOverlayPage } from '../Templates'

export function SignupPage() {

    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const { register, loading } = useAuth();

    const navigate = useNavigate();

    const onRegister = async () => {
        await toast.promise(
            register({ email: email, password: password }, userName),
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
                },
                pending: 'creating new user ...'
            });
    }


    return (
        <MapOverlayPage>
            <h2 className='tw-text-2xl tw-font-semibold tw-mb-2 tw-text-center'>Sign Up</h2>
            <input type="text" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} className="tw-input tw-input-bordered tw-w-full tw-max-w-xs" />
            <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} className="tw-input tw-input-bordered tw-w-full tw-max-w-xs" />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="tw-input tw-input-bordered tw-w-full tw-max-w-xs" />
            <div className="tw-card-actions tw-mt-4">
                <button className={loading ? 'tw-btn tw-btn-disabled tw-btn-block tw-btn-primary' : 'tw-btn tw-btn-primary tw-btn-block'} onClick={() => onRegister()}>{loading ? <span className="tw-loading tw-loading-spinner"></span> : 'Sign Up'}</button>
            </div>
        </MapOverlayPage>
    )
}

