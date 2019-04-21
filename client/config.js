export const appConfig = {
  owner: 'lijun',
  mail: 'daskyrk@gmail.com',
  site: 'https://lijun.space',
  title: "lijun's blog",
  description: "lijun's personal blog powered by nuxt, koa & mongodb",
  bg_mode: 'story', // static | story | random
  gtmId: 'UA-121869307-1', // google tag manager id
  footer: {
    split: '|',
    data: [
      {
        text: '涅尘',
      },
      {
        text: '@lijun',
        link: '/about',
      },
    ],
  },
  navs: [
    {
      link: '/read',
      text: 'Read',
    },
    {
      link: '/post',
      text: 'Article',
    },
    {
      link: '/wish',
      text: 'Wish',
    },
  ],
  adminMenus: [
    {
      to: '/admin/dashboard',
      text: '总览',
      icon: 'mdi-view-dashboard',
    },
    {
      to: '/admin/post',
      text: '文章管理',
      icon: 'mdi-file-document',
    },
    {
      to: '/admin/read',
      text: '读书管理',
      icon: 'mdi-book-multiple',
    },
    {
      to: '/admin/comment',
      text: '留言管理',
      icon: 'mdi-forum',
    },
    {
      to: '/admin/tag',
      text: '标签管理',
      icon: 'mdi-tag-multiple',
    },
    {
      to: '/admin/setting',
      text: '系统设置',
      icon: 'mdi-settings',
    },
  ],
}
