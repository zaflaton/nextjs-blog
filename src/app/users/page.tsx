import type { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'
import { User } from '@/types/user'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Users',
}

export default async function UsersPage() {
  const userData: Promise<User[]> = getAllUsers()

  const users = await userData

  return (
    <section className="flex gap-5 flex-col p-2 items-center">
      <h2>
        <Link href="/" className="font-bold text-3xl">
          Back to Home
        </Link>
      </h2>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <Link
              href={`/users/${user.id}`}
              className="font-bold text-2xl underline"
            >
              {user.name}
            </Link>
          </div>
        )
      })}
    </section>
  )
}
