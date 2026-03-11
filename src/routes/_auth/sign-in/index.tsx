import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import SignInForm from '@/components/sign-in/sign-in-form'
import { guestMiddleware } from '@/middleware/auth.middleware'

export const Route = createFileRoute('/_auth/sign-in/')({
  component: SignInPage,
  server: { middleware: [guestMiddleware] },
})

function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="text-center w-full px-5">
        <h1 className="text-3xl font-bold mb-5">Sign In</h1>
        <p className="font-medium text-lg mb-4">Sign in to your account</p>

        <Suspense>
          <SignInForm />
        </Suspense>
      </section>
    </div>
  )
}
