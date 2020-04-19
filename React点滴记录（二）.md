## 目录

1. antd-pro中loading状态的dva-loading使用（2019/3/26 18:53:47 ）


## 一、antd-pro中loading状态的dva-loading使用

更新时间：2019/3/26 18:54:56 

注意：本内容只针对使用antd-pro框架。

#### 引言：

添加loading，为了提高用户的体验感。不会因为加载数据时间过长而心烦意乱。在之前的项目中加载loading，都是在请求发送之前加载，结束之后关闭。需要自己计算发送了多少请求和关闭了多少请求。最近在使用antd-pro框架，发现在加载models的时候会有一个loading监听状态。于是就借助dva-loading实现全局配置loading。

在ant Design pro中直接用了dva-loading插件，封装的很好，用起来也很方便，主要就是直接监听异步的effect，分别在开始和结束的时候改变loading状态，所以是和dva结合在一起用的,下面时使用方法：

#### 插件引入

框架中已经引入，不需要自己引入了。

    import createLoading from 'dva-loading';

	const app = dva();

	app.use(createLoading());

#### 使用

在项目上注册之后组件会有loading对象


通过connect将loading注册在组件中。connect的作用是将组件和models结合在一起。将models中的state绑定到组件的props中。所有的请求都是在models的effect中执行。两种方法注册。

1. connect 的使用

	connect 方法返回的也是一个 React 组件，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 State。

	connect 方法传入的第一个参数是 mapStateToProps 函数，该函数需要返回一个对象，用于建立 State 到 Props 的映射关系。
	
	

	    export default connect(({ loading }) => ({
   		 	loading:loading.global
    	}))(BasicLayout);

2. @connect的使用

	其实只是connect的装饰器、语法糖
	
		@connect(({ user, login, global = {}, loading }) => ({
		  currentUser: user.currentUser,
		  collapsed: global.collapsed,
		  fetchingNotices: loading.effects['global/fetchNotices'],
		  notices: global.notices,
		  menuData: login.menuData,         // by hzy
		  redirectData: login.redirectData, // by hzy
		}))
		 
		export default class BasicLayout extends React.PureComponent { 
		   // ...
		}
			


##### 监听单个effect

	let isLoading = loading.effects['role/addRole'] //监听role下的addRole的异步请求

##### 监听某个模块下的所有异步请求

	let isLoading = loading.models.role,

##### 全局监听所有异步请求

	let isAllLoading = loading.global


在异步请求是loading变量会为true，完成后会变成false，用来控制加载动画