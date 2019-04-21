import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'

// TODO: https://vuetifyjs.com/en/framework/theme#caching
// const themeCache = new LRU({
//   max: 10,
//   maxAge: 1000 * 60 * 60 // 1 hour
// })

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    // primary: '#4caf50',
    // secondary: '#4caf50',
    // tertiary: '#495057',
    // accent: '#82B1FF',
    // error: '#f55a4e',
    // info: '#00d3ee',
    // success: '#5cb860',
    // warning: '#ffa21a',
    primary: '#8bc34a',
    secondary: '#cddc39',
    accent: '#2196f3',
    error: '#ff5722',
    warning: '#ffc107',
    info: '#00bcd4',
    success: '#4caf50'
  },
  options: {
    customProperties: true,
    // themeCache
  }
})
