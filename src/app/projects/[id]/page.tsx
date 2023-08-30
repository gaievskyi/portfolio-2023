"use client"

import { useParams } from "next/navigation"

export default function ProjectPage() {
  const { id } = useParams()

  return <>Project #{id}</>
}
