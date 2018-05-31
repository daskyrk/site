1. 按照[Nuxt官方文档](https://nuxtjs.org/examples)把示例先放一些进来，熟悉一下，后面可能用到
2. 添加自定义过滤器时，可以在`nuxt.config.js`的`plugins`中添加文件，添加全局的过滤器，或者在文件内部定义filters本地过滤器，[文档](https://cn.vuejs.org/v2/guide/filters.html)
3. 添加api文件夹，放置所有api请求，这里如果用本地的服务，就需要把server项目跑起来，并且在mongodb里放些数据。但原作者为啥要用koa起服务，再转一下，还没搞明白。
4. 调整了项目结构，原作者把所有service都引入到store目录下的index文件中，改成了引入每个独立的service到对应的sub store文件中，这样更模块化，但是需要每个sub store文件都引入service文件

