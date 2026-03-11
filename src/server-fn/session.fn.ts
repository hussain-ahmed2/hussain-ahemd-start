import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '@/lib/auth'
import { tryCatch } from '@/lib/utils'

export const getServerSession = createServerFn().handler(async () => {
  const [error, session] = await tryCatch(async () => {
    const headers = getRequestHeaders()
    return await auth.api.getSession({ headers })
  })
  if (error || !session) return null
  return session
})
