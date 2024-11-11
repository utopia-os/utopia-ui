/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios'
import { LatLng, LatLngBounds, marker } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDebounce } from '#components/Map/hooks/useDebounce'
import { useAddFilterTag } from '#components/Map/hooks/useFilter'
import { useItems } from '#components/Map/hooks/useItems'
import { useLeafletRefs } from '#components/Map/hooks/useLeafletRefs'
import { useTags } from '#components/Map/hooks/useTags'
import useWindowDimensions from '#components/Map/hooks/useWindowDimension'
import { Item } from '#src/types'
import { decodeTag } from '#utils/FormatTags'
import { getValue } from '#utils/GetValue'
import MarkerIconFactory from '#utils/MarkerIconFactory'

import { LocateControl } from './LocateControl'
import { SidebarControl } from './SidebarControl'

export const SearchControl = () => {
  const windowDimensions = useWindowDimensions()
  const [popupOpen, setPopupOpen] = useState(false)

  const [value, setValue] = useState('')
  const [geoResults, setGeoResults] = useState<any[]>([])
  const [tagsResults, setTagsResults] = useState<any[]>([])
  const [itemsResults, setItemsResults] = useState<Item[]>([])
  const [hideSuggestions, setHideSuggestions] = useState(true)

  const map = useMap()
  const tags = useTags()
  const items = useItems()
  const leafletRefs = useLeafletRefs()
  const addFilterTag = useAddFilterTag()

  useMapEvents({
    popupopen: () => {
      setPopupOpen(true)
    },
    popupclose: () => {
      setPopupOpen(false)
    },
  })

  const navigate = useNavigate()

  useDebounce(
    () => {
      const searchGeo = async () => {
        try {
          const { data } = await axios.get(`https://photon.komoot.io/api/?q=${value}&limit=5`)
          setGeoResults(data.features)
        } catch (error) {
          console.log(error)
        }
      }
      searchGeo()
      setItemsResults(
        items.filter((item) => {
          if (item.layer?.itemNameField) item.name = getValue(item, item.layer.itemNameField)
          if (item.layer?.itemTextField) item.text = getValue(item, item.layer.itemTextField)
          return (
            value.length > 2 &&
            ((item.layer?.listed && item.name.toLowerCase().includes(value.toLowerCase())) ||
              item.text.toLowerCase().includes(value.toLowerCase()))
          )
        }),
      )
      let phrase = value
      if (value.startsWith('#')) phrase = value.substring(1)
      setTagsResults(tags.filter((tag) => tag.name.toLowerCase().includes(phrase.toLowerCase())))
    },
    500,
    [value],
  )

  const hide = async () => {
    setTimeout(() => {
      setHideSuggestions(true)
    }, 200)
  }

  const searchInput = useRef<HTMLInputElement>(null)
  const [embedded, setEmbedded] = useState<boolean>(true)

  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const embedded = params.get('embedded')
    embedded !== 'true' && setEmbedded(false)
  }, [location])

  return (
    <>
      {!(windowDimensions.height < 500 && popupOpen && hideSuggestions) && (
        <div className='tw-w-[calc(100vw-2rem)] tw-max-w-[22rem] '>
          <div className='tw-flex tw-flex-row'>
            {embedded && <SidebarControl />}
            <div className='tw-relative'>
              <input
                type='text'
                placeholder='search ...'
                autoComplete='off'
                value={value}
                className='tw-input tw-input-bordered tw-grow tw-shadow-xl tw-rounded-lg tw-pr-12'
                ref={searchInput}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => {
                  setHideSuggestions(false)
                  if (windowDimensions.width < 500) map.closePopup()
                }}
                onBlur={() => hide()}
              />
              {value.length > 0 && (
                <button
                  className='tw-btn tw-btn-sm tw-btn-circle tw-absolute tw-right-2 tw-top-2'
                  onClick={() => setValue('')}
                >
                  ✕
                </button>
              )}
            </div>
            <LocateControl />
          </div>
          {hideSuggestions ||
          (Array.from(geoResults).length === 0 &&
            itemsResults.length === 0 &&
            tagsResults.length === 0 &&
            !isGeoCoordinate(value)) ||
          value.length === 0 ? (
            ''
          ) : (
            <div className='tw-card tw-card-body tw-bg-base-100 tw-p-4 tw-mt-2 tw-shadow-xl tw-overflow-y-auto tw-max-h-[calc(100dvh-152px)] tw-absolute tw-z-3000'>
              {tagsResults.length > 0 && (
                <div className='tw-flex tw-flex-wrap'>
                  {tagsResults.slice(0, 3).map((tag) => (
                    <div
                      key={tag.name}
                      className='tw-rounded-2xl tw-text-white tw-p-1 tw-px-4 tw-shadow-md tw-card tw-mr-2 tw-mb-2 tw-cursor-pointer'
                      style={{ backgroundColor: tag.color }}
                      onClick={() => {
                        addFilterTag(tag)
                      }}
                    >
                      <b>#{decodeTag(tag.name)}</b>
                    </div>
                  ))}
                </div>
              )}

              {itemsResults.length > 0 && tagsResults.length > 0 && (
                <hr className='tw-opacity-50'></hr>
              )}
              {itemsResults.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className='tw-cursor-pointer hover:tw-font-bold'
                  onClick={() => {
                    const marker = Object.entries(leafletRefs).find((r) => r[1].item === item)?.[1]
                      .marker
                    if (marker) {
                      navigate(`/${item.id}?${new URLSearchParams(window.location.search)}`)
                    } else {
                      navigate(
                        'item/' + item.id + '?' + new URLSearchParams(window.location.search),
                      )
                    }
                  }}
                >
                  <div className='tw-flex tw-flex-row'>
                    <img
                      src={item.layer?.menuIcon}
                      className='tw-text-current tw-w-5 tw-mr-2 tw-mt-0'
                    />
                    <div>
                      <div className='tw-text-sm tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-max-w-[17rem]'>
                        {item.name}
                      </div>
                      <div className='tw-text-xs tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-max-w-[17rem]'>
                        {item.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {Array.from(geoResults).length > 0 &&
                (itemsResults.length > 0 || tagsResults.length > 0) && (
                  <hr className='tw-opacity-50'></hr>
                )}
              {Array.from(geoResults).map((geo) => (
                <div
                  className='tw-flex tw-flex-row hover:tw-font-bold tw-cursor-pointer'
                  key={Math.random()}
                  onClick={() => {
                    searchInput.current?.blur()
                    marker(new LatLng(geo.geometry.coordinates[1], geo.geometry.coordinates[0]), {
                      icon: MarkerIconFactory('circle', '#777', 'RGBA(35, 31, 32, 0.2)', 'point'),
                    })
                      .addTo(map)
                      .bindPopup(
                        `<h3 class="tw-text-base tw-font-bold">${geo?.properties.name ? geo?.properties.name : value}<h3>${capitalizeFirstLetter(geo?.properties?.osm_value)}`,
                      )
                      .openPopup()
                      .addEventListener('popupclose', (e) => {
                        console.log(e.target.remove())
                      })
                    if (geo.properties.extent)
                      map.fitBounds(
                        new LatLngBounds(
                          new LatLng(geo.properties.extent[1], geo.properties.extent[0]),
                          new LatLng(geo.properties.extent[3], geo.properties.extent[2]),
                        ),
                      )
                    else
                      map.setView(
                        new LatLng(geo.geometry.coordinates[1], geo.geometry.coordinates[0]),
                        15,
                        { duration: 1 },
                      )
                    hide()
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='tw-text-current tw-mr-2 tw-mt-0 tw-w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                    />
                  </svg>

                  <div>
                    <div className='tw-text-sm tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-max-w-[17rem]'>
                      {geo?.properties.name ? geo?.properties.name : value}
                    </div>
                    <div className='tw-text-xs tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-max-w-[17rem]'>
                      {geo?.properties?.city && `${capitalizeFirstLetter(geo?.properties?.city)}, `}{' '}
                      {geo?.properties?.osm_value &&
                        geo?.properties?.osm_value !== 'yes' &&
                        geo?.properties?.osm_value !== 'primary' &&
                        geo?.properties?.osm_value !== 'path' &&
                        geo?.properties?.osm_value !== 'secondary' &&
                        geo?.properties?.osm_value !== 'residential' &&
                        geo?.properties?.osm_value !== 'unclassified' &&
                        `${capitalizeFirstLetter(geo?.properties?.osm_value)}, `}{' '}
                      {geo.properties.state && `${geo.properties.state}, `}{' '}
                      {geo.properties.country && geo.properties.country}
                    </div>
                  </div>
                </div>
              ))}
              {isGeoCoordinate(value) && (
                <div
                  className='tw-flex tw-flex-row hover:tw-font-bold tw-cursor-pointer'
                  onClick={() => {
                    marker(
                      new LatLng(extractCoordinates(value)![0], extractCoordinates(value)![1]),
                      {
                        icon: MarkerIconFactory('circle', '#777', 'RGBA(35, 31, 32, 0.2)', 'point'),
                      },
                    )
                      .addTo(map)
                      .bindPopup(
                        `<h3 class="tw-text-base tw-font-bold">${extractCoordinates(value)![0]}, ${extractCoordinates(value)![1]}</h3>`,
                      )
                      .openPopup()
                      .addEventListener('popupclose', (e) => {
                        console.log(e.target.remove())
                      })
                    map.setView(
                      new LatLng(extractCoordinates(value)![0], extractCoordinates(value)![1]),
                      15,
                      { duration: 1 },
                    )
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='tw-text-current tw-mr-2 tw-mt-0 tw-w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5'
                    />
                  </svg>

                  <div>
                    <div className='tw-text-sm tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-max-w-[17rem]'>
                      {value}
                    </div>
                    <div className='tw-text-xs tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-max-w-[17rem]'>
                      {'Coordiante'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

function isGeoCoordinate(input) {
  const geokoordinatenRegex =
    // eslint-disable-next-line security/detect-unsafe-regex
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
  return geokoordinatenRegex.test(input)
}

function extractCoordinates(input): number[] | null {
  const result = input.split(',')
  if (result) {
    const latitude = parseFloat(result[0])
    const longitude = parseFloat(result[1])
    if (!isNaN(latitude) && !isNaN(longitude)) {
      return [latitude, longitude]
    }
  }
  return null // Invalid input or error
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
