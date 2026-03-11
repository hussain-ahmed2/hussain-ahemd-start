import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_me/me/experiences/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_me/me/experiences/"!</div>
}
