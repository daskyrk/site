import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

// import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    // primary: colors.blue.darken2,
    // accent: colors.grey.darken3,
    // secondary: colors.amber.darken3,
    // info: colors.teal.lighten1,
    // warning: colors.amber.base,
    // error: colors.deepOrange.accent4,
    // success: colors.green.accent3,
    primary: '#4caf50',
    secondary: '#4caf50',
    tertiary: '#495057',
    accent: '#82B1FF',
    error: '#f55a4e',
    info: '#00d3ee',
    success: '#5cb860',
    warning: '#ffa21a',
  },
})
