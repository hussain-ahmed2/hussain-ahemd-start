import { createServerFn, useServerFn } from '@tanstack/react-start'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'

const signInFn = createServerFn().handler(async () => {
  const result = await auth.api.signInSocial({
    body: { provider: 'google', callbackURL: '/me' },
  })
  return result
})

const SignInForm = () => {
  const navigate = useNavigate()
  const useSignIn = useServerFn(signInFn)
  const signIn = async () => {
    const result = await useSignIn()
    navigate({ href: result.url })
  }

  return (
    <div className="w-full max-w-xl flex flex-col gap-4 mx-auto">
      <Button type="submit" onClick={signIn}>
        Sign in with Google
      </Button>
    </div>
  )
}
export default SignInForm
