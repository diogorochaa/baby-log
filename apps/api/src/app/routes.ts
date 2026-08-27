import type { FastifyInstance } from "fastify"

export async function registerRoutes(app: FastifyInstance) {
    app.get('/', (req, res) => {
        res.send('Hello World')
    })
}