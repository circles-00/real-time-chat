import { FC, useMemo } from 'react'
import { UserDetails } from '@domain/users'
import { useQuery } from '@tanstack/react-query'
import { DataService } from '@services'
import { IUsersListProps } from './types'
import { useUser } from '@hooks'
import { useEffectOnce } from '@rounik/react-custom-hooks'
import { useWebSocketContext } from '../../../../providers/WebSocketProvider/WebSocketProvider'

export const UsersList: FC<IUsersListProps> = () => {
  const { data: users, refetch } = useQuery(
    DataService.getUsers.queryKey,
    DataService.getUsers,
  )

  const { onUpdateStatus } = useWebSocketContext()

  useEffectOnce(() => {
    // Not optimal way, probably need to do everything by sockets, but http fetch is OK for now
    onUpdateStatus(refetch)
  })

  const { user } = useUser()
  const isMyself = (email: string) => user?.user?.email === email

  const sortedUsers = useMemo(
    () =>
      users?.sort((a, b) => {
        if (isMyself(a.email)) return -1
        if (isMyself(b.email)) return 1

        return a.id - b.id
      }),
    [users],
  )

  return (
    <div>
      <h1 className="text-xl font-bold">Users list:</h1>
      <div className="flex flex-col gap-2">
        {!!sortedUsers &&
          sortedUsers?.map((user) => (
            <UserDetails
              key={user?.id}
              {...user}
              isMyself={isMyself(user.email)}
            />
          ))}
      </div>
    </div>
  )
}
