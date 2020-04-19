# webpack 基础篇

这篇文章主要了解一下webpack的基础，webpack到底是做什么的，为什么使用webpack。借着这几个问题，给大家介绍一下（仅代表个人观点），有问题可以下方留言一起探讨。本文主要介绍的是webpack4版本。
## 一、webpack 初识

### 1）概念

Webpack 是js中的一个打包模块化工具。它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

官网的概念是：
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

### 2）为什要使用WebPack

前端发展到今天，页面的展示的基本功能已经满足不了客户的需求。页面的功能动画特效也随之剧增。导致前端的代码逻辑变的更加复杂。功能的复杂的同时也拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了模块化的思想。代码的模块化实现是需要一个工具来管理这些代码的。就出现webpack、Grunt以及Gulp。

1. WebPack和Grunt以及Gulp相比有什么特性

	其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack可以替代Gulp/Grunt类的工具。

	Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。
	
	Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。


### TIP   webpack4+ 更新后相对于webpack3 大致做了以下更新(部分)


- 不在支持Nodejs 4，使用的是v8.5.0+版本。
- webpack4 优化编译速度（速度提升了98%）
- webpack 的编译和命令操作拆分成两块 webpack 和 webpack-cli
- 零配置，webpack4不再强制需要 webpack.config.js 作为打包的入口配置文件了，它默认的入口为'src/index.js' 和默认出口'dist/main.js'。
- webpack 提供了三种模式 production 生产模式、 development开发模式 和 none 我们不指定时，默认使用 production 生产模式

具体更新详情：[webpack4.0 更新日志](https://github.com/webpack/webpack/releases/tag/v4.0.0)

## 二、webpack 安装

本文使用的主要工具及环境版本:

- webpack v4.29.6
- webpack-cli v3.3.0
- nodejs v8.11.4
- npm v5.6.0

我们创建一个项目webpackTest 在该项目下我们初始化我们的项目

    npm init
根据提示我们输入相应的内容就可以，输入完成后我们项目的根目录会生成一个 package.json 文件

	 {
	  "name": "webpacktest",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "",
	  "license": "ISC"
	}

webpack 从 v4.X 开始已经将编译和命令操作拆分成了两块，分别为 webpack 和 webpack-cli，让我们来安装，这里是局部安装

    npm install --save-dev webpack webpack-cli

package.json 文件中包含你所安装的文件信息，表示安装成功。

从 webpack v4.0.0 开始，可以不用引入一个配置文件。然而，webpack 仍然还是高度可配置的。在开始前你需要先理解几个核心概念：


### 入口(entry)

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

webpack.config.js

    module.exports = {
	  entry: './path/to/my/entry/file.js'
	};


### 出口(output)

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来处理输出的规则。

webpack.config.js

    const path = require('path');

	module.exports = {
	  entry: './path/to/my/entry/file.js',
	  output: {
	    path: path.resolve(__dirname, 'dist'),
	    filename: 'my-first-webpack.bundle.js'
	  }
	};

filename：输出文件名；path：输出路径；


### 模式(Mode)

提供 mode 配置选项，告知 webpack 使用相应的模式。webpack通过选择 development 、 production 和 none之中的一个，来进设置webpack编译的方式。我们可以通过设置配置文件中的 mode 字段，来配置webpack的编译模式。

webpack.config.js

    module.exports = {
	  mode: 'production'
	};

### 模块(Module)

Module即模块，在 Webpack 里一切皆模块，图片json文件，js文件，css文件等在wepbakc中都会被当做模块，在webpack执行时会被打包编译。

### 代码块(Chunk)

Chunk代码块，是指经过webpack编译过后的代码，webpack会将每个由用户定义的模块，编译成chunk的形式。即代码分割多个文件。

### 编译器(Loader)

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

在更高层面，在 webpack 的配置中 loader 有两个目标：

1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. use 属性，表示进行转换时，应该使用哪个 loader。

webpack.config.js

    const path = require('path');

	const config = {
	  output: {
	    filename: 'my-first-webpack.bundle.js'
	  },
	  module: {
	    rules: [
	      { test: /\.txt$/, use: 'raw-loader' }
	    ]
	  }
	};
	
	module.exports = config;

“当碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在打包之前，先使用 raw-loader 转换一下。”

### 插件(plugins)

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

webpack.config.js

    const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
	const webpack = require('webpack'); // 用于访问内置插件
	
	const config = {
	  module: {
	    rules: [
	      { test: /\.txt$/, use: 'raw-loader' }
	    ]
	  },
	  plugins: [
	    new HtmlWebpackPlugin({template: './src/index.html'})
	  ]
	};
	
	module.exports = config;

webpack 提供许多开箱可用的插件！查阅[插件列表](https://www.webpackjs.com/plugins/)获取更多信息。

### 模块热替换(hot module replacement)

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：



- 保留在完全重新加载页面时丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
- 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。

在开发过程中，可以将 HMR 作为 LiveReload 的替代。webpack-dev-server 支持 hot 模式，在试图重新加载整个页面之前，热模式会尝试使用 HMR 来更新。更多细节请查看[模块热更新指南](https://www.webpackjs.com/guides/hot-module-replacement/)。