import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

let API_URL

if (isProduction) {
  API_URL = `https://platformer-mmo.herokuapp.com`  
} else {
  API_URL = `http://localhost:2567`
}

export default () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
}