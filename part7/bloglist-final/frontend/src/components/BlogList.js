import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  //const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  console.log(blogs)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
