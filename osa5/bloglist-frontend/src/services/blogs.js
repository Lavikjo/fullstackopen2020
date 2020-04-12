import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setJWT = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

export default { getAll, setJWT, create, update }
