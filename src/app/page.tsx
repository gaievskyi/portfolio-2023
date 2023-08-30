import dynamic from "next/dynamic"
import { fetchWeather } from "@/lib/fetch-weather"

const About = dynamic(() => import("@/components/about"))
const Hero = dynamic(() => import("@/components/hero"))
const Layout = dynamic(() => import("@/components/layout"))
const Projects = dynamic(() => import("@/components/projects"))
const SlidingProjects = dynamic(() => import("@/components/sliding-projects"), {
  ssr: false,
})

export const revalidate = 3600 // at most every hour

export default async function IndexServerPage() {
  const temperature = await fetchWeather()
  return (
    <Layout temperature={temperature}>
      <Hero />
      <About />
      <SlidingProjects />
      <Projects />
      <SlidingProjects />
    </Layout>
  )
}
