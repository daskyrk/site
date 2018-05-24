# 从零做一个blog

## 前期准备工作

1. 先在网上找了一个看起来不错的[示例](https://juejin.im/post/59ce4c6e6fb9a00a5e35fc0e)，使用了vue、koa、mongodb等技术栈
2. 然后clone项目先跑一下看看效果，发现本地连接mongodb时报错，因为本地没有安装mongodb并启动服务
3. 于是去mongodb官网下载安装，macos系统上直接执行`brew install mongodb`
4. 然后发现项目中用到了`mongoose`这个npm包，但还有一个`mongodb`的包，看介绍是官方的，所以查了一下区别，发现有人说：npm中mongodb版本太低，如果你pc装的mongodb版本在3以上，就会有许多方法不适用，建议在nodejs项目里使用mongoose模块操作mongodb数据库。所以等本地mongodb安装好后，nodeJs的mongodb驱动包就使用`mongoose`好了
5. 按照[官方文档](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/?_ga=2.206839382.419155782.1526700723-96411881.1526700723)等待mongodb安装好后，创建默认的数据存储目录：`sudo mkdir -p /data/db`，然后修改目录权限：`sudo chmod -R 777 /data/db`，并启动mongodb：`mongod`，看到日志：`waiting for connections on port 27017`说明启动成功，然后再回到项目中启动，这次就连接上了mongodb并正常启动项目了
6. 根据该项目的启动方式，在vsCode中新增一个debug配置，方便打断点调试：

```javascript
	{
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "nodemon",
      "program": "${workspaceFolder}/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      },
      "internalConsoleOptions": "neverOpen"
    }
```

7. 启动后，按照输出提示访问`localhost：8000`，结果返回结果提示：`无效的api请求`，仔细看了下代码，有一段

   ```javascript
   const router = new Router({
   	prefix: config.APP.ROOT_PATH // api
   })
   ```

   原来api请求都有统一前缀`api`，所以加上前缀后就可以顺利访问接口获取数据了。

8. 至此，基本架构已经清楚了，用server项目作为后端服务，mongodb提供数据存储，koa提供请求处理，client项目进行页面ssr渲染以及路由等功能。




## 初始化项目


1. 初始化仓库，`npm init`填写必要信息，安装相关依赖包

2. 查看[koa文档](https://koajs.cn/)，新增index.js文件：

   ```javascript
   'use strict';

   const Koa = require('koa');
   const app = new Koa();

   app.use(async ctx => {
     ctx.body = 'Hello World';
   });

   app.listen(3000);
   ```

3. 执行`node index.js`启动，不出意外应该就看到页面显示'Hello World'了。

4. 添加几个基本的koa middleware：koa-body、koa-helmet:

   ```javascript
   'use strict';

   const Koa = require('koa');
   const koaBody = require('koa-body')
   const helmet = require('koa-helmet')
   // const cors = require('koa-cors')
   const mongoosePaginate = require('mongoose-paginate')

   const mongodb = require('./mongodb');
   const config = require('./config')

   console.log('config: \n', JSON.stringify(config, null, 2));
   mongodb.connect(config.MONGODB);

   const app = new Koa();
   // use middleware
   app.use(helmet())
   app.use(koaBody({
     jsoinLimit: '10mb',
     formLimit: '10mb',
     textLimit: '10mb'
   }))
   
   app.use(async ctx => {
     ctx.body = 'Hello World';
   });

   // log request time
   app.use(async (ctx, next) => {
     const start = Date.now();
     await next();
     const ms = Date.now() - start;
     console.log(`${ctx.method} ${ctx.url} - ${ms}`);
   });

   app.listen(config.APP.port);
   console.log(`server started on port: ${config.APP.port}`);
   ```

5. 新增`lib/mongodb.js`文件，进行mongodb的初始化工作：

   ```javascript
   const mongoose = require('mongoose')

   // to get a fully-fledged promise, see http://mongoosejs.com/docs/promises.html
   mongoose.Promise = global.Promise

   exports.mongoose = mongoose

   exports.connect = dbConfig => {
     mongoose.connect(dbConfig.uris, dbConfig.options);

     mongoose.connection.on('error', (err) => {
       console.log('connect to mongodb occured error: ', err);
     })

     mongoose.connection.once('connected', () => {
       console.log('connect to mongodb success!');
     })

   }

   ```

6. 新增`config.js`文件，增加一些配置：

   ```javascript
   exports.MONGODB = {
     type: 'mongodb',
     uris: 'mongodb://127.0.0.1:27017',
     options: {},
   }

   exports.APP = {
     port: 3001,
   }
   ```




### 实现功能

1. 引入router，把不同的api请求分发到不同的controller上去