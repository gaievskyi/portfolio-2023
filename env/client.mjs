// @ts-check

import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  client: {},
  experimental__runtimeEnv: process.env,
})
