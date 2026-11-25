import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess } from '../access/isSuperAdmin'

// A campus is a tenant in Campusly (see multiTenantPlugin in payload.config.ts)
export const Campuses: CollectionConfig = {
  slug: 'campuses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'domain', 'updatedAt'],
  },
  access: {
    // Only super admins can manage campuses.
    // Deleting a campus also deletes all of its documents (cleanupAfterTenantDelete).
    // `read` is scoped by the multi-tenant plugin to the campuses a user belongs to.
    create: isSuperAdminAccess,
    update: isSuperAdminAccess,
    delete: isSuperAdminAccess,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'slug',
      useAsSlug: 'name',
    },
    {
      // Reserved for each campus's own website on a Campusly subdomain (future)
      name: 'domain',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'Domain or subdomain for this campus website, e.g. school1.campusly.devslix.com',
      },
    },
  ],
}
