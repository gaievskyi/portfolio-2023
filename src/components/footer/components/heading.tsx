import { cn } from "@/lib/cn"
import { serif } from "@/lib/fonts"

// type HeadingProps = {}

export const Heading = () => (
  <h1 className={cn("text-xl lg:text-5xl py-6 md:py-12 text-white", serif.className)}>
    Let&apos;s keep in touch. Reach out to me through email, LinkedIn, or any of my social media platforms.
  </h1>
)
