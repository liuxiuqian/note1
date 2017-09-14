## 目录
1. 搭建node+express+MySQL项目环境(前后端分离开发)
2. 登录拦截判断登录态
3.  nodejs 自动重启服务 supervisor

## 1、 node+express+MySQL项目环境(前后端分离开发)

### 1、准备工作

首先你需要安装NodeJS环境

####　1.安装Express

    npm install express -g //全局安装
    npm install express-generator -g //安装全局变量
#### 2.初始化项目

    cd  example //进入项目文件夹
    express project //创建express目录,project是目录名

#### 3.执行如下命令

    1.cd project //进入项目根目录
    2.npm install  //安装依赖

最终目录：

- /bin:用来启动应用（服务器）
- /public: 存放静态资源目录
- /routes：路由用于确定应用程序如何响应对特定端点的客户机请求，包含一个 URI（或路径）和一个特定的 HTTP 请求方法（GET、POST 等）。每个路由可以具有一个或多个处理程序函数，这些函数在路由匹配时执行。
- /views: 模板文件所在目录 文件格式为.jade（由于是分离式开发此处不会写东西）
- 目录app.js程序main文件 这个是服务器启动的入口

#### 4.启动服务

    npm start //启动服务器






## 2、登录拦截判断登录态


## 3、 nodejs 自动重启服务 supervisor

#### 1、安装方法（以全局模块安装）：

    npm install supervisor -g


#### 2、启动服务，如果启动文件没有发生改变执行以下命令

    supervisor bin/www