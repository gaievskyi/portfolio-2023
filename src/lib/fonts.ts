import localFont from "next/font/local"

export const serif = localFont({
  src: "./TimesNow-Light.woff",
  fallback: ["Georgia", "serif"],
  weight: "400",
  style: "normal",
  display: "swap",
})
