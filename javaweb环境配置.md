
## 腾讯云服务器CentOS7系统上安装JDK+Tomcat+MySQL

### 1、安装JDK

下载jdk可以去官网查看不同版本的jdk进行下载,我这里下载的是jdk-8u131-linux-x64.tar.gz。
mv移动到/usr/local/software/jdk(这是我在local目录下新建的文件夹)下，解压缩。

     tar -zxvf jdk-8u131-linux-x64.tar.gz



配置环境变量:修改/etc/profile文件,在最后添加

打开

    vim /etc/profile

添加

    export JAVA_HOME=/usr/local/software/jdk/jdk1.8.0_131
	export JRE_HOME=${JAVA_HOME}/jre
	export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
	export  PATH=${JAVA_HOME}/bin:$PATH



更新变量

    source /etc/profile

校验

    javac


### 2、安装tomcat

可以去官网下载，我下载的版本是apache-tomcat-8.5.31.tar.gz

    wget http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-8/v8.5.31/bin/apache-tomcat-8.5.31.tar.gz

mv移动到/usr/local/software/tomcat(这是我在local目录下新建的文件夹)下，解压缩。

     tar -zxvf apache-tomcat-8.5.31.tar.gz

检验 


    cd /usr/local/software/tomcat/apache-tomcat-8.5.31/bin

执行
    
    ./startup.sh

出现Tomcat started.表示成功.

### 3、安装MySQL

查看yum上提供的 MySQL 数据库可下载的版本

     yum  list  |  grep  mysql

安装

     yum  install  -y  mysql-server  mysql mysql-devel

不过CentOS7的yum源中默认好像是没有mysql的

 下载mysql

     wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm

 安装rpm包

     rpm -ivh mysql-community-release-el7-5.noarch.rpm
 安装mysql

     yum install mysql-community-server

设置密码

mysql> set password for 'root'@'localhost' =password('password');
Query OK, 0 rows affected (0.00 sec)

systemctl restart mysqld  重启

systemctl start mysqld.service 启动mysql服务

systemctl stop mysqld.service 停止mysql服务

systemctl status mysqld.service 查看mysql服务当前状态

systemctl enable mysqld.service 设置mysql服务开机自启动

systemctl disable mysqld.service 停止mysql服务开机自启动

 ps -aux | grep mysql  查看状态


远程连接出现1130 错误

在本机登入mysql后，更改 “mysql”数据库里的 “user”表里的 “host” 项，从”localhost”改称'%'即可

    mysql -u root -p
    use mysql;
    select 'host' from user where user='root';
    update user set host = '%' where user ='root';
    flush privileges;
    select 'host' from user where user='root';

第一句：以权限用户root登录

第二句：选择mysql库

第三句：查看mysql库中的user表的host值（即可进行连接访问的主机/IP名称）

第四句：修改host值（以通配符%的内容增加主机/IP地址），当然也可以直接增加IP地址

如果这步出错"ERROR1062 (23000): Duplicate entry '%-root' for key 'PRIMARY'"由说明该记录有了，跳过这步

第五句：刷新MySQL的系统权限相关表

第六句：再重新查看user表时，有修改。。

重起mysql服务即可完成。

###### #mysql添加内存配置：
[mysqld]
character-set-server=utf8
default-storage-engine=InnoDB
default-tmp-storage-engine=InnoDB
table_open_cache=128
performance_schema_max_table_instances=200
table_definition_cache=200
skip-name-resolve



路径：/data/service/java/springbootdemo
nohup java -jar springbootdemo >/dev/null 2>&1 &
tail -f nohup.out
jps/ps -ef|grep java
kill -9 xxxx


### 4、启动node服务 持久性
nohup node prod.server.js > ./nohup.out 2>&1  启动node服务

1、用forever进行管理  启动node服务

　　npm install -g forever

　　forever start index.js

