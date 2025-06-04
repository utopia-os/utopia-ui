import { useDropzone } from 'react-dropzone'

import { useAppState } from '#components/AppShell/hooks/useAppState'

import type { FormState } from '#types/FormState'

interface Props {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<FormState>>
}

export const GalleryForm = ({ state, setState }: Props) => {
  const appState = useAppState()

  const upload = async (acceptedFiles: File[]) => {
    const assets = await Promise.all(
      acceptedFiles.map(async (file) => {
        return appState.assetsApi.upload(file, 'gallery')
      }),
    )

    const newGalleryItems = assets.map((asset) => ({
      directus_files_id: {
        id: asset.id,
        width: 600, // TODO determine
        height: 400, // TODO determine
      },
    }))

    setState((prevState) => ({
      ...prevState,
      gallery: [...prevState.gallery, ...newGalleryItems],
    }))
  }

  const { getRootProps, getInputProps } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop: upload,
  })

  const images = state.gallery.map((i, j) => ({
    src: appState.assetsApi.url + `${i.directus_files_id.id}.jpg`,
    width: i.directus_files_id.width,
    height: i.directus_files_id.height,
    index: j,
  }))

  const removeImage = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      gallery: prevState.gallery.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className='tw:h-full tw:flex tw:flex-col tw:mt-4'>
      <div
        {...getRootProps()}
        className='tw:cursor-pointer tw:border tw:border-dashed tw:border-gray-300 tw:p-4 tw:rounded-lg'
      >
        <input {...getInputProps()} />
        Drop here
      </div>

      {images.map((image, index) => (
        <div key={index} className='tw:mb-2'>
          <img
            src={image.src}
            alt={`Gallery image ${index + 1}`}
            className='tw:w-full tw:h-auto tw:rounded-lg'
          />
          <button
            className='tw:mt-2 tw:bg-red-500 tw:text-white tw:px-4 tw:py-2 tw:rounded'
            onClick={() => removeImage(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
