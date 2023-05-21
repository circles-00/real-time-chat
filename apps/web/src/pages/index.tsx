import { GithubLoginButton } from '@components'
import { signIn } from 'next-auth/react'
import { HideUnAuthContent } from '@components/Auth/HideUnAuthContent'
import { UsersList } from '@domain/users'
import { useUpdate } from '@rounik/react-custom-hooks'
import { useUser } from '@hooks'
import { createSocket } from '../utils'

const Home = () => {
  const handleOnGithubSignIn = async () => {
    await signIn('github')
  }

  const { user } = useUser()

  useUpdate(() => {
    const socket = createSocket()
    function onConnect() {
      if (user) {
        socket.emit('updateStatus', {
          status: 'online',
          email: user?.user?.email,
        })
      }
    }

    function onDisconnect() {
      if (user) {
        socket.emit('updateStatus', {
          status: 'offline',
          email: user?.user?.email,
        })
      }
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      onDisconnect()
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.disconnect()
    }
  }, [user])

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
