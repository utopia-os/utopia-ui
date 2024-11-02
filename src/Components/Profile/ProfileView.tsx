import { MapOverlayPage } from '../Templates'
import { useItems, useRemoveItem, useUpdateItem } from '../Map/hooks/useItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Item, ItemsApi, Tag } from '../../types'
import { useMap } from 'react-leaflet'
import { LatLng } from 'leaflet'
import { useHasUserPermission } from '../Map/hooks/usePermissions'
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView'
import { useSelectPosition, useSetSelectPosition } from '../Map/hooks/useSelectPosition'
import { useClusterRef } from '../Map/hooks/useClusterRef'
import { useLeafletRefs } from '../Map/hooks/useLeafletRefs'
import { getValue } from '../../Utils/GetValue'
import { TabsView } from './Templates/TabsView'
import { OnepagerView } from './Templates/OnepagerView'
import { SimpleView } from './Templates/SimpleView'
import { handleDelete, linkItem, unlinkItem } from './itemFunctions'
import { useTags } from '../Map/hooks/useTags'

export function ProfileView({
  userType,
  attestationApi,
}: {
  userType: string
  attestationApi?: ItemsApi<any>
}) {
  const [item, setItem] = useState<Item>()
  const [updatePermission, setUpdatePermission] = useState<boolean>(false)
  const [relations, setRelations] = useState<Array<Item>>([])
  const [offers, setOffers] = useState<Array<Tag>>([])
  const [needs, setNeeds] = useState<Array<Tag>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [template, setTemplate] = useState<string>('')

  const location = useLocation()
  const items = useItems()
  const updateItem = useUpdateItem()
  const map = useMap()
  const selectPosition = useSelectPosition()
  const removeItem = useRemoveItem()
  const tags = useTags()
  const navigate = useNavigate()
  const hasUserPermission = useHasUserPermission()
  const setSelectPosition = useSetSelectPosition()
  const clusterRef = useClusterRef()
  const leafletRefs = useLeafletRefs()

  const [attestations, setAttestations] = useState<Array<any>>([])

  useEffect(() => {
    if (attestationApi) {
      attestationApi
        .getItems()
        .then((value) => {
          console.log(value)

          setAttestations(value)
        })
        .catch((error) => {
          console.error('Error fetching items:', error)
        })
    }
  }, [attestationApi])

  useEffect(() => {
    const itemId = location.pathname.split('/')[2]
    const item = items.find((i) => i.id === itemId)
    item && setItem(item)
  }, [items, location])

  useEffect(() => {
    setOffers([])
    setNeeds([])
    setRelations([])

    item?.layer?.itemOffersField &&
      getValue(item, item.layer.itemOffersField)?.map((o) => {
        const tag = tags.find((t) => t.id === o.tags_id)
        tag && setOffers((current) => [...current, tag])
        return null
      })
    item?.layer?.itemNeedsField &&
      getValue(item, item.layer.itemNeedsField)?.map((n) => {
        const tag = tags.find((t) => t.id === n.tags_id)
        tag && setNeeds((current) => [...current, tag])
        return null
      })
    item?.relations?.map((r) => {
      const item = items.find((i) => i.id === r.related_items_id)
      item && setRelations((current) => [...current, item])
      return null
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, items])

  useEffect(() => {
    const setMap = async (marker, x) => {
      await map.setView(
        new LatLng(item?.position?.coordinates[1]!, item?.position?.coordinates[0]! + x / 4),
        undefined,
      )
      setTimeout(() => {
        marker.openPopup()
      }, 500)
    }
    if (item) {
      if (item.position) {
        const marker = Object.entries(leafletRefs).find((r) => r[1].item === item)?.[1].marker
        marker &&
          clusterRef.hasLayer(marker) &&
          clusterRef?.zoomToShowLayer(marker, () => {
            const bounds = map.getBounds()
            const x = bounds.getEast() - bounds.getWest()
            setMap(marker, x)
          })
      } else {
        const parent = getFirstAncestor(item)
        const marker = Object.entries(leafletRefs).find((r) => r[1].item === parent)?.[1].marker
        marker &&
          clusterRef.hasLayer(marker) &&
          clusterRef?.zoomToShowLayer(marker, () => {
            const bounds = map.getBounds()
            const x = bounds.getEast() - bounds.getWest()
            setMap(marker, x)
          })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const getFirstAncestor = (item: Item): Item | undefined => {
    const parent = items.find((i) => i.id === item.parent)
    if (parent?.parent) {
      return getFirstAncestor(parent)
    } else {
      return parent
    }
  }

  useEffect(() => {
    item && hasUserPermission('items', 'update', item) && setUpdatePermission(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    selectPosition && map.closePopup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPosition])

  useEffect(() => {
    setTemplate(item?.layer?.itemType.template || userType)
  }, [userType, item])

  return (
    <>
      {item && (
        <MapOverlayPage
          key={item.id}
          className={`!tw-p-0 tw-mx-4 tw-mt-4 tw-mb-4 md:tw-w-[calc(50%-32px)] tw-w-[calc(100%-32px)] tw-min-w-80 tw-max-w-3xl !tw-left-0 sm:!tw-left-auto tw-top-0 tw-bottom-0 tw-transition-opacity tw-duration-500 ${!selectPosition ? 'tw-opacity-100 tw-pointer-events-auto' : 'tw-opacity-0 tw-pointer-events-none'}`}
        >
          <>
            <div className={'tw-px-6 tw-pt-6'}>
              <HeaderView
                api={item.layer?.api}
                item={item}
                deleteCallback={(e) => handleDelete(e, item, setLoading, removeItem, map, navigate)}
                editCallback={() => navigate('/edit-item/' + item.id)}
                setPositionCallback={() => {
                  map.closePopup()
                  setSelectPosition(item)
                  navigate('/')
                }}
                big
                truncateSubname={false}
              />
            </div>

            {template === 'onepager' && <OnepagerView item={item} userType={userType} />}

            {template === 'simple' && <SimpleView item={item} />}

            {template === 'tabs' && (
              <TabsView
                userType={userType}
                attestations={attestations}
                item={item}
                loading={loading}
                offers={offers}
                needs={needs}
                relations={relations}
                updatePermission={updatePermission}
                linkItem={(id) => linkItem(id, item, updateItem)}
                unlinkItem={(id) => unlinkItem(id, item, updateItem)}
              />
            )}
          </>
        </MapOverlayPage>
      )}
    </>
  )
}
