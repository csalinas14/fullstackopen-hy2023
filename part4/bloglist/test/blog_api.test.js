const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const helper = require("./test_helper")
mongoose.set("bufferTimeoutMS", 30000)


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    
}, 10000)


test('blogs are correct length and JSON', async () => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/).expect(200)

    expect(response.body).toHaveLength(6)
        
})

test('blogs have an unique identifier property named "id"', async () => {
    const response = await api.get('/api/blogs')

    for(const blog of response.body){
        //console.log(blog)
        expect(blog.id).toBeDefined()
        expect(blog._id).not.toBeDefined()
    }
    
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "test if a valid blog works",
        author: "me",
        url: "testing",
        likes: 34
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    //const response = await api.get('/api/blogs')

    const blogs = await helper.blogsInDb()
    //console.log(blogs)
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs).toContainEqual(newBlog)

})

test('a blog with missing "likes" property can be added', async () => {
    const newBlog = {
        title: "test if a blog without likes works",
        author: "me",
        url: "testing"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    /** 

    const response = await api.get('/api/blogs')

    const blogs = response.body.map(blog => {
        delete blog.id
        return blog
    })
    */
    //console.log(blogs)
    const blogs = await helper.blogsInDb()
    newBlog.likes = 0

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs).toContainEqual(newBlog)

})

test('a blog with missing "title" property should not be added', async () => {
    const newBlog = {
        author: "me",
        url: "testing",
        likes: 2
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    console.log(response.status)
    
    const blogs = await helper.blogsInDb()
    //console.log(blogs)
    expect(blogs).toHaveLength(helper.initialBlogs.length)

})

test('a blog with missing "url" property should not be added', async () => {
    const newBlog = {
        title: "blog with a missing url",
        author: "me",
        likes: 2
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    console.log(response.status)
    
    const blogs = await helper.blogsInDb()
    //console.log(blogs)
    expect(blogs).toHaveLength(helper.initialBlogs.length)

})

afterAll(async () => {
    await mongoose.connection.close()
})