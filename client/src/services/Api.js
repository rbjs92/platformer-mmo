import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:2567`,
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
}
