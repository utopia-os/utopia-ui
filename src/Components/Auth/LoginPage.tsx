import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import ErrorText from '../Typography/ErrorText'
import InputText from '../Input/InputText'
import * as React from 'react'

export function LoginPage(){

    const INITIAL_LOGIN_OBJ = {
        password : "",
        emailId : ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(loginObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        if(loginObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
        else{
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            localStorage.setItem("token", "DumyTokenHere")
            setLoading(false)
            window.location.href = '/app/welcome'
        }
    }

    const updateFormValue = (val: string) => {
        console.log(val)
      }

    return(
        <div className="tw-flex-1 tw-bg-base-200 tw-flex tw-items-center">
            <div className="tw-card tw-mx-auto tw-w-full tw-max-w-md  tw-shadow-xl">
                <div className="tw-grid  md:tw-grid-cols-1 tw-grid-cols-1  tw-bg-base-100 tw-rounded-xl">
                <div className='tw-py-10 tw-px-10'>
                    <h2 className='tw-text-2xl tw-font-semibold tw-mb-2 tw-text-center'>Login</h2>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="tw-mb-4">

                            <InputText type="email" defaultValue={loginObj.emailId} containerStyle="tw-mt-4" labelTitle="E-Mail" updateFormValue={(v) => updateFormValue(v)}/>

                            <InputText defaultValue={loginObj.password} type="password"  containerStyle="tw-mt-4" labelTitle="Password" updateFormValue={(v) => updateFormValue(v)}/>

                        </div>

                        <div className='tw-text-right tw-text-primary'><Link to="/forgot-password"><span className="tw-text-sm  tw-inline-block  hover:tw-text-primary hover:tw-underline hover:tw-cursor-pointer tw-transition tw-duration-200">Forgot Password?</span></Link>
                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"tw-btn tw-mt-2 tw-w-full tw-btn-primary" + (loading ? " tw-loading" : "")}>Login</button>

                        <div className='tw-text-center tw-mt-4'>Don't have an account yet? <Link to="/signup"><span className="  tw-inline-block  hover:tw-text-primary hover:tw-underline hover:tw-cursor-pointer tw-transition tw-duration-200">Sign Up</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}
