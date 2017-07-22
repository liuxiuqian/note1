## 1. 模板之间数据传递


Vue 的组件作用域都是孤立的，不允许在子组件的模板内直接引用父组件的数据。必须使用特定的方法才能实现组件之间的数据传递。
首先用 vue-cli 创建一个项目，其中 home.vue 是父组件，components 文件夹下都是子组件。

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue1.png)

### 1.父组件向子组件传递数据

在 Vue 中，可以使用 props 向子组件传递数据。

##### 子组件部分：

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue2.png)

这是 header.vue 的 HTML 部分，dq1 是在 data 中定义的变量。

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

## 3.子组件向子组件传递数据

Vue 没有直接子对子传参的方法，建议将需要传递数据的子组件，都合并为一个组件。如果一定需要子对子传参，可以先从传到父组件，再传到子组件。

为了便于开发，Vue 推出了一个状态管理工具 Vuex，可以很方便实现组件之间的参数传递

### 1.安装并引入 Vuex
    
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

### 2.构建核心仓库 store.js

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

### 3.将状态映射到组件

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

### 4.在组件中修改状态

然后在 header.vue 中添加事件，将输入框的值传给 store.js 中的 Stulgoin
    
 ![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue6.png)

    
     methods:{
	    stulogin:function () {
	    		this.$store.state.Stulgoin = "dddd"
	    }
      }

在 stulogin 方法中，事件触发 将 "dddd"赋给 Vuex 中的状态 Stulgoin，从而实现子组件之间的数据传递


### 5.官方推荐的修改状态的方式

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

