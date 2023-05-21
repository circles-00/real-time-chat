import { GithubLoginButton } from '@components'
import { signIn } from 'next-auth/react'
import { HideUnAuthContent } from '@components/Auth/HideUnAuthContent'
import { UsersList } from '@domain/users'

const Home = () => {
  const handleOnGithubSignIn = async () => {
    await signIn('github')
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <HideUnAuthContent>
        <GithubLoginButton onClick={handleOnGithubSignIn} />
      </HideUnAuthContent>
      <UsersList />
    </div>
  )
}

export default Home
