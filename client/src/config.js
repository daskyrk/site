const IS_DEV = process.env.NODE_ENV !== 'production'

exports.navs = [
  {
    link: '/poem',
    text: '诗歌'
  },
  {
    link: '/article',
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

exports.adminMenus = [
  {
    link: '/admin',
    text: '总览',
    icon: 'home',
  },
  {
    link: '/admin/article',
    text: '文章管理',
    icon: 'article',
  },
  {
    link: '/admin/tag',
    text: '标签管理',
    icon: 'article',
  },
  {
    link: '/admin/setting',
    text: '系统设置',
    icon: 'setting',
  },
]

exports.BASE_URL = IS_DEV ? 'http://localhost:8000/api/' : 'https://placeholder/api/'
