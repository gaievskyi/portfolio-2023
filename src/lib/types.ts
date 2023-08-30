import { z } from "zod"

export const WindSchema = z.object({
  speed: z.number(),
  deg: z.number(),
})
export type Wind = z.infer<typeof WindSchema>

export const WeatherElementSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
})
export type WeatherElement = z.infer<typeof WeatherElementSchema>

export const SysSchema = z.object({
  type: z.number(),
  id: z.number(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number(),
})
export type Sys = z.infer<typeof SysSchema>

export const MainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
})
export type Main = z.infer<typeof MainSchema>

export const CoordSchema = z.object({
  lon: z.number(),
  lat: z.number(),
})
export type Coord = z.infer<typeof CoordSchema>

export const CloudsSchema = z.object({
  all: z.number(),
})
export type Clouds = z.infer<typeof CloudsSchema>

export const WeatherSchema = z.object({
  coord: CoordSchema,
  weather: z.array(WeatherElementSchema),
  base: z.string(),
  main: MainSchema,
  visibility: z.number(),
  wind: WindSchema,
  clouds: CloudsSchema,
  dt: z.number(),
  sys: SysSchema,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
})
export type Weather = z.infer<typeof WeatherSchema>
