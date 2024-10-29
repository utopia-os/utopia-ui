import { DateUserInfo } from './DateUserInfo'
import { StartEndView, TextView } from '../Map'
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView'
import { Item } from '../../types'
import { useNavigate } from 'react-router-dom'
import { getValue } from '../../Utils/GetValue'
import useWindowDimensions from '../Map/hooks/useWindowDimension'

export const ItemCard = ({ i, loading, url, parameterField, deleteCallback }: { i: Item, loading: boolean, url: string, parameterField: string, deleteCallback: any }) => {
  const navigate = useNavigate()
  const windowDimensions = useWindowDimensions()

  return (
    <div className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-p-4 tw-mb-4 tw-h-fit' onClick={() => {
      const params = new URLSearchParams(window.location.search)
      if (windowDimensions.width < 786 && i.position) navigate('/' + getValue(i, parameterField) + `${params ? `?${params}` : ''}`)
      else navigate(url + getValue(i, parameterField) + `${params ? `?${params}` : ''}`)
    }}>
      <HeaderView loading={loading} item={i} api={i.layer?.api} itemAvatarField={i.layer?.itemAvatarField} itemNameField={i.layer?.itemNameField} itemSubnameField={i.layer?.itemSubnameField} editCallback={() => navigate('/edit-item/' + i.id)} deleteCallback={() => deleteCallback(i)}></HeaderView>
      <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
        {i.layer?.itemType.show_start_end &&
          <StartEndView item={i}></StartEndView>
        }
        {i.layer?.itemType.show_text &&
          <TextView truncate item={i} itemTextField={i.layer?.itemTextField} />
        }
      </div>
      <DateUserInfo item={i}></DateUserInfo>
    </div>
  )
}
