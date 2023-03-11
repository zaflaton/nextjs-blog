type Params = {
  params: {
    userId: string
  }
}
export default function userPage({ params: { userId } }: Params) {
  return <div>page</div>
}
