import { createServerFn } from '@tanstack/react-start'
import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/home/hero'
import { Experience } from '@/components/home/experience'
import { Skills } from '@/components/home/skills'
import { Projects } from '@/components/home/projects'
import { Contact } from '@/components/home/contact'
import { prisma } from '@/db'

const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const [skills, experiences, projects] = await Promise.all([
    prisma.skill.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.experience.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.project.findMany({
      include: { technologies: { include: { skill: true } } },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  // Map project technologies to tags for the Projects component
  const projectsWithTags = projects.map((project) => ({
    ...project,
    tags: project.technologies.map((t) => t.skill.name),
  }))

  return {
    skills,
    experiences,
    projectsWithTags,
  }
})

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => await getHomeData(),
})

function HomePage() {
  const { experiences, skills, projectsWithTags } = Route.useLoaderData()
  return (
    <div>
      <Hero />
      <Experience experiences={experiences} />
      <Skills skills={skills} />
      <Projects projects={projectsWithTags} />
      <Contact />
    </div>
  )
}
