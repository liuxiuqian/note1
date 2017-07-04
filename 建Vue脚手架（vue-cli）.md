
##环境搭建
###  1. 安装node.js，从node.js官网下载并安装node，安装过程很简单。安装完成之后，打开命令行工具(win+r，然后输入cmd)，输入 node -v，如下图，如果出现相应的版本号，则说明安装成功。

![](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/fe7726909c64.png)
这里需要说明下，因为在官网下载安装node.js后，就已经自带npm（包管理工具）了，另需要注意的是npm的版本最好是3.x.x以上，以免对后续产生影响。
###   2. 安装淘宝镜像，打开命令行工具，把这个（npm install -g cnpm --registry=https://registry.npm.taobao.org）复制（这里要手动复制就是用鼠标右键那个，具体为啥不多解释），安装这里是因为我们用的npm的服务器是外国，有的时候我们安装“依赖”的时候很很慢很慢超级慢，所以就用这个cnpm来安装我们说需要的“依赖”。安装完成之后输入 cnpm -v，如下图，如果出现相应的版本号，则说明安装成功。

![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/fe7726909c64.png)

