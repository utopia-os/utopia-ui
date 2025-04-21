import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAddFilterTag, useFilterTags, useResetFilterTags } from './hooks/useFilter'
import { useSetTagData, useSetTagApi, useTags } from './hooks/useTags'

import type { ItemsApi } from '#types/ItemsApi'
import type { Tag } from '#types/Tag'

/**
 * This Components injects Tags comming from an {@link ItemsApi | `API`}
 * ```tsx
 * <Tags api={tagsApi} />
 * ```
 * or from on {@link Tag| `Array`}
 * ```tsx
 * <Tags data={tags} />
 * ```
 * Can be child of {@link AppShell | `AppShell`}
 * ```tsx
 * <AppShell>
 *     ...
 *     <Tags api={tagsApi} />
 * </AppShell>
 *  ```
 * Or child of {@link UtopiaMap | `UtopiaMap`}
 * ```tsx
 * <UtopiaMap>
 *     ...
 *     <Tags api={tagsApi} />
 * </UtopiaMap>
 * ```
 * @category Map
 */
export function Tags({ data, api }: { data?: Tag[]; api?: ItemsApi<Tag> }) {
  const setTagData = useSetTagData()
  const setTagApi = useSetTagApi()

  useEffect(() => {
    data && setTagData(data)
    api && setTagApi(api)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, data])

  const location = useLocation()
  const addFilterTag = useAddFilterTag()
  const resetFilterTags = useResetFilterTags()
  const tags = useTags()
  const filterTags = useFilterTags()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlTags = params.get('tags')
    const decodedTags = urlTags ? decodeURIComponent(urlTags) : ''
    const decodedTagsArray = decodedTags.split(';')
    if (
      decodedTagsArray.some(
        (ut) => !filterTags.find((ft) => ut.toLocaleLowerCase() === ft.name.toLocaleLowerCase()),
      ) ||
      filterTags.some(
        (ft) =>
          !decodedTagsArray.find((ut) => ut.toLocaleLowerCase() === ft.name.toLocaleLowerCase()),
      )
    ) {
      resetFilterTags()
      decodedTagsArray.map((urlTag) => {
        const tag = tags.find((t) => t.name.toLocaleLowerCase() === urlTag.toLocaleLowerCase())
        tag && addFilterTag(tag)
        return null
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, tags])

  return <></>
}
