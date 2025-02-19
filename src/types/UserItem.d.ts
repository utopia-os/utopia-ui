import type { Profile } from './Profile'

/**
 * @category Types
 */
export interface UserItem {
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role?: any
  email?: string
  password?: string
  profile?: Profile
  first_name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
