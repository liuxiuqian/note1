# Ant Design Pro 框架 qiankun 实现微前端

### 什么是微前端 （qiankun 官网解释）

微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。

微前端架构具备以下几个核心价值：

- 技术栈无关： 主框架不限制接入应用的技术栈，微应用具备完全自主权
- 独立开发、独立部署： 微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
- 增量升级： 在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
- 独立运行时：每个微应用之间状态隔离，运行时状态不共享

### qiankun 介绍

qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。目前 qiankun 已在蚂蚁内部服务了超过 100 个线上应用。

特性：

- 基于 single-spa 封装，提供了更加开箱即用的 API。
- 技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。
- HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单。
- 样式隔离，确保微应用之间样式互相不干扰。
- JS 沙箱，确保微应用之间 全局变量/事件 不冲突。
- 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。
-  umi 插件，提供了 @umijs/plugin-qiankun 供 umi 应用一键切换成微前端架构系统。


### umi3 升级
umi2中的plugins被移除(即无需使用umi-plugin-react)，其中的配置项上提一层

	import { defineConfig, utils } from 'umi';

	export default defineConfig({
	  hash: true,
	  antd: {},
	  dva: {
	    hmr: true,
	  },
	  locale: {
	    default: 'zh-CN',
	    antd: true,
	    // default true, when it is true, will use `navigator.language` overwrite default
	    baseNavigator: true,
	  },
	  dynamicImport: {
	    loading: '@/components/PageLoading/index',
	  },
	  targets: {
	    ie: 11,
	  },
	  //    省略部分内容...
	}


umi3中将原先plugins中的pwa配置去除，umi-plugin-pro-block、umi-plugin-ga、umi-plugin-antd-theme等插件都去除，同时最外层的配置需要使用umi3中最新的defineConfig进行处理



### @umijs/plugin-qiankun 配置


本文主要使用 @umijs/plugin-qiankun 进行配置

使用版本介绍

1. 主应用： Ant Design Pro ： V4
2. 主应用： umi ： 3.1.2
3. 主应用： umijs/plugin-qiankun: 2.2.0,

子应用一样。


#### 1、安装 Ant Design Pro 

	npm create umi

选择 ant-design-pro：


	Select the boilerplate type (Use arrow keys)
	❯ ant-design-pro  - Create project with an layout-only ant-design-pro boilerplate, use together with umi block.
	  app             - Create project with a simple boilerplate, support typescript.
	  block           - Create a umi block.
	  library         - Create a library with umi.
	  plugin          - Create a umi plugin.

Ant Design Pro 脚手架将会自动安装。

#### 2、安装 @umijs/plugin-qiankun

	npm install --save-dev @umijs/plugin-qiankun

#### 3、子应用接入

1. 为子项目安装 qiankun 插件 @umijs/plugin-qiankun
2. 在 config/config.js 中加入 qiankun 插件 

		...
		mountElementId: 'app1',
		base: 'app1',
		outputPath: `./dist/app1`,
		publicPath: `/app1/`,
		qiankun: {
		  slave: {},
		},
		manifest: {
		  basePath: '/',
		},
		...

3. 修改 app1/src/pages/document.ejs 
	
		<div id="root"></div> 为 <div id="<%= context.config.mountElementId %>">
	
4. 在根目录下的 .env 中指定项目启动端口号 PORT=8000. 这里的端口号定义一个本地未被占用的就行
		
		
#### 4、在主项目中注册子项目

1. 为主项目安装 qiankun 插件 @umijs/plugin-qiankun
2. 在 config/config.js 中加入 qiankun 插件 
	
		...
		mountElementId: 'root-master',
		qiankun: {
		  master: {},
		},
		...
	
2. 修改 app1/src/pages/document.ejs 

		<div id="root"></div> 为 <div id="<%= context.config.mountElementId %>">
 
3. 构建时注册子应用 config/config.js 中直接配置
	
		qiankun: {
		  master: {
				// 注册子应用信息
	          apps: [
	            {
	              name: 'app1', // 唯一 id
	              entry: '//localhost:7001', // html entry
	              base: '/app1', // app1 的路由前缀，通过这个前缀判断是否要启动该应用，通常跟子应用的 base 保持一致
	              history: 'browser', // 子应用的 history 配置，默认为当前主应用 history 配置
				  mountElementId: 'root-slave',
	            }
	          ],
	          jsSandbox: true, // 是否启用 js 沙箱，默认为 false
	          prefetch: true, // 是否启用 prefetch 特性，默认为 true
			},
		},

4. 运行时 

		...// config/config.js 配置
		mountElementId: 'root-master',
		qiankun: {
		  master: {},
		},
		...

	// 在 src/app.js 中配置，export qiankun

		// 值是一个 promise
		export const qiankun = fetch('/config').then(() =>({
		  // 注册子应用信息
		  apps: [
		    {
		      name: 'app1-umi', // 唯一 id
		      entry: 'http://localhost:8011', // html entry
		      base: '/app1', // app1 的路由前缀，通过这个前缀判断是否要启动该应用，通常跟子应用的 base 保持一致
		      // history: 'browser', // 子应用的 history 配置，默认为当前主应用 history 配置
		      mountElementId: 'root-slave',
		    },
		  ],
		  jsSandbox: true, // 是否启用 js 沙箱，默认为 false
		  prefetch: true, // 是否启用 prefetch 特性，默认为 true
		  // defer: true, //
		}));
		

5. 主应用 BasicLayout 简单修改配置

		{// 加载master pages，此处判断较为简单，实际需排除所有子应用base打头的路径
	        selectKey !== '/app1' && (<Authorized authority={authorized!.authority} noMatch={noMatch}>
	          {children}
	        </Authorized>)
	      }
	      <div id="root-slave" />
	
		

至此所有的配置结束，如果顺利的话应该就能看到效果了

常见问题

- 找不到子节点
- src/pages/document.ejs 的修改


项目demo: [https://gitee.com/liuxiuqian/qiankun.git](https://gitee.com/liuxiuqian/qiankun.git "https://gitee.com/liuxiuqian/qiankun.git")

风信子博客地址： [http://blog.liuxiuqian.com/](http://blog.liuxiuqian.com/ "http://blog.liuxiuqian.com/")