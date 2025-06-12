import { describe, it, expect, vi } from 'vitest'

import { linkItem } from './itemFunctions'

import type { Item } from '#types/Item'

const toastErrorMock: (t: string) => void = vi.fn()
const toastSuccessMock: (t: string) => void = vi.fn()

vi.mock('react-toastify', () => ({
  toast: {
    error: (t: string) => toastErrorMock(t),
    success: (t: string) => toastSuccessMock(t),
  },
}))

describe('linkItem', () => {
  const id = 'some-id'
  let updateApi: (item: Partial<Item>) => Promise<Item> = vi.fn()
  const item: Item = {
    layer: {
      api: {
        updateItem: (item) => updateApi(item),
        getItems: vi.fn(),
      },
      name: '',
      menuIcon: '',
      menuColor: '',
      menuText: '',
      markerIcon: {
        image: '',
      },
      markerShape: 'square',
      markerDefaultColor: '',
      itemType: {
        name: 'Test Item Type',
        show_name_input: true,
        show_profile_button: false,
        show_start_end: true,
        show_start_end_input: true,
        show_text: true,
        show_text_input: true,
        custom_text: 'This is a custom text for the item type.',
        profileTemplate: [
          { collection: 'users', id: null, item: {} },
          { collection: 'posts', id: '123', item: {} },
        ],
        offers_and_needs: true,
        icon_as_labels: {},
        relations: true,
        template: 'default',
        questlog: false,
      },
    },
    id: '',
    name: '',
  }
  const updateItem = vi.fn()

  beforeEach(() => {
    updateApi = vi.fn()
    vi.clearAllMocks()
  })

  describe('api rejects', () => {
    it('toasts an error', async () => {
      updateApi = vi.fn().mockRejectedValue('autsch')
      await linkItem(id, item, updateItem)
      expect(toastErrorMock).toHaveBeenCalledWith('autsch')
      expect(updateItem).not.toHaveBeenCalled()
      expect(toastSuccessMock).not.toHaveBeenCalled()
    })
  })

  describe('api resolves', () => {
    it('toasts success and calls updateItem()', async () => {
      await linkItem(id, item, updateItem)
      expect(toastErrorMock).not.toHaveBeenCalled()
      expect(updateItem).toHaveBeenCalledTimes(1)
      expect(toastSuccessMock).toHaveBeenCalledWith('Item linked')
    })
  })
})
