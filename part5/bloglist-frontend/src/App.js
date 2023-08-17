import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)

    try{
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Logged In as ${user.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch(exception){
      console.log('Wrong credentials')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const logoutEvent = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(
      'loggedNoteappUser'
    )
    setUser(null)
  }

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

  //console.log(forms[0])

  if(user === null){
    return(
      <>
      <h2>blogs</h2>
      <Notification message={errorMessage} type="error"/>
      <LoginForm username={username} password={password} handleLogin={handleLogin}
        setUsername={setUsername} setPassword={setPassword}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} type={"success"}/>

      {user.name} logged in
      <button onClick={logoutEvent}>logout</button>
      <br/>

      <h2>create new</h2>
      <BlogForm formsList={blogForms} addBlog={addBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App