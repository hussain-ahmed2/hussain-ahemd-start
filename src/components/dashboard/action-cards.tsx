import { Link } from '@tanstack/react-router'
import { Briefcase, Code2, FolderKanban } from 'lucide-react'

export default function ActionCards() {
  const cards = [
    {
      href: '/me/experiences',
      icon: Briefcase,
      title: 'Manage Experiences',
      description:
        'Add and update your work history and professional experiences',
    },
    {
      href: '/me/skills',
      icon: Code2,
      title: 'Update Skills',
      description: 'Showcase your technical and professional skills',
    },
    {
      href: '/me/projects',
      icon: FolderKanban,
      title: 'View Projects',
      description: 'Manage your portfolio and project showcase',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.title}
          to={card.href}
          className="group rounded-lg border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary transition-all animate-fade-in"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <card.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">{card.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </Link>
      ))}
    </div>
  )
}
