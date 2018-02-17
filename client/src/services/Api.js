// uses the Promise-based HTTP client 'Axios' to easily create asynchronous
// http server on localhost

import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/'
  })
}
