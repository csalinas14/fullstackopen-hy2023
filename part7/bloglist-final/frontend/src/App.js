import { useEffect, useRef } from 'react'
//import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

//import loginService from './services/login'
//import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { checkIfLoggedIn, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  //const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)
  //const [blogTitle, setBlogTitle] = useState('')
  //const [blogAuthor, setBlogAuthor] = useState('')
  //const [blogUrl, setBlogUrl] = useState('')
  //const [errorMessage, setErrorMessage] = useState(null)
  //const [successMessage, setSuccessMessage] = useState(null)

  /*
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortBlogs(blogs)))
  }, [])
  */

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(checkIfLoggedIn())
  }, [])

  /*
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
*/
  /*
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      //setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Logged In as ${user.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('Wrong credentials')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
*/
  /*
  const addBlog = (blogObject) => {
    /**
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      //setBlogs(sortBlogs(blogs.concat(returnedBlog)))
      //setBlogTitle('')
      //setBlogAuthor('')
      //setBlogUrl('')
      setSuccessMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  }
*/
  /*
  const updateLikes = (blogObject) => {
    blogService.update(blogObject).then((returnedBlog) => {
      console.log(returnedBlog)
      setBlogs(
        sortBlogs(
          blogs.map((blog) =>
            blog.id !== returnedBlog.id ? blog : returnedBlog
          )
        )
      )
      //console.log(updatedBlogs)
    })
  }

  const deleteBlog = (blogObject) => {
    const ok = window.confirm(
      `remove ${blogObject.title} by ${blogObject.author}?`
    )
    if (ok) {
      blogService.remove(blogObject.id).then((returnedBlog) => {
        console.log(returnedBlog)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      })
    }
  }
*/
  const logoutEvent = (event) => {
    event.preventDefault()
    //window.localStorage.removeItem('loggedNoteappUser')
    //setUser(null)
    dispatch(logout())
  }

  //const sortBlogs = (blogsArray) => blogsArray.sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()
  console.log(blogFormRef)
  /**

  const handleBlogTitleChange = (event) => {
    console.log(event.target.value)
    setBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    console.log(event.target.value)
    setBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    console.log(event.target.value)
    setBlogUrl(event.target.value)
  }


  const blogForms = [
    {
      value: blogTitle,
      name: "Title",
      handleChange: handleBlogTitleChange
    },
    {
      value: blogAuthor,
      name: "Author",
      handleChange: handleBlogAuthorChange
    },
    {
      value: blogUrl,
      name: "Url",
      handleChange: handleBlogUrlChange
    }
  ]
*/
  //console.log(forms[0])

  if (user === null) {
    return (
      <>
        <h2>blogs</h2>
        <Notification type="error" />
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification type={'success'} />
      {user.name} logged in
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

export default App
