import { useMount } from "@/hooks/use-mount"

import styles from "./theme-toggle.module.scss"

type ThemeToggleProps = {
  theme: string | undefined
  resolvedTheme: string | undefined
  setTheme: (theme: string) => void
}

export const ThemeToggle = ({ theme, resolvedTheme, setTheme }: ThemeToggleProps) => {
  const isMounted = useMount()
  if (!isMounted) return null
  return (
    <div className="flex items-center justify-center">
      <span className="-rotate-90 capitalize text-xs cursor-vertical-text">{theme}</span>
      <button
        className={styles["themeToggler"]}
        type="button"
        aria-label="Theme toggler"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <span className="animate-spin-slow" />
      </button>
      <span className="rotate-90 capitalize text-xs cursor-vertical-text">{theme}</span>
    </div>
  )
}
