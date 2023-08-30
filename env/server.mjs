// @ts-check

import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    OPENWEATHER_ID: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
})
