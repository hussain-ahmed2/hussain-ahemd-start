import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import AppSidebar from '@/components/dashboard/app-sidebar'
import MobileMenuBar from '@/components/dashboard/mobile-menu-bar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { authMiddleware } from '@/middleware/auth.middleware'
import { getServerSession } from '@/server-fn/session.fn'

export const Route = createFileRoute('/_me/me')({
  component: MeRoute,
  server: { middleware: [authMiddleware] },
  loader: async () => {
    const session = await getServerSession()
    if (!session) throw redirect({ to: '/sign-in' })
    return { session }
  },
})

function MeRoute() {
  const { session } = Route.useLoaderData()
  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
      <SidebarInset className="min-w-0">
        <MobileMenuBar />
        <main className="flex flex-1 flex-col min-w-0">
          <ScrollArea
            className="h-[calc(100vh-1rem)] max-md:h-[calc(100vh-3.25rem)] w-full overflow-auto"
            type="scroll"
          >
            <Outlet />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
