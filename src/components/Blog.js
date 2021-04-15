import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [areDetailsVisible, setAreDetailsVisible] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  const toggleView = () => {
    setAreDetailsVisible(!areDetailsVisible)
  }

  const incrementLikes = async (event) => {
    const newBlogObject = {
      id: blog.id,
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(newBlogObject)
    setLikes(likes + 1)
  }

  const removeBlog = async (event) => {
    if (window.confirm(`Do you really want to remove the blog ${blog.title}?`)) {
      await blogService.remove(blog.id)
      setIsRemoved(true)
    }
  }

  if (isRemoved) {
    return null
  }

  if (areDetailsVisible) {
    return (
      <div className='blog'>
        {blog.title} by {blog.author}
        <button onClick={toggleView}>hide</button><br />
        <a href={blog.url}>{blog.url}</a><br />
        {likes}<button onClick={incrementLikes}>like</button><br />
        {blog.user.name}<br />
        <button onClick={removeBlog}>remove</button>
      </div>
    )
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleView}>view</button>
    </div>
  )
}

export default Blog
