/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import * as React from 'react'
import { useState, useCallback, useRef } from 'react'
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import { useAppState } from '../../AppShell/hooks/useAppState'
import 'react-image-crop/dist/ReactCrop.css'
import DialogModal from '../../Templates/DialogModal'

interface AvatarWidgetProps {
  avatar: string
  setAvatar: React.Dispatch<React.SetStateAction<any>>
}

export const AvatarWidget: React.FC<AvatarWidgetProps> = ({ avatar, setAvatar }) => {
  const [crop, setCrop] = useState<Crop>()
  const [image, setImage] = useState<string>('')
  const [cropModalOpen, setCropModalOpen] = useState<boolean>(false)
  const [cropping, setCropping] = useState<boolean>(false)

  const appState = useAppState()

  const imgRef = useRef<HTMLImageElement>(null)

  const onImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const validFormats = ['image/jpeg', 'image/png']
      const maxSizeMB = 10
      const maxSizeBytes = maxSizeMB * 1024 * 1024

      if (!validFormats.includes(file.type)) {
        alert('Unsupported file format. Please upload a JPEG or PNG image.')
        return
      }

      if (file.size > maxSizeBytes) {
        alert(`File size exceeds ${maxSizeMB}MB. Please upload a smaller image.`)
        return
      }

      setImage(URL.createObjectURL(file))
      setCropModalOpen(true)
    } else {
      alert('No file selected or an error occurred while selecting the file.')
    }
  }, [])

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }, [])

  const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
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

  async function resizeImage(
    image: HTMLImageElement,
    maxWidth: number,
    maxHeight: number,
  ): Promise<HTMLImageElement> {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let width = image.width
    let height = image.height

    if (width > maxWidth) {
      height *= maxWidth / width
      width = maxWidth
    }
    if (height > maxHeight) {
      width *= maxHeight / height
      height = maxHeight
    }

    canvas.width = width
    canvas.height = height

    if (ctx) {
      ctx.drawImage(image, 0, 0, width, height)
    }

    const resizedImage = new Image()
    resizedImage.src = canvas.toDataURL()

    await resizedImage.decode()
    return resizedImage
  }

  const renderCrop = useCallback(async () => {
    const image = imgRef.current
    if (crop && image) {
      const resizedImage = await resizeImage(image, 1024, 1024) // Bildgröße vor dem Zuschneiden reduzieren
      const scaleX = resizedImage.naturalWidth / resizedImage.width
      const scaleY = resizedImage.naturalHeight / resizedImage.height

      const canvas = new OffscreenCanvas(crop.width * scaleX, crop.height * scaleY)
      const ctx = canvas.getContext('2d')
      const pixelRatio = window.devicePixelRatio
      canvas.width = crop.width * pixelRatio * scaleX
      canvas.height = crop.height * pixelRatio * scaleY

      if (ctx) {
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.drawImage(
          resizedImage,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY,
        )
      }

      const blob = await canvas.convertToBlob()
      await resizeBlob(blob)
      setCropping(false)
      setImage('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop])

  const resizeBlob = useCallback(
    async (blob: Blob) => {
      const img = new Image()
      img.src = URL.createObjectURL(blob)
      await img.decode()

      const canvas = new OffscreenCanvas(400, 400)
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, 400, 400)

      const resizedBlob = await canvas.convertToBlob()
      const asset = await appState.assetsApi.upload(resizedBlob, 'avatar')
      setAvatar(asset.id)
    },
    [appState.assetsApi, setAvatar],
  )

  return (
    <>
      {!cropping ? (
        <label className='custom-file-upload'>
          <input
            type='file'
            accept='image/*'
            className='tw-file-input tw-w-full tw-max-w-xs'
            onChange={onImageChange}
          />
          <div className='button tw-btn tw-btn-lg tw-btn-circle tw-animate-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='tw-w-6 tw-h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
              />
            </svg>
          </div>
          {avatar ? (
            <div className='tw-h-20 tw-w-20'>
              <img
                src={appState.assetsApi.url + avatar}
                className='tw-h-20 tw-w-20 tw-rounded-full'
              />
            </div>
          ) : (
            <div className='tw-h-20 tw-w-20'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                version='1.0'
                viewBox='0 0 150 150'
                className='tw-w-20 tw-h-20 tw-rounded-full'
                style={{ backgroundColor: '#eee' }}
              >
                <path
                  fill='#ccc'
                  d='M 104.68731,56.689353 C 102.19435,80.640493 93.104981,97.26875 74.372196,97.26875 55.639402,97.26875 46.988823,82.308034 44.057005,57.289941 41.623314,34.938838 55.639402,15.800152 74.372196,15.800152 c 18.732785,0 32.451944,18.493971 30.315114,40.889201 z'
                />
                <path
                  fill='#ccc'
                  d='M 92.5675 89.6048 C 90.79484 93.47893 89.39893 102.4504 94.86478 106.9039 C 103.9375 114.2963 106.7064 116.4723 118.3117 118.9462 C 144.0432 124.4314 141.6492 138.1543 146.5244 149.2206 L 4.268444 149.1023 C 8.472223 138.6518 6.505799 124.7812 32.40051 118.387 C 41.80992 116.0635 45.66513 113.8823 53.58659 107.0158 C 58.52744 102.7329 57.52583 93.99267 56.43084 89.26926 C 52.49275 88.83011 94.1739 88.14054 92.5675 89.6048 z'
                />
              </svg>
            </div>
          )}
        </label>
      ) : (
        <div className='tw-w-20 tw-flex tw-items-center tw-justify-center'>
          <span className='tw-loading tw-loading-spinner'></span>
        </div>
      )}
      <DialogModal
        title=''
        isOpened={cropModalOpen}
        onClose={() => {
          setCropModalOpen(false)
          setImage('')
        }}
        closeOnClickOutside={false}
      >
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1}>
          <img src={image} ref={imgRef} onLoad={onImageLoad} />
        </ReactCrop>
        <button
          className={'tw-btn tw-btn-primary'}
          onClick={() => {
            setCropping(true)
            setCropModalOpen(false)
            renderCrop()
          }}
        >
          Select
        </button>
      </DialogModal>
    </>
  )
}
