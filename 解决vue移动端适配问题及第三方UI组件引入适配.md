## 解决vue移动端适配问题及第三方UI组件引入适配

前言: 本文主要利用 rem 解决移动端适配问题，将设计稿中px使用 amfe-flexible 、postcss-pxtorem 两款插件 自动转换为 rem。

## 一、配置转换插件

[amfe-flexible原理解析](https://blog.csdn.net/weixin_33738555/article/details/91466094 "flexible原理解析")

### 1、安装amfe-flexible

首先把安装amfe-flexible，这里使用npm install
 
    npm i -S amfe-flexible

### 2、在入口文件main.js中引入

    import 'amfe-flexible/index.js'

### 3、在根目录的index.html 的头部加入手机端适配的meta代码

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">

### 4、安装postcss-pxtorem是一款 postcss 插件，用于将单位转化为 rem

    npm i postcss-pxtorem --save-dev

### 5、配置转换使用

以下方法任选一种配置即可。

#### 1）在package.json配置 

      "postcss": {
	    "plugins": {
	      "autoprefixer": {
	        "browsers": [
	          "Android >= 4.0",
	          "iOS >= 7"
	        ]
	      },
	      "postcss-pxtorem": {
	        "rootValue": 37.5,
	        "propList": [
	          "*"
	        ]
	      }
	    }
	  },


#### 2）vue.config.js中配置（此文件需要在根目录下新建）

      const autoprefixer = require('autoprefixer');
		const pxtorem = require('postcss-pxtorem');
		
		module.exports = {
		  css: {
		    loaderOptions: {
		      postcss: {
		        plugins: [
		          autoprefixer({
		            browsers: ['Android >= 4.0', 'iOS >= 7']
		          }),
		          pxtorem({
		            rootValue: 37.5,
		            propList: ['*'],
		          })
		        ]
		      }
		    }
		  }
		};

#### 3）postcss.config.js中配置（此文件需要在根目录下新建）

    /**
	 * @Description:
	 *
	 * @author: liuxiuqian
	 *
	 * @date: 2020/2/27
	 */
	
	const autoprefixer = require('autoprefixer')
	const pxtorem = require('postcss-pxtorem')
	
	module.exports = ({ file }) => {
	  let rootValue
	// vant 37.5 [link](https://github.com/youzan/vant/issues/1181)
	  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
	    rootValue = 37.5
	  } else {
	    rootValue = 75
	  }
	  return {
	    plugins: [
	      autoprefixer(),
	      pxtorem({
	        rootValue: rootValue,
	        propList: ['*'],
	        minPixelValue: 2
	      })
	    ]
	  }
	}

此种方法用于解决 设计稿与第三方ui 的基准值不一样问题。例如设计稿 75 但是vant的是37.5。

 温馨提示：

关于 rootValue 这个配置项的数值到底是多少呢？怎么合理配置呢？

通常我们是根据设计图来定这个值，原因很简单，便于开发。假如设计图给的宽度是750，我们通常就会把rootValue设置为75，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。

那为什么你在这里写成了37.5呢？？？

之所以设为37.5，是为了引用像vant、mint-ui这样的第三方UI框架，因为第三方框架没有兼容rem，用的是px单位，将rootValue的值设置为设计图宽度（这里为750px）75的一半，即可以1:1还原vant、mint-ui的组件，否则会样式会有变化，例如按钮会变小。

既然设置成了37.5 那么我们必须在写样式时，也将值改为设计图的一半。

综上 取决于pt(逻辑像素或逻辑分辨率)和px(物理像素或物理分辨率，又被称为设备像素 )的关系。1pt = Reader(dpr值设备像素比)*px

拿iPhone6举例，下图 pt 宽高是375*667，px 宽高是750*1334，px的宽高是pt的2倍，所以这里的Reader关系是@2x,也就是2倍.

详细介绍：[移动设备分辨率（终于弄懂了为什么移动端设计稿总是640px和750px）](http://www.mamicode.com/info-detail-2439333.html?__cf_chl_jschl_tk__=3904df8af9b2d0e400e168bca654902cf915fdac-1582789016-0-Ac36MzBF1hqESqF4Z8G9sNTJn75eiXd6Krfelq52SQN1AK6XVClyx8iJp29ufgsHpL2lAZmwLLMVbnwtOSR5ZqAUtmbuBFNHud-UwU4N-WYQJSP7NCJ63ADTEH1JmFrxPLN-RVyf7H5vSQ-6W2pzUbBoFtMU1lkh9fmlp5n279KjTdqAHt1d0nIpb67nqTACuK9dDgJFVF3NJ8hkZi10qnrhqlJp9_y3Twjgj4EaVrE2PyIBXptpjzFcZNHv29O8lXKxDqTEtzZ8PzuNI2kirNHU1ADqUdhWMLD6_1cq18labB47Bu8TgAzzsMZXOteNuQ)

[移动端高清、多屏适配方案](https://div.io/topic/1092 "移动端高清、多屏适配方案")

## 二、vant(第三方UI库引入)

### 1、安装vant

    npm i vant -S

### 2、引入组件 (自动按需引入组件)

#### 1) babel 插件 安装
babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
	
    npm i babel-plugin-import -D

#### 2) 在.babelrc 中添加配置

	{
	  "plugins": [
	    ["import", {
	      "libraryName": "vant",
	      "libraryDirectory": "es",
	      "style": true
	    }]
	  ]
	}

    // 对于使用 babel7 的用户，可以在 babel.config.js 中配置
	module.exports = {
	  plugins: [
	    ['import', {
	      libraryName: 'vant',
	      libraryDirectory: 'es',
	      style: true
	    }, 'vant']
	  ]
	};

### 2、使用

在单个组件中使用


    import { Button } from 'vant';
	  export default {
	    name: "HelloWorld",
	    components:{
	      [Button.name]:Button,
	    }
	  };

	<van-button type="primary">主要按钮</van-button>


感谢以下文章：


移动设备分辨率（终于弄懂了为什么移动端设计稿总是640px和750px）：[http://www.mamicode.com/info-detail-2439333.html?__cf_chl_jschl_tk__=3904df8af9b2d0e400e168bca654902cf915fdac-1582789016-0-Ac36MzBF1hqESqF4Z8G9sNTJn75eiXd6Krfelq52SQN1AK6XVClyx8iJp29ufgsHpL2lAZmwLLMVbnwtOSR5ZqAUtmbuBFNHud-UwU4N-WYQJSP7NCJ63ADTEH1JmFrxPLN-RVyf7H5vSQ-6W2pzUbBoFtMU1lkh9fmlp5n279KjTdqAHt1d0nIpb67nqTACuK9dDgJFVF3NJ8hkZi10qnrhqlJp9_y3Twjgj4EaVrE2PyIBXptpjzFcZNHv29O8lXKxDqTEtzZ8PzuNI2kirNHU1ADqUdhWMLD6_1cq18labB47Bu8TgAzzsMZXOteNuQ](http://www.mamicode.com/info-detail-2439333.html?__cf_chl_jschl_tk__=3904df8af9b2d0e400e168bca654902cf915fdac-1582789016-0-Ac36MzBF1hqESqF4Z8G9sNTJn75eiXd6Krfelq52SQN1AK6XVClyx8iJp29ufgsHpL2lAZmwLLMVbnwtOSR5ZqAUtmbuBFNHud-UwU4N-WYQJSP7NCJ63ADTEH1JmFrxPLN-RVyf7H5vSQ-6W2pzUbBoFtMU1lkh9fmlp5n279KjTdqAHt1d0nIpb67nqTACuK9dDgJFVF3NJ8hkZi10qnrhqlJp9_y3Twjgj4EaVrE2PyIBXptpjzFcZNHv29O8lXKxDqTEtzZ8PzuNI2kirNHU1ADqUdhWMLD6_1cq18labB47Bu8TgAzzsMZXOteNuQ)

移动端高清、多屏适配方案：[https://div.io/topic/1092 ](https://div.io/topic/1092 "移动端高清、多屏适配方案")


flexible原理解析：[https://blog.csdn.net/weixin_33738555/article/details/91466094](https://blog.csdn.net/weixin_33738555/article/details/91466094 "flexible原理解析")

解决vue移动端适配问题，vue-cli3+vant-ui等第三方UI组件引入适配：[https://www.jianshu.com/p/8f9aab666c4a](https://www.jianshu.com/p/8f9aab666c4a "解决vue移动端适配问题，vue-cli3+vant-ui等第三方UI组件引入适配")