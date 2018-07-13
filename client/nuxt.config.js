const webpack = require('webpack');
const config = require('./src/config');
const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  srcDir: 'src/',
  build: {
    cache: {
      max: 1000,
      maxAge: 900000,
    },
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime',
        'lodash',
        // [
        //   'component',
        //   {
        //     libraryName: 'element-ui',
        //     styleLibraryName: 'theme-chalk',
        //   },
        // ],
      ],
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    ],
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      // require('autoprefixer')({
      //   browsers: ['last 3 versions']
      // })
    ],
    styleResources: {
      scss: ['./src/style/variable.scss', './src/style/mixin.scss'],
      options: {},
    },
    vendor: [
      'axios',
      'moment',
      '~/utils',
    ],
  },
  env: config.envs,
  head: {
    title: 'blog',
    titleTemplate: '%s | ' + config.envs.owner,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: 'a personal blog powered by nuxt, koa & mongodb' },
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
        href: '//at.alicdn.com/t/font_683109_ufv5v1399.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/monokai-sublime.min.css',
      },
    ],
    script: [
      {
        // async: 'async',
        type: 'text/javascript',
        src: '//at.alicdn.com/t/font_683109_ufv5v1399.js',
      }
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
  },
  dev: IS_DEV,
  css: [
    '~/style/index.scss',
    'mavon-editor/dist/css/index.css',
    'element-ui/lib/theme-chalk/index.css',
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type);
      },
    },
  },
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: IS_DEV ? 'https://localhost:8000/api' : 'https://lijun.space/api',
    // browserBaseURL: 'https://lijun.space/api',
    // prefix: '/api', // it not work
    credentials: true,
  },
  plugins: [
    { src: '~plugins/markdown.js', ssr: false },
    { src: '~plugins/copy.js', ssr: false },
    { src: '~plugins/gtm.js', ssr: false },
    '~/plugins/moment.js',
    '~/plugins/element-ui.js',
    '~/plugins/axios.js',
    '~/plugins/lazy-load.js',
    '~/plugins/filter.js',
  ],
  // loading: '~/components/loading.vue',
  router: {
    middleware: [],
  },
};
