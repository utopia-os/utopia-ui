import type { Item } from '#types/Item'

/**
 * @category Map
 */
export const PopupCheckboxInput = ({
  dataField,
  label,
  item,
}: {
  dataField: string
  label: string
  item?: Item
}) => {
  return (
    <label htmlFor={item?.id} className='tw-label tw:justify-normal tw:pt-1 tw:pb-1'>
      <input
        id={item?.id}
        type='checkbox'
        name={dataField}
        className='tw-checkbox tw-checkbox-xs tw-checkbox-success'
        checked={item?.public_edit}
      />
      <span className='tw:text-sm tw-label-text tw:mx-2 tw:cursor-pointer'>{label}</span>
    </label>
  )
}
