import { StartEndView, TextView } from '../../Map'
import { TagView } from '../../Templates/TagView'
import { LinkedItemsHeaderView } from '../Subcomponents/LinkedItemsHeaderView'
import { ActionButton } from '../Subcomponents/ActionsButton'
import { useEffect, useRef, useState } from 'react'
import { useAddFilterTag } from '../../Map/hooks/useFilter'
import { Item, Tag } from 'utopia-ui/dist/types'
import { useNavigate } from 'react-router-dom'

export const TabsView = ({ item, offers, needs, relations, updatePermission, loading, linkItem, unlinkItem }: { item: Item, offers: Array<Tag>, needs: Array<Tag>, relations: Array<Item>, updatePermission: boolean, loading: boolean, linkItem: (id: string) => Promise<void>, unlinkItem: (id: string) => Promise<void> }) => {

  const addFilterTag = useAddFilterTag();
  const [activeTab, setActiveTab] = useState<number>(1);
  const navigate = useNavigate();

  const [addItemPopupType, setAddItemPopupType] = useState<string>("");

  useEffect(() => {
      scroll();
  }, [addItemPopupType])
  
  function scroll() {
      tabRef.current?.scrollIntoView();
  }

  const tabRef = useRef<HTMLFormElement>(null);

  const updateActiveTab = (id: number) => {
    setActiveTab(id);

    let params = new URLSearchParams(window.location.search);
    let urlTab = params.get("tab");
    if (!urlTab?.includes(id.toString()))
      params.set("tab", `${id ? id : ""}`)
    navigate(location.pathname+ "?" + params.toString());
  }

  useEffect(() => {
    let params = new URLSearchParams(location.search);
    let urlTab = params.get("tab");
    urlTab ? setActiveTab(Number(urlTab)) : setActiveTab(1);
  }, [location])

  return (
    <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-2 tw-mb-2 tw-px-6">
      <input type="radio" name="my_tabs_2" role="tab"
        className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`}
        aria-label="Info" checked={activeTab == 1 && true}
        onChange={() => updateActiveTab(1)} />
      <div role="tabpanel"
        className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-4 tw-mb-4 tw-overflow-x-hidden">
        {item.layer?.itemType.show_start_end &&
          <div className='tw-max-w-xs'><StartEndView item={item}></StartEndView></div>
        }
        <TextView item={item} />
      </div>

      {item.layer?.itemType.offers_and_needs &&

        <>

          <input type="radio" name="my_tabs_2" role="tab" className="tw-tab tw-min-w-[10em] [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Offers & Needs" checked={activeTab == 3 && true} onChange={() => updateActiveTab(3)} />
          <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto fade tw-pt-4 tw-pb-1" >
            <div className='tw-h-full'>
              <div className='tw-grid tw-grid-cols-1'>
                {
                  offers.length > 0 ?
                    <div className='tw-col-span-1'>
                      <h3 className='-tw-mb-2'>Offers</h3>
                      < div className='tw-flex tw-flex-wrap tw-mb-4'>
                        {
                          offers.map(o => <TagView key={o?.id} tag={o} onClick={() => {
                            addFilterTag(o)
                          }} />)
                        }
                      </div>
                    </div> : ""
                }
                {
                  needs.length > 0 ?
                    <div className='tw-col-span-1'>
                      <h3 className='-tw-mb-2 tw-col-span-1'>Needs</h3>
                      < div className='tw-flex tw-flex-wrap  tw-mb-4'>
                        {
                          needs.map(n => <TagView key={n?.id} tag={n} onClick={() => addFilterTag(n)} />)
                        }
                      </div>
                    </div> : ""
                }
              </div>
            </div>
          </div>
        </>


      }

      {item.layer?.itemType.relations &&
        <>
          <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Relations" checked={activeTab == 7 && true} onChange={() => updateActiveTab(7)} />
          <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto tw-pt-4 tw-pb-1 -tw-mr-4 -tw-mb-4 tw-overflow-x-hidden">
            <div className='tw-h-full'>
              <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-1 2xl:tw-grid-cols-2 tw-pb-4'>
                {relations && relations.map(i =>


                  <div key={i.id} className='tw-cursor-pointer tw-card tw-bg-base-200 tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-text-base-content tw-p-6 tw-mr-4 tw-mb-4' onClick={() => navigate('/item/' + i.id)}>
                    <LinkedItemsHeaderView unlinkPermission={updatePermission} item={i} unlinkCallback={unlinkItem} loading={loading} />
                    <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                      <TextView truncate item={i} />
                    </div>
                  </div>
                )}
                {updatePermission && <ActionButton collection="items" item={item} existingRelations={relations} triggerItemSelected={linkItem} colorField={item.layer.itemColorField}></ActionButton>}

              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}
