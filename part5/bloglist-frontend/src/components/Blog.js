import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, increaseLikes, removeBlog, username }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  //console.log(userState.username)
  //console.log(blog.user.username)
  const showDeleteButton = { display: username === blog.user.username ? '' : 'none' }
  //console.log(showDeleteButton)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLikes = (event) => {
    event.preventDefault()
    //console.log(blog)
    blog.likes = blog.likes + 1
    increaseLikes(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  return(
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author + ' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url + '\n'}
        <br/>
        {'likes ' + blog.likes}
        <button className='blogLikeButton'onClick={addLikes}>like</button>
        <br/>
        {blog.author}
        <br/>
        {blog.user.name}
        <br/>
        <div style={showDeleteButton}>
          <button className='blogDeleteButton' onClick={deleteBlog}>delete</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog