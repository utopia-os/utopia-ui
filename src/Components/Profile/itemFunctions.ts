import * as React from 'react'
import { Item } from '../../types'
import { encodeTag } from '../../Utils/FormatTags'
import { hashTagRegex } from '../../Utils/HashTagRegex'
import { randomColor } from '../../Utils/RandomColor'
import { toast } from 'react-toastify'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const submitNewItem = async (
  evt: any,
  type: string,
  item,
  user,
  setLoading,
  tags,
  addTag,
  addItem,
  linkItem,
  resetFilterTags,
  layers,
  addItemPopupType,
  setAddItemPopupType,
) => {
  evt.preventDefault()
  const formItem: Item = {} as Item
  Array.from(evt.target).forEach((input: HTMLInputElement) => {
    if (input.name) {
      formItem[input.name] = input.value
    }
  })
  setLoading(true)
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
  const uuid = crypto.randomUUID()

  const layer = layers.find(
    (l) => l.name.toLocaleLowerCase().replace('s', '') === addItemPopupType.toLocaleLowerCase(),
  )

  let success = false
  try {
    await layer?.api?.createItem!({ ...formItem, id: uuid, type, parent: item.id })
    await linkItem(uuid)
    success = true
  } catch (error) {
    toast.error(error.toString())
  }
  if (success) {
    addItem({ ...formItem, id: uuid, type, layer, user_created: user, parent: item.id })
    toast.success('New item created')
    resetFilterTags()
  }
  setLoading(false)
  setAddItemPopupType('')
}

export const linkItem = async (id: string, item, updateItem) => {
  const newRelations = item.relations || []
  newRelations?.push({ items_id: item.id, related_items_id: id })
  const updatedItem = { id: item.id, relations: newRelations }

  let success = false
  try {
    await item?.layer?.api?.updateItem!(updatedItem)
    success = true
  } catch (error) {
    toast.error(error.toString())
  }
  if (success) {
    updateItem({ ...item, relations: newRelations })
    toast.success('Item linked')
  }
}

export const unlinkItem = async (id: string, item, updateItem) => {
  const newRelations = item.relations?.filter((r) => r.related_items_id !== id)
  const updatedItem = { id: item.id, relations: newRelations }

  let success = false
  try {
    await item?.layer?.api?.updateItem!(updatedItem)
    success = true
  } catch (error) {
    toast.error(error.toString())
  }
  if (success) {
    updateItem({ ...item, relations: newRelations })
    toast.success('Item unlinked')
  }
}

export const handleDelete = async (
  event: React.MouseEvent<HTMLElement>,
  item,
  setLoading,
  removeItem,
  map,
  navigate,
) => {
  event.stopPropagation()
  setLoading(true)
  let success = false
  try {
    await item.layer?.api?.deleteItem!(item.id)
    success = true
  } catch (error) {
    toast.error(error.toString())
  }
  if (success) {
    removeItem(item)
    toast.success('Item deleted')
  }
  setLoading(false)
  map.closePopup()
  const params = new URLSearchParams(window.location.search)
  window.history.pushState({}, '', '/' + `${params ? `?${params}` : ''}`)
  navigate('/')
}

export const onUpdateItem = async (
  state,
  item,
  tags,
  addTag,
  setLoading,
  navigate,
  updateItem,
  addItem,
  user,
  params,
) => {
  let changedItem = {} as Item

  const offerUpdates: Array<any> = []
  // check for new offers
  await state.offers?.map((o) => {
    const existingOffer = item?.offers?.find((t) => t.tags_id === o.id)
    existingOffer && offerUpdates.push(existingOffer.id)
    if (!existingOffer && !tags.some((t) => t.id === o.id)) addTag({ ...o, offer_or_need: true })
    !existingOffer && offerUpdates.push({ items_id: item?.id, tags_id: o.id })
    return null
  })

  const needsUpdates: Array<any> = []

  await state.needs?.map((n) => {
    const existingNeed = item?.needs?.find((t) => t.tags_id === n.id)
    existingNeed && needsUpdates.push(existingNeed.id)
    !existingNeed && needsUpdates.push({ items_id: item?.id, tags_id: n.id })
    !existingNeed && !tags.some((t) => t.id === n.id) && addTag({ ...n, offer_or_need: true })
    return null
  })

  // update profile item in current state
  changedItem = {
    id: state.id,
    name: state.name,
    subname: state.subname,
    text: state.text,
    ...(state.color && { color: state.color }),
    position: item.position,
    ...(state.groupType && { group_type: state.groupType }),
    ...(state.status && { status: state.status }),
    contact: state.contact,
    telephone: state.telephone,
    ...(state.end && { end: state.end }),
    ...(state.start && { start: state.start }),
    ...(state.markerIcon && { markerIcon: state.markerIcon }),
    next_appointment: state.next_appointment,
    ...(state.image.length > 10 && { image: state.image }),
    ...(state.offers.length > 0 && { offers: offerUpdates }),
    ...(state.needs.length > 0 && { needs: needsUpdates }),
  }

  const offersState: Array<any> = []
  const needsState: Array<any> = []

  state.offers.map((o) => {
    offersState.push({ items_id: item?.id, tags_id: o.id })
    return null
  })

  state.needs.map((n) => {
    needsState.push({ items_id: item?.id, tags_id: n.id })
    return null
  })

  changedItem = { ...changedItem, offers: offersState, needs: needsState }

  setLoading(true)

  await state.text
    .toLocaleLowerCase()
    .match(hashTagRegex)
    ?.map((tag) => {
      if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
        addTag({
          id: crypto.randomUUID(),
          name: encodeTag(tag.slice(1).toLocaleLowerCase()),
          color: randomColor(),
        })
      }
      return null
    })

  // take care that addTag request comes before item request
  await sleep(200)

  if (!item.new) {
    item?.layer?.api?.updateItem &&
      toast
        .promise(item?.layer?.api?.updateItem(changedItem), {
          pending: 'updating Item  ...',
          success: 'Item updated',
          error: {
            render({ data }) {
              return `${data}`
            },
          },
        })
        .catch(setLoading(false))
        .then(() => item && updateItem({ ...item, ...changedItem }))
        .then(() => {
          setLoading(false)
          navigate(`/item/${item.id}${params && '?' + params}`)
        })
  } else {
    item.new = false
    item.layer?.api?.createItem &&
      toast
        .promise(item.layer?.api?.createItem(changedItem), {
          pending: 'updating Item  ...',
          success: 'Item updated',
          error: {
            render({ data }) {
              return `${data}`
            },
          },
        })
        .catch(setLoading(false))
        .then(
          () =>
            item &&
            addItem({
              ...item,
              ...changedItem,
              layer: item.layer,
              user_created: user,
              type: item.layer?.itemType,
            }),
        )
        .then(() => {
          setLoading(false)
          navigate(`/${params && '?' + params}`)
        })
  }
}
