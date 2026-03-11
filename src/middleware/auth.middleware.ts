import { createMiddleware } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { getServerSession } from '@/server-fn/session.fn'

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await getServerSession()
  if (!session || session.user.role !== 'admin')
    throw redirect({ to: '/unauthorized' })
  return await next()
})

export const guestMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await getServerSession()
  if (session && session.user.role === 'admin') throw redirect({ to: '/me' })
  return await next()
})
