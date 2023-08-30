"use client"

import dynamic from "next/dynamic"

const Hero = dynamic(() => import("@/components/hero").then((_module) => _module.Hero), {
  ssr: false,
})

const About = dynamic(() => import("@/components/about").then((_module) => _module.About))

const Projects = dynamic(() => import("@/components/projects").then((_module) => _module.Projects))

const SlidingProjects = dynamic(() =>
  import("@/components/sliding-projects").then((_module) => _module.SlidingProjects),
)

const Layout = dynamic(() => import("@/components/layout").then((_module) => _module.Layout))

type IndexProps = {
  temperature: number
}

export const IndexPage = ({ temperature }: IndexProps) => (
  <Layout temperature={temperature}>
    <Hero />
    <About />
    <SlidingProjects />
    <Projects />
    <SlidingProjects />
  </Layout>
)
