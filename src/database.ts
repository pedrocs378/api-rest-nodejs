import { knex as setupKnex, Knex } from 'knex'

import { env } from './env'

export const config: Knex.Config = {
  client: 'pg',
  connection: env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)

export async function setupDatabase() {
  try {
    await knex.raw(`CREATE DATABASE IF NOT EXISTS ${env.DATABASE_URL};`)
  } catch (error) {
    console.error('Error to setup database')
    console.error(error)
  } finally {
    if (env.NODE_ENV === 'development') {
      console.log('Successfull setup database')
    }
  }
}
