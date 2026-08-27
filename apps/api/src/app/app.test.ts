import { describe, expect, it } from 'vitest'
import { buildApp } from './app.js'

describe('app', () => {
  it('responds with Hello World on GET /', async () => {
    const app = await buildApp()

    const response = await app.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('Hello World')

    await app.close()
  })
})
