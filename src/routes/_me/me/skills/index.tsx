import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_me/me/skills/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_me/me/skills/"!</div>
}
