import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { useInterval } from "usehooks-ts"

const TYPING_SPEED = 75 // ms per character
const PAUSE_TIME = 2000 // ms

export const useTyping = (placeholderPhrases = [""]) => {
  const typing = useRef<HTMLTextAreaElement | null>(null)
  const isInView = useInView(typing)

  const [placeholder, setPlaceholder] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useInterval(() => {
    if (!isInView) return
    const currentPhrase = placeholderPhrases[currentPhraseIndex]

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setCurrentPhraseIndex((currentPhraseIndex + 1) % placeholderPhrases.length)
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => setIsDeleting(true), PAUSE_TIME)
    } else {
      setPlaceholder(currentPhrase.substring(0, charIndex + (isDeleting ? -1 : 1)))
      setCharIndex((prevCharIndex) => prevCharIndex + (isDeleting ? -1 : 1))
    }
  }, TYPING_SPEED)

  return { placeholder, ref: typing }
}
