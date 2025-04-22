import { describe, it, expect, vi } from 'vitest'

import { linkItem } from './itemFunctions'

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
  let updateApi: () => void = vi.fn()
  const item = { layer: { api: { updateItem: () => updateApi() } } }
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
