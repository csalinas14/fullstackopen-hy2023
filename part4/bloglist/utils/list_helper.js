const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, item) => {
        //console.log(item)
        return sum + item.likes
    }
    
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    const reducer = (max, item) => {
        if (item.likes > max.likes){
            return {
                title: item.title,
                author: item.author,
                likes: item.likes
            }
        }else{
            return max
        }
    }

    const temp = {
        title: "dummy",
        author: "dummy",
        likes: -1
    }
    return blogs.length === 0
    ? "No blogs"
    : blogs.reduce(reducer, temp)
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}