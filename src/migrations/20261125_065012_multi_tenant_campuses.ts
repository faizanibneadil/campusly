import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_campuses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`campus_id\` integer NOT NULL,
  	FOREIGN KEY (\`campus_id\`) REFERENCES \`campuses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_campuses_order_idx\` ON \`users_campuses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_campuses_parent_id_idx\` ON \`users_campuses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`users_campuses_campus_idx\` ON \`users_campuses\` (\`campus_id\`);`)
  await db.run(sql`CREATE TABLE \`campuses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`domain\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`campuses_slug_idx\` ON \`campuses\` (\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`campuses_domain_idx\` ON \`campuses\` (\`domain\`);`)
  await db.run(sql`CREATE INDEX \`campuses_updated_at_idx\` ON \`campuses\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`campuses_created_at_idx\` ON \`campuses\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`campuses_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`campuses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`campuses_rels_order_idx\` ON \`campuses_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`campuses_rels_parent_idx\` ON \`campuses_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`campuses_rels_path_idx\` ON \`campuses_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`campuses_rels_users_id_idx\` ON \`campuses_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_campuses_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_domain\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`campuses\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_campuses_v_parent_idx\` ON \`_campuses_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_version_version_slug_idx\` ON \`_campuses_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_version_version_domain_idx\` ON \`_campuses_v\` (\`version_domain\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_version_version_updated_at_idx\` ON \`_campuses_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_version_version_created_at_idx\` ON \`_campuses_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_created_at_idx\` ON \`_campuses_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_updated_at_idx\` ON \`_campuses_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_campuses_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_campuses_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_campuses_v_rels_order_idx\` ON \`_campuses_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_rels_parent_idx\` ON \`_campuses_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_rels_path_idx\` ON \`_campuses_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_campuses_v_rels_users_id_idx\` ON \`_campuses_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`campus_id\` integer REFERENCES campuses(id);`)
  await db.run(sql`CREATE INDEX \`media_campus_idx\` ON \`media\` (\`campus_id\`);`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_campus_id\` integer REFERENCES campuses(id);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_campus_idx\` ON \`_media_v\` (\`version_campus_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`campuses_id\` integer REFERENCES campuses(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_campuses_id_idx\` ON \`payload_locked_documents_rels\` (\`campuses_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_campuses\`;`)
  await db.run(sql`DROP TABLE \`campuses\`;`)
  await db.run(sql`DROP TABLE \`campuses_rels\`;`)
  await db.run(sql`DROP TABLE \`_campuses_v\`;`)
  await db.run(sql`DROP TABLE \`_campuses_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT '',
  	\`_objectkey\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`_stored\` integer,
  	\`_transforms\` text,
  	\`original_filename\` text,
  	\`original_url\` text,
  	\`original_mime_type\` text,
  	\`original_filesize\` numeric,
  	\`original_width\` numeric,
  	\`original_height\` numeric,
  	\`original_prefix\` text,
  	\`original__objectkey\` text,
  	\`original__stored\` integer
  );
  `)
  await db.run(sql`INSERT INTO \`__new_media\`("id", "alt", "prefix", "_objectkey", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "_stored", "_transforms", "original_filename", "original_url", "original_mime_type", "original_filesize", "original_width", "original_height", "original_prefix", "original__objectkey", "original__stored") SELECT "id", "alt", "prefix", "_objectkey", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "_stored", "_transforms", "original_filename", "original_url", "original_mime_type", "original_filesize", "original_width", "original_height", "original_prefix", "original__objectkey", "original__stored" FROM \`media\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`ALTER TABLE \`__new_media\` RENAME TO \`media\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_original_original_filename_idx\` ON \`media\` (\`original_filename\`);`)
  await db.run(sql`CREATE TABLE \`__new__media_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_alt\` text NOT NULL,
  	\`version_prefix\` text DEFAULT '',
  	\`version__objectkey\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version__stored\` integer,
  	\`version__transforms\` text,
  	\`version_original_filename\` text,
  	\`version_original_url\` text,
  	\`version_original_mime_type\` text,
  	\`version_original_filesize\` numeric,
  	\`version_original_width\` numeric,
  	\`version_original_height\` numeric,
  	\`version_original_prefix\` text,
  	\`version_original__objectkey\` text,
  	\`version_original__stored\` integer,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__media_v\`("id", "parent_id", "version_alt", "version_prefix", "version__objectkey", "version_updated_at", "version_created_at", "version_url", "version_thumbnail_u_r_l", "version_filename", "version_mime_type", "version_filesize", "version_width", "version_height", "version__stored", "version__transforms", "version_original_filename", "version_original_url", "version_original_mime_type", "version_original_filesize", "version_original_width", "version_original_height", "version_original_prefix", "version_original__objectkey", "version_original__stored", "created_at", "updated_at") SELECT "id", "parent_id", "version_alt", "version_prefix", "version__objectkey", "version_updated_at", "version_created_at", "version_url", "version_thumbnail_u_r_l", "version_filename", "version_mime_type", "version_filesize", "version_width", "version_height", "version__stored", "version__transforms", "version_original_filename", "version_original_url", "version_original_mime_type", "version_original_filesize", "version_original_width", "version_original_height", "version_original_prefix", "version_original__objectkey", "version_original__stored", "created_at", "updated_at" FROM \`_media_v\`;`)
  await db.run(sql`DROP TABLE \`_media_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__media_v\` RENAME TO \`_media_v\`;`)
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_original_version_original_filename_idx\` ON \`_media_v\` (\`version_original_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
