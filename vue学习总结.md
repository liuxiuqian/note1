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








