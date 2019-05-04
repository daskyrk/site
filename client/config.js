export const appConfig = {
  owner: 'lijun',
  mail: 'daskyrk@gmail.com',
  site: 'https://lijun.space',
  title: "lijun's blog",
  description: "lijun's personal blog powered by nuxt, koa & mongodb",
  bg_mode: 'story', // static | story | random
  gtmId: 'UA-121869307-1', // google tag manager id
  footer: {
    startTime: '2019-05-04 09:00:00',
    owner: 'daskyrk',
    friends: [
      {
        name: '我的小窝',
        link: '/'
      }
    ],
  },
  navs: [
    // {
    //   link: '/read',
    //   text: 'Read',
    // },
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
      link: '/admin',
      text: '总览',
      icon: 'home',
    },
    {
      link: '/admin/read',
      text: '读书管理',
      icon: 'book',
    },
    {
      link: '/admin/post',
      text: '文章管理',
      icon: 'post',
    },
    {
      link: '/admin/comment',
      text: '留言管理',
      icon: 'comment',
    },
    {
      link: '/admin/tag',
      text: '标签管理',
      icon: 'tag',
    },
    {
      link: '/admin/setting',
      text: '系统设置',
      icon: 'setting',
    },
  ],
}
