import axios from 'axios'

export default {
  install (Vue) {
    // Api
    Vue.prototype.$http = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      timeout: 20000, // 20s
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en'
      }
    })
  }
}
