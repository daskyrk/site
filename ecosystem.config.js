module.exports = {
  apps: [
    {
      name: 'blog-server',
      script: 'npm run start:prod',
      cwd: './server',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'blog-client',
      script: 'npm run start',
      cwd: './client',
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
      host: '45.32.74.136',
      ref: 'origin/master',
      repo: 'git@github.com:daskyrk/blog.git',
      path: '/root/workspace/blog',
      'post-setup': './init.sh',
      'post-deploy': 'pm2 reload ecosystem.config.js --env production',
    },
  },
}
