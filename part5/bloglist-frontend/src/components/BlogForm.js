import SingleForm from './SingleForm'
import  { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  //console.log(formsList)

  const blogForms = [
    {
      value: blogTitle,
      name: 'Title',
      handleChange: setBlogTitle
    },
    {
      value: blogAuthor,
      name: 'Author',
      handleChange: setBlogAuthor
    },
    {
      value: blogUrl,
      name: 'Url',
      handleChange: setBlogUrl
    }
  ]

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    createBlog(blogObject)

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      {blogForms.map(form => <SingleForm key={form.name} name={form.name} value={form.value}
        handleChange={form.handleChange}/>)}
      <button id='blogFormCreateButton' type="submit">create</button>
    </form>
  )
}

export default BlogForm