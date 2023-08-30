import { useRef, type ButtonHTMLAttributes, type PropsWithChildren } from "react"
import { cn } from "@/lib/cn"

import { Magnetic } from "../magnetic"
import styles from "./style.module.scss"

type RoundedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    color?: string
    className?: string
  }

export const RoundedButton = ({ children, className, ...buttonAttributes }: RoundedButtonProps) => {
  const circle = useRef<HTMLDivElement | null>(null)

  return (
    <Magnetic>
      <button className={cn(styles.roundedButton, className)} {...buttonAttributes}>
        {children}
        <div ref={circle} className={styles.circle} />
      </button>
    </Magnetic>
  )
}
