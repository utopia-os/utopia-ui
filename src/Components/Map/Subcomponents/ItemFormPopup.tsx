/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { toast } from 'react-toastify'

import { useAuth } from '#components/Auth/useAuth'
import { TextAreaInput } from '#components/Input/TextAreaInput'
import { TextInput } from '#components/Input/TextInput'
import { useResetFilterTags } from '#components/Map/hooks/useFilter'
import { useAddItem, useItems, useRemoveItem, useUpdateItem } from '#components/Map/hooks/useItems'
import { useAddTag, useTags } from '#components/Map/hooks/useTags'
import { hashTagRegex } from '#utils/HashTagRegex'
import { randomColor } from '#utils/RandomColor'

import type { Item } from '#types/Item'
import type { ItemFormPopupProps } from '#types/ItemFormPopupProps'

export function ItemFormPopup(props: ItemFormPopupProps) {
  const [spinner, setSpinner] = useState(false)

  const [popupTitle, setPopupTitle] = useState<string>('')

  const formRef = useRef<HTMLFormElement>(null)

  const map = useMap()

  const addItem = useAddItem()
  const updateItem = useUpdateItem()
  const items = useItems()

  const removeItem = useRemoveItem()

  const tags = useTags()
  const addTag = useAddTag()

  const resetFilterTags = useResetFilterTags()

  const { user } = useAuth()

  const handleSubmit = async (evt: any) => {
    const formItem: Item = {} as Item
    Array.from(evt.target).forEach((input: HTMLInputElement) => {
      if (input.name) {
        formItem[input.name] = input.value
      }
    })
    formItem.position = { type: 'Point', coordinates: [props.position.lng, props.position.lat] }
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

    if (props.item) {
      let success = false
      try {
        await props.layer.api?.updateItem!({ ...formItem, id: props.item.id })
        success = true
        // eslint-disable-next-line no-catch-all/no-catch-all
      } catch (error) {
        toast.error(error.toString())
      }
      if (success) {
        // eslint-disable-next-line no-console
        console.log(props.item)

        updateItem({ ...props.item, ...formItem })
        toast.success('Item updated')
      }
      setSpinner(false)
      map.closePopup()
    } else {
      const item = items.find((i) => i.user_created?.id === user?.id && i.layer === props.layer)

      const uuid = crypto.randomUUID()
      let success = false
      try {
        props.layer.userProfileLayer &&
          item &&
          (await props.layer.api?.updateItem!({ ...formItem, id: item.id }))
        ;(!props.layer.userProfileLayer || !item) &&
          (await props.layer.api?.createItem!({
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
        if (props.layer.userProfileLayer && item) updateItem({ ...item, ...formItem })
        if (!props.layer.userProfileLayer || !item) {
          addItem({
            ...formItem,
            name: (formItem.name ? formItem.name : user?.first_name) ?? '',
            user_created: user ?? undefined,
            id: uuid,
            layer: props.layer,
            public_edit: !user,
          })
        }
        toast.success('New item created')
        resetFilterTags()
      }
      setSpinner(false)
      map.closePopup()
    }
    props.setItemFormPopup!(null)
  }

  const resetPopup = () => {
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  useEffect(() => {
    resetPopup()
  }, [props.position])

  return (
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
      position={props.position}
    >
      <form ref={formRef} onReset={resetPopup} autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
        {props.item ? (
          <div className='tw-h-3'></div>
        ) : (
          <div className='tw-flex tw-justify-center'>
            <b className='tw-text-xl tw-text-center tw-font-bold'>{props.layer.menuText}</b>
          </div>
        )}

        {props.children ? (
          Children.toArray(props.children).map((child) =>
            isValidElement<{
              item: Item
              test: string
              setPopupTitle: React.Dispatch<React.SetStateAction<string>>
            }>(child)
              ? cloneElement(child, {
                  item: props.item,
                  key: props.position.toString(),
                  setPopupTitle,
                })
              : '',
          )
        ) : (
          <>
            <TextInput
              type='text'
              placeholder='Name'
              dataField='name'
              defaultValue={props.item ? props.item.name : ''}
              inputStyle=''
            />
            <TextAreaInput
              key={props.position.toString()}
              placeholder='Text'
              dataField='text'
              defaultValue={props.item?.text ?? ''}
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
}
