import { auth } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const { userId } = await auth()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-dm-sans text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          You are signed in {userId ? `(User ID: ${userId})` : ''}
        </p>
      </div>
    </div>
  )
}
