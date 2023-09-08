import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(config)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  //console.log(newObject)
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  console.log(response)
  return response.data
}

const remove = async (blogObjectId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogObjectId}`, config)
  console.log(response)
  return response.data
}

const addComment = async (id, comment) => {
  const response = axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default { getAll, create, setToken, update, remove, addComment }
