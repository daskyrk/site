1. 按照[Nuxt官方文档](https://nuxtjs.org/examples)把示例先放一些进来，熟悉一下，后面可能用到
2. 添加自定义过滤器时，可以在`nuxt.config.js`的`plugins`中添加文件，添加全局的过滤器，或者在文件内部定义filters本地过滤器，[文档](https://cn.vuejs.org/v2/guide/filters.html)
3. 添加api文件夹，放置所有api请求，这里如果用本地的服务，就需要把server项目跑起来，并且在mongodb里放些数据。但原作者为啥要用koa起服务，再转一下，还没搞明白。