import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
//redux
//import { useDispatch, useSelector } from 'react-redux'
//import { initializeBlogs } from './reducers/blogReducer'
//import { checkIfLoggedIn, logout } from './reducers/userReducer'

//react query and context
//import { useNotificationDispatch } from './NotificationContext'
import { useUserDispatch } from './UserContext'

const App = () => {
  //react query and context
  //const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  //redux
  //const dispatch = useDispatch()
  //const user = useSelector(({ user }) => user)

  useEffect(() => {
    //dispatch(initializeBlogs())

    //dispatch(checkIfLoggedIn())--redux
    userDispatch({ type: 'SIGNEDIN' })
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
