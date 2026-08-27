import { buildApp } from './app/app.js'

const app = await buildApp()

await app.listen({
    port: Number(process.env.PORT ?? 4000),
    host: process.env.HOST ?? '0.0.0.0',
})