import styles from "./style.module.scss"

export const MenuFooter = () => (
  <div className={styles.footer}>
    <a href="https://github.com/gaievskyi" target="_blank">
      <div className="flex items-center gap-2">
        <span>GitHub</span>
      </div>
    </a>
    <a href="https://www.linkedin.com/in/gaievskyi/" target="_blank">
      <div className="flex items-center gap-2">
        <span>LinkedIn</span>
      </div>
    </a>
  </div>
)
