import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import getUser from '@/lib/getUser'
import getAllUsers from '@/lib/getAllUsers'
import getUserPosts from '@/lib/getUserPosts'
import { User } from '@/types/user'
import { Post } from '@/types/post'
import UserPosts from './components/UserPosts'

type Params = {
  params: {
    userId: string
  }
}

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId)
  const user: User = await userData

  if (!user.name) {
    return {
      title: 'User Not Found',
    }
  }

  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  }
}

export default async function userPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId)
  const userPostsData: Promise<Post[]> = getUserPosts(userId)

  // const [user, userPosts] = await Promise.all([userData, userPostsData])

  const user = await userData

  if (!user.name) return notFound()

  return (
    <div>
      <h2>{user.name}</h2>
      <Suspense fallback={<h2>LOADING...</h2>}>
        {/* @ts-expect-error Async Server Component */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers()
  const users = await usersData

  return users.map((user) => ({
    userId: user.id.toString(),
  }))
}
