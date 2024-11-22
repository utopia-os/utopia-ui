/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppState } from '#components/AppShell/hooks/useAppState'
import { useAuth } from '#components/Auth'
import { useItems, useUpdateItem, useAddItem } from '#components/Map/hooks/useItems'
import { useLayers } from '#components/Map/hooks/useLayers'
import { useHasUserPermission } from '#components/Map/hooks/usePermissions'
import { useAddTag, useGetItemTags, useTags } from '#components/Map/hooks/useTags'
import { MapOverlayPage } from '#components/Templates'
import { Item, Tag } from '#src/types'
import { getValue } from '#utils/GetValue'

import { linkItem, onUpdateItem, unlinkItem } from './itemFunctions'
import { FormHeader } from './Subcomponents/FormHeader'
import { FlexForm } from './Templates/FlexForm'
import { OnepagerForm } from './Templates/OnepagerForm'
import { SimpleForm } from './Templates/SimpleForm'
import { TabsForm } from './Templates/TabsForm'

export function ProfileForm() {
  const [state, setState] = useState({
    color: '',
    id: '',
    group_type: 'wuerdekompass',
    status: 'active',
    name: '',
    subname: '',
    text: '',
    contact: '',
    telephone: '',
    next_appointment: '',
    image: '',
    marker_icon: '',
    offers: [] as Tag[],
    needs: [] as Tag[],
    relations: [] as Item[],
    start: '',
    end: '',
  })

  const [updatePermission, setUpdatePermission] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [item, setItem] = useState<Item>({} as Item)
  const { user } = useAuth()
  const updateItem = useUpdateItem()
  const addItem = useAddItem()
  const layers = useLayers()
  const location = useLocation()
  const tags = useTags()
  const addTag = useAddTag()
  const navigate = useNavigate()
  const hasUserPermission = useHasUserPermission()
  const getItemTags = useGetItemTags()
  const items = useItems()
  const appState = useAppState()

  const [urlParams, setUrlParams] = useState(new URLSearchParams(location.search))

  useEffect(() => {
    item && hasUserPermission('items', 'update', item) && setUpdatePermission(true)
  }, [hasUserPermission, item])

  useEffect(() => {
    const itemId = location.pathname.split('/')[2]

    const item = items.find((i) => i.id === itemId)
    item && setItem(item)

    if (!item) {
      const layer = layers.find((l) => l.itemType.name === appState.userType)
      setItem({
        id: crypto.randomUUID(),
        name: user ? user.first_name : '',
        text: '',
        layer,
        new: true,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  useEffect(() => {
    const newColor =
      item.layer?.itemColorField && getValue(item, item.layer.itemColorField)
        ? getValue(item, item.layer.itemColorField)
        : getItemTags(item) && getItemTags(item)[0]?.color
          ? getItemTags(item)[0].color
          : item.layer?.markerDefaultColor

    const offers = (item.offers ?? []).reduce((acc: Tag[], o) => {
      const offer = tags.find((t) => t.id === o.tags_id)
      if (offer) acc.push(offer)
      return acc
    }, [])

    const needs = (item.needs ?? []).reduce((acc: Tag[], o) => {
      const need = tags.find((t) => t.id === o.tags_id)
      if (need) acc.push(need)
      return acc
    }, [])

    const relations = (item.relations ?? []).reduce((acc: Item[], r) => {
      const relatedItem = items.find((i) => i.id === r.related_items_id)
      if (relatedItem) acc.push(relatedItem)
      return acc
    }, [])

    setState({
      color: newColor,
      id: item?.id ?? '',
      group_type: item?.group_type ?? '',
      status: item?.status ?? '',
      name: item?.name ?? '',
      subname: item?.subname ?? '',
      text: item?.text ?? '',
      contact: item?.contact ?? '',
      telephone: item?.telephone ?? '',
      next_appointment: item?.next_appointment ?? '',
      image: item?.image ?? '',
      marker_icon: item?.marker_icon ?? '',
      offers,
      needs,
      relations,
      start: item.start ?? '',
      end: item.end ?? '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, tags, items])

  const [template, setTemplate] = useState<string>('')

  useEffect(() => {
    setTemplate(item.layer?.itemType.template || appState.userType)
  }, [appState.userType, item])

  return (
    <>
      <MapOverlayPage
        backdrop
        className='tw-mx-4 tw-mt-4 tw-mb-4 tw-overflow-x-hidden tw-w-[calc(100%-32px)]  md:tw-w-[calc(50%-32px)] tw-max-w-3xl !tw-left-auto tw-top-0 tw-bottom-0'
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void onUpdateItem(
              state,
              item,
              tags,
              addTag,
              setLoading,
              navigate,
              updateItem,
              addItem,
              user,
              urlParams,
            )
          }}
        >
          <div className='tw-flex tw-flex-col tw-h-full'>
            <FormHeader item={item} state={state} setState={setState} />

            {template === 'onepager' && (
              <OnepagerForm item={item} state={state} setState={setState}></OnepagerForm>
            )}

            {template === 'simple' && <SimpleForm state={state} setState={setState}></SimpleForm>}

            {template === 'flex' && (
              <FlexForm item={item} state={state} setState={setState}></FlexForm>
            )}

            {template === 'tabs' && (
              <TabsForm
                loading={loading}
                item={item}
                state={state}
                setState={setState}
                updatePermission={updatePermission}
                linkItem={(id) => linkItem(id, item, updateItem)}
                unlinkItem={(id) => unlinkItem(id, item, updateItem)}
                setUrlParams={setUrlParams}
              ></TabsForm>
            )}

            <div className='tw-mt-4'>
              <button
                className={loading ? ' tw-loading tw-btn tw-float-right' : 'tw-btn tw-float-right'}
                type='submit'
                style={{
                  backgroundColor: `${item.layer?.itemColorField && getValue(item, item.layer?.itemColorField) ? getValue(item, item.layer?.itemColorField) : getItemTags(item) && getItemTags(item)[0] && getItemTags(item)[0].color ? getItemTags(item)[0].color : item?.layer?.markerDefaultColor}`,
                  color: '#fff',
                }}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </MapOverlayPage>
    </>
  )
}
