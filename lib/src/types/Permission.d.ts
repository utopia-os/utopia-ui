import type { PermissionAction } from './PermissionAction'
import type { PermissionCondition } from './PermissionCondition'

/**
 * @category Types
 */
export interface Permission {
  id?: string
  policy?: { name: string }
  collection: string
  action: PermissionAction
  permissions?: {
    // Optional, für spezifische Bedingungen wie `user_created`
    _and: PermissionCondition[]
  }
}
