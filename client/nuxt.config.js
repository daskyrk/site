import * as webpack from 'webpack'

import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import NuxtConfiguration from '@nuxt/config'
import { appConfig } from './config'
import parse from 'url-parse';

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const IS_DEV = process.env.NODE_ENV !== 'production'

const config = {
  mode: 'universal',
  dev: IS_DEV,
  // env: {},
  srcDir: 'src/',

  head: {
    title: appConfig.title,
    titleTemplate: '%s | ' + appConfig.owner,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: appConfig.description,
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '前端开发，JavaScript, Node, Vue, Nuxt, MongoDb, Blog',
      },
      { name: 'author', content: appConfig.mail },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_683109_h4tf9o8m0ah.css',
      },
      {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
      },
      {
        rel: 'stylesheet',
        href: '//cdn.jsdelivr.net/npm/reset-css@4.0.1/reset.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap-reboot.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/monokai-sublime.min.css',
      },
    ],
    script: [
      {
        async: 'async',
        type: 'text/javascript',
        src: '//at.alicdn.com/t/font_683109_h4tf9o8m0ah.js',
      },
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
  },

  /*
   ** Customize the progress-bar
   */
  // loading: '~/components/loading.vue',
  // loadingIndicator: 'chasing-dots',

  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/common.scss',
    '~/assets/style/syntax.scss',
    '~/assets/style/transition.scss',
    '~/assets/style/util.scss',
    // 'vuetify/dist/vuetify.min.css',
  ],
  styleResources: {
    scss: [// 这里只能包含 variable、mixin, 禁止包容任何真实样式，否则每个style里都会重复一遍
      '~/assets/style/variable.scss',
      '~/assets/style/mixin.scss',
    ],
  },

  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    },
    http2: {
      push: true
    }
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/combined-inject.js',
    '~/plugins/markdown.client.js',
    '~/plugins/copy.client.js',
    '~/plugins/gtm.client.js',
    '~/plugins/moment.js',
    // '~/plugins/vuetify.js',
    '~/plugins/element-ui.js',
    '~/plugins/axios.js',
    '~/plugins/lazy-load.js',
    '~/plugins/filter.js',
    '~/plugins/custom-components.js',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],

  /*
   ** Axios module configuration
   *  See https://github.com/nuxt-community/axios-module#options
   */
  axios: {
    proxy: true,
    prefix: '/api', // it only work when proxy is enabled
    credentials: true,
  },
  proxy: {
    '/api/proxy/randomImage': {
      target: 'https://api.ixiaowai.cn',
      changeOrigin: true,
      pathRewrite: function (path, req) {
        const { query } = parse(req.url, true);
        const typeMap = {
          acg: '/api/api.php?return=json',
          acg2: '/mcapi/mcapi.php?return=json',
          nature: '/gqapi/gqapi.php?return=json',
          // 可直接作为图片src
          other: 'https://img.xjh.me/random_img.php?return=302',
        }
        return typeMap[query.type || 'nature'];
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

  build: {
    /*
     ** You can extend webpack config here
     */
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    transpile: [/^vuetify/],
    loaders: {
      cssModules: {
        localIdentName: '[local]_[hash:base64:5]',
        camelCase: true,
      },
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      new LodashModuleReplacementPlugin,
      // new VuetifyLoaderPlugin()
    ],
    extend(config, { isDev, isClient, loaders }) {
      // Run ESLint on save
      // if (isDev && isClient) {
      //   if (!config.module) {
      //     config.module = { rules: [] }
      //   }
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //   })
      // }

      // rules[2].use[0] is babel-loader
      config.module.rules[2].use[0].options.plugins = ['lodash'];
    },
  },
}

export default config
