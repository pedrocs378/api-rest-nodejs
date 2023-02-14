import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'
import { env } from './env'

export const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request) => {
  if (env.NODE_ENV === 'development') {
    console.log(`[${request.method}] ${request.url}`)
  }
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
