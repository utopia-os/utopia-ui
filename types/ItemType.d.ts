import type { Key } from 'react'

interface TextParameters {
  dataField: string
  heading: string
  hideWhenEmpty: boolean
}

interface GroupSubHeaderParameters {
  shareBaseUrl: string
  platforms: string[]
}

interface ContactInfoParameters {
  heading: string
}

interface StartEndParemeters {
  heading: string
}

export type Parameters =
  | TextParameters
  | GroupSubHeaderParameters
  | ContactInfoParameters
  | StartEndParemeters

export interface ItemType {
  name: string
  show_start_end: boolean
  show_text: boolean
  profileTemplate: { collection: string | number; id: Key | null | undefined; item: Parameters }[]
  offers_and_needs: boolean
  icon_as_labels: unknown
  relations: boolean
  template: string
  show_start_end_input: boolean
  questlog: boolean
}
