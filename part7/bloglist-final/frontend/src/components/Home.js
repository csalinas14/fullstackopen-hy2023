import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
//import Notification from './Notification'
import Togglable from './Togglable'
import BlogList from './BlogList'
import { useRef } from 'react'

//react context
import { useUserValue, useUserDispatch } from '../UserContext'

const Home = () => {
  //react context
  const userData = useUserValue()
  const userDispatch = useUserDispatch()

  const blogFormRef = useRef()

  const logoutEvent = (event) => {
    event.preventDefault()
    //dispatch(logout())--redux

    //react context
    userDispatch({ type: 'LOGOUT' })
  }

  if (userData === null || userData.error) {
    return (
      <>
        <h2>login</h2>
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {userData.user.name} logged in
      <button onClick={logoutEvent}>logout</button>
      <br />
      <h2>create new</h2>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Home
