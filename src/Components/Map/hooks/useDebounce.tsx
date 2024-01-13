import { useEffect } from 'react';
import { useTimeout } from './useTimeout';

export const useDebounce = (callback, delay, deps) => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...deps, reset]);
  useEffect(clear, []);
}