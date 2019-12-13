import Vue from 'vue'
import App from './App.vue'
import Axios from '@/plugins/axios.js'
import router from '@/router'
import moment from 'moment'


Vue.use(Axios)
Vue.config.productionTip = false

//Render filters
Vue.filter('formatDate', function(value, filter = 'HH:MM on DD/MM/YY') {
  if (value) {
    return moment(new Date(value)).format(filter)
  }
  return ''
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
