
### 发现
1. axios的interceptors，request是按照注册顺序，后注册的先执行，response按照注册顺序，先注册的先执行
2. 使用module模式的store时，plugin只能注册到index.js文件中，也就是只能注册到rootState上
3. vuex暂时还不支持对action做hook，见这个[pr](https://github.com/vuejs/vuex/pull/1115)，所以自动commit一个loading的mutation有点困难
4. nuxt框架提供的几个方法，和原vue框架实例本身提供的方法是有区别的，nuxt框架提供的方法提供了context作为参数，所以使用时要注意，没有context参数时通过this.$store来访问store
5. methods中的方法可以是异步方法
6. 嵌套路由时，比如`/:id/edit`这种，_id.vue文件必须有，然后再新建_id文件夹和该文件夹下的edit.vue文件，可以没有index.vue文件，如果有，会在访问`/:id`渲染_id和index，访问`/:id/edit`时渲染_id和edit文件
7. koa中`ctx.throw(status, msg)`是为了在外面的try catch块中捕获，然后放到body中，所以直接throw后msg并没有返回，response还是`Internal Server Error`
8. 自动生成的路由，举例来说，如果admin目录下除了index.vue外还有index目录，生成：
```javascript
{
  path: "/admin",
  component: _465e3c52,
  children: [
    {
      path: "",
      component: _47e729cc,
      name: "admin-index"
    },
    {
      path: "article",
      component: _654bdd7e,
      name: "admin-index-article"
    },
    {
      path: "article/add",
      component: _e75ca960,
      name: "admin-index-article-add"
    },
    {
      path: "article/:id?",
      component: _0b52b8a8,
      name: "admin-index-article-id"
    },
    {
      path: "article/:id?/edit",
      component: _36274bc0,
      name: "admin-index-article-id-edit"
    }
  ]
},
```
如果把index目录名改为index2，也就是没有和index.vue文件匹配的index目录，则生成：
```javascript
{
  path: "/admin",
  component: _465e3c52,
  name: "admin"
},
{
  path: "/admin/index2",
  component: _38be66a4,
  name: "admin-index2"
},
{
  path: "/admin/index2/article",
  component: _b2e4c256,
  name: "admin-index2-article"
},
{
  path: "/admin/index2/article/add",
  component: _66738de4,
  name: "admin-index2-article-add"
},
{
  path: "/admin/index2/article/:id",
  component: _65bd7180,
  name: "admin-index2-article-id"
},
{
  path: "/admin/index2/article/:id/edit",
  component: _499617e8,
  name: "admin-index2-article-id-edit"
},
```
所以，要想直接通过/admin这一层来控制所有子路由权限，就必须建立index目录，把其他文件都放到这个目录下，否则展开时就需要在每个文件中都进行权限控制


### 遇到的坑
1. 请求本地3000端口的接口时，axios返回的200，但是浏览器因为同源限制报了500错误，导致页面一直显示error的layout，后来在server项目中加了允许跨源的header后才正常
2. vuex在dispatch action时，必须把所有数据放在第二个参数中，不能`dipatch('action', id, data);`这样使用
3. koa中`req`是Node的request对象，`request`才是koa包装过的request对象
4. nuxt框架因为封装好了初始化逻辑，所以没法拿到vue实例对象
5. 创建同构应用时，每次页面刷新，server端就会创建新的app实例，所以就会从新走一遍初始化流程，plugin也就会再次注册，但是axios插件里的逻辑只能注册一次，所以加了标记来处理重复注册的问题。

### 疑惑：
1. 获取数据时，`asyncData`和`fetch`方法都可以用，有什么区别？

`asyncData`方法会自动把返回值merge到data属性中，而`fetch`方法则不会，并且`asyncData`方法有在组件init之前调用，所以方法里不能用this获取到当前组件的实例。
所以使用`asyncData`方法就需要把获取数据的逻辑直接放到方法内部并返回，这样就耦合了fetch相关的库，如果使用vuex的话，因为通过dispatch action来保存数据，所以只能用`fetch`方法

2. 按照官方文档，试了下直接用`store/article/state.js`这样把state、actions等都分离到单独文件中的做法，发现都作为了state下的一个属性引入了，并且都是空对象，就像`store.article.actions = {}`这样的，实际上actions不会作为state显示到vue-tools里才对，不知哪里有问题

3. fetch的状态，原作者是用在article组件中，但是fetch未返回结果前不会渲染文章列表，那这个fetch状态就一直都是false了，除非是用在分页时？
没错了，只有加载分页时，还留在当前页面，所以fetch状态是会切换的。

4. 现在已经获得了列表，想根据路由上的id直接取得列表中对应的文章详情，可是在`computed`中没有找到获取params的方法，怎么做？
可以通过`asyncData`方法，从这里可以获取params，并且返回值会merge到data中。补充：`computed`中可以通过`this.$route.params`获取params。见例子：
```javascript
asyncData ({ store, route }) {
  // 触发 action 后，会返回 Promise
  return store.dispatch('fetchItem', route.params.id)
},
computed: {
  // 从 store 的 state 对象中的获取 item。
  item () {
    return this.$store.state.items[this.$route.params.id]
  }
}
```

5. 表单恢复数据从哪获取数据？是直接从store中获取，还是设为state的某个属性？

6. 原作者是把管理后台和前台分开了，所以后台项目中的所有请求都加了验证的header供后端验证，我现在是把后台放到了一个子路由下，怎么对这个子路由下的所有请求添加验证的header而不影响外层的请求呢？
如果是一个个加，有点太麻烦了。可以新增一个authAx用来发送带Auth的请求。有个问题是从哪里获取token呢，因为是同构应用，所以没有localStorage这个东西，如果用Cookie，那么每个请求都会携带这个token

7. 原作者判断是否登录是通过是否有token并且token的时间不超过当前时间，但是这样感觉不安全？
懂了，是由于把验证的header加在了所有请求里，请求验证失败时会重新检查本地token判断是否登录，虽然可以伪造token的存在，但是token内容肯定是验证不通过的，也就是说其实你可以随便伪造token，但是返回结果里是没有正确信息的，所以保证了安全。

8. 为什么用localStorage而不是Cookie呢？
可能是localStorage方便取数据，而Cookie如果设置了httponly则js无法读取

9. 添加了localStorage方法，但是打包后在服务端运行时没有localStorage，如何把这部分代码放到客户端运行？axios库是两端通用，所以没有问题，但是其他库怎么办？

10. 如何把需要验证的路由和普通路由放在一起呢？进入验证路由时检查store中的token，没有时跳到登录页，但是刷新时store中的信息就清空了，也不能直接服务端渲染时就设置token，这样的话就一直都是登陆状态了

11. `nuxtServerInit`方法在服务端调用时，req是从哪里来的？文档中说from Node.Js server，但是这个服务是什么呢？应该是nuxt自身所起的服务，但是这个里面的request对象怎么加header呢？