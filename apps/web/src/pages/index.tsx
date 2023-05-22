import { signIn } from 'next-auth/react'
import {
  HideUnAuthContent,
  GithubLoginButton,
  HideAuthContent,
} from '@components'
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
      <HideAuthContent>
        <UsersList />
      </HideAuthContent>
    </div>
  )
}

export default Home
