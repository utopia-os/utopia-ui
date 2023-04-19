import { LatLng } from 'leaflet'
import * as React from 'react'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { Item, Tag } from '../../../types'
import { replaceURLs } from '../../../Utils/ReplaceURLs'
import { useRemoveItem } from '../hooks/useItems'
import { NewItemPopupProps } from './NewItemPopup'

export interface UtopiaPopupProps {
  item: Item,
  tags: Tag[],
  setNewItemPopup?: React.Dispatch<React.SetStateAction<NewItemPopupProps | null>>
}


const Popup = (props: UtopiaPopupProps) => {
  const item: Item = props.item;
  const tags: Tag[] = props.tags;
  const removeItem = useRemoveItem();
  const map = useMap();

  const removeItemFromMap = (event: React.MouseEvent<HTMLElement>) => {
    removeItem(item);
    event.stopPropagation();
    map.closePopup();
  }

  const openEditPopup = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    map.closePopup();
    if (props.setNewItemPopup)
      props.setNewItemPopup({ position: new LatLng(item.position.coordinates[1], item.position.coordinates[0]), layer: item.layer, item: item, setNewItemPopup: props.setNewItemPopup })
  }

  return (
    <LeafletPopup maxHeight={377} minWidth={275} maxWidth={275} autoPanPadding={[20, 5]}>
      <div>
        <div className='tw-grid tw-grid-cols-6'>
          <div className='tw-col-span-5'>
            <b className="tw-text-xl tw-font-bold">{item.name}</b>
          </div>
          <div className='tw-col-span-1'>
            <div className="tw-dropdown tw-dropdown-bottom">
              <label tabIndex={0} className="tw-btn tw-m-1 tw-bg-white hover:tw-bg-white tw-text-gray-500 hover:tw-text-gray-700 tw-leading-3 tw-border-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </label>
              <ul tabIndex={0} className="tw-dropdown-content tw-menu tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box">
                <li>
                  <a className='tw-bg-white hover:tw-bg-white tw-text-gray-500 hover:tw-text-gray-700' onClick={openEditPopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a className='tw-bg-white hover:tw-bg-white tw-text-gray-500 hover:tw-text-gray-700' onClick={removeItemFromMap}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='tw-overflow-y-auto tw-max-h-72'>
        {item.start && item.end &&
          <div className="tw-flex tw-flex-row">
            <div className="basis-2/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6 tw-mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className='tw-align-middle'>{new Date(item.start).toISOString().substring(0, 10) || ""}</span>
            </div>
            <div className="tw-basis-1/5 tw-place-content-center">
              <span>-</span>
            </div>
            <div className="tw-basis-2/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6 tw-mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className='tw-align-middle tw-leading-6'>{new Date(item.end).toISOString().substring(0, 10) || ""}</span>
            </div>
          </div>
        }

        <p style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: replaceURLs(item.text) }} />
        <p>

          {item.tags &&
            tags.map((tag: Tag) => (
              <span className="" style={{ fontWeight: "bold", display: "inline-block", color: "#fff", padding: ".3rem", borderRadius: ".5rem", backgroundColor: tag.color, margin: '.2rem', fontSize: "100%" }} key={tag.id}>#{tag.name}</span>
            ))
          }
        </p>
        </div>
      </div>
    </LeafletPopup>
  )
}

export { Popup };


