1. 按照[Nuxt官方文档](https://nuxtjs.org/examples)把示例先放一些进来，熟悉一下，后面可能用到
2. 添加自定义过滤器时，可以在`nuxt.config.js`的`plugins`中添加文件，添加全局的过滤器，或者在文件内部定义filters本地过滤器，[文档](https://cn.vuejs.org/v2/guide/filters.html)
3. 添加api文件夹，放置所有api请求，这里如果用本地的服务，就需要把server项目跑起来，并且在mongodb里放些数据。但原作者为啥要用koa起服务，再转一下，还没搞明白。
4. 调整了项目结构，原作者把所有service都引入到store目录下的index文件中，改成了引入每个独立的service到对应的sub store文件中，这样更模块化，但是需要每个sub store文件都引入service文件
5. 通过Cookie给请求加上了token，本想通过后端返回401，前端检测响应的状态码来跳转登录页，但是遇到几个问题：在axios这一层没法拿到vue app实例，也就没法拿到app.$router对象进行跳转，然后考虑添加一个store的plugin，在检测到401后commit一个action，又发现store中好像也没法拿到router进行跳转，于是就改为改变一个state中的标记: redirect，又加了一个middleware，页面跳转时检查redirect是否不为空，不为空时就进行跳转。这样虽然可以跳转了，但是什么时候清除redirect标记又成了问题。。。
6. 后来查资料，发现axios可以配置全局的配置，所以直接加个plugin进行初始化的配置就可以了，然后plugin中可以直接使用redirect方法