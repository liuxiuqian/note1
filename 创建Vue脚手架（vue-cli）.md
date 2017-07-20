
# 环境搭建
###  1. 安装node.js，从node.js官网下载并安装node，安装过程很简单。安装完成之后，打开命令行工具(win+r，然后输入cmd)，输入 node -v，如下图，如果出现相应的版本号，则说明安装成功。

![](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/fe7726909c64.png)
这里需要说明下，因为在官网下载安装node.js后，就已经自带npm（包管理工具）了，另需要注意的是npm的版本最好是3.x.x以上，以免对后续产生影响。
### 2. 安装淘宝镜像，打开命令行工具，把这个（npm install -g cnpm --registry=https://registry.npm.taobao.org）
### 复制（这里要手动复制就是用鼠标右键那个，具体为啥不多解释），安装这里是因为我们用的npm的服务器是外国，有的时候我们安装“依赖”的时候很很慢很慢超级慢，所以就用这个cnpm来安装我们说需要的“依赖”。安装完成之后输入 cnpm -v，如下图，如果出现相应的版本号，则说明安装成功。

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/2.png)

### 3、安装webpack，打开命令行工具输入：npm install webpack -g，安装完成之后输入 webpack -v，如下图，如果出现相应的版本号，则说明安装成功。
![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/3.png)
### 4、安装vue-cli脚手架构建工具，打开命令行工具输入：npm install vue-cli -g，安装完成之后输入 vue -V（注意这里是大写的“V”），如下图，如果出现相应的版本号，则说明安装成功。
![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/4.png)
# 二、通过以上四步，我们需要准备的环境和工具都准备好了，接下来就开始使用vue-cli来构建项目

###   1. 在硬盘上找一个文件夹放工程用的。这里有两种方式指定到相关目录：①cd 目录路径 ②如果以安装git的，在相关目录右键选择Git Bash Here
###  2. 安装vue脚手架输入：vue init webpack exprice ，注意这里的“exprice” 是项目的名称可以说是随便的起名，但是需要主要的是“不能用中文”。



- $ vue init webpack exprice --------------------- 这个是那个安装vue脚手架的命令
- This will install Vue 2.x version of the template. --------这里说明将要创建一个vue 2.x版本的项目
- For Vue 1.x use: vue init webpack#1.0 exprice
- Project name (exprice) ---------------------项目名称
- Project name exprice
- Project description (A Vue.js project) ---------------------项目描述
- Project description A Vue.js project
- Author Datura --------------------- 项目创建者
- Author Datura
- Vue build (Use arrow keys)
- Vue build standalone
- Install vue-router? (Y/n)-- 是否安装Vue路由，也就是以后是spa（但页面应用需要的模块）
- Install vue-router? Yes
- Use ESLint to lint your code? (Y/n) n ---是否启用eslint检测规则，这里个人建议选no
- Use ESLint to lint your code? No
- Setup unit tests with Karma + Mocha? (Y/n)
- Setup unit tests with Karma + Mocha? Yes
- Setup e2e tests with Nightwatch? (Y/n)
- Setup e2e tests with Nightwatch? Yes


- vue-cli · Generated "exprice"
- To get started: --------------------- 这里说明如何启动这个服务
- cd exprice
- npm install
- npm run dev
如下图：

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/5.png)

### 3. cd 命令进入创建的工程目录，首先cd exprice（这里是自己建工程的名字）；
### 4. 安装项目依赖：npm install，因为自动构建过程中已存在package.json文件，所以这里直接安装依赖就行。不要从国内镜像cnpm安装(会导致后面缺了很多依赖库)，但是但是如果真的安装“个把”小时也没成功那就用：cnpm install 吧
### 5. 安装 vue 路由模块 vue-router 和网络请求模块 vue-resource，输入：cnpm install vue-router vue-resource --save。

## 创建完成的“exprice”目录如下：

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/6.png)

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/7.png)
###   1. 启动项目，输入：npm run dev。服务启动成功后浏览器会默认打开一个“欢迎页面”，如下图：
![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/8.png)
#### 注意：这里是默认服务启动的是本地的8080端口，所以请确保你的8080端口不被别的程序所占用。


# 三 windows下vue-cli及webpack 导入bootstrap样式

### 1、安装好之后Vue的欢迎界面，我们要做个例子导入bootstrap的样式，就先去复制一份bootstrap的导航样式过来替换掉Vue的欢迎页面吧，打开Src文件夹下面的components组件目录，然后打开 Hello.vue文件


    <template>
      <nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">{{ msg }}</a>
      </div>
    
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">
      <li class="active"><a href="#">Link</a></li>
      <li><a href="#">Link</a></li>
      <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="#">Separated link</a></li>
      <li class="divider"></li>
      <li><a href="#">One more separated link</a></li>
    </ul>
      </li>
    </ul>
    <form class="navbar-form navbar-left" role="search">
      <div class="form-group">
    <input type="text" class="form-control" placeholder="Search">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="#">Link</a></li>
      <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="#">Separated link</a></li>
    </ul>
      </li>
    </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
      </nav>
    </template>


这时候运行vue 显示的页面变成：

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/9.png)

现在我们加入的bootstrap导航代码已经可以显示出来了，但是有点丑，是因为我们还没把bootstrap的CSS文件加载过来，接下来我们就是要导入CSS文件和js文件了。
### 2、下载Bootstrap文件包，然后把css、js、fonts三个文件夹复制到vue项目的src\assets目录下

### 3、让vue支持jQuery需要先安装jquery插件，通过cmd命令进入项目文件夹，然后运行 cnpm install jquery --save-dev 安装插件

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/10.png)

接着分别运行
    
    cnpm install style-loader --save-dev  
    cnpm install css-loader --save-dev  
    cnpm install file-loader --save-dev  

安装支持css的插件。

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/11.png)


### 4、修改build文件夹下面的webpack.base.conf.js文件，让其支持外部的css和js，首先打开文件后在头部加入：
    
    var webpack = require('webpack')

然后在
    
    module.exports = {
      entry: {
    app: './src/main.js'
      },

后面加
    
    plugins: [
      new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "windows.jQuery": "jquery"
      })
    ],

把

    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
改成

    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      jquery: "jquery/src/jquery"
    }

### 5、接着修改 src文件夹下面的main.js文件，打开文件之后在顶部加入
    
    
    import './assets/css/bootstrap.min.css'
    import './assets/js/bootstrap.min'

接着保存之后重启一下服务 npm run dev

#### 感谢 http://www.jianshu.com/p/1626b8643676
#### 感谢 http://blog.csdn.net/ansu2009/article/details/53305134
