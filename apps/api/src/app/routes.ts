import type { FastifyInstance } from "fastify"

export async function registerRoutes(app: FastifyInstance) {
    app.get('/', (_req, res) => {
        res.send('Hello World')
    })
}