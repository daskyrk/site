module.exports = {
  apps: [
    {
      name: 'blog',
      script: 'nuxt start',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '45.63.119.104',
      ref: 'origin/master',
      repo: 'git@github.com:daskyrk/blog.git',
      path: '/root/workspace/blog/test',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
}
