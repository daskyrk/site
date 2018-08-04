const IS_DEV = process.env.NODE_ENV !== 'production';

exports.envs = {
  owner: 'lijun',
  mail: 'daskyrk@gmail.com',
  site: 'https://lijun.space',
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
      }
    ]
  },
  navs: [
    {
      link: '/read',
      text: '读书',
    },
    {
      link: '/article',
      text: '文章',
    },
    {
      link: '/wall',
      text: '留言墙',
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
      link: '/admin/article',
      text: '文章管理',
      icon: 'article',
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
};
