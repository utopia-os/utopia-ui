import { useEffect, useRef, useState } from 'react'

import type { Item } from '#types/Item'
import { TextPreview } from './TextPreview'

export const LazyTextPreview = ({ item }: { item: Item }) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{visible ? <TextPreview item={item} /> : <div style={{ height: '4rem' }} />}</div>
}
