"use client"

import { memo, useMemo, useState } from "react"
import { useInterval } from "usehooks-ts"

const defaultOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
}

type TimeOptions = Intl.DateTimeFormatOptions & { withGMT?: boolean }

const getFormattedTime = (options?: TimeOptions, date = new Date()) => {
  const timeString = new Intl.DateTimeFormat("en-US", {
    ...defaultOptions,
    ...options,
  }).format(date)

  const timezoneOffset = -date.getTimezoneOffset() / 60
  const gmtString = timezoneOffset >= 0 ? `GMT+${timezoneOffset}` : `GMT${timezoneOffset}`

  if (!options?.withGMT) return timeString
  return `${timeString} ${gmtString}`
}

type ClockProps = TimeOptions

export const Clock = memo((props: ClockProps) => {
  const memoizedOptions = useMemo(() => props, [props])
  const [time, setTime] = useState(() => getFormattedTime(memoizedOptions))
  useInterval(() => setTime(getFormattedTime(memoizedOptions)), 1000)

  return (
    <small className="copyright " suppressHydrationWarning>
      {time}
    </small>
  )
})

Clock.displayName = "Clock"
