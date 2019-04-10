import * as webpack from 'webpack'

import NuxtConfiguration from '@nuxt/config'
import { appConfig } from './config'

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
        href: '//at.alicdn.com/t/font_683109_4n4i9xsboa3.css',
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
        // async: 'async',
        type: 'text/javascript',
        src: '//at.alicdn.com/t/font_683109_4n4i9xsboa3.js',
      },
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
  },

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
    'element-ui/lib/theme-chalk/index.css',
    'mavon-editor/dist/css/index.css',
  ],
  styleResources: {
    scss: [// 这里只能包含 variable、mixin, 禁止包容任何真实样式，否则每个style里都会重复一遍
      '~/assets/style/variable.scss',
      '~/assets/style/mixin.scss',
    ],
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  plugins: [
    '~/plugins/combined-inject.js',
    '~/plugins/markdown.client.js',
    '~/plugins/copy.client.js',
    '~/plugins/gtm.client.js',
    '~/plugins/moment.js',
    '~/plugins/element-ui.js',
    '~/plugins/axios.js',
    '~/plugins/lazy-load.js',
    '~/plugins/filter.js',
    '~/plugins/custom-components.js',
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],

  axios: {
    proxy: true,
    prefix: '/api', // it only work when proxy is enabled
    credentials: true,
  },
  proxy: {
    // '/api/proxy/lylares': {
    //   target: 'https://api.berryapi.net',
    //   changeOrigin: true,
    //   pathRewrite: { '^/api/proxy/lylares': '' },
    // },
    '/api/proxy/douban': {
      target: 'https://api.douban.com',
      changeOrigin: true,
      pathRewrite: { '^/api/proxy/douban': '' },
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
    loaders: {
      cssModules: {
        localIdentName: '[local]_[hash:base64:5]',
        camelCase: true,
      },
    },
    extend(config, { isDev, isClient }) {
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
      if (!config.plugins) {
        config.plugins = []
      }
      config.plugins.push(
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      )
    },
  },
}

export default config
