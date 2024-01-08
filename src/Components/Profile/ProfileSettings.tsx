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

export function ProfileSettings() {
  const { user, updateUser, loading, token } = useAuth();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [color, setColor] = useState<string>("");


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
    setAvatar(user?.avatar ? user?.avatar : ""),
    setColor(user?.color? user.color : "#aabbcc")
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

    changedUser = { id: id, first_name: name, description: text, color: color, ...avatar.length > 10 && { avatar: avatar } };


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
    <div className='tw-backdrop-contrast-50 tw-h-full tw-w-full'>
      <main className="tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden tw-pt-8 tw-px-6 tw-min-w-80 tw-flex tw-justify-center" >
        <div className='tw-w-full xl:tw-max-w-6xl'>
          <TitleCard title="Profile" topMargin="tw-mt-2" className='tw-mb-6'>
            <div className="tw-flex">
              {!cropping ?
                <label className="custom-file-upload">
                  <input type="file" accept="image/*" className="tw-file-input tw-w-full tw-max-w-xs" onChange={onImageChange} />
                  <div className='button tw-btn tw-btn-lg tw-btn-circle tw-animate-none'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="tw-w-6 tw-h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  {avatar ?
                  <div className='tw-h-20 tw-w-20'>
                    <img src={assetsApi.url + avatar + "?access_token=" + token} className=' tw-rounded-full' />
                    </div>
                    :
                    <div className='tw-h-20 tw-w-20'>
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 150 150" className='tw-w-20 tw-h-20 tw-rounded-full' style={{ backgroundColor: "#eee" }}>
                        <path fill="#ccc" d="M 104.68731,56.689353 C 102.19435,80.640493 93.104981,97.26875 74.372196,97.26875 55.639402,97.26875 46.988823,82.308034 44.057005,57.289941 41.623314,34.938838 55.639402,15.800152 74.372196,15.800152 c 18.732785,0 32.451944,18.493971 30.315114,40.889201 z" />
                        <path fill="#ccc" d="M 92.5675 89.6048 C 90.79484 93.47893 89.39893 102.4504 94.86478 106.9039 C 103.9375 114.2963 106.7064 116.4723 118.3117 118.9462 C 144.0432 124.4314 141.6492 138.1543 146.5244 149.2206 L 4.268444 149.1023 C 8.472223 138.6518 6.505799 124.7812 32.40051 118.387 C 41.80992 116.0635 45.66513 113.8823 53.58659 107.0158 C 58.52744 102.7329 57.52583 93.99267 56.43084 89.26926 C 52.49275 88.83011 94.1739 88.14054 92.5675 89.6048 z" />
                      </svg>
                    </div>
                  }
                </label>

                : <div className='tw-w-20 tw-flex tw-items-center tw-justify-center'>
                  <span className="tw-loading tw-loading-spinner"></span>
                </div>

              }
               <ColorPicker color={color} onChange={setColor} className={"-tw-left-6 tw-top-14 -tw-mr-6"} />
              <TextInput placeholder="Name" defaultValue={user?.first_name ? user.first_name : ""} updateFormValue={(v) => setName(v)} containerStyle='tw-grow tw-ml-6 tw-my-auto ' />
            </div>

            <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-1 tw-gap-6 tw-pt-6 tw-pb-6">
              <TextAreaInput placeholder="About me, Contact, #Tags, ..." defaultValue={user?.description ? user.description : ""} updateFormValue={(v) => setText(v)} inputStyle='tw-h-64' />
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
    </div>
  )
}
