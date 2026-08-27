import Fastify from 'fastify'
import { registerRoutes } from './routes.js'

export async function buildApp() {
    const app = Fastify({
        logger: process.env.NODE_ENV !== 'test',
    })

    await registerRoutes(app)

    return app
}