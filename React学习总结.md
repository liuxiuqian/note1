## 目录

1、React 组件之间交流



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