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
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
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
      'marked',
      // '~/utils',
    ],
  },
  env: require('./src/config'),
  head: {
    title: 'blog',
    titleTemplate: '%s | Jun',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: 'desc' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '前端开发，JavaScript, Node, Vue，nuxt，blog',
      },
      { name: 'author', content: 'daskyrk@gmail.com' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_683109_7g3yq914kuik9.css',
      },
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
  },
  dev: process.env.NODE_ENV !== 'production',
  css: [
    'mavon-editor/dist/css/index.css',
    '~/style/index.scss',
    'element-ui/lib/theme-chalk/index.css',
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type);
      },
    },
  },
  plugins: [
    { src: '~plugins/markdown.js', ssr: false },
    '~/plugins/filter.js',
    '~/plugins/element-ui.js',
    '~/plugins/axios.js',
    '~/plugins/marked.js',
  ],
  // loading: '~/components/loading.vue',
  router: {
    middleware: [],
  },
};
