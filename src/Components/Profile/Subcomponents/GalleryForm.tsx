import ArrowUpTrayIcon from '@heroicons/react/24/outline/ArrowUpTrayIcon'
import TrashIcon from '@heroicons/react/24/solid/TrashIcon'
import imageCompression from 'browser-image-compression'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useAppState } from '#components/AppShell/hooks/useAppState'
import DialogModal from '#components/Templates/DialogModal'

import type { FormState } from '#types/FormState'

interface Props {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<FormState>>
}

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
}

export const GalleryForm = ({ state, setState }: Props) => {
  const appState = useAppState()

  const [uploadingImages, setUploadingImages] = useState<File[]>([])

  const [deleteModalImage, setDeleteModalImage] = useState<number | null>(null)

  const closeModal = () => setDeleteModalImage(null)

  const upload = async (acceptedFiles: File[]) => {
    setUploadingImages((files) => [...files, ...acceptedFiles])
    setState((prevState) => ({
      ...prevState,
      isUpdatingGallery: true,
    }))

    const uploads = acceptedFiles.map(async (file) => {
      const compressedFile = await imageCompression(file, compressionOptions)
      return {
        asset: await appState.assetsApi.upload(compressedFile, 'gallery'),
        name: file.name,
      }
    })

    for await (const upload of uploads) {
      setState((prevState) => ({
        ...prevState,
        gallery: [
          ...prevState.gallery,
          {
            directus_files_id: {
              id: upload.asset.id,
              width: 0,
              height: 0,
            },
          },
        ],
      }))

      setUploadingImages((files) => {
        const newFiles = files.filter((f) => f.name !== upload.name)

        if (newFiles.length === 0) {
          setState((prevState) => ({
            ...prevState,
            isUpdatingGallery: false,
          }))
        }

        return newFiles
      })
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop: upload,
    accept: {
      'image/jpeg': [],
    },
  })

  const images = state.gallery
    .map((image) => ({
      src: appState.assetsApi.url + `${image.directus_files_id.id}.jpg`,
      state: 'uploaded',
    }))
    .concat(
      uploadingImages.map((file) => ({
        src: URL.createObjectURL(file),
        state: 'uploading',
      })),
    )

  const removeImage = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      gallery: prevState.gallery.filter((_, i) => i !== index),
    }))
  }

  return (
    <>
      <div className='tw:flex tw:flex-wrap tw:gap-4 tw:my-4'>
        {images.map((image, index) => (
          <div key={index} className='tw:relative'>
            <img
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              className={`tw:w-60 tw:h-60 tw:object-cover tw:rounded-lg ${
                image.state === 'uploading' ? 'tw:opacity-50' : ''
              }`}
            />
            {image.state === 'uploading' && (
              <span className='tw:loading tw:loading-spinner tw:absolute tw:inset-0 tw:m-auto'></span>
            )}
            {image.state === 'uploaded' && (
              <button
                className='tw:m-2 tw:bg-red-500 tw:text-white tw:p-2 tw:rounded-full tw:absolute tw:top-0 tw:right-0 tw:hover:bg-red-600'
                onClick={() => setDeleteModalImage(index)}
                type='button'
              >
                <TrashIcon className='tw:h-5 tw:w-5' />
              </button>
            )}
          </div>
        ))}

        <div
          {...getRootProps()}
          className='tw:flex tw:center tw:w-60 tw:h-60 tw:cursor-pointer tw:border tw:border-dashed tw:border-gray-300 tw:p-4 tw:rounded-lg'
        >
          <input {...getInputProps()} />
          <ArrowUpTrayIcon className='tw:h-8 tw:w-8 tw:m-auto' />
        </div>
      </div>
      <DialogModal
        isOpened={!!deleteModalImage}
        title='Are you sure?'
        showCloseButton={false}
        onClose={closeModal}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <span>Do you want to delete this image?</span>
          <div className='tw:grid'>
            <div className='tw:flex tw:justify-between'>
              <label
                className='tw:btn tw:mt-4 tw:btn-error'
                onClick={() => {
                  deleteModalImage && removeImage(deleteModalImage)
                  closeModal()
                }}
              >
                Yes
              </label>
              <label className='tw:btn tw:mt-4' onClick={closeModal}>
                No
              </label>
            </div>
          </div>
        </div>
      </DialogModal>
    </>
  )
}
