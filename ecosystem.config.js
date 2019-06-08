module.exports = {
  apps: [
    {
      name: 'blog-server',
      script: 'npm run start',
      cwd: './server',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      output: '../logs/server-out.log',
      error: '../logs/server-error.log',
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
      output: '../logs/client-out.log',
      error: '../logs/client-error.log',
    },
    {
      name: 'blog-admin',
      script: 'npm run start',
      cwd: './admin',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      output: '../logs/admin-out.log',
      error: '../logs/admin-error.log',
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
