import { type RefCallBack } from "react-hook-form"
import { useTyping } from "@/hooks/use-typing"

export const TypingTextarea = ({
  placeholderPhrases = [""],
  formRef,
  ...attributes
}: {
  placeholderPhrases: string[]
  formRef: RefCallBack
} & React.InputHTMLAttributes<HTMLTextAreaElement>) => {
  const { placeholder, ref: typingRef } = useTyping(placeholderPhrases)

  return (
    <textarea
      {...attributes}
      placeholder={"For example: " + placeholder}
      ref={(e) => {
        formRef(e)
        typingRef.current = e
      }}
    />
  )
}
