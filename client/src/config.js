const IS_DEV = process.env.NODE_ENV !== 'production'

exports.navs = [
  {
    link: '/poem',
    text: '诗歌'
  },
  {
    link: '/note',
    text: '随笔'
  },
  {
    link: '/music',
    text: '音乐'
  },
  {
    link: '/admin',
    text: '管理'
  },
]

exports.BASE_URL = IS_DEV ? 'http://localhost:8000/api/' : 'https://placeholder/api/'