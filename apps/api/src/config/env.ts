import { config } from 'dotenv'
import { resolve } from 'node:path'
import { z } from 'zod'

config({ path: resolve(import.meta.dirname, '../../.env') })

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production'])
        .default('development'),

    PORT: z.coerce.number()
        .default(4000),

    HOST: z.string()
        .default('0.0.0.0'),

    DATABASE_URL: z.string().min(1),
})

export const env = envSchema.parse(process.env)
