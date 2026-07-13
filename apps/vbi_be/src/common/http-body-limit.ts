import type { INestApplication } from '@nestjs/common'
import { json, urlencoded } from 'express'

export const httpBodyLimit = '32mb'

export const configureHttpBodyLimit = (app: Pick<INestApplication, 'use'>) => {
  app.use(json({ limit: httpBodyLimit }))
  app.use(urlencoded({ extended: true, limit: httpBodyLimit }))
}
