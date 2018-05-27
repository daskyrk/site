1. 按照[Nuxt官方文档](https://nuxtjs.org/examples)把示例先放一些进来，熟悉一下，后面可能用到
2. 添加自定义过滤器时，可以在`nuxt.config.js`的`plugins`中添加文件，添加全局的过滤器，或者在文件内部定义filters本地过滤器，[文档](https://cn.vuejs.org/v2/guide/filters.html)
3. 添加api文件夹，放置所有api请求，这里如果用本地的服务，就需要把server项目跑起来，并且在mongodb里放些数据。但原作者为啥要用koa起服务，再转一下，还没搞明白。
4. 调整了项目结构，原作者把所有service都引入到store目录下的index文件中，改成了引入每个独立的service到对应的sub store文件中，这样更模块化，但是需要每个sub store文件都引入service文件

### 疑惑：
1. 获取数据时，`asyncData`和`fetch`方法都可以用，有什么区别？

`asyncData`方法会自动把返回值merge到data属性中，而`fetch`方法则不会，并且`asyncData`方法有在组件init之前调用，所以方法里不能用this获取到当前组件的实例。
所以使用`asyncData`方法就需要把获取数据的逻辑直接放到方法内部并返回，这样就耦合了fetch相关的库，如果使用vuex的话，因为通过dispatch action来保存数据，所以只能用`fetch`方法

2. 按照官方文档，试了下直接用`store/article/state.js`这样把state、actions等都分离到单独文件中的做法，发现都作为了state下的一个属性引入了，并且都是空对象，就像`store.article.actions = {}`这样的，实际上actions不会作为state显示到vue-tools里才对，不知哪里有问题