import { Link } from 'react-router-dom'
import { useUserValue, useUserDispatch } from '../UserContext'

const Menu = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  console.log(user)

  const padding = {
    paddingRight: 5,
  }
  const logoutEvent = (event) => {
    event.preventDefault()
    //dispatch(logout())--redux

    //react context
    userDispatch({ type: 'LOGOUT' })
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <em>{user.user.name} logged in</em>
      <button onClick={logoutEvent}>logout</button>
    </div>
  )
}

export default Menu
