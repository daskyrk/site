module.exports = {
  srcDir: 'src/',
  build: {
    cache: {
      max: 1000,
      maxAge: 900000
    },
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ]
    },
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    vendor: [
      'axios',
    ],
  },
  head: {
    title: 'blog',
    titleTemplate: '%s | Jun',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'desc' },
      { hid: 'keywords', name: 'keywords', content: '前端开发，JavaScript, Node, Vue，nuxt，blog' },
      { name: 'author', content: 'daskyrk@gmail.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  css: [
    'bulma/css/bulma.css',
    '~/css/index.css'
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  loading: '~/components/loading.vue',
  router: {
    middleware: []
  },
}