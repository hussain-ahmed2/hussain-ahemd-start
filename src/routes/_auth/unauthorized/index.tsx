import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/unauthorized/')({
  component: UnauthorizedPage,
})

function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-4">
      <h1 className="text-3xl font-bold mb-5">Unauthorized</h1>
      <p className="font-medium text-lg mb-4">
        You do not have permission to access this page
      </p>
      <Button asChild>
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  )
}
