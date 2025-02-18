import type { UserItem } from './UserItem'

/**
 * @category Types
 */
export interface UserApi {
  register(email: string, password: string, userName: string): Promise<void>
  login(email: string, password: string): Promise<UserItem | undefined>
  logout(): Promise<void>
  getUser(): Promise<UserItem>
  getToken(): Promise<string | null>
  updateUser(user: UserItem): Promise<void>
  requestPasswordReset(email: string, reset_url?: string)
  passwordReset(token: string, new_password: string)
}
