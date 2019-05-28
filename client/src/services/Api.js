import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://platformer-mmo.herokuapp.com`,
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
}
