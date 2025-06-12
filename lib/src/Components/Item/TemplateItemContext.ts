import { createContext } from 'react'

import type { Item } from '#types/Item'

const ItemContext = createContext<Item | undefined>(undefined)

export default ItemContext
