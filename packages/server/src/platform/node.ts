import { existsSync } from 'node:fs'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as schema from '../db/schema'
import * as authSchema from '../db/auth-schema'
import type { Platform } from './interface'

export function createNodePlatform(): Platform {
  const dbPath = process.env.DATABASE_URL || './zpan.db'
  const sqlite = new Database(dbPath)
  sqlite.pragma('journal_mode = WAL')
  const db = drizzle(sqlite, { schema: { ...schema, ...authSchema } })

  if (existsSync('./drizzle')) {
    migrate(db, { migrationsFolder: './drizzle' })
  }

  return {
    db,
    getEnv(key: string) {
      return process.env[key]
    },
  }
}
