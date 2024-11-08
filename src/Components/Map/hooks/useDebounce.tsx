/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from 'react'

import { useTimeout } from './useTimeout'

export const useDebounce = (callback, delay, deps) => {
  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...deps, reset])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, [])
}
