## 目录

1. 模板之间数据传递
2. vue+axios 前端实现登录拦截（路由拦截、http拦截）
3. 配置开发版跨域问题
4. 设置页面title
5. 分页处理数据
6. axios上传文件
7. axios 利用ecs6 Promise实现同步操作



## 1. 模板之间数据传递


Vue 的组件作用域都是孤立的，不允许在子组件的模板内直接引用父组件的数据。必须使用特定的方法才能实现组件之间的数据传递。
首先用 vue-cli 创建一个项目，其中 home.vue 是父组件，components 文件夹下都是子组件。

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue1.png)

### 1.父组件向子组件传递数据

在 Vue 中，可以使用 props 向子组件传递数据。

##### 子组件部分：

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue2.png)

这是 header.vue 的 HTML 部分。

如果需要从父组件获取 dq1 的值，就需要使用 props: ['dq1']

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue3.png)

在 props 中添加了元素之后，就不需要在 data 中再添加变量了

##### 父组件部分：

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue4.png)

在调用组件的时候，使用 v-bind 将 dq1 的值绑定为 home.vue 中定义的变量 items

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue5.png)

然后就能将home.vue中 items 的值传给 header.vue 了


### 2.子组件向父组件传递数据

子组件主要通过事件传递数据给父组件

##### 子组件部分：

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue6.png)

这是 header.vue 的 HTML 部分，定义一个事件 stulogin  将aaa传递给 home.vue

首先声明一个了方法 stulogin，用 click 事件来调用 stulogin

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue7.png)

在 stulogin 中，使用了 $emit 来遍历 stlogin 事件，并返回 this.aaa

其中 stlogin 是一个自定义的事件，功能类似于一个中转，this.aaa 将通过这个事件传递给父组件

#### 父组件部分：

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue8.png)

在父组件 home.vue 中，声明了一个方法 ttttt，用 stlogin 事件调用 ttttt 方法，获取到从子组件传递过来的参数 aaa

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue9.png)

### 3.子组件向子组件传递数据

Vue 没有直接子对子传参的方法，建议将需要传递数据的子组件，都合并为一个组件。如果一定需要子对子传参，可以先从传到父组件，再传到子组件。

为了便于开发，Vue 推出了一个状态管理工具 Vuex，可以很方便实现组件之间的参数传递

#### 1.安装并引入 Vuex
    
    cnpm install vuex -S

然后在 main.js 中引入

    import Vue from 'vue'
    import App from './App'
    import Vuex from 'vuex'
    import store from './vuex/store'
    
    Vue.use(Vuex)
    
    new Vue({
      el: '#app',
      store,
      render: h => h(App)
    })

#### 2.构建核心仓库 store.js

Vuex 应用的状态 state 都应当存放在 store.js 里面，Vue 组件可以从 store.js 里面获取状态，可以把 store 通俗的理解为一个全局变量的仓库。

但是和单纯的全局变量又有一些区别，主要体现在当 store 中的状态发生改变时，相应的 vue 组件也会得到高效更新。

 
在 src 目录下创建一个 vuex 目录，将 store.js 放到 vuex 目录下

    import Vue from 'vue'
    import Vuex from 'vuex'
    
    Vue.use(Vuex)
    
    const store = new Vuex.Store({
      // 定义状态
      state: {
   		 Stulgoin: 'Wise Wrong'
      }
    })
    
    export default store

这是一个最简单的 store.js，里面只存放一个状态 author

虽然在 main.js 中已经引入了 Vue 和 Vuex，但是这里还得再引入一次

#### 3.将状态映射到组件

    <template>
      <div id="footer">
    
      <p class="footerRight"> {{Stulgoin}} </p>
    </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'footer',
      data () {
	    return {
	    
	    }
      },
      computed: {
	    Stulgoin () {
	      return this.$store.state.Stulgoin
	    }
      }
    }
    </script>
    <style scoped>
      
    </style>

这是 footer.vue 的 html 和 script 部分

主要在 computed 中，将 this.$store.state.Stulgoin 的值返回给 html 中的 Stulgoin

页面渲染之后，就能获取到 Stulgoin 的值

#### 4.在组件中修改状态

然后在 header.vue 中添加事件，将输入框的值传给 store.js 中的 Stulgoin
    
 ![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue6.png)

    
     methods:{
	    stulogin:function () {
	    		this.$store.state.Stulgoin = "dddd"
	    }
      }

在 stulogin 方法中，事件触发 将 "dddd"赋给 Vuex 中的状态 Stulgoin，从而实现子组件之间的数据传递


#### 5.官方推荐的修改状态的方式

上面的示例是在 stulogin 直接使用赋值的方式修改状态 Stulgoin，但是 vue 官方推荐使用下面的方法是利用mutations

    /**
     * Created by 风信子 on 2017/7/22.
     */
    import Vue from 'vue'
    import Vuex from 'vuex'
    
    Vue.use(Vuex)
    
    const store = new Vuex.Store({
      // 定义状态
      state: {
	    Stulgoin: '',
      },
      mutations:{
	    newStulgoin(state , msg){
	      state.Stulgoin = msg;
	    }
      }
    })
    
    export default store

首先在 store.js 中定义一个方法 newStulgoin，其中第一个参数 state 就是 $store.state，第二个参数 msg 需要另外传入

然后修改 header.vue 中的 setAuthor 方法

     methods:{
	    stulogin:function () {
	      this. $store.commit("newStulgoin" , "233") ;
	    }
      }

这里使用 $store.commit 提交 newStulgoin，并将 "233" 传给 msg，从而修改 Stulgoin



这样显式地提交(commit) mutations，可以让我们更好的跟踪每一个状态的变化，所以在大型项目中，更推荐使用第二种方法。

## 2.vue+axios 前端实现登录拦截（路由拦截、http拦截）
- localStorage存储登录状态，利用vuex（状态管理器）进行判断，利用vue-router提供的钩子函数beforeEach()对路由进行判断，axios进行请求http拦截。

#### 1、配置vue-router路由拦截，结合vuex（状态管理器）和localStorage

##### 1、router js配置

###### （1）在需要登录权限的页面路由加上自定义属性requireAuth，用于标记是否有登录权限。

    meta: {
      requireAuth: true
    }
如图
    
 ![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue21.png)

###### （2）router js  进行router.beforeEach拦截配置

    router.beforeEach((to, from, next) => {
      //解决vue2.0路由跳转未匹配相应用路由避免出现空白页面
      if (to.matched.length ===0) {//如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/notfind');   //如果上级也未匹配到路由则跳转notfind页面，如果上级能匹配到则转上级路由
      } else {
    next();//如果匹配到正确跳转
      }
      //路由拦截
      if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    }
    else {
      next({
    path: '/',//返回首页（这里是登录页）
    query: {redirect: to.fullPath}//登录成功前往上次要去的页面
      })
    }
      }
      else {
    next();
      }
    })

####### （3）页面刷新时，重新赋值token
    
    if (window.localStorage.getItem('token')) {
      store.commit("login", window.localStorage.getItem('token'))
    }

###### （4）去除地址栏的 /#/

    mode : 'history',

 ![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue22.png)


##### 2、vuex（状态管理器）配置

###### （1）store.js配置

    /**
     * Created by 风信子 on 1/9/17
     */
    import Vue from 'vue'
    import Vuex from 'vuex'
    
    import * as types from './types'
    
    Vue.use(Vuex)
    
    const store = new Vuex.Store({
      // 定义状态
      state: {
    token : null,
    title: ''
      },
      mutations:{
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
      }
    })
    
    export default store

[types.LOGIN]是在types里定义的变量，方便管理使用。

存数据方法：

    this.$store.commit("login", this.token)

"login"为types.js的变量值，this.token要存的值

取值方法：

    
    import store from '../vuex/store'
	
    store.state.token//使用前要引入storejs文件

获取store中的token值

###### （2）types.js
    
    /**
     * Created by 风信子 on 1/9/17
     * vuex types
     */
    
    export const LOGIN = 'login';
    
    export const LOGOUT = 'logout';
    
    export const TITLE = 'title'

###### （3）登录页获取token存储在store中

    if (this.token) {
	    this.$store.commit("login", this.token)
	    let redirect = decodeURIComponent(this.$route.query.redirect || '/hello');
	    this.$router.push({
	      path: redirect
	    })
      }


在登录页定义token变量，通过获取后台接口的token值，存储的store中，并上次即将要进入的页面或者'/hello'页。


以上工程完成了页面的路由控制，但是没有真正做到拦截，需要结合api接口进行拦截，本文用到的是axios

#### 2、axios拦截

##### 1、axios文件配置

    /**
     * Created by 风信子 on 1/9/17.
     * http配置
     */
    
    import axios from 'axios'
    import store from '../vuex/store'
    import * as types from '../vuex/types'
    import router from '../router/index'
    import qs from 'qs'
    
    // axios 配置
    axios.defaults.timeout = 5000;
    axios.defaults.baseURL = 'https://api.github.com';
    
    // http request 拦截器
    axios.interceptors.request.use(
    config => {
      if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
      }
      if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
      }
      return config;
    },
    err => {
    return Promise.reject(err);
    });
    
    // http response 拦截器
    axios.interceptors.response.use(
    response => {
    return response;
    },
    error => {
    if (error.response) {
    switch (error.response.status) {
    case 401:
    // 401 清除token信息并跳转到登录页面
    store.commit(types.LOGOUT);
    router.replace({
    path: '/',
    query: {redirect: router.currentRoute.fullPath}
    })
    }
    }
    return Promise.reject(error.response.data)
    });
    
    export default axios;

接口请求的配置，发送拦截和接收拦截。


## 3、配置开发版跨域问题

在config下的index.js中的dev 设置proxyTable

    '/list': {
	    target: 'http://123.57.13.164:8060/sensor',
	    changeOrigin: true,
	    pathRewrite: {
	      '^/list': '/'
	    }
      }

使用

    export default {
      login : "/user/login",//登录接口地址
    }
此处的接口地址做封装处理了，前面/list就是上文的“/list”:{},target服务器地址，changeOrigin是否开启跨域（true开启），

其中 '/api' 为匹配项，target 为被请求的地址,因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的,所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/',如果本身的接口地址就有 '/api' 这种通用前缀，就可以把 pathRewrite 删掉

注意：在使用开发版跨域时要在axios配置文件中的

    axios.defaults.baseURL="/list";

## 4、设置页面title

在路由里每个都添加一个meta

    [
      {
     path:'',
     meta: {
       title: '首页'
     },
     component:''
       }
    ]

钩子函数
    
    router.beforeEach((to, from, next) => {
      window.document.title = to.meta.title;//设置页面title
      next();
    })


## 5、分页处理数据

### 1、数据展示和分页在同一个页面

1. 首先需要在vue-cli项目中配置bootstrap,jquery
2. 然后新建vue文件,如index.vue，index.vue内容如下
3. 配置路由即可运行实现。

由于代码被解析，暂时没办法展示，只能上传文件（代码文件在 note1/代码/page.vue）;


## 6、axios上传文件
仿照form表单实现上传文件不刷新页面。

html部分：

    
    <input class="file" id="file"  name="file" type="file" @change="update" accept="a

methods部分：


     update(e){
    let file = e.target.files[0];
    let param = new FormData(); //创建form对象
    param.append('file',file,file.name);//通过append向form对象添加数据
    param.append('chunk','0');//添加form表单中其他数据
    console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };  //添加请求头
    this.$http.post(api.impfile,param,config)
      .then(response=>{
    console.log(response.data);
      }).catch(function () {
    
      })
      }


## 7、axios 利用ecs6 Promise实现同步操作
Promise是一个构造函数，自己身上有all、reject、resolve这几个眼熟的方法，原型上有then、catch等同样很眼熟的方法。这么说用Promise new出来的对象肯定就有then、catch方法

#### 1、new一个Promise
    
    var p = new Promise(function(resolve, reject){
	    //做一些异步操作
	    setTimeout(function(){
	    console.log('执行完成');
	    	resolve('随便什么数据');
	    }, 2000);

		//这里可以写axios请求
    });
    
Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。其实这里用“成功”和“失败”来描述并不准确，按照标准来讲，resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejected。不过在我们开始阶段可以先这么理解

在上面的代码中，我们执行了一个异步操作，也就是setTimeout，2秒后，输出“执行完成”，并且调用resolve方法。

eturn出Promise对象，也就是说，执行这个函数我们得到了一个Promise对象。还记得Promise对象上有then、catch方法吧？这就是强大之处了，看下面的代码：

    p.then(function(data){
   		console.log(data);
		//这里写数据处理
    }).catch(function(）{});