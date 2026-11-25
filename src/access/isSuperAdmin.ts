import type { Access, FieldAccess } from 'payload'

import type { User } from '../payload-types'

export const isSuperAdmin = (user: null | Partial<User> | undefined): boolean =>
  Boolean(user?.roles?.includes('superadmin'))

export const isSuperAdminAccess: Access = ({ req }) => isSuperAdmin(req.user as User | null)

export const isSuperAdminFieldAccess: FieldAccess = ({ req }) =>
  isSuperAdmin(req.user as User | null)
