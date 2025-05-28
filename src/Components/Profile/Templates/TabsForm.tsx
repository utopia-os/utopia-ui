/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TextAreaInput } from '#components/Input'
import { useUpdateItem } from '#components/Map/hooks/useItems'
import { PopupStartEndInput, TextView } from '#components/Map/Subcomponents/ItemPopupComponents'
import { ActionButton } from '#components/Profile/Subcomponents/ActionsButton'
import { LinkedItemsHeaderView } from '#components/Profile/Subcomponents/LinkedItemsHeaderView'
import { TagsWidget } from '#components/Profile/Subcomponents/TagsWidget'

export const TabsForm = ({
  item,
  state,
  setState,
  updatePermission,
  linkItem,
  unlinkItem,
  loading,
  setUrlParams,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1)
  const navigate = useNavigate()
  const updateItem = useUpdateItem()

  const updateActiveTab = useCallback(
    (id: number) => {
      setActiveTab(id)

      const params = new URLSearchParams(window.location.search)

      params.set('tab', `${id}`)
      const newUrl = location.pathname + '?' + params.toString()
      window.history.pushState({}, '', newUrl)
      setUrlParams(params)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname],
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlTab = params.get('tab')
    setActiveTab(urlTab ? Number(urlTab) : 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return (
    <div className='tw:grow'>
      <div role='tablist' className='tw:tabs tw:h-full tw:tabs-lift tw:mt-3'>
        <input
          type='radio'
          name='my_tabs_2'
          role='tab'
          className={'tw:tab  '}
          aria-label='Info'
          checked={activeTab === 1 && true}
          onChange={() => updateActiveTab(1)}
        />
        <div
          role='tabpanel'
          className='tw:tab-content tw:bg-base-100 tw:border-(--fallback-bc,oklch(var(--bc)/0.2)) tw:rounded-box tw:!h-[calc(100%-48px)] tw:min-h-56 tw:border-none'
        >
          <div
            className={`tw:flex tw:flex-col tw:h-full ${item.layer.itemType.show_start_end_input && 'tw:pt-4'}`}
          >
            {item.layer.itemType.show_start_end_input && (
              <PopupStartEndInput
                item={item}
                showLabels={false}
                updateEndValue={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    end: e,
                  }))
                }
                updateStartValue={(s) =>
                  setState((prevState) => ({
                    ...prevState,
                    start: s,
                  }))
                }
              ></PopupStartEndInput>
            )}

            <TextAreaInput
              labelTitle='About me'
              placeholder='about ...'
              defaultValue={item?.text ? item.text : ''}
              updateFormValue={(v) =>
                setState((prevState) => ({
                  ...prevState,
                  text: v,
                }))
              }
              // containerStyle='tw:grow'
              inputStyle={`tw:h-full  ${!item.layer.itemType.show_start_end_input && 'tw:border-t-0 tw:rounded-tl-none'}`}
            />
            <TextAreaInput
              labelTitle='Contact Info'
              placeholder='contact info ...'
              defaultValue={state.contact || ''}
              updateFormValue={(c) =>
                setState((prevState) => ({
                  ...prevState,
                  contact: c,
                }))
              }
              inputStyle=''
              containerStyle='tw:pt-4'
              // containerStyle='tw:pt-4 tw:h-24 tw:flex-none'
              required={false}
            />
          </div>
        </div>
        {item.layer?.itemType.offers_and_needs && (
          <>
            <input
              type='radio'
              name='my_tabs_2'
              role='tab'
              className={'tw:tab tw:min-w-[10em]  '}
              aria-label='Offers & Needs'
              checked={activeTab === 3 && true}
              onChange={() => updateActiveTab(3)}
            />
            <div
              role='tabpanel'
              className='tw:tab-content tw:bg-base-100 tw:border-(--fallback-bc,oklch(var(--bc)/0.2)) tw:rounded-box tw:!h-[calc(100%-48px)] tw:min-h-56 tw:border-none'
            >
              <div className='tw:h-full'>
                <div className='tw:w-full tw:h-[calc(50%-0.75em)] tw:mb-4'>
                  <TagsWidget
                    defaultTags={state.offers}
                    onUpdate={(v) =>
                      setState((prevState) => ({
                        ...prevState,
                        offers: v,
                      }))
                    }
                    placeholder='enter your offers'
                    containerStyle='tw:bg-transparent tw:w-full tw:h-full tw:mt-3 tw:text-xs tw:h-[calc(100%-1rem)] tw:min-h-[5em] tw:pb-2 tw:overflow-auto'
                  />
                </div>
                <div className='tw:w-full tw:h-[calc(50%-1.5em)]'>
                  <TagsWidget
                    defaultTags={state.needs}
                    onUpdate={(v) =>
                      setState((prevState) => ({
                        ...prevState,
                        needs: v,
                      }))
                    }
                    placeholder='enter your needs'
                    containerStyle='tw:bg-transparent tw:w-full tw:h-full tw:mt-3 tw:text-xs tw:h-[calc(100%-1rem)] tw:min-h-[5em] tw:pb-2 tw:overflow-auto'
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {item.layer?.itemType.relations && (
          <>
            <input
              type='radio'
              name='my_tabs_2'
              role='tab'
              className='tw:tab  '
              aria-label='Links'
              checked={activeTab === 7 && true}
              onChange={() => updateActiveTab(7)}
            />
            <div
              role='tabpanel'
              className='tw:tab-content tw:rounded-box tw:!h-[calc(100%-48px)] tw:overflow-y-auto tw:pt-4 tw:overflow-x-hidden fade'
            >
              <div className='tw:h-full'>
                <div className='tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-1 tw:lg:grid-cols-1 tw:xl:grid-cols-1 tw:2xl:grid-cols-2 tw:mb-4'>
                  {state.relations &&
                    state.relations.map((i) => (
                      <div
                        key={i.id}
                        className='tw:cursor-pointer tw:card tw:bg-base-200 tw:border-[1px] tw:border-base-300 tw:card-body tw:shadow-xl tw:text-base-content tw:mx-4 tw:p-6 tw:mb-4'
                        onClick={() => navigate('/item/' + i.id)}
                      >
                        <LinkedItemsHeaderView
                          unlinkPermission={updatePermission}
                          item={i}
                          unlinkCallback={(id) => unlinkItem(id, item, updateItem)}
                          loading={loading}
                        />
                        <div className='tw:overflow-y-auto tw:overflow-x-hidden tw:max-h-64 fade'>
                          <TextView truncate itemId={item.id} />
                        </div>
                      </div>
                    ))}
                  {updatePermission && (
                    <ActionButton
                      customStyle='tw:bottom-24!'
                      collection='items'
                      item={item}
                      existingRelations={state.relations}
                      triggerItemSelected={(id) => linkItem(id, item, updateItem)}
                    ></ActionButton>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
