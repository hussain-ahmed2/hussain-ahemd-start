import { PrismaClient } from '../src/generated/prisma/client.js'

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

const staticSkills = [
  { name: 'JavaScript', level: 'Intermediate', icon: '/javascript.svg' },
  { name: 'TypeScript', level: 'Junior', icon: '/typescript.svg' },
  { name: 'React', level: 'Intermediate', icon: '/react.svg' },
  { name: 'Next.js', level: 'Junior', icon: '/nextjs.svg' },
  { name: 'Tailwind CSS', level: 'Intermediate', icon: '/tailwindcss.svg' },
  { name: 'Node.js', level: 'Junior', icon: '/nodejs.svg' },
  { name: 'MongoDB', level: 'Junior', icon: '/mongodb.svg' },
  { name: 'Redis', level: 'Basic', icon: '/redis.svg' },
  { name: 'REST APIs', level: 'Junior', icon: '/rest-api.svg' },
  { name: 'Git', level: 'Intermediate', icon: '/git.svg' },
  { name: 'Docker', level: 'Basic', icon: '/docker.svg' },
  { name: 'Figma', level: 'Junior', icon: '/figma.svg' },
]

const staticExperiences = [
  {
    title: 'Junior Full Stack Engineer',
    company: 'Masleap.io',
    website: 'https://masleap.io/',
    date: 'June 2025 – Present',
    start: 'June 2025',
    end: 'Present',
    summary:
      'Contributing to full-stack development using Next.js, Node.js, MongoDB, and Tailwind CSS. Worked on production-grade projects like customcars.com and Vision Gate AI, handling both frontend and backend for customcars.com, including Redis caching, real-time features with Socket.IO, and Docker containerization. Focused on building scalable, high-performance applications and delivering seamless user experiences while writing clean, maintainable code and collaborating in agile teams.',
  },
]

const staticProjects = [
  {
    title: 'CustomCars - Car Marketplace (Developed at Masleap.io)',
    description:
      'A real-time car marketplace built with Node.js, MongoDB, and Socket.io for seamless communication between buyers and sellers. The frontend is powered by Next.js, Tailwind CSS, and shadcn/ui for a modern and responsive user experience.',
    link: 'https://customcars.com/',
    thumbnail: '/customcars.png',
    isCompleted: true,
  },
  {
    title: 'VisionAI - AI-powered Image Detection (Developed at Masleap.io)',
    description:
      'Developed the frontend for an intelligent AI platform that performs real-time image detection and analysis. The backend, powered by Python and FastAPI, integrates deep learning models, while the frontend was built using Next.js, Tailwind CSS, and shadcn/ui to provide a smooth, interactive user experience.',
    link: '',
    thumbnail: '/visionai.png',
    isCompleted: true,
  },
  {
    title: 'E-Commerce Website',
    description:
      'Modern e-commerce web application built with Next.js, Prisma, and PostgreSQL, featuring cart and ordering functionality with a scalable, performance-focused architecture and clean UI.',
    link: 'https://github.com/hussain-ahmed2/e-commerce-starter',
    thumbnail: '/e-commerce.png',
    isCompleted: true,
  },
  {
    title: 'FeedMe - Food delivery website',
    description:
      'Next.js and MongoDB powered food delivery web application with cart and ordering features. Built for performance, scalability, and modern UI design.',
    link: 'https://github.com/hussain-ahmed2/feed-me-food-delivery-website/',
    thumbnail: '/feedme-food-delivery.png',
    isCompleted: true,
  },
  {
    title: 'RecipeRally - Recipe finder',
    description:
      'Discover and explore a variety of recipes with advanced search and filtering options.',
    link: 'https://github.com/hussain-ahmed2/recipe-website',
    thumbnail: '/reciperally.png',
    isCompleted: true,
  },
  {
    title: 'Music Academy',
    description:
      'A music academy website that provides classes and lessons for beginners and advanced players.',
    link: 'https://github.com/hussain-ahmed2/music-academy',
    thumbnail: '/music-academy.png',
    isCompleted: true,
  },
]

async function main() {
  console.log('Clear database...')

  await prisma.skill.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.project.deleteMany()
  await prisma.siteSettings.deleteMany()

  console.log('Start seeding...')

  for (const skill of staticSkills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    })
  }

  for (const exp of staticExperiences) {
    await prisma.experience.create({
      data: exp,
    })
  }

  for (const project of staticProjects) {
    await prisma.project.create({
      data: project,
    })
  }

  const existingSettings = await prisma.siteSettings.findFirst()
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        theme: 'zinc',
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
