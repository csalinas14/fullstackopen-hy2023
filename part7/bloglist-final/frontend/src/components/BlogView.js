import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogView = ({ blogData }) => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const sortBlogs = (blogsArray) => blogsArray.sort((a, b) => b.likes - a.likes)

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

  const addLikes = (event) => {
    event.preventDefault()
    //redux
    /*
    dispatch(addOneLike(blog))
    dispatch(setNotification(`you liked ${blog.title}`, 10))
    */
    //react query
    updateBlogMutation.mutate({ ...blogData, likes: blogData.likes + 1 })
    notificationDispatch({
      type: 'SHOW',
      payload: `blog '${blogData.title}' liked`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  }

  return (
    <div>
      <h2>
        {blogData.title} {blogData.author}
      </h2>
      <a href={'https://www.google.com'}>{blogData.url}</a>
      <br />
      {blogData.likes} likes
      <button className="blogLikeButton" onClick={addLikes}>
        like
      </button>
      <br />
      added by {blogData.user.name}
    </div>
  )
}

export default BlogView
