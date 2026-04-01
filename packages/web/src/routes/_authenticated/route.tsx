import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const res = await fetch('/api/auth/get-session', { credentials: 'include' })
    if (!res.ok) throw redirect({ to: '/sign-in' })
    const data = await res.json()
    if (!data?.session) throw redirect({ to: '/sign-in' })
    return { user: data.user }
  },
  component: () => <Outlet />,
})
