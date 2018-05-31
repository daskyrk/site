
### 发现
1. axios的interceptors，request是按照注册顺序，后注册的先执行，response按照注册顺序，先注册的先执行
2. 使用module模式的store时，plugin只能注册到index.js文件中，也就是只能注册到rootState上
3. vuex暂时还不支持对action做hook，见这个[pr](https://github.com/vuejs/vuex/pull/1115)，所以自动commit一个loading的mutation有点困难
4. nuxt框架提供的几个方法，和原vue框架实例本身提供的方法是有区别的，nuxt框架提供的方法提供了context作为参数，所以使用时要注意，没有context参数时通过this.$store来访问store
5. methods中的方法可以是异步方法
6. 嵌套路由时，比如`/:id/edit`这种，_id.vue文件必须有，然后再新建_id文件夹和该文件夹下的edit.vue文件，可以没有index.vue文件，如果有，会在访问`/:id`渲染_id和index，访问`/:id/edit`时渲染_id和edit文件
7. koa中`ctx.throw(status, msg)`是为了在外面的try catch块中捕获，然后放到body中，所以直接throw后msg并没有返回，response还是`Internal Server Error`

### 遇到的坑
1. 请求本地3000端口的接口时，axios返回的200，但是浏览器因为同源限制报了500错误，导致页面一直显示error的layout，后来在server项目中加了允许跨源的header后才正常
2. vuex在dispatch action时，必须把所有数据放在第二个参数中，不能`dipatch('action', id, data);`这样使用

### 疑惑：
1. 获取数据时，`asyncData`和`fetch`方法都可以用，有什么区别？

`asyncData`方法会自动把返回值merge到data属性中，而`fetch`方法则不会，并且`asyncData`方法有在组件init之前调用，所以方法里不能用this获取到当前组件的实例。
所以使用`asyncData`方法就需要把获取数据的逻辑直接放到方法内部并返回，这样就耦合了fetch相关的库，如果使用vuex的话，因为通过dispatch action来保存数据，所以只能用`fetch`方法

2. 按照官方文档，试了下直接用`store/article/state.js`这样把state、actions等都分离到单独文件中的做法，发现都作为了state下的一个属性引入了，并且都是空对象，就像`store.article.actions = {}`这样的，实际上actions不会作为state显示到vue-tools里才对，不知哪里有问题

3. fetch的状态，原作者是用在article组件中，但是fetch未返回结果前不会渲染文章列表，那这个fetch状态就一直都是false了，除非是用在分页时？
没错了，只有加载分页时，还留在当前页面，所以fetch状态是会切换的。

4. 现在已经获得了列表，想根据路由上的id直接取得列表中对应的文章详情，可是在`computed`中没有找到获取params的方法，怎么做？
可以通过`asyncData`方法，从这里可以获取params，并且返回值会merge到data中，虽然不是异步方法，不过可以实现功能

5. 表单恢复数据从哪获取数据？是直接从store中获取，还是设为state的某个属性？