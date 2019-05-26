import * as webpack from 'webpack'

import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import NuxtConfiguration from '@nuxt/config'
import parse from 'url-parse'

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')
const IS_DEV = process.env.NODE_ENV !== 'production'

const config: NuxtConfiguration = {
  mode: 'spa',

  srcDir: 'src/',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_683109_cidniqc3tj.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },
  script: [
    // 暂时没有彩色图标需求
    // {
    //   // async: 'async',
    //   type: 'text/javascript',
    //   src: '//at.alicdn.com/t/font_683109_z2wj22rbmi.js',
    // },
  ],

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    'vuetify/dist/vuetify.min.css',
    '~/assets/style/material.scss',
    '~/assets/style/common.scss',
  ],
  styleResources: {
    scss: [
      // 这里只能包含 variable、mixin, 禁止包容任何真实样式，否则每个style里都会重复一遍
      '~/assets/style/variable.scss',
      '~/assets/style/mixin.scss',
    ],
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    { src: '~/plugins/mavon-editor.js', ssr: false },
    '~/plugins/filter',
    '~/plugins/axios',
    '~/plugins/moment',
    '~/plugins/message',
    '~/plugins/combined-inject',
    '~/plugins/custom-components.js',
    '~/plugins/vuetify',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
  ],
  /*
   ** Axios module configuration
   *  See https://github.com/nuxt-community/axios-module#options
   */
  axios: {
    proxy: true,
    prefix: '/api', // it only work when proxy is enabled
    credentials: true,
    https: !IS_DEV,
  },
  proxy: {
    '/api/proxy/randomImage': {
      target: 'https://api.ixiaowai.cn',
      changeOrigin: true,
      pathRewrite: function (path, req) {
        const { query } = parse(req.url, true)
        const typeMap = {
          acg: '/api/api.php?return=json',
          acg2: '/mcapi/mcapi.php?return=json',
          nature: '/gqapi/gqapi.php?return=json',
          // 可直接作为图片src
          other: 'https://img.xjh.me/random_img.php?return=302',
        }
        return typeMap[query.type || 'nature']
      },
    },
    '/api/proxy/hitokoto': {
      target: 'https://v1.hitokoto.cn',
      changeOrigin: true,
      pathRewrite: { '^/api/proxy/hitokoto': '' },
    },
    '/api': {
      target: IS_DEV || process.server ? 'http://localhost:8000' : 'https://lijun.space',
      changeOrigin: true,
    },
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [
      new VuetifyLoaderPlugin(),
      // eslint-disable-next-line no-useless-escape
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      new LodashModuleReplacementPlugin(),
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient, loaders }) {
      // @ts-ignore
      // rules[2].use[0] is babel-loader
      config.module.rules[2].use[0].options.plugins = ['lodash']
    },
  },

  server: {
    port: 3002,
  },
}

export default config
