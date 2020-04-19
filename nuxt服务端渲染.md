
### 前言：
&emsp; &emsp; 官网介绍：2016 年 10 月 25 日，zeit.co 背后的团队对外发布了 Next.js，一个 React 的服务端渲染应用框架。几小时后，与 Next.js 异曲同工，一个基于 Vue.js 的服务端渲染应用框架应运而生，我们称之为：Nuxt.js。

## 一、Nuxt.js 是什么？

&emsp; &emsp; Nuxt.js 是一个基于 Vue.js 的通用应用框架。本文主要针对Nuxt的SRR（服务器端渲染）做分享。为什么使用Nuxt呢？是为了处理Vue的SEO优化，Vue.js原来是开发SPA（单页应用）的，SPA不利于搜索引擎的SEO操作。这时候就出现了Nuxt.js这个框架，直接用命令把我们制作的vue项目生成为静态html，并在服务端完成渲染。个人认为Nuxt.js只是解决这个问题的一个方案。

## 二、Nuxt环境搭建

&emsp; &emsp;在安装之前首先安装node环境。
本文环境：

- node环境  v8.11.4
- vue 3.1.3

### 1、安装vue-cli这个框架

用npm来安装vue-cli这个框架，如果你已经安装过了，可以省略这步。

	npm install vue-cli -g

查看是否安装成功命令。

	vue -V 

如果显示版本号即表示安转成功。

### 2、使用vue安装 nuxt



1. 安装好vue-cli后，就可以使用init命令来初始化Nuxt.js项目。

		vue init nuxt-community/starter-template nuxt



2. 需要进一步输入以下信息

		Project name (nuxt) nuxt       			--输入项目名称，注意项目名称不能大小写混合，回车
		Project description (Nuxt.js project) 	--项目描述，直接回车即可
		Author 风信子                            --输入作者姓名，回车即可


 	出现以下信息表示安装成功


		? Project name nuxt 
		? Project description testdemo
		? Author 风信子
		
		   vue-cli · Generated "nuxt".
		
		   To get started:
		
		     cd nuxt
		     npm install # Or yarn
		     npm run dev

		
3. 进入到nuxt

		cd nuxt

4. 安装依赖

		npm install 

5. 启动项目

		npm run dev

		╭─────────────────────────────────────────────╮
		│                                             │
		│   Nuxt.js v2.6.3                            │
		│   Running in development mode (universal)   │
		│                                             │
		│   Listening on: http://localhost:3000/      │
		│                                             │
		╰─────────────────────────────────────────────╯
		// 表示启动成功
		√ Client
		  Compiled successfully in 9.48s
		
		√ Server
		  Compiled successfully in 9.64s


	在浏览器输入 localhost:3000,可以看到结果。
## 二、Nuxt目录介绍

Nuxt自动生产了项目目录，简单介绍一下。

	|-- .nuxt                   // Nuxt自动生成，临时的用于编辑的文件，build
	|-- assets                  // 用于组织未编译的静态资源入LESS、SASS 或 JavaScript
	|-- components              // 用于自己编写的Vue组件，比如滚动组件，日历组件，分页组件
	|-- layouts                 // 布局目录，用于组织应用的布局组件，不可更改。
	|-- middleware              // 用于存放中间件
	|-- pages                   // 用于存放写的页面，我们主要的工作区域
	|-- plugins                 // 用于存放JavaScript插件的地方
	|-- static                  // 用于存放静态资源文件，比如图片
	|-- store                   // 用于组织应用的Vuex 状态管理。
	|-- .editorconfig           // 开发工具格式配置
	|-- .eslintrc.js            // ESLint的配置文件，用于检查代码格式
	|-- .gitignore              // 配置git不上传的文件
	|-- nuxt.config.json        // 用于组织Nuxt.js应用的个性化配置，已覆盖默认配置
	|-- package-lock.json       // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
	|-- package-lock.json       // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
	|-- package.json            // npm包管理配置文件

详情官网[目录结构](https://zh.nuxtjs.org/guide/directory-structure)介绍。

## 三、Nuxt常用配置
&emsp; &emsp;这里只简单介绍引入公共css、端口号配置以及配置iview-UI框架。

### 1、公共css配置

&emsp; &emsp;在开发多页项目时，都会定义一个全局的CSS来初始化我们的页面渲染。本文的bsae.css就是一个基础样式文件。
	
1. 将base.css 放入到 /assets/css/base.css 目录下。

2. 配置/nuxt.config.js文件，引入css文件。

		module.exports = {
		  css: ['~assets/css/base.css'],
		}

3. 重新启动工程，配置文件发生变化后需要重启才能生效。

### 2、端口号配置

&emsp; &emsp;开发中经常会遇到端口被占用或者指定IP的情况。我们需要在根目录下的package.json里对config项进行配置。比如现在我们想把IP配置成127.0.0.1，端口设置1818。

/package.json

	"config":{
	    "nuxt":{
	      "host":"127.0.0.1",
	      "port":"1818"
	    }
	  },
配置好后，我们在终端中输入npm run dev，然后你会看到服务地址改为了127.0.0.1:1818.

### 3、iview-UI框架配置

&emsp; &emsp;开发中为了统一样式，更加快速的开发，会引入第三方UI 框架。本文将配置iview。

1. 在/plugins目录下创建iview.js文件
	
		import Vue from 'vue'
		import iView from 'iview'
		
		Vue.use(iView);
		import 'iview/dist/styles/iview.css'


2. 配置/nuxt.config.js文件，引入iview文件。

		module.exports = {
			 plugins: [
			    {src: '~plugins/iview', ssr: true},
			 ],
		}

	ssr设置为true 表示支持服务端渲染。
3. 重新启动工程

## 四、Nuxt的路由配置
&emsp; &emsp;学习前端框架都要学习路由机制，因为路由可以体现我们的业务逻辑，把模块串联起来。本文将介绍路由的简单配置，二级路由的配置、路由的跳转及传参、路由的动画效果以及路由的权限拦截配置。

### 1、路由的简单配置
&emsp; &emsp;我们现在根目录的pages文件下新建两个文件夹，about和new。文件夹下分别创建index.vue文件。这时候就会自动创建一个/about路由和/new路由。在.nuxt/router.js中可以看到。

	export function createRouter() {
	  return new Router({
	    mode: 'history',
	    base: decodeURI('/'),
	    linkActiveClass: 'nuxt-link-active',
	    linkExactActiveClass: 'nuxt-link-exact-active',
	    scrollBehavior,
	
	    routes: [{
	      path: "/about",
	      component: _aac88a74,
	      name: "about"
	    }, {
	      path: "/new",
	      component: _c508edda,
	      name: "new"
	    }],
	
	    fallback: false
	  })
	}

&emsp; &emsp;这就是自动创建好的路由，也是最基础的配。如果需要自定义配置路由的话会在接下的**路由的权限拦截配置**中介绍。

&emsp; &emsp;简单理解就是在pages创建一个文件夹就会创建一个单独的路由。


### 2、二级路由的配置
&emsp; &emsp;二级目录和简单的一级路由不同点在于目录下会多出children属性，这个就是二级的路由，需要在pages下创建一个与文件夹同名的XX.vue文件。例如：想要创建/users/liu。这样的路由地址，在pages下创建users.vue文件，然后在pages下创建users文件夹，在pages/users下创建liu.vue。路由的生成结果为：

	export function createRouter() {
	  return new Router({
	    mode: 'history',
	    base: decodeURI('/'),
	    linkActiveClass: 'nuxt-link-active',
	    linkExactActiveClass: 'nuxt-link-exact-active',
	    scrollBehavior,
	
	    routes: [{
	      path: "/about",
	      component: _aac88a74,
	      meta: {},
	      name: "about"
	    }, {
	      path: "/new",
	      component: _c508edda,
	      meta: {"requireAuth":true},
	      name: "new"
	    }, {
	      path: "/users",
	      component: _278dd992,
	      name: "users",
	      children: [{
	        path: "liu",
	        component: _3bf50f1e,
	        name: "users-liu"
	      }]
	    }],
	
	    fallback: false
	  })
	}


在users.vue文件中添加 <nuxt-child keep-alive ></nuxt-child>

 	<template>
	  <div id="">
	    users
	    <ul>
	      <nuxt-child keep-alive ></nuxt-child>
	    </ul>
	  </div>
	</template>
直接这样http://localhost:3000/users/liu

### 3、动态路由的配置

&emsp; &emsp;在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。

	pages/
	--| users/
	-----| _id.vue
	--| users.vue

	或

	pages/
	--| users/
	-----| _id/
	--------|index.vue
	--| users.vue
	
生成的路由配置表：

	 {
	      path: "/users",
	      component: _278dd992,
	      name: "users",
	      children: [{
	        path: ":id",
	        component: _2d0b728f,
	        name: "users-id"
	      }]
    }

你会发现名称为 users-id 的路由路径带有 :id? 参数，表示该路由是可选的。如果你想将它设置为必选的路由，需要在 users/_id 目录内创建一个 index.vue 文件。




### 4、路由的跳转及传参校验方法
&emsp; &emsp;Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。配置使用可以按照vue-router。要在页面之间使用路由，我们建议使用<nuxt-link> 标签。

1. 路由的跳转

	例如：
	
		<template>
		  <nuxt-link to="/">首页</nuxt-link>
		</template>
		或
		<template>
		  <nuxt-link :to="{name:'index'}">首页</nuxt-link>
		</template>
		或
		<template>
		  <nuxt-link :to="{path:'/'}">首页</nuxt-link>
		</template>

2. 路由的跳转传参

	路由的跳转有params或query传参，和vue-router使用一样，params：地址栏不可见传参，query：地址栏可见。

	
	
	又分为 <nuxt-link> 传参和js 传参。
	
	例如nuxt-link：

		<li><nuxt-link :to="{name:'users-liu', params: {newsId:1002}}">users-liu</nuxt-link></li>	
		或
		<li><nuxt-link :to="{name:'users-liu', query: {newsId:1002}}">users-liu</nuxt-link></li>	

	例如js：

		this.$router.push({ name: 'users-liu',params:{id:12,key:value}) 
		或
		this.$router.push({ name: 'users-liu',query:{id:12,key:value}) 
		

	接收参数的方法

		this.$route.params.xxx
		或
		this.$route.query.xxx			

3. 传参校验方法
	
	进入一个页面，对参数传递的正确性校验是必须的，Nuxt.js也贴心的为我们准备了校验方法validate( )。

		export default {
		  validate ({ params }) {
		    // 必须是number类型
		    return /^\d+$/.test(params.id)
		  }
		}
	如果校验方法返回的值不为 true或Promise中resolve 解析为false或抛出Error ， Nuxt.js 将自动加载显示 404 错误页面或 500 错误页面。

### 5、路由的动画效果配置

&emsp; &emsp;路由的动画效果，也叫作页面的更换效果。Nuxt.js提供两种方法为路由提供动画效果，一种是全局的，一种是针对单独页面制作。

1. 全局配置

	如果想让每一个页面的切换都有淡出 (fade) 效果，我们需要创建一个所有路由共用的 CSS 文件。所以我们可以在 assets/ 目录下创建这个文件：
在全局样式文件 assets/main.css 里添加一下样式：	

		.page-enter-active, .page-leave-active {
		  transition: opacity .5s;
		}
		.page-enter, .page-leave-active {
		  opacity: 0;
		}

	然后添加到 nuxt.config.js 文件中：

		module.exports = {
		  css: [
		    '~assets/main.css'
		  ]
		}

2. 页面配置

	如果想给某个页面自定义过渡特效的话，只要在该页面组件中配置 transition 字段即可：在全局样式 assets/main.css 中添加一下内容：
		
		.test-enter-active, .test-leave-active {
		  transition: opacity .5s;
		}
		.test-enter, .test-leave-active {
		  opacity: 0;
		}

	然后我们将页面组件中的 transition 属性的值设置为 test 即可：
	


### 6、自定义路由及路由的权限拦截配置

	
1. 自定义路由

	使用router 属性配置中的extendRoutes进行路由自定义配置。类型: Function。

	例如添加自定义路由:nuxt.config.js

		export default {
		  router: {
		    extendRoutes (routes, resolve) {
		      routes.push({
		        name: 'custom',
		        path: '*',
		        component: resolve(__dirname, 'pages/404.vue')
		      })
		    }
		  }
		}
	路由的模式应该遵循[vue-router](https://router.vuejs.org/)模式。
			
2. 路由的权限拦截配置


	根据之前vue-cli脚手架的路由权限配置，会在meta属性中自定义一个requireAuth字段，用于控制路由的跳转拦截。
	
	
	- 创建自定义路由文件/routes/index.js

			/**
			 * @Description: 自定义路由配置文件
			 *
			 * @author: liuxiuqian
			 *
			 * @date: 2019/5/1
			 */
			const menus = [
			  {
			    path: "/about",
			    name: "about"
			  },
			  {
			    path: "/new",
			    name: "new",
			    meta: {
			      requireAuth: true, //new权限
			    }
			  },
			  {
			    path: "/users",
			    name: "users",
			    meta: {
			      requireAuth: true, //users权限
			    },
			    children: [{
			      path: "liu",
			      name: "users-liu",
			      meta: {
			        requireAuth: true, //users-liu权限
			      }
			    }]
			  },
			  {
			    path: "/",
			    name: "index"
			  }
			];
			
			
			/**
			 * 递归查询路由权限
			 * @param {*} list
			 * @param {*} menus
			 */
			const iterator = (list, menus) => {
			  for (let item in list) {
			    for (let m in menus) {
			      if ((list[item].name === menus[m].name) && (list[item].path === menus[m].path)) {
			        list[item].meta = menus[m].meta || {};
			        if("meta" in menus[m] && "requireAuth" in menus[m].meta && menus[m].meta.requireAuth){
			          list[item].meta.requireAuth = true;
			        }
			        if(list[item].children && list[item].children.length > 0){
			          iterator(list[item].children, menus[m].children);
			        }
			      }
			    }
			  }
			};
			
			export default (routes, resolve) => {
			  routes = iterator(routes, menus);
			};
	

		这个文件用于获取Nuxt中路由进行匹配添加权限，path和name要和Nuxt保持一致。匹配成功后将添加自己配置的requireAuth属性。


	- nuxt.config.js中配置


			router: { 
			    extendRoutes: routes
	  		},

		
		extendRoutes的使用已介绍过。

	- 在plugins下创建auth.js，用于路由拦截的具体实现办法。
	

			/**
			 * @Description:
			 *
			 * @author: liuxiuqian
			 *
			 * @date: 2019/5/1
			 */
			export default ({ app }) => {
			  app.router.beforeEach((to, from, next) => {
			    if (process.client) {
			      // const token = sessionStorage.getItem('token');
			      const token = true;
			      // if (to.matched.length ===0) {                                        //如果未匹配到路由
			      //   // from.name ? next({ name:from.name }) : next({path: '/notfind'});
			      // } else {
			      //   next();                                                                            //如果匹配到正确跳转
			      // }
			      if(to.meta.requireAuth){
			        if (token) {
			          next();
			        } else {
			          next({
			            path: '/login',
			            // query: {redirect: to.fullPath}//把要跳转的地址作为参数传到下一步
			          })
			        }
			      }else {
			        next();
			      }
			    }
			  });
			};


	- nuxt.config.js中配置

			plugins: [
			    {src: '~/plugins/auth',ssr: false},
			],

		关闭服务端渲染auth.js。
	
	中间件配置：

	之前在router.middleware: ['authorities']中间件中配置过路由拦截，存在浏览器刷新拦截失效的问题，然后没有找到具体的解决办法，就使用了上边的做法。如果使用此方法解决的麻烦交流一下。
	
		/**
		 * @Description: 中间件配置路由拦截
		 *
		 * @author: liuxiuqian
		 *
		 * @date: 2019/5/1
		 */
		export default function ({route, req, res, redirect}) {
		  let isClient = process.client;
		  let redirectURL = '/login';
		  if (isClient) {
		    // const token = sessionStorage.getItem('token');
		    const  token = false;
		    if(route.meta.length > 0 && route.meta[0].requireAuth){
		      if (!token && route.path !== '/login') {
		        redirect(redirectURL);
		      }
		    }
		  }
		}

			

## 五、Nuxt的错误页面和个性meta设置

### 1、Nuxt的错误页面

&emsp; &emsp;当用户输入路由错误的时候，我们需要给他一个明确的指引，所以说在应用程序开发中404页面是必不可少的。Nuxt.js支持直接在默认布局文件夹里建立错误页面。

在根目录下的layouts文件夹下建立一个error.vue文件，它相当于一个显示应用错误的组件。

	<template>
	  <div>
	      <h2 v-if="error.statusCode==404">404页面不存在</h2>
	      <h2 v-else>500服务器错误</h2>
	      <ul>
	          <li><nuxt-link to="/">HOME</nuxt-link></li>
	      </ul>
	  </div>
	</template>
	 
	<script>
	export default {
	  props:['error'],
	}
	</script>

### 2、个性meta设置
&emsp; &emsp;这个是本文的重点，使用Nuxt.js的目的也是为它而来的，页面的Meta对于SEO的设置非常重要。为了搜索引擎对新闻的收录，需要每个页面对新闻都有不同的title和meta设置。直接使用head方法来设置当前页面的头部信息

	  export default {
	    head(){
	      return{
	        title:"新闻页面",
	        meta:[
	          {hid:'description',name:'news',content:'This is news page'}
	        ]
	      }
	    }
	  }

参考：

Nuxt.js官网API：[https://zh.nuxtjs.org/api](https://zh.nuxtjs.org/api)，

技术胖：[https://jspang.com/posts/2018/02/26/nuxtjs.html](https://jspang.com/posts/2018/02/26/nuxtjs.html)