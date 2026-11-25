import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_rels_order_idx\` ON \`users_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_parent_idx\` ON \`users_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_path_idx\` ON \`users_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_users_id_idx\` ON \`users_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`media_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`media_rels_order_idx\` ON \`media_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_parent_idx\` ON \`media_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_path_idx\` ON \`media_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_users_id_idx\` ON \`media_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_media_v\` (
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
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_original_version_original_filename_idx\` ON \`_media_v\` (\`version_original_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_media_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_media_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_rels_order_idx\` ON \`_media_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_parent_idx\` ON \`_media_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_path_idx\` ON \`_media_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_users_id_idx\` ON \`_media_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_llm_instructions\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_slug\` text NOT NULL,
  	\`entity_type\` text NOT NULL,
  	\`additional_instructions\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_entity_slug_idx\` ON \`payload_llm_instructions\` (\`entity_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_updated_at_idx\` ON \`payload_llm_instructions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_created_at_idx\` ON \`payload_llm_instructions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_llm_instructions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_llm_instructions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_order_idx\` ON \`payload_llm_instructions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_parent_idx\` ON \`payload_llm_instructions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_path_idx\` ON \`payload_llm_instructions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_users_id_idx\` ON \`payload_llm_instructions_rels\` (\`users_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text,
  	\`username\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_users\`("id", "updated_at", "created_at", "email", "username", "reset_password_token", "reset_password_expiration", "salt", "hash", "reset_password_requested_at", "login_attempts", "lock_until") SELECT "id", "updated_at", "created_at", "email", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", NULL, "login_attempts", "lock_until" FROM \`users\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`ALTER TABLE \`__new_users\` RENAME TO \`users\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_username_idx\` ON \`users\` (\`username\`);`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`refresh_count\` numeric;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`refreshed_at\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`type\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`metadata\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`prefix\` text DEFAULT '';`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_stored\` integer;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_transforms\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original__stored\` integer;`)
  await db.run(sql`CREATE INDEX \`media_original_original_filename_idx\` ON \`media\` (\`original_filename\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_rels\`;`)
  await db.run(sql`DROP TABLE \`media_rels\`;`)
  await db.run(sql`DROP TABLE \`_media_v\`;`)
  await db.run(sql`DROP TABLE \`_media_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_llm_instructions\`;`)
  await db.run(sql`DROP TABLE \`payload_llm_instructions_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_users\`("id", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until") SELECT "id", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until" FROM \`users\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`ALTER TABLE \`__new_users\` RENAME TO \`users\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`DROP INDEX \`media_original_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_objectkey\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_stored\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_transforms\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original__stored\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`refresh_count\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`refreshed_at\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`type\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`metadata\`;`)
}
