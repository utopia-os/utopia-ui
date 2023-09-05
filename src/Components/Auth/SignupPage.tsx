import { useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorText from '../Typography/ErrorText'
import {TextInput} from '../Input/TextInput'
import * as React from 'react'

export function SignupPage() {

    const INITIAL_REGISTER_OBJ = {
        name : "",
        password : "",
        emailId : ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(registerObj.name.trim() === "")return setErrorMessage("Name is required! (use any value)")
        if(registerObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        if(registerObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
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

    return (
        <div className="tw-flex-1 tw-bg-base-200 tw-flex tw-items-center">
            <div className="tw-card tw-mx-auto tw-w-full tw-max-w-md  tw-shadow-xl">
                <div className="tw-grid  md:tw-grid-cols-1 tw-grid-cols-1  tw-bg-base-100 tw-rounded-xl">
                    <div className='tw-py-10 tw-px-10'>
                        <h2 className='tw-text-2xl tw-font-semibold tw-mb-2 tw-text-center'>Sign Up</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">
                                <TextInput defaultValue={registerObj.name} containerStyle="tw-mt-4" labelTitle="Name" updateFormValue={updateFormValue} />
                                <TextInput defaultValue={registerObj.emailId} containerStyle="tw-mt-4" labelTitle="E-Mail" updateFormValue={updateFormValue} />
                                <TextInput defaultValue={registerObj.password} type="password"  containerStyle="tw-mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                            </div>

                            <ErrorText styleClass="tw-mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"tw-btn tw-mt-2 tw-w-full tw-btn-primary" + (loading ? " tw-loading" : "")}>Register</button>

                            <div className='tw-text-center tw-mt-4'>Already have an account? <Link to="/login"><span className="  tw-inline-block  hover:tw-text-primary hover:tw-underline hover:tw-cursor-pointer tw-transition tw-duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
