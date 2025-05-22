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

  return <></>
}
