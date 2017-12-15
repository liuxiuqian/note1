## 目录

1、React 组件之间交流
2、this.setState层级过深无法无法改变值问题



## 1、React 组件之间交流

React 组件之间交流的方式，可以分为以下 3 种：

- 【父组件】向【子组件】传值；
- 【子组件】向【父组件】传值；
- 没有任何嵌套关系的组件之间传值（PS：兄弟组件之间传值）

### 1、【父组件】向【子组件】传值

这个是相当容易的，在使用 React 开发的过程中经常会使用到，主要是利用 props 来进行交流


    //父组件
	import React from 'react';
	import Hw from './helloworld.jsx'//子组件
	export default class App extends React.Component {
	  constructor(props) {
	    super(props);
	  }
	  render() {
	    let name = "liuxiuqian";//传给子组件的值
	    return (
	      <div>
	        <div className="text">我是首页</div>
	        <Hw name={name}/>//传值
	      </div>
	    );
	  }
	}
	
	//子组件
	import React from "react";
	class ProductBox extends React.Component {
	  render() {
	    return(
	      <div className="text">
	        我是首页的子组件
	        <p>我是父组件传过来的值：{this.props.name}</p>//用props接收父组件传过来的值
	      </div>
	
	    )
	  }
	}
	module.exports = ProductBox;


### 2、【子组件】向【父组件】传值





## 2、this.setState层级过深无法无法改变值问题


数据样例

    this.state={
            nav : [{
                title:"运营总览",
                img:menu_overview,
                imgShow:menu_overview_new,
                isShow : false,
                menuData:[{
                    navTop:"热门内容",
                    navContent:["重点产品攻坚日报","重点产品攻坚日报","重点产品攻坚月考核"],
                },{
                    navTop:"基础业务",
                    navContent:["运营概况"],
                },{
                    navTop:"创新业务",
                    navContent:["渠道毛利"],
                }]
            }]
        }

改变isShow的值

    let isShowData = this.state.nav[0];//将nav数组的第一个值给isShowData
	isShowData.isShow = true;//将true值赋给isShowData.isShow
    this.setState({isShowData});//改变isShowData，即改变了isShow的值







