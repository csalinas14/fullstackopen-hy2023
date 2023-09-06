import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const UserLine = ({ userInfo }) => {
  return (
    <tr>
      <td>{userInfo.name}</td>
      <td>{userInfo.blogs.length}</td>
    </tr>
  )
}

const UserList = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  console.log(result)

  if (result.isLoading) {
    return <div>loading data... </div>
  }

  if (result.isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    )
  }

  const users = result.data

  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <UserLine key={user.id} userInfo={user} />
        ))}
      </table>
    </div>
  )
}

export default UserList
