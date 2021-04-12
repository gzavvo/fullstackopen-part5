import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('wrong credentials')
      setNotificationType('error')
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {
      const returnedBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationType('success')
      setNotification(`A new blog ${blogTitle} by ${blogAuthor} added`)
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 3000)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch(exception) {
      setNotificationType('error')
      setNotification('you must enter author, title and url')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 3000)
    }
  }

  const blogForm = () => {
    return (
      <div key="3">
        <h2>Create new blog</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            title: 
            <input
              type="text"
              value={blogTitle}
              name="Blogtitle"
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author: 
            <input
              type="text"
              value={blogAuthor}
              name="Blogauthor"
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url: 
            <input
              type="text"
              value={blogUrl}
              name="Blogurl"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button type="submit">create blog</button>
        </form>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to app</h2>
        <Notification message={notification} type={notificationType}/>
        <form onSubmit={handleLogin}>
          <div>
            username: 
            <input 
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div> 
          <div>
            password: 
            <input 
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} type={notificationType}/>
      <p> {user.name} is logged in</p>
      <button onClick={handleLogout}>log out</button>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
