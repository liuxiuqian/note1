


1. 到mysql官网下载mysql编译好的二进制安装包

	https://www.mysql.com/downloads/
		
	图一
	选择community  server

2.  解压安装包

	进入安装包所在目录，执行命令：tar -xvzf mysql-5.6.35.tar.gz
	
	解压后重命名
	$mv mysql-5.6.35 mysql

	添加系统mysql组和mysql用户：
	groupadd mysql和useradd -r -g mysql mysql

	
	创建mysql数据目录，新目录不存在则创建(数据库数据默认目录datadir=/var/lib/mysql，可通过vim /etc/my.cnf 查看。如果需要改变默认路径的换修改一下)
	

	安装数据库：

	进入安装mysql软件目录：执行命令 cd /usr/local/mysql

	修改当前目录拥有者为mysql用户：执行命令 chown -R mysql:mysql ./

	安装数据库：执行命令 ./scripts/mysql_install_db --user=mysql
	此处如果报错：图二

	提示错误：-bash: ./scripts/mysql_install_db: No such file or directory
	解决办法：yum -y install perl perl-devel