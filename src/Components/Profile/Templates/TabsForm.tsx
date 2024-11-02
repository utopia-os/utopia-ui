/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react'
import { TextAreaInput } from '../../Input'
import { PopupStartEndInput, TextView } from '../../Map'
import { ActionButton } from '../Subcomponents/ActionsButton'
import { LinkedItemsHeaderView } from '../Subcomponents/LinkedItemsHeaderView'
import { TagsWidget } from '../Subcomponents/TagsWidget'
import { useNavigate } from 'react-router-dom'
import { useUpdateItem } from '../../Map/hooks/useItems'

// eslint-disable-next-line react/prop-types
export const TabsForm = ({ item, state, setState, updatePermission, linkItem, unlinkItem, loading, setUrlParams }) => {
  const [activeTab, setActiveTab] = useState<number>(1)
  const navigate = useNavigate()
  const updateItem = useUpdateItem()

  const updateActiveTab = useCallback((id: number) => {
    setActiveTab(id)

    const params = new URLSearchParams(window.location.search)

    params.set('tab', `${id}`)
    const newUrl = location.pathname + '?' + params.toString()
    window.history.pushState({}, '', newUrl)
    setUrlParams(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlTab = params.get('tab')
    setActiveTab(urlTab ? Number(urlTab) : 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return (
        <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-3">
            <input type="radio" name="my_tabs_2" role="tab" className={'tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]'} aria-label="Info" checked={activeTab === 1 && true} onChange={() => updateActiveTab(1)} />
            <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56 tw-border-none">
                <div className={`tw-flex tw-flex-col tw-h-full ${item.layer.itemType.show_start_end_input && 'tw-pt-4'}`}>
                    {item.layer.itemType.show_start_end_input &&
                        <PopupStartEndInput
                            item={item}
                            showLabels={false}
                            updateEndValue={(e) => setState(prevState => ({
                              ...prevState,
                              end: e
                            }))}
                            updateStartValue={(s) => setState(prevState => ({
                              ...prevState,
                              start: s
                            }))}></PopupStartEndInput>
                    }

                    <TextAreaInput placeholder="about ..."
                        defaultValue={item?.text ? item.text : ''}
                        updateFormValue={(v) => setState(prevState => ({
                          ...prevState,
                          text: v
                        }))}
                        containerStyle='tw-grow'
                        inputStyle={`tw-h-full  ${!item.layer.itemType.show_start_end_input && 'tw-border-t-0 tw-rounded-tl-none'}`} />
                    <div>
                        <TextAreaInput
                            placeholder="contact info ..."
                            defaultValue={state.contact || ''}
                            updateFormValue={(c) => setState(prevState => ({
                              ...prevState,
                              contact: c
                            }))}
                            inputStyle="tw-h-24"
                            containerStyle="tw-pt-4"
                        />
                    </div>
                </div>
            </div>
            {item.layer?.itemType.offers_and_needs &&
                <>
                    <input type="radio" name="my_tabs_2" role="tab" className={'tw-tab tw-min-w-[10em]  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]'} aria-label="Offers & Needs" checked={activeTab === 3 && true} onChange={() => updateActiveTab(3)} />
                    <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56 tw-border-none">
                        <div className='tw-h-full'>
                            <div className='tw-w-full tw-h-[calc(50%-0.75em)] tw-mb-4'>
                                <TagsWidget defaultTags={state.offers} onUpdate={(v) => setState(prevState => ({
                                  ...prevState,
                                  offers: v
                                }))} placeholder="enter your offers" containerStyle='tw-bg-transparent tw-w-full tw-h-full tw-mt-3 tw-text-xs tw-h-[calc(100%-1rem)] tw-min-h-[5em] tw-pb-2 tw-overflow-auto' />
                            </div>
                            <div className='tw-w-full tw-h-[calc(50%-1.5em)]'>
                                <TagsWidget defaultTags={state.needs} onUpdate={(v) => setState(prevState => ({
                                  ...prevState,
                                  needs: v
                                }))} placeholder="enter your needs" containerStyle='tw-bg-transparent tw-w-full tw-h-full tw-mt-3 tw-text-xs tw-h-[calc(100%-1rem)] tw-min-h-[5em] tw-pb-2 tw-overflow-auto' />
                            </div>
                        </div>
                    </div>
                </>
            }
            {item.layer?.itemType.relations &&
                <>
                    <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Relations" checked={activeTab === 7 && true} onChange={() => updateActiveTab(7)} />
                    <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-332px)] tw-overflow-y-auto tw-pt-4 tw-pb-1 -tw-mx-4 tw-overflow-x-hidden fade">
                        <div className='tw-h-full'>
                            <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-1 2xl:tw-grid-cols-2 tw-mb-4'>
                                {state.relations && state.relations.map(i =>

                                    <div key={i.id} className='tw-cursor-pointer tw-card tw-bg-base-200 tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-text-base-content tw-mx-4 tw-p-6 tw-mb-4' onClick={() => navigate('/item/' + i.id)}>
                                        <LinkedItemsHeaderView unlinkPermission={updatePermission} item={i} unlinkCallback={(id) => unlinkItem(id, item, updateItem)} loading={loading} />
                                        <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                                            <TextView truncate item={i} />
                                        </div>
                                    </div>
                                )}
                                {updatePermission && <ActionButton customStyle="!tw-bottom-24" collection="items" item={item} existingRelations={state.relations} triggerItemSelected={(id) => linkItem(id, item, updateItem)} colorField={item.layer.itemColorField}></ActionButton>}

                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
  )
}
