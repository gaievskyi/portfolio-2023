"use client"

import { useEffect, useState, type HTMLProps } from "react"
import { AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useCopyToClipboard } from "usehooks-ts"
import { cn } from "@/lib/cn"
import { RoundedButton } from "@/components/ui/rounded-button"
import { TypingTextarea } from "@/components/ui/typing-textarea"

const EMAIL = "gaievskyi@proton.me"

const phrases = [
  "Hi Daniel! Could you craft a website for our studio?",
  "Yo! We need another landing for our barbershop..",
  "Hey Daniel! Could you make an app for our client..?",
  "Good afternoon, Daniel. We are making a specific product, could you assist us please?",
]

const formSchema = z.object({
  email: z.string().email("Did you provide correct e-mail?").min(6, "Did you forget to provide your e-mail?"),
  subject: z.string().optional(),
  message: z
    .string()
    .min(80, "Is your message at least 80 characters long?")
    .max(800, "Your message cannot exceed 800 characters."),
})

type FormSchema = z.infer<typeof formSchema>

type ContactFormProps = {
  resetting?: boolean
}

export const ContactForm = ({ resetting }: ContactFormProps) => {
  const [showResetFormButton, setShowResetFormButton] = useState(resetting ?? false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
  })

  const [, copy] = useCopyToClipboard()

  const onSubmit: SubmitHandler<FormSchema> = () => {
    //
  }

  const onError = () => {
    //
  }

  const onCopy = async () => {
    await copy(EMAIL)
  }

  const { ref: messageFormRef, ...messageFormProps } = register("message")

  useEffect(() => {
    if (errors || isSubmitted) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [errors, isSubmitted])

  useEffect(() => {
    if (errors.email || errors.message) {
      setShowResetFormButton(true)
    } else {
      setShowResetFormButton(false)
    }
  }, [errors.email, errors.message])

  useEffect(() => {
    if (isSubmitting) {
      document.body.style.cursor = "progress"
    } else if (isSubmitted) {
      document.body.style.cursor = "default"
      if (isSubmitSuccessful) {
        reset()
      }
    }
  }, [isSubmitSuccessful, isSubmitted, isSubmitting, reset])

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4 w-full max-w-2xl mb-4">
        <div className="flex w-full flex-wrap md:flex-nowrap justify-between items-center gap-4 md:gap-8">
          <Input
            {...register("email")}
            disabled={isSubmitting}
            placeholder="Sender e-mail"
            type="email"
            labelText={
              <label htmlFor="email" className="uppercase text-white/80 tracking-wider text-xs">
                Sender e-mail
                <span className="ml-2 text-red-500 group-focus-within:opacity-100 group-hover:opacity-100 opacity-0 transition-all duration-500">
                  *
                </span>
              </label>
            }
          />
          <Input
            {...register("subject")}
            disabled={isSubmitting}
            placeholder="Subject"
            type="text"
            labelText={
              <label htmlFor="subject" className="uppercase text-white/80 tracking-wider text-xs">
                Subject <span className="ml-1 text-white/50 text-[9px] italic transition-all">(Optional)</span>
              </label>
            }
          />
        </div>
        <div className="flex flex-col gap-2 group">
          <label htmlFor="message" className="uppercase text-white/80 tracking-wider text-xs">
            Message
            <span className="ml-2 text-red-500 group-focus-within:opacity-100 group-hover:opacity-100 transition-all opacity-0 duration-500">
              *
            </span>
          </label>
          <TypingTextarea
            formRef={messageFormRef}
            {...messageFormProps}
            placeholderPhrases={phrases}
            disabled={isSubmitting}
            className={cn(
              "dark:bg-[#121212] placeholder:text-black/50 dark:placeholder:text-white/50 bg-[#e1dfdd] p-4 min-h-[120px] max-h-[350px] focus:outline outline-[#e1dfdd] text-xs disabled:cursor-progress disabled:opacity-75 disabled:animate-pulse",
              errors.message && "outline outline-red-500 animate-shake",
            )}
          />
          <AnimatePresence mode="wait">
            {errors.message && (
              <span className="text-red-500 text-[11px] transition-all duration-300 z-0">
                {errors["message"]?.message}
              </span>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full flex gap-4 items-end justify-between flex-wrap lg:flex-nowrap">
          <div className="flex flex-col gap-1 w-full group" onClick={onCopy}>
            <label className="uppercase text-white/80 tracking-wider text-xs">Recipient</label>
            <input
              readOnly
              value={EMAIL}
              type="email"
              disabled
              className={cn(
                "text-[#2997ff] cursor-copy font-light bg-transparent focus:outline outline-[#e1dfdd] text-xs",
              )}
            />
          </div>
          {showResetFormButton ? (
            <RoundedButton type="button" onClick={() => reset()} className="bg-[#e1dfdd] dark:bg-black">
              <p className="flex gap-2 justify-between w-full items-center text-black dark:text-white">
                <span>Reset</span>
                <svg fill="none" viewBox="0 0 15 15" height="1.2rem" width="1.2rem">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M4.854 2.146a.5.5 0 010 .708L3.707 4H9a4.5 4.5 0 110 9H5a.5.5 0 010-1h4a3.5 3.5 0 100-7H3.707l1.147 1.146a.5.5 0 11-.708.708l-2-2a.5.5 0 010-.708l2-2a.5.5 0 01.708 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
            </RoundedButton>
          ) : (
            <RoundedButton type="submit" disabled={isSubmitting} className="bg-[#e1dfdd] dark:bg-black">
              <p className="flex gap-2 justify-between w-full items-center text-black dark:text-white">
                <span>Send</span>
                <svg viewBox="0 0 24 24" fill="currentColor" height="1.2rem" width="1.2rem">
                  <path d="M13 19c0-.34.04-.67.09-1H4V8l8 5 8-5v5.09c.72.12 1.39.37 2 .72V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9.09c-.05-.33-.09-.66-.09-1m7-13l-8 5-8-5h16m0 16v-2h-4v-2h4v-2l3 3-3 3z" />
                </svg>
              </p>
            </RoundedButton>
          )}
        </div>
      </form>
    </>
  )
}

type InputProps = HTMLProps<HTMLInputElement> & {
  labelText?: React.ReactNode
}

const Input = ({ children, labelText, ...inputProps }: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <label className="uppercase text-white/80 tracking-wider text-xs">{labelText}</label>
      <input
        className="dark:bg-[#121212] bg-[#e1dfdd] placeholder:text-black/50 dark:placeholder:text-white/50 p-4 focus:outline outline-[#e1dfdd] text-xs disabled:cursor-progress disabled:opacity-75 disabled:animate-pulse"
        {...inputProps}
      >
        {children}
      </input>
      {false && <span className="text-red-500 text-[11px] transition-all duration-300">{}</span>}
    </div>
  )
}
