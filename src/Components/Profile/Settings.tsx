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

export function Settings() {
  const { user, updateUser, loading, token } = useAuth();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState<string>("");
  const [cropModalOpen, setCropModalOpen] = useState<boolean>(false);
  const [cropping, setCropping] = useState<boolean>(false);

  const assetsApi = useAssetApi();
  const navigate = useNavigate();

  useEffect(() => {
    setId(user?.id ? user.id : "");
    setName(user?.first_name ? user.first_name : "");
    setText(user?.description ? user.description : "");
    setEmail(user?.email ? user.email : "");
    setPassword(user?.password ? user.password : "");
    setAvatar(user?.avatar ? user?.avatar : "")
  }, [user])

  const imgRef = useRef<HTMLImageElement>(null)

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    setCropModalOpen(true);
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    console.log(width);

    setCrop(centerAspectCrop(width, height, 1))
  }


  // This is to demonstate how to make and center a % aspect crop
  // which is a bit trickier so we use some helper functions.
  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: mediaWidth / 2,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  async function renderCrop() {
    // get the image element
    const image = imgRef.current;
    if (crop && image) {

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      // create a canvas element to draw the cropped image
      const canvas = new OffscreenCanvas(
        crop.width * scaleX,
        crop.height * scaleY,
      )
      const ctx = canvas.getContext("2d");
      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio * scaleX;
      canvas.height = crop.height * pixelRatio * scaleY;

      if (ctx) {
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
      }
      const blob = await canvas.convertToBlob();
      await resizeBlob(blob);
      setCropping(false);
      setImage("");
    }
  }

  async function resizeBlob(blob) {
    var img = new Image();
    img.src = URL.createObjectURL(blob);
    await img.decode();
    const canvas = new OffscreenCanvas(
      400,
      400
    )
    var ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, 400, 400);
    const resizedBlob = await canvas.convertToBlob()
    const asset = await assetsApi.upload(resizedBlob, "test");
    setAvatar(asset.id)
  }


  const onUpdateUser = () => {
    let changedUser = {} as UserItem;

    if (passwordChanged) {
      changedUser = { id: id, first_name: name, description: text, email: email, avatar: avatar, password: password };
    }
    else {
      changedUser = { id: id, first_name: name, description: text, email: email, avatar: avatar };
    }
    toast.promise(

      updateUser(changedUser),
      {
        pending: 'updating Profile  ...',
        success: 'Profile updated',
        error: 'Error'
      })
      .then(() => navigate("/"));
  }


  return (
    <>
      <main className="tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden tw-pt-8 tw-px-6 tw-bg-base-200 tw-min-w-80 tw-flex tw-justify-center" >
        <div className='tw-w-full xl:tw-max-w-6xl'>
          <TitleCard title="Profile Settings" topMargin="tw-mt-2" className='tw-mb-6'>
            <div className="tw-flex">
              {!cropping && avatar ?
                            <label className="custom-file-upload">
                            <input type="file" accept="image/*" className="tw-file-input tw-w-full tw-max-w-xs" onChange={onImageChange} />

                <img src={assetsApi.url + avatar + "?access_token=" + token} className='tw-w-20 tw-rounded-full' />
                </label>

                :
                <span className="tw-loading tw-loading-spinner"></span>
              }
              <TextInput placeholder="Name" defaultValue={user?.first_name ? user.first_name : ""} updateFormValue={(v) => setName(v)} containerStyle='tw-grow tw-ml-6 tw-my-auto ' />
            </div>

            <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-1 tw-gap-6 tw-pt-6 tw-pb-6">
              <TextAreaInput placeholder="About me, Contact, #Tags, ..." defaultValue={user?.description ? user.description : ""} updateFormValue={(v) => setText(v)} inputStyle='tw-h-64' />
            </div>
            <div className="tw-divider" ></div>


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
      <DialogModal
        title=""
        isOpened={cropModalOpen}
        onClose={() => {
          setCropModalOpen(false);
          setImage("");
        }}>
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1} >
          <img src={image} ref={imgRef} onLoad={onImageLoad} />
        </ReactCrop>
        <button className={`tw-btn `} onClick={() => {
          setCropping(true);
          setCropModalOpen(false);
          renderCrop();
        }}>Select</button>
      </DialogModal>
    </>
  )
}
