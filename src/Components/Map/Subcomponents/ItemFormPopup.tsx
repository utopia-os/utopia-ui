/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useContext, useEffect, useRef, useState } from 'react'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { toast } from 'react-toastify'

import { useAuth } from '#components/Auth/useAuth'
import { TextAreaInput } from '#components/Input/TextAreaInput'
import { TextInput } from '#components/Input/TextInput'
import TemplateItemContext from '#components/Item/TemplateItemContext'
import { useResetFilterTags } from '#components/Map/hooks/useFilter'
import { useAddItem, useItems, useUpdateItem } from '#components/Map/hooks/useItems'
import { usePopupForm } from '#components/Map/hooks/usePopupForm'
import { useAddTag, useTags } from '#components/Map/hooks/useTags'
import LayerContext from '#components/Map/LayerContext'
import { hashTagRegex } from '#utils/HashTagRegex'
import { randomColor } from '#utils/RandomColor'

import type { Item } from '#types/Item'

interface Props {
  children?: React.ReactNode
}

export function ItemFormPopup(props: Props) {
  const layerContext = useContext(LayerContext)
  const { menuText, name: activeLayerName } = layerContext

  const { popupForm, setPopupForm } = usePopupForm()

  const [spinner, setSpinner] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const map = useMap()

  const addItem = useAddItem()
  const updateItem = useUpdateItem()
  const items = useItems()

  const tags = useTags()
  const addTag = useAddTag()

  const resetFilterTags = useResetFilterTags()

  const { user } = useAuth()

  const handleSubmit = async (evt: any) => {
    if (!popupForm) {
      throw new Error('Popup form is not defined')
    }
    const formItem: Item = {} as Item
    Array.from(evt.target).forEach((input: HTMLInputElement) => {
      if (input.name) {
        formItem[input.name] = input.value
      }
    })
    formItem.position = {
      type: 'Point',
      coordinates: [popupForm.position.lng, popupForm.position.lat],
    }
    evt.preventDefault()

    const name = formItem.name ? formItem.name : user?.first_name
    if (!name) {
      toast.error('Name is must be defined')
      return
    }

    setSpinner(true)

    formItem.text &&
      formItem.text
        .toLocaleLowerCase()
        .match(hashTagRegex)
        ?.map((tag) => {
          if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
            addTag({ id: crypto.randomUUID(), name: tag.slice(1), color: randomColor() })
          }
          return null
        })

    if (popupForm.item) {
      let success = false
      try {
        await popupForm.layer.api?.updateItem!({ ...formItem, id: popupForm.item.id })
        success = true
        // eslint-disable-next-line no-catch-all/no-catch-all
      } catch (error) {
        toast.error(error.toString())
      }
      if (success) {
        updateItem({ ...popupForm.item, ...formItem })
        toast.success('Item updated')
      }
      setSpinner(false)
      map.closePopup()
    } else {
      const item = items.find(
        (i) => i.user_created?.id === user?.id && i.layer?.id === popupForm.layer.id,
      )

      const uuid = crypto.randomUUID()
      let success = false
      try {
        popupForm.layer.userProfileLayer &&
          item &&
          (await popupForm.layer.api?.updateItem!({ ...formItem, id: item.id }))
        ;(!popupForm.layer.userProfileLayer || !item) &&
          (await popupForm.layer.api?.createItem!({
            ...formItem,
            name,
            id: uuid,
          }))
        success = true
        // eslint-disable-next-line no-catch-all/no-catch-all
      } catch (error) {
        toast.error(error.toString())
      }
      if (success) {
        if (popupForm.layer.userProfileLayer && item) updateItem({ ...item, ...formItem })
        if (!popupForm.layer.userProfileLayer || !item) {
          addItem({
            ...formItem,
            name: (formItem.name ? formItem.name : user?.first_name) ?? '',
            user_created: user ?? undefined,
            id: uuid,
            layer: popupForm.layer,
            public_edit: !user,
          })
        }
        toast.success('New item created')
        resetFilterTags()
      }
      setSpinner(false)
      map.closePopup()
    }
    setPopupForm(null)
  }

  const resetPopup = () => {
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  useEffect(() => {
    resetPopup()
  }, [popupForm?.position])

  return (
    popupForm &&
    popupForm.layer.name === activeLayerName && (
      <LeafletPopup
        minWidth={275}
        maxWidth={275}
        autoPanPadding={[20, 80]}
        eventHandlers={{
          remove: () => {
            setTimeout(function () {
              resetPopup()
            }, 100)
          },
        }}
        position={popupForm.position}
      >
        <form
          ref={formRef}
          onReset={resetPopup}
          autoComplete='off'
          onSubmit={(e) => handleSubmit(e)}
        >
          {popupForm.item ? (
            <div className='tw-h-3'></div>
          ) : (
            <div className='tw-flex tw-justify-center'>
              <b className='tw-text-xl tw-text-center tw-font-bold'>{menuText}</b>
            </div>
          )}

          {props.children ? (
            <TemplateItemContext.Provider value={popupForm.item}>
              {props.children}
            </TemplateItemContext.Provider>
          ) : (
            <>
              <TextInput
                type='text'
                placeholder='Name'
                dataField='name'
                defaultValue={popupForm.item ? popupForm.item.name : ''}
                inputStyle=''
              />
              <TextAreaInput
                key={popupForm.position.toString()}
                placeholder='Text'
                dataField='text'
                defaultValue={popupForm.item?.text ?? ''}
                inputStyle='tw-h-40 tw-mt-5'
              />
            </>
          )}

          <div className='tw-flex tw-justify-center'>
            <button
              className={
                spinner
                  ? 'tw-btn tw-btn-disabled tw-mt-5 tw-place-self-center'
                  : 'tw-btn tw-mt-5 tw-place-self-center'
              }
              type='submit'
            >
              {spinner ? <span className='tw-loading tw-loading-spinner'></span> : 'Save'}
            </button>
          </div>
        </form>
      </LeafletPopup>
    )
  )
}
