import { createFileRoute } from '@tanstack/react-router'
import ActionCards from '@/components/dashboard/action-cards'
import RecentActivity from '@/components/dashboard/recent-activity'
import Stats from '@/components/dashboard/stats'
import { getStatsFn } from '@/server-fn/dashboard.fn'

export const Route = createFileRoute('/_me/me/')({
  component: MePage,
  loader: async () => {
    const stats = await getStatsFn()
    return { stats }
  },
})

function MePage() {
  const { stats } = Route.useLoaderData()

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1">
          Here’s a quick overview of your portfolio and recent activity.
        </p>
      </header>

      {/* Stats */}
      <section>
        <Stats {...stats} />
      </section>

      {/* Recent Activity */}
      <section className="flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
          <RecentActivity
            experiences={stats.experiences.splice(0, 2)}
            skills={stats.skills.splice(0, 2)}
            projects={stats.projects.splice(0, 1)}
          />
        </div>
      </section>

      {/* Action Cards */}
      <section>
        <ActionCards />
      </section>
    </div>
  )
}
