import { FC } from 'react'
import { UserDetails } from '@domain/users'
import { useQuery } from '@tanstack/react-query'
import { DataService } from '@services'
import { IUsersListProps } from './types'

export const UsersList: FC<IUsersListProps> = () => {
  const { data: users } = useQuery(
    DataService.getUsers.queryKey,
    DataService.getUsers,
  )

  return (
    <div>
      <h1 className="text-xl font-bold">Users list:</h1>
      <div className="flex flex-col gap-2">
        {!!users &&
          users?.map((user) => (
            <UserDetails
              key={user?.id}
              name={user?.name}
              avatar={user?.avatar}
              status={user?.status ?? 'online'}
            />
          ))}
      </div>
    </div>
  )
}
