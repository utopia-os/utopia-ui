import { useEffect, useRef, useState } from 'react'
import { TitleCard } from '../Templates/TitleCard'
import { TextInput } from '../Input/TextInput'
import { TextAreaInput } from '../Input/TextAreaInput'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth';
import * as React from 'react'
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-toastify/dist/ReactToastify.css';
import { UserItem } from '../../types';
import DialogModal from '../Templates/DialogModal';
import { useAssetApi } from '../AppShell/hooks/useAssets';
import { ColorPicker } from './ColorPicker';

export function UserSettings() {
  const { user, updateUser, loading, token } = useAuth();

  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");



  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);



  const navigate = useNavigate();

  useEffect(() => {
    setId(user?.id ? user.id : "");
    setEmail(user?.email ? user.email : "");
    setPassword(user?.password ? user.password : "");
  }, [user])






  const onUpdateUser = () => {
    let changedUser = {} as UserItem;

    changedUser = { id: id,  email: email,  ...passwordChanged && { password: password }};


    toast.promise(

      updateUser(changedUser),
      {
        pending: 'updating Profile  ...',
        success: 'Profile updated',
        error: {
          render({ data }) {
            return `${data}`
          },
        },
      })
      .then(() => navigate("/"));
  }


  return (
    <>
      <main className="tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden tw-pt-8 tw-px-6 tw-bg-base-200 tw-min-w-80 tw-flex tw-justify-center" >
        <div className='tw-w-full xl:tw-max-w-6xl'>
          <TitleCard title="Settings" topMargin="tw-mt-2" className='tw-mb-6'>


            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
              <TextInput type='email' placeholder="E-Mail" defaultValue={user?.email ? user.email : ""} updateFormValue={(v) => setEmail(v)} />
              <TextInput type='password' placeholder="new Password" defaultValue={user?.password ? user.password : ""} updateFormValue={(v) => {
                setPassword(v);
                setPasswordChanged(true);
              }} />
              {/* <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/> */}
            </div>

            <div className="tw-mt-8"><button className={loading ? " tw-loading tw-btn-disabled tw-btn tw-btn-primary tw-float-right" : "tw-btn tw-btn-primary tw-float-right"} onClick={() => onUpdateUser()}>Update</button></div>

          </TitleCard>
        </div>
      </main>
    </>
  )
}
