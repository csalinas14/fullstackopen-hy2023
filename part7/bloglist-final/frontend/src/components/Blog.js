import { useState } from 'react'
import PropTypes from 'prop-types'

//redux
/*
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addOneLike, delBlog } from '../reducers/blogReducer'
*/
//react query
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

//react context
import { useUserValue } from '../UserContext'

const Blog = ({ blog }) => {
  //redux
  /*
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
*/

  //react context
  const userData = useUserValue()
  const notificationDispatch = useNotificationDispatch()

  //needed for react query
  const sortBlogs = (blogsArray) => blogsArray.sort((a, b) => b.likes - a.likes)

  //react query
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      const newBlogs = sortBlogs(
        blogs.map((b) => (b.id !== newBlog.id ? b : newBlog))
      )
      queryClient.setQueryData({ queryKey: ['blogs'] }, newBlogs)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (delBlog, variables) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      //console.log(variables)
      const newBlogs = sortBlogs(blogs.filter((b) => b.id !== variables))
      queryClient.setQueryData({ queryKey: ['blogs'] }, newBlogs)
    },
  })

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const showDeleteButton = {
    display: userData.user.username === blog.user.username ? '' : 'none',
  }
  //console.log(showDeleteButton)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLikes = (event) => {
    event.preventDefault()
    //redux
    /*
    dispatch(addOneLike(blog))
    dispatch(setNotification(`you liked ${blog.title}`, 10))
    */
    //react query
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
    notificationDispatch({
      type: 'SHOW',
      payload: `blog '${blog.title}' liked`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    //removeBlog(blog)
    const ok = window.confirm(`remove ${blog.title} by ${blog.author}?`)
    if (ok) {
      //redux
      /*
      dispatch(delBlog(blog.id))
      dispatch(setNotification(`you removed ${blog.title}`, 10))
      */
      //react query
      deleteBlogMutation.mutate(blog.id)
      notificationDispatch({
        type: 'SHOW',
        payload: `blog '${blog.title}' deleted`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })
      }, 5000)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author + ' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url + '\n'}
        <br />
        {'likes ' + blog.likes}
        <button className="blogLikeButton" onClick={addLikes}>
          like
        </button>
        <br />
        {blog.author}
        <br />
        {blog.user.name}
        <br />
        <div style={showDeleteButton}>
          <button className="blogDeleteButton" onClick={deleteBlog}>
            delete
          </button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  //increaseLikes: PropTypes.func.isRequired,
  //removeBlog: PropTypes.func.isRequired,
  //username: PropTypes.string.isRequired,
}

export default Blog
