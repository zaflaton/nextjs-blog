import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col p-2 items-center">
        <h1 className="font-bold text-3xl">Home page</h1>
        <p className="font-bold text-2xl underline">
          <Link href="/users">Users</Link>
        </p>
      </div>
    </main>
  )
}
