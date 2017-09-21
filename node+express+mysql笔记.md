## 目录
1. 搭建node+express+MySQL项目环境(前后端分离开发)
2. 登录拦截判断登录态
3. nodejs 自动重启服务 supervisor
4. crypto加密模块
5. nodemailer发送邮件

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

### 2、配置相关文件（自己的思路配置的，如果不合理提出宝贵意见）
先看以下目录情况

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/node1.png)


#### 1.数据库配置文件

在根目录下创建config文件夹然后创建db.js文件

    /**
     * Created by 风信子 on 2017/9/10.
     */
    var mysql = require("mysql");
    var pool = mysql.createPool({
      host:"localhost",
      user:"root",
      password:"root",
      database:"lxq",//数据库表明
      port:3306
    });
    function query(sql, callback) {
      pool.getConnection(function (err, connection) {
    // Use the connection
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      connection.release();//释放链接
    });
      });
    }
    
    
    exports.query = query;

#### 2.创建接口文件（在根目录下创建dao文件夹）


##### 1.创建userDao.js（用户信息相关接口中转文件）

    /**
     * Created by 风信子 on 2017/9/10.
     */
    //用户数据操作
    var login = require("./login");
    var regist = require("./regist");
    var updatapwd = require("./updatapwd");
    
    //调用登录方法
    var loginDo = function(req,callback){
	    login.login(req,function(res){
	    	callback(res);
	    });
    }
    
    //调用注册方法
    var registDo = function(req,callback){
	    regist.regist(req,function(res){
	    	callback(res);
	    });
    }
    
    //调用修改密码方法
    var updatapwdDo = function(req,callback){
      updatapwd.updatapwd(req,function(res){
    	callback(res);
      });
    }
    
    
    exports.login = loginDo;
    exports.regist = registDo;
    exports.updatapwd = updatapwdDo;

##### 2.登录接口

    /**
     * Created by 风信子 on 2017/9/10.
     */
    //登录
    var db = require("../config/db");//请求我们的数据库连接
    
    var login = function(req,callback){
	    var data = {};
	    var username = req.query.username;
	    var password = req.query.password;
		    db.query('select * from user where uname = "'+username+'";',function(error,rows,fields){//sql查询
			    if(req.session.user){
				    data.code = "0";
				    data.message = "登录成功！";
				    callback(data);
			    }else {
				    if(rows.length == 0){
				    data.code = "1";
				    data.message = "用户名不存在！";
				    callback(data);
			    }else{
				    if(rows[0].pwd == password){
					    req.session.user = rows[0].uid;
					    data.code = "0";
					    data.message = "登录成功！";
					    callback(data);
				    }else{
					    data.code = "-1";
					    data.message = "密码错误！";
					    callback(data);
				    }
			    }
		    }
	    });
    }
    
    exports.login = login;//对外提供我们的login方法。

#####　3.注册接口



#####　4.修改密码接口


#####  5.routes下配置接口请求 users.js

    var express = require('express');
    var router = express.Router();
    
    
    var userDao = require('../dao/userDao');//请求我们的数据处理包
    
    //登录
    router.get('/login', function(req, res,callback) {
	    userDao.login(req,function(result){//回调函数
	    	res.json(result);
	    });
    });
    
    //注册
    router.post('/regist', function(req, res,callback) {
	    userDao.regist(req,function(result){
	    	res.json(result);
	    });
    });
    
    //修改密码
    router.post('/updatapwd',function (req, res,callback) {
      userDao.updatapwd(req,function(result){
    	res.json(result);
      });
    })
    
    
    module.exports = router;

在app.js中引入users.js

在index下插入

    var index = require('./routes/index');
    var users = require('./routes/users');

    
    app.use('/', index);
    app.use('/users', users);

## 2、登录拦截判断登录态

### 1、安装依赖
    
    npm install express-session

### 2、引入和配置

头部引入
    
    var session = require('express-session');
    
配置
    
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser("fengxinzi"));//和secret保持一致
    app.use(express.static(path.join(__dirname, 'public')));

	//这里是配置开始
    app.use(session({
    name: "skey",
    secret: 'fengxinzi', // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      maxAge:  1000 * 60 * 60 *24 // 24 hours
    // maxAge:  1000 * 10
    }
    }));


### 3、中间件判断是否已登录拦截

    //中间件判断是否已登录
    app.use(function (req, res, next) {
	    if (req.session.user) {  // 判断用户是否登录
	    	next();
	    } else {
		    // 解析用户请求的路径
		    var arr = req.url.split('/');
		    // 去除 GET 请求路径上携带的参数
		    for (var i = 0, length = arr.length; i < length; i++) {
		    arr[i] = arr[i].split('?')[0];
		    }
		    // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
		    if (arr.length > 1 && arr[1] == '') {
		    	next();
		    } else if (arr.length > 2 && arr[1] == 'users' && (arr[2] == 'regist' || arr[2] == 'login' || arr[2] == 'logout')) {
		    	next();
		    } else {  // 登录拦截
		    //拦截返回401
		    return res.sendStatus(401);
		    }
	    }
    });


### 4、完整的app.js代码  方便参考引入位置

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var FileStore = require('session-file-store')(session);
    
    
    var index = require('./routes/index');
    var users = require('./routes/users');
    
    
    var app = express();
    
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser("fengxinzi"));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(session({
    name: "skey",
    secret: 'fengxinzi', // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      maxAge:  1000 * 60 * 60 *24 // 24 hours
    // maxAge:  1000 * 10
    }
    }));
    
    //中间件判断是否已登录
    app.use(function (req, res, next) {
    if (req.session.user) {  // 判断用户是否登录
    next();
    } else {
    // 解析用户请求的路径
    var arr = req.url.split('/');
    // 去除 GET 请求路径上携带的参数
    for (var i = 0, length = arr.length; i < length; i++) {
    arr[i] = arr[i].split('?')[0];
    }
    // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
    if (arr.length > 1 && arr[1] == '') {
    next();
    } else if (arr.length > 2 && arr[1] == 'users' && (arr[2] == 'regist' || arr[2] == 'login' || arr[2] == 'logout')) {
    next();
    } else {  // 登录拦截
    //拦截返回401
    return res.sendStatus(401);
    }
    }
    });
    
    
    
    app.use('/', index);
    app.use('/users', users);
    
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    
    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
    
    
    module.exports = app;
    


## 3、 nodejs 自动重启服务 supervisor

#### 1、安装方法（以全局模块安装）：

    npm install supervisor -g


#### 2、启动服务，如果启动文件没有发生改变执行以下命令

    supervisor bin/www

## 4、crypto加密模块

在配置文件夹（config）下创建crypto.js

    /**
     * Created by 风信子 on 2017/9/20.
     * 加密模块
     */
    //导入模块
    var crypto = require('crypto');
    /**
     * @aes192加密模块
     * @param str string 要加密的字符串
     * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
     * @retrun string 加密后的字符串
     * */
    exports.getEncAse192 = function(str, secret) {
      var cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
      var enc = cipher.update(str, "utf8", "hex");//编码方式从utf-8转为hex;
      enc += cipher.final("hex"); //编码方式从转为hex;
      return enc; //返回加密后的字符串
    }
    /**
     * @aes192解密模块
     * @param str string 要解密的字符串
     * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
     * @retrun string 解密后的字符串
     * */
    exports.getDecAse192 = function(str, secret) {
      var decipher = crypto.createDecipher("aes192", secret);
      var dec = decipher.update(str, "hex", "utf8");//编码方式从hex转为utf-8;
      dec += decipher.final("utf8");//编码方式从utf-8;
      return dec;
    }
    /**
     * @Hmac-sha1加密模块 (每次加密随机,不可逆)
     * @param str string 要加密的字符串
     * @param secret string 要使用的加密密钥
     * @retrun string 加密后的字符串
     * */
    exports.getHmac = function(str, secret) {
      var buf = crypto.randomBytes(16);
      secret = buf.toString("hex");//密钥加密；
      var Signture = crypto.createHmac("sha1", secret);//定义加密方式
      Signture.update(str);
      var miwen=Signture.digest().toString("base64");//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
      return miwen;
    }
    /**
     * @sha1加密模块 (加密固定,不可逆)
     * @param str string 要加密的字符串
     * @retrun string 加密后的字符串
     * */
    exports.getSha1 = function(str) {
      var sha1 = crypto.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
      sha1.update(str);
      var res = sha1.digest("hex");  //加密后的值d
      return res;
    }
    
注释很明确，这里就不做解释了。

使用方法
    
    var crypto = require("../config/crypto");//加密引用
    
    var password = crypto.getEncAse192(req.body.password,"fengxinzi");//加密调用

## 5、nodemailer发送邮件

安装nodemailer

    npm install nodemailer --save

在配置文件夹（config）下创建nodemailer.js
    
    /**
     * Created by 风信子 on 2017/9/20.
     */
    
    var nodemailer = require('nodemailer');
    //配置邮件
    var transporter = nodemailer.createTransport({
      host: "smtp.qq.com",
      secureConnection: true,
      port:465,
      auth: {
	    user: '3531720046@qq.com',
	    pass: '*********',//授权码
      }
    });
    //发送邮件
    var sendmail = function(email,html){
      var option = {
	    from:"3531720046@qq.com",
	    to:email//多个可以用,隔开
      }
      option.subject = '风信子发送的验证码';//标题
      option.html= html;//内容
      transporter.sendMail(option, function(error, response){
	    if(error){
	      console.log("fail: " + error);
	    }else{
	      console.log("success: " + response);
	    }
      });
    }
    //外部调用发送邮件入口
    exports.sendmail = sendmail;

使用方法

    var nodemailer = require("../config/nodemailer");//邮箱发送
    
    nodemailer.sendmail("1553671542@qq.com","邮件内容：<br/>你的验证码是236987<br/>这是来自nodemailer发送的邮件！")