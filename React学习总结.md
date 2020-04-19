## 目录

- 1、React 组件之间交流
- 2、this.setState层级过深无法无法改变值问题
- 3、关于this.setState异步执行问题
- 4、React中的状态提升




## 1、React 组件之间交流

React 组件之间交流的方式，可以分为以下 3 种：

- 【父组件】向【子组件】传值；
- 【子组件】向【父组件】传值；
- 跨级组件通信
- 非嵌套组件间通信

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

##### 原理：

子组件需要控制自己的 state， 然后告诉父组件自己的state，通过props调用父组件中用来控制state的函数，在父组件中展示子组件的state变化。

依赖 props 来传递事件的引用，并通过回调的方式来实现的，这样实现不是特别好，但在没有任何工具的情况下是一种简单的实现方式。

    //子组件
	import React from "react";
	const Sub = (props) => {
	    const cb = (msg) => {
	        return () => {
	            props.callback(msg)
	        }
	    }
	    return(
	        <div>
	            <button onClick = { cb("我们通信把") }>点击我</button>
	        </div>
	    )
	}
	export default Sub;

    //父组件
	import React,{ Component } from "react";
	import Sub from "./SubComponent.js";
	import "./App.css";
	
	export default class App extends Component{
	    callback(msg){
	        console.log(msg);
	    }
	    render(){
	        return(
	            <div>
	                <Sub callback = { this.callback.bind(this) } />
	            </div>
	        )
	    }
	}


### 3、跨级组件通信

所谓跨级组件通信，就是父组件向子组件的子组件通信，向更深层的子组件通信。跨级组件通信可以采用下面两种方式：

- 中间组件层层传递 props
- 使用 context 对象

对于第一种方式，如果父组件结构较深，那么中间的每一层组件都要去传递 props，增加了复杂度，并且这些 props 并不是这些中间组件自己所需要的。不过这种方式也是可行的，当组件层次在三层以内可以采用这种方式，当组件嵌套过深时，采用这种方式就需要斟酌了。

使用 context 是另一种可行的方式，context 相当于一个全局变量，是一个大容器，我们可以把要通信的内容放在这个容器中，这样一来，不管嵌套有多深，都可以随意取用。
使用 context 也很简单，需要满足两个条件：

- 上级组件要声明自己支持 context，并提供一个函数来返回相应的 context 对象
- 子组件要声明自己需要使用 context

下面以代码说明，我们新建 3 个文件：父组件 App.js，子组件 Sub.js，子组件的子组件 SubSub.js。

App.js：

    import React, { Component } from 'react';
	import PropTypes from "prop-types";
	import Sub from "./Sub";
	import "./App.css";
	
	export default class App extends Component{
	    // 父组件声明自己支持 context
	    static childContextTypes = {
	        color:PropTypes.string,
	        callback:PropTypes.func,
	    }
	
	    // 父组件提供一个函数，用来返回相应的 context 对象，getChildContext初始context 对象
	    getChildContext(){
	        return{
	            color:"red",//向子组件传递一个颜色
	            callback:this.callback.bind(this)//回调接收子组件的值
	        }
	    }
	
	    callback(msg){
	        console.log(msg)
	    }
	
	    render(){
	        return(
	            <div>
	                <Sub></Sub>
	            </div>
	        );
	    }
	}

Sub.js：中间组件

    import React from "react";
	import SubSub from "./SubSub";
	
	const Sub = (props) =>{
	    return(
	        <div>
	            <SubSub />
	        </div>
	    );
	}
	export default Sub;

SubSub.js：

    import React,{ Component } from "react";
	import PropTypes from "prop-types";
	
	export default class SubSub extends Component{
	    // 子组件声明自己需要使用 context
	    static contextTypes = {
	        color:PropTypes.string,
	        callback:PropTypes.func,
	    }
	    render(){
	        const style = { color:this.context.color }//获取父组件的颜色值
	        const cb = (msg) => {
	            return () => {
	                this.context.callback(msg);//函数传值给父组件
	            }
	        }
	        return(
	            <div style = { style }>
	                SUBSUB
	                <button onClick = { cb("我胡汉三又回来了！") }>点击我</button>
	            </div>
	        );
	    }
	}


如果是父组件向子组件单向通信，可以使用变量，如果子组件想向父组件通信，同样可以由父组件提供一个回调函数，供子组件调用，回传参数。

在使用 context 时，有两点需要注意：

- 父组件需要声明自己支持 context，并提供 context 中属性的 PropTypes
- 子组件需要声明自己需要使用 context，并提供其需要使用的 context 属性的PropTypes 
- 父组件需提供一个 getChildContext 函数，以返回一个初始的 context 对象

#### 如果组件中使用构造函数（constructor），还需要在构造函数中传入第二个参数 context，并在 super 调用父类构造函数是传入 context，否则会造成组件中无法使用 context。

    ...
	constructor(props,context){
	  super(props,context);
	}
	...

#### 改变 context 对象

我们不应该也不能直接改变 context 对象中的属性，要想改变 context 对象，只有让其和父组件的 state 或者 props 进行关联，在父组件的 state 或 props 变化时，会自动调用 getChildContext 方法，返回新的 context 对象，而后子组件进行相应的渲染。

修改 App.js，让 context 对象可变：

    import React, { Component } from 'react';
	import PropTypes from "prop-types";
	import Sub from "./Sub";
	import "./App.css";
	
	export default class App extends Component{
	    constructor(props) {
	        super(props);
	        this.state = {
	            color:"red"
	        };
	    }
	    // 父组件声明自己支持 context
	    static childContextTypes = {
	        color:PropTypes.string,
	        callback:PropTypes.func,
	    }
	
	    // 父组件提供一个函数，用来返回相应的 context 对象
	    getChildContext(){
	        return{
	            color:this.state.color,
	            callback:this.callback.bind(this)
	        }
	    }
	
	    // 在此回调中修改父组件的 state
	    callback(color){
	        this.setState({
	            color,
	        })
	    }
	
	    render(){
	        return(
	            <div>
	                <Sub></Sub>
	            </div>
	        );
	    }
	}

此时，在子组件的 cb 方法中，传入相应的颜色参数，就可以改变 context 对象了，进而影响到子组件：

    ...
	return(
	    <div style = { style }>
	        SUBSUB
	        <button onClick = { cb("blue") }>点击我</button>
	    </div>
	);
	...

context 同样可以应在无状态组件上，只需将 context 作为第二个参数传入：

    import React,{ Component } from "react";
	import PropTypes from "prop-types";
	
	const SubSub = (props,context) => {
	    const style = { color:context.color }
	    const cb = (msg) => {
	        return () => {
	            context.callback(msg);
	        }
	    }
	
	    return(
	        <div style = { style }>
	            SUBSUB
	            <button onClick = { cb("我胡汉三又回来了！") }>点击我</button>
	        </div>
	    );
	}
	
	SubSub.contextTypes = {
	    color:PropTypes.string,
	    callback:PropTypes.func,
	}
	
	export default SubSub;



### 4、非嵌套组件间通信

非嵌套组件，就是没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。对于非嵌套组件，可以采用下面两种方式：

- 利用二者共同父组件的 context 对象进行通信
- 使用自定义事件的方式

我们需要使用一个 events 包：

    npm install events --save

新建一个 ev.js，引入 events 包，并向外提供一个事件对象，供通信时使用：

    import { EventEmitter } from "events";
	export default new EventEmitter();

App.js

    import React, { Component } from 'react';

	import Foo from "./Foo";
	import Boo from "./Boo";
	
	export default class App extends Component{
	    render(){
	        return(
	            <div>
	                <Foo />
	                <Boo />
	            </div>
	        );
	    }
	}

Foo.js：

    import React,{ Component } from "react";
	import emitter from "./ev"
	
	export default class Foo extends Component{
	    constructor(props) {
	        super(props);
	        this.state = {
	            msg:null,
	        };
	    }
	    componentDidMount(){
	        // 声明一个自定义事件
	        // 在组件装载完成以后
	        this.eventEmitter = emitter.addListener("callMe",(msg)=>{
	            this.setState({
	                msg
	            })
	        });
	    }
	    // 组件销毁前移除事件监听
	    componentWillUnmount(){
	        emitter.removeListener(this.eventEmitter);
	    }
	    render(){
	        return(
	            <div>
	                { this.state.msg }
	                我是非嵌套 1 号
	            </div>
	        );
	    }
	}

Boo.js：

    import React,{ Component } from "react";
	import emitter from "./ev"
	
	export default class Boo extends Component{
	    render(){
	        const cb = (msg) => {
	            return () => {
	                // 触发自定义事件
	                emitter.emit("callMe",msg);
	            }
	        }
	        return(
	            <div>
	                我是非嵌套 2 号
	                <button onClick = { cb("Hello") }>点击我</button>
	            </div>
	        );
	    }
	}


 callMe就是要监听的自定义事件，

自定义事件是典型的发布/订阅模式，通过向事件对象上添加监听器和触发事件来实现组件间通信。

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


## 3、关于this.setState异步执行问题

用this.setState的第二参数，给一个回调来在更新后执行

    this.setState({unitLevel:useUnit},()=>{
        console.log(this.state.unitLevel);
    });

由于this.setState是异步执行，在我们设置后并不能立刻获取到最新的数据，可以通过回调函数的形式获取最新的数据，setState的第二个参数就是回调函数，这样就可以保证获取的数据是最新的。


## 4、React中的状态提升

#### 官方解释：共享 state(状态) 是通过将其移动到需要它的组件的最接近的共同祖先组件来实现的。 这被称为“状态提升(Lifting State Up)”

React的状态提升就是用户对子组件操作，子组件不改变自己的状态，通过自己的props把这个操作改变的数据传递给父组件，改变父组件的状态，从而改变受父组件控制的所有子组件的状态，这也是React单项数据流的特性决定的




