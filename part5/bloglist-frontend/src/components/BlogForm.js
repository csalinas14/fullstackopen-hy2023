import SingleForm from './SingleForm'

const BlogForm = ({formsList, addBlog, handleBlogChange}) => {

  //console.log(formsList)

  return(
    <form onSubmit={addBlog}>
        {formsList.map(form => <SingleForm key={form.name} name={form.name} value={form.value}
        handleChange={form.handleChange}/>)}
        <button type="submit">create</button>
    </form>
  )
}

export default BlogForm