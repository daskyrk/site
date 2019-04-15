import Vue from 'vue'
import Vuetify from 'vuetify'

// TODO: https://vuetifyjs.com/en/framework/theme#caching
// const themeCache = new LRU({
//   max: 10,
//   maxAge: 1000 * 60 * 60 // 1 hour
// })

Vue.use(Vuetify, {
  theme: {
  },
  options: {
    customProperties: true,
    // themeCache
  }
})
