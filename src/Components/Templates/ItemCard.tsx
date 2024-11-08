/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'

import { StartEndView, TextView } from '#components/Map'
import useWindowDimensions from '#components/Map/hooks/useWindowDimension'
import { HeaderView } from '#components/Map/Subcomponents/ItemPopupComponents/HeaderView'
import { Item } from '#src/types'
import { getValue } from '#utils/GetValue'

import { DateUserInfo } from './DateUserInfo'

export const ItemCard = ({
  i,
  loading,
  url,
  parameterField,
  deleteCallback,
}: {
  i: Item
  loading: boolean
  url: string
  parameterField: string
  deleteCallback: any
}) => {
  const navigate = useNavigate()
  const windowDimensions = useWindowDimensions()

  return (
    <div
      className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-p-4 tw-mb-4 tw-h-fit'
      onClick={() => {
        const params = new URLSearchParams(window.location.search)
        if (windowDimensions.width < 786 && i.position)
          navigate('/' + getValue(i, parameterField) + `${params ? `?${params}` : ''}`)
        else navigate(url + getValue(i, parameterField) + `${params ? `?${params}` : ''}`)
      }}
    >
      <HeaderView
        loading={loading}
        item={i}
        api={i.layer?.api}
        itemAvatarField={i.layer?.itemAvatarField}
        itemNameField={i.layer?.itemNameField}
        itemSubnameField={i.layer?.itemSubnameField}
        editCallback={() => navigate('/edit-item/' + i.id)}
        deleteCallback={() => deleteCallback(i)}
      ></HeaderView>
      <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
        {i.layer?.itemType.show_start_end && <StartEndView item={i}></StartEndView>}
        {i.layer?.itemType.show_text && (
          <TextView truncate item={i} itemTextField={i.layer.itemTextField} />
        )}
      </div>
      <DateUserInfo item={i}></DateUserInfo>
    </div>
  )
}
