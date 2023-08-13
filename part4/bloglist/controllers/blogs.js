require('express-async-errors')
const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
  /** 
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      */
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body

    //console.log(body)

    if(!body.title || !body.url){
      response.status(400).end()
    }
    else{
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
      })
      /** 
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
        */
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
      }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)

  })
  

module.exports = blogsRouter