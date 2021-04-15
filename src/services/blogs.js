import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const blogUrl = baseUrl + '/' + blogObject.id
  const request = axios.put(blogUrl, blogObject, config)
  return request.then(response => response.data)
}

const remove = (blogId) => {
  const config = {
    headers: { Authorization: token }
  }

  const blogUrl = baseUrl + '/' + blogId
  const request = axios.delete(blogUrl, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update, remove }
