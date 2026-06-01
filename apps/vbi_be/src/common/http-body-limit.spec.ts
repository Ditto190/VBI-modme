import { configureHttpBodyLimit } from './http-body-limit'

jest.mock('express', () => ({
  json: jest.fn(() => 'json-parser'),
  urlencoded: jest.fn(() => 'urlencoded-parser'),
}))

import { json, urlencoded } from 'express'

describe('configureHttpBodyLimit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('configures json and urlencoded parsers with a 32mb body limit by default', () => {
    const app = { use: jest.fn() }

    configureHttpBodyLimit(app)

    expect(json).toHaveBeenCalledWith({ limit: '32mb' })
    expect(urlencoded).toHaveBeenCalledWith({ extended: true, limit: '32mb' })
    expect(app.use).toHaveBeenCalledWith('json-parser')
    expect(app.use).toHaveBeenCalledWith('urlencoded-parser')
  })
})
