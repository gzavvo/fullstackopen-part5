import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const createBlogSuccess = await handleCreateBlog({
      title, author, url
    })

    if (createBlogSuccess) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Blogtitle"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Blogauthor"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Blogurl"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}

export default BlogForm
