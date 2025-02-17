import type { Key } from 'react'

export interface ItemType {
  name: string
  show_start_end: boolean
  show_text: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileTemplate: { collection: string | number; id: Key | null | undefined; item: any }[]
  offers_and_needs: boolean
  icon_as_labels: unknown
  relations: boolean
  template: string
  show_start_end_input: boolean
  questlog: boolean
}
