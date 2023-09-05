import { useState } from 'react'

//redux
/*
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
*/
import { login, useUserDispatch } from '../UserContext'
import { useNotificationDispatch } from '../NotificationContext'

const LoginForm = () => {
  //redux
  //const dispatch = useDispatch()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    //redux
    /*
    dispatch(
      login({
        username,
        password,
      })
    )
    */
    //react context
    login({ username, password }, userDispatch, notificationDispatch)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
