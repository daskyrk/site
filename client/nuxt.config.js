const webpack = require('webpack')
const pkg = require('./package')
const config = require('./config')
const IS_DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'universal',
  dev: IS_DEV,
  env: config.envs,
  srcDir: 'src/',

  head: {
    title: pkg.name,
    titleTemplate: '%s | ' + config.envs.owner,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description,
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '前端开发，JavaScript, Node, Vue, Nuxt, MongoDb, Blog',
      },
      { name: 'author', content: config.envs.mail },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_683109_vo45lvxpr5.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/monokai-sublime.min.css',
      },
    ],
    script: [
      {
        // async: 'async',
        type: 'text/javascript',
        src: '//at.alicdn.com/t/font_683109_fmqg93z4zf.js',
      },
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
  },

  // loading: '~/components/loading.vue',

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'mavon-editor/dist/css/index.css',
  ],
  styleResources: {
    scss: [
      '~/assets/style/reset/typography.scss',
      '~/assets/style/reset/sanitize.scss',
      '~/assets/style/variable.scss',
      '~/assets/style/mixin.scss',
      '~/assets/style/transition.scss',
      '~/assets/style/common.scss',
      '~/assets/style/syntax.scss',
    ],
  },

  plugins: [
    { src: '~/plugins/markdown.js', ssr: false },
    { src: '~/plugins/copy.js', ssr: false },
    { src: '~/plugins/gtm.js', ssr: false },
    '~/plugins/moment.js',
    '~/plugins/element-ui.js',
    '~/plugins/axios.js',
    '~/plugins/lazy-load.js',
    '~/plugins/filter.js',
    '~/plugins/custom-components.js',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

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
      target:
        IS_DEV || process.server
          ? 'http://localhost:8000'
          : 'https://lijun.space',
      changeOrigin: true,
    },
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      config.plugins.push(
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      )
    },
  },
}
