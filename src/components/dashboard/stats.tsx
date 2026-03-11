import {
  Briefcase,
  Code2,
  FolderKanban,
  Users,
  MessageSquare,
  Eye,
} from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import type {
  Experience,
  Skill,
  Project,
  Visitor,
  Contact,
} from '@/generated/prisma/client'

type StatsProps = {
  experiences: Experience[]
  skills: Skill[]
  projects: Project[]
  visitors: Visitor[]
  contacts: Contact[]
}

export default function Stats({
  experiences,
  skills,
  projects,
  visitors,
  contacts,
}: StatsProps) {
  const now = new Date()
  const lastMonth = new Date()
  lastMonth.setMonth(now.getMonth() - 1)

  // Calculate monthly changes
  const recentExperiences = experiences.filter(
    (e) => e.createdAt >= lastMonth,
  ).length
  const recentSkills = skills.filter((s) => s.createdAt >= lastMonth).length
  const recentProjects = projects.filter((p) => p.createdAt >= lastMonth).length
  const recentVisitors = visitors.filter((v) => v.visitedAt >= lastMonth).length
  const recentContacts = contacts.filter((c) => c.createdAt >= lastMonth).length

  // Calculate unread messages
  const unreadMessages = contacts.filter((c) => !c.read).length

  // Calculate profile completion percentage
  const profileCompletion = Math.min(
    100,
    Math.round(
      (experiences.length > 0 ? 25 : 0) +
        (skills.length >= 5 ? 25 : (skills.length / 5) * 25) +
        (projects.length >= 3 ? 25 : (projects.length / 3) * 25) +
        (experiences.length > 0 && skills.length > 0 && projects.length > 0
          ? 25
          : 0),
    ),
  )

  const stats = [
    {
      title: 'Experiences',
      value: experiences.length,
      change:
        recentExperiences > 0
          ? `+${recentExperiences} this month`
          : 'No new additions',
      icon: Briefcase,
    },
    {
      title: 'Skills',
      value: skills.length,
      change:
        recentSkills > 0 ? `+${recentSkills} this month` : 'No new additions',
      icon: Code2,
    },
    {
      title: 'Projects',
      value: projects.length,
      change:
        recentProjects > 0
          ? `+${recentProjects} this month`
          : 'No new additions',
      icon: FolderKanban,
    },
    {
      title: 'Profile Strength',
      value: `${profileCompletion}%`,
      change: profileCompletion === 100 ? 'Complete!' : 'Keep building',
      icon: Users,
    },
    {
      title: 'Total Visitors',
      value: visitors.length,
      change:
        recentVisitors > 0
          ? `+${recentVisitors} this month`
          : 'No visits this month',
      icon: Eye,
    },
    {
      title: 'Messages',
      value: contacts.length,
      change:
        recentContacts > 0
          ? `+${recentContacts} this month`
          : unreadMessages > 0
            ? `${unreadMessages} unread`
            : 'All read',
      icon: MessageSquare,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <stat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                {stat.title}
              </h3>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="mt-3">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-3 w-28 mt-1" />
            </div>
          </div>
        ))}
    </div>
  )
}
