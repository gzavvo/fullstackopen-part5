import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false)

  const toggleView = () => {
    setAreDetailsVisible(!areDetailsVisible)
  }

  if (areDetailsVisible) {
    return (
      <div className='blog'>
        {blog.title} by {blog.author}
        <button onClick={toggleView}>hide</button><br />
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes}<button>like</button><br />
        {blog.user.name}
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
