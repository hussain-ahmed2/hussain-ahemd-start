import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { Briefcase, Code2, FolderKanban, Inbox } from 'lucide-react'
import Time from '../extra/time'
import type { Experience, Skill, Project } from '@/generated/prisma/client'
import { Link } from '@tanstack/react-router'

type RecentActivityProps = {
  experiences: Experience[]
  skills: Skill[]
  projects: Project[]
}

export default function RecentActivity({
  experiences,
  skills,
  projects,
}: RecentActivityProps) {
  const recentActivity = [
    ...experiences.map((e) => ({
      id: e.id,
      title: `Added ${e.title} at ${e.company}`,
      date: e.createdAt,
      icon: Briefcase,
    })),
    ...skills.map((s) => ({
      id: s.id,
      title: `Added skill ${s.name}`,
      date: s.createdAt,
      icon: Code2,
    })),
    ...projects.map((p) => ({
      id: p.id,
      title: `Updated project ${p.title}`,
      date: p.createdAt,
      icon: FolderKanban,
    })),
  ]

  if (recentActivity.length === 0) {
    return (
      <Empty className="my-12 animate-fade-in">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Inbox className="w-12 h-12 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No recent activity</EmptyTitle>
          <EmptyDescription>
            You haven’t added any experiences, skills, or projects yet. Start
            building your profile now.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex space-x-2">
            <Button asChild>
              <Link to="/me/experiences">Add Experience</Link>
            </Button>
            <Button variant="outline">
              <Link to="/me/skills">Add Skills</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="space-y-4">
      {recentActivity.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors animate-fade-in"
        >
          <div className="p-2 bg-primary/10 rounded-lg">
            <item.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground">
              <Time date={item.date} />
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ActivitySkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {' '}
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-card shadow-sm animate-pulse"
          >
            {' '}
            <div className="w-8 h-8 bg-gray-300 rounded-lg mt-1"></div>{' '}
            <div className="flex-1 space-y-2">
              {' '}
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>{' '}
              <div className="h-3 w-1/2 bg-gray-300 rounded"></div>{' '}
            </div>{' '}
          </div>
        ))}{' '}
    </div>
  )
}
