"use client"

import { Clock } from "@/components/ui/clock"
import { Copy } from "@/components/ui/copy"
import { Weather } from "@/components/ui/weather/index"

type SocialsProps = {
  temperature: number
}

export const Socials = ({ temperature }: SocialsProps) => (
  <div className="flex flex-col w-full justify-between gap-2 md:gap-8 opacity-80 text-[0.75rem] md:text-sm pb-2">
    <Copy />
    <small>WORKING REMOTELY 💫 SINCE THE NEW NORMAL</small>
    <Weather temperature={temperature} />
    <Clock />
  </div>
)
