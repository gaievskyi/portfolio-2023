import { cache } from "react"
import { env } from "~/env/server.mjs"

import { WeatherSchema } from "./types"

type Units = "standard" | "metric" | "imperial"

// Warsaw
const latitude = 52.2297
const longitude = 21.0122
const units: Units = "metric"

const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${env.OPENWEATHER_ID}`

export const fetchWeather = cache(async () => {
  const response = await fetch(WEATHER_URL)
  const data = await response.json()
  const validatedData = await WeatherSchema.safeParseAsync(data)
  return validatedData.success ? validatedData.data.main.temp : 0
})
