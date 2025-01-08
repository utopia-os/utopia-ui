import type { TemplateItem } from './TemplateItem'

export interface ItemType {
  name: string
  profileTemplate: TemplateItem[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
