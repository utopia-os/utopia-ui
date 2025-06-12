import { useEffect } from 'react'

import { useTimeout } from './useTimeout'

export const useDebounce = (callback: () => void, delay: number, deps: string[]) => {
  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...deps, reset])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, [])
}
