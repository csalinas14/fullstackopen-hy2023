//import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogList = () => {
  //const dispatch = useDispatch()

  //redux
  //const blogs = useSelector(({ blogs }) => blogs)
  //console.log(blogs)

  //react query
  //const queryClient = useQueryClient()
  const sortBlogs = (blogsArray) => blogsArray.sort((a, b) => b.likes - a.likes)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>loading data... </div>
  }

  if (result.isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    )
  }

  const blogs = sortBlogs(result.data)
  //console.log(result)
  //console.log(blogs)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
