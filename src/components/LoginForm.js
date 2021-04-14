import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const loginSuccess = await handleLogin({ username, password })
    if (loginSuccess) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

export default LoginForm
