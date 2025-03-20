import { useNavigate } from 'react-router-dom'

import { StartEndView, TextView } from '#components/Map'
import useWindowDimensions from '#components/Map/hooks/useWindowDimension'
import { HeaderView } from '#components/Map/Subcomponents/ItemPopupComponents/HeaderView'

import { DateUserInfo } from './DateUserInfo'

import type { Item } from '#types/Item'

export const ItemCard = ({
  i,
  loading,
  url,
  deleteCallback,
}: {
  i: Item
  loading: boolean
  url: string
  deleteCallback: (item: Item) => void
}) => {
  const navigate = useNavigate()
  const windowDimensions = useWindowDimensions()

  return (
    <div
      className='tw:cursor-pointer tw-card tw:border-[1px] tw:border-base-300 tw-card-body tw:shadow-xl tw:bg-base-100 tw:text-base-content tw:p-4 tw:mb-4 tw:h-fit'
      onClick={() => {
        // We could have an onClick callback instead
        const params = new URLSearchParams(window.location.search)
        if (windowDimensions.width < 786 && i.position)
          navigate('/' + i.id + `${params.size > 0 ? `?${params.toString()}` : ''}`)
        else navigate(url + i.id + `${params.size > 0 ? `?${params.toString()}` : ''}`)
      }}
    >
      <HeaderView
        loading={loading}
        item={i}
        api={i.layer?.api}
        editCallback={() => navigate('/edit-item/' + i.id)}
        deleteCallback={() => deleteCallback(i)}
      ></HeaderView>
      <div className='tw:overflow-y-auto tw:overflow-x-hidden tw:max-h-64 fade'>
        {i.layer?.itemType.show_start_end && <StartEndView item={i}></StartEndView>}
        {i.layer?.itemType.show_text && <TextView truncate text={i.text} itemId={i.id} />}
      </div>
      <DateUserInfo item={i}></DateUserInfo>
    </div>
  )
}
