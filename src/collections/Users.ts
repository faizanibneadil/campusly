import type { CollectionConfig } from 'payload'

import { isSuperAdminFieldAccess } from '../access/isSuperAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: false,
      requireEmail: false,
      requireUsername: true
    }
  },
  hooks: {
    beforeChange: [
      // The very first user (created from the admin "Create first user" screen) becomes superadmin
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', req })
          if (totalDocs === 0) {
            data.roles = ['superadmin']
          }
        }
        return data
      },
    ],
  },
  fields: [
    // Email added by default
    // Campuses (tenants) array is added by the multi-tenant plugin
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [{ label: 'Super Admin', value: 'superadmin' }],
      saveToJWT: true,
      admin: {
        position: 'sidebar',
      },
      access: {
        // Only super admins can grant or change roles
        create: isSuperAdminFieldAccess,
        update: isSuperAdminFieldAccess,
      },
    },
  ],
  versions: false,
}
