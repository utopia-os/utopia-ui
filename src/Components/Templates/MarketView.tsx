import { useEffect, useState } from 'react'
import { useItems } from '../Map/hooks/useItems'
import { Tag } from '../../types'
import { useTags } from '../Map/hooks/useTags'
import { getValue } from '../../Utils/GetValue'
import { MapOverlayPage } from './MapOverlayPage'
import { TagView } from './TagView'
import { useNavigate } from 'react-router-dom'

function groupAndCount(arr) {
  const grouped = arr.reduce((acc, obj) => {
    const found = acc.find((item) => JSON.stringify(item.object) === JSON.stringify(obj))

    if (found) {
      found.count += 1
    } else {
      acc.push({ object: obj, count: 1 })
    }

    return acc
  }, [])

  return grouped.sort((a, b) => b.count - a.count)
}

export const MarketView = () => {
  const [offers, setOffers] = useState<Array<Tag>>([])
  const [needs, setNeeds] = useState<Array<Tag>>([])
  const navigate = useNavigate()

  const items = useItems()
  const tags = useTags()

  useEffect(() => {
    setOffers([])
    setNeeds([])
    items.map((i) => {
      i?.layer?.itemOffersField &&
        getValue(i, i.layer.itemOffersField)?.map((o) => {
          const tag = tags.find((t) => t.id === o.tags_id)
          tag && setOffers((current) => [...current, tag])
          return null
        })
      i?.layer?.itemNeedsField &&
        getValue(i, i.layer.itemNeedsField)?.map((n) => {
          const tag = tags.find((t) => t.id === n.tags_id)
          tag && setNeeds((current) => [...current, tag])
          return null
        })
      return null
    })
    console.log(offers)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  return (
    <MapOverlayPage className='tw-rounded-none tw-overflow-y-auto tw-bg-base-200 !tw-p-4'>
      <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2'>
        <div>
          <p className='tw-text-lg tw-font-bold'>Offers</p>
          <div className='tw-flex tw-flex-wrap'>
            {groupAndCount(offers).map((o) => (
              <TagView
                onClick={() => navigate(`/?tags=${o.object.name}`)}
                key={o.object.id}
                tag={o.object}
                count={o.count}
              ></TagView>
            ))}
          </div>
        </div>
        <div>
          <p className='tw-text-lg tw-font-bold'>Needs</p>
          <div className='tw-flex tw-flex-wrap'>
            {groupAndCount(needs).map((o) => (
              <TagView
                onClick={() => navigate(`/?tags=${o.object.name}`)}
                key={o.object.id}
                tag={o.object}
                count={o.count}
              ></TagView>
            ))}
          </div>
        </div>
      </div>
    </MapOverlayPage>
  )
}
