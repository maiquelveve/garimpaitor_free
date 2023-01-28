import { useRef } from 'react';

export default function useDebounce(fn, delay) {
  const timeOutRef = useRef(null)

  function debouncedFn(filter) {
    window.clearTimeout(timeOutRef.current)
    timeOutRef.current = window.setTimeout(() => {
      fn(filter)
    }, delay)
  }

  return debouncedFn;
}
