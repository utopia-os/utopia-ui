import { StartEndView, TextView } from '../../Map'
import { TagView } from '../../Templates/TagView'
import { LinkedItemsHeaderView } from '../Subcomponents/LinkedItemsHeaderView'
import { ActionButton } from '../Subcomponents/ActionsButton'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAddFilterTag } from '../../Map/hooks/useFilter'
import { Item, Tag } from '../../../types'
import { Link, useNavigate } from 'react-router-dom'
import { useItems } from '../../Map/hooks/useItems'
import { useAssetApi } from '../../AppShell/hooks/useAssets'
import { timeAgo } from '../../../Utils/TimeAgo'

// eslint-disable-next-line no-unused-vars
export const TabsView = ({
  attestations,
  userType,
  item,
  offers,
  needs,
  relations,
  updatePermission,
  loading,
  linkItem,
  unlinkItem,
}: {
  attestations: Array<any>
  userType: string
  item: Item
  offers: Array<Tag>
  needs: Array<Tag>
  relations: Array<Item>
  updatePermission: boolean
  loading: boolean
  linkItem: (id: string) => Promise<void>
  unlinkItem: (id: string) => Promise<void>
}) => {
  const addFilterTag = useAddFilterTag()
  const [activeTab, setActiveTab] = useState<number>()
  const navigate = useNavigate()

  const [addItemPopupType] = useState<string>('')

  const items = useItems()
  const assetsApi = useAssetApi()
  const getUserProfile = (id: string) => {
    return items.find((i) => i.user_created.id === id && i.layer?.itemType.name === userType)
  }

  useEffect(() => {
    scroll()
  }, [addItemPopupType])

  function scroll() {
    tabRef.current?.scrollIntoView()
  }

  const tabRef = useRef<HTMLFormElement>(null)

  const updateActiveTab = useCallback(
    (id: number) => {
      setActiveTab(id)

      const params = new URLSearchParams(window.location.search)
      params.set('tab', `${id}`)
      const newUrl = location.pathname + '?' + params.toString()
      window.history.pushState({}, '', newUrl)
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
    <div role='tablist' className='tw-tabs tw-tabs-lifted tw-mt-2 tw-mb-2 tw-px-6'>
      <input
        type='radio'
        name='my_tabs_2'
        role='tab'
        className={
          'tw-tab tw-font-bold !tw-ps-2 !tw-pe-2 [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]'
        }
        aria-label={`${item.layer?.itemType.icon_as_labels && activeTab !== 1 ? '📝' : '📝\u00A0Info'}`}
        checked={activeTab === 1 && true}
        onChange={() => updateActiveTab(1)}
      />
      <div
        role='tabpanel'
        className='tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-4 tw-mb-4 tw-overflow-x-hidden'
      >
        {item.layer?.itemType.show_start_end && (
          <div className='tw-max-w-xs'>
            <StartEndView item={item}></StartEndView>
          </div>
        )}
        <TextView item={item} />
        <div className='tw-h-4'></div>
        <TextView item={item} itemTextField='contact' />
      </div>
      {item.layer?.itemType.questlog && (
        <>
          <input
            type='radio'
            name='my_tabs_2'
            role='tab'
            className={
              'tw-tab tw-font-bold !tw-ps-2 !tw-pe-2 [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]'
            }
            aria-label={`${item.layer?.itemType.icon_as_labels && activeTab !== 2 ? '❤️' : '❤️\u00A0Credibility'}`}
            checked={activeTab === 2 && true}
            onChange={() => updateActiveTab(2)}
          />
          <div
            role='tabpanel'
            className='tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-4 tw-mb-4 tw-overflow-x-hidden'
          >
            <table className='sm:tw-table-sm md:tw-table-md'>
              <tbody>
                {attestations
                  .filter((a) => a.to.some((t) => t.directus_users_id === item.user_created.id))
                  .sort(
                    (a, b) =>
                      new Date(b.date_created).getTime() - new Date(a.date_created).getTime(),
                  )
                  .map((a, i) => (
                    <tr key={i}>
                      <td>
                        <div
                          className={`tw-cursor-pointer tw-text-3xl tw-mask tw-mask-${a.shape} tw-p-3 tw-mr-2 tw-shadow-xl tw-bg-[${a.color}]`}
                        >
                          {a.emoji}
                        </div>
                      </td>
                      <td>
                        <div className='tw-mr-2'>
                          <i>{a.text}</i>
                        </div>
                      </td>
                      <td>
                        <Link to={'/item/' + getUserProfile(a.user_created.id)?.id}>
                          <div className='flex items-center gap-3'>
                            <div className='tw-avatar'>
                              <div className='tw-mask tw-rounded-full h-8 w-8 tw-mr-2'>
                                <img
                                  src={assetsApi.url + getUserProfile(a.user_created.id)?.image}
                                  alt='Avatar Tailwind CSS Component'
                                />
                              </div>
                            </div>
                            <div>
                              <div className='font-bold'>
                                {getUserProfile(a.user_created.id)?.name}
                              </div>
                              <div className='tw-text-xs opacity-50 tw-text-zinc-500'>
                                {timeAgo(a.date_created)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {item.layer?.itemType.offers_and_needs && (
        <>
          <input
            type='radio'
            name='my_tabs_2'
            role='tab'
            className={`tw-tab tw-font-bold !tw-ps-2 !tw-pe-2 ${!(item.layer?.itemType.icon_as_labels && activeTab !== 3) && 'tw-min-w-[10.4em]'} [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`}
            aria-label={`${item.layer?.itemType.icon_as_labels && activeTab !== 3 ? '♻️' : '♻️\u00A0Offers & Needs'}`}
            checked={activeTab === 3 && true}
            onChange={() => updateActiveTab(3)}
          />
          <div
            role='tabpanel'
            className='tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto fade tw-pt-4 tw-pb-1'
          >
            <div className='tw-h-full'>
              <div className='tw-grid tw-grid-cols-1'>
                {offers.length > 0 ? (
                  <div className='tw-col-span-1'>
                    <h3 className='-tw-mb-2'>Offers</h3>
                    <div className='tw-flex tw-flex-wrap tw-mb-4'>
                      {offers.map((o) => (
                        <TagView
                          key={o?.id}
                          tag={o}
                          onClick={() => {
                            addFilterTag(o)
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {needs.length > 0 ? (
                  <div className='tw-col-span-1'>
                    <h3 className='-tw-mb-2 tw-col-span-1'>Needs</h3>
                    <div className='tw-flex tw-flex-wrap  tw-mb-4'>
                      {needs.map((n) => (
                        <TagView key={n?.id} tag={n} onClick={() => addFilterTag(n)} />
                      ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
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
            className='tw-tab tw-font-bold !tw-ps-2 !tw-pe-2 [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]'
            aria-label={`${item.layer?.itemType.icon_as_labels && activeTab !== 7 ? '🔗' : '🔗\u00A0Relations'}`}
            checked={activeTab === 7 && true}
            onChange={() => updateActiveTab(7)}
          />
          <div
            role='tabpanel'
            className='tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto tw-pt-4 tw-pb-1 -tw-mr-4 -tw-mb-4 tw-overflow-x-hidden'
          >
            <div className='tw-h-full'>
              <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-1 2xl:tw-grid-cols-2 tw-pb-4'>
                {relations &&
                  relations.map((i) => (
                    <div
                      key={i.id}
                      className='tw-cursor-pointer tw-card tw-bg-base-200 tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-text-base-content tw-p-6 tw-mr-4 tw-mb-4'
                      onClick={() => navigate('/item/' + i.id)}
                    >
                      <LinkedItemsHeaderView
                        unlinkPermission={updatePermission}
                        item={i}
                        unlinkCallback={unlinkItem}
                        loading={loading}
                      />
                      <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                        <TextView truncate item={i} />
                      </div>
                    </div>
                  ))}
                {updatePermission && (
                  <ActionButton
                    collection='items'
                    item={item}
                    existingRelations={relations}
                    triggerItemSelected={linkItem}
                    colorField={item.layer.itemColorField}
                  ></ActionButton>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
