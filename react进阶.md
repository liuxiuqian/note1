
## Redux

- http://cn.redux.js.org/
- http://redux.js.org/

由于Redux不是单独为了React设计的，所以Redux可以运行在非React环境中。

Redux 的设计思想很简单，就两句话。

- Web 应用是一个状态机，视图与状态是一一对应的。
- 所有的状态，保存在一个对象里面。

这里使用 parcel Bundler构建一个干净的项目演示Redux的用法及核心特性。

parcel 与Webpack的区别：

- 打包的入口是html文件
- 不需要收到配置【Loader】
- 内置开发服务器

### 1、parcel Bundler安装

1. 初始化项目的  package.json。

	 	npm init

2. 安装 parcel-bundler 模块作为开发依赖
	
		npm install babel-preset-env --save-dev // 安装依赖
		npm install parcel-bundler --save-dev  // 添加parcel
	
3. 添加项目的入口文件 index.html

    	"start":"parcel index.html"

4. 通过parcel-bundler 启动开发服务

		npm run start
5. main.js完整代码

		/**
		 * @date: 2019/8/9
		 * @author 风信子
		 * @Description:
		 */
		
		// 1.导入redux 模块提供的 createStore的函数
		// 2.通过createStore 创建 store对象
		// 3.设计store的 reducer 的函数
		import {createStore} from "redux";
		
		const initialState = 0;
		const reducer = (state = initialState, action) =>{
		  const {type, payload} = action;
		
		  switch (type) {
		    case "increment":
		      return state + 1;
		    case "decrement":
		      return state - 1;
		    default:
		      return state;
		  }
		}
		
		const store = createStore(reducer);
		
		store.subscribe(()=>{
		  console.log("订阅触发")
		  console.log(store.getState())
		})
		
		// dispatch 用于执行 action 传入的对象就是reducer接收的action
		store.dispatch({type:"increment"});
		
		// 获取当前的state 中的数据
		const data =store.getState();
		console.log(data);




### 2、基本概念和 API

#### 2.1 Store

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。单一数据源原则。

通过Redux中的 createStore函数创建 Store。

	import { createStore } from 'redux';
	const store = createStore(fn);

上面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。


#### 2.2 State

Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。

当前时刻的 State，可以通过store.getState()拿到。

    import { createStore } from 'redux';
	const store = createStore(fn);

	const state = store.getState();

Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

#### 2.3 Action

State 和 View 是对应关系，当State变化会导致View的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

Action 是 JavaScript 普通对象。其中 type 属性用来表示将要执行的动作。且type属性是必须的，表示 Action 的名称。


	const action = {
	  type: 'ADD_TODO',
	  payload: 'Learn Redux'
	};


上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。

#### 2.4 Action 创建函数

Action 创建函数 就是生成 action 的方法。

在 Redux 中的 action 创建函数只是简单的返回一个 action:


	function addTodo(text) {
	  return {
	    type: 'ADD_TODO',
	    payload: text
	  };
	}

	const action = addTodo('Learn Redux');

上面代码中，addTodo函数就是一个 action 创建函数


#### 2.5 store.dispatch()

store.dispatch()是 View 发出 Action 的唯一方法。

	import { createStore } from 'redux';
	const store = createStore(fn);
	
	store.dispatch({
	  type: 'ADD_TODO',
	  payload: 'Learn Redux'
	});

上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。

结合ction 创建函数使用：

	store.dispatch(addTodo('Learn Redux'));

#### 2.6 Reducer

当 Store 通过 dispatch(Action) 接收 Action 之后。必须给出一个新的 State， View 才会发生变化。 这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

	const reducer = function (state, action) {
	  // ...
	  return new_state;
	};

整个应用的初始状态，可以作为 State 的默认值。下面是一个实际的例子。


	import {createStore} from "redux";
		
	const initialState = 0;
	const reducer = (state = initialState, action) =>{
	  const {type, payload} = action;
	
	  switch (type) {
	    case "increment":
	      return state + 1;
	    case "decrement":
	      return state - 1;
	    default:
	      return state;
	  }
	}
	
	const store = createStore(reducer);

	store.dispatch({type:"increment"});

上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。


*Reducer 函数最重要的特征是，它是一个纯函数。*也就是说，只要是同样的输入，必定得到同样的输出。

纯函数是函数式编程的概念，必须遵守以下一些约束。

1. 即相同的输入，永远会得到相同的输出
2. 不能调用系统 I/O 的API
3. 不得修改参数.
4. 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果



#### 2.7 store.subscribe()

store.subscribe 是一个监听函数。一旦 State 发生变化，就自动执行这个函数。

	store.subscribe(()=>{
	  console.log("订阅触发")
	  console.log(store.getState())
	})
		
上面代码中，State 变化后就会重新获取 State 的值。

store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

	let unsubscribe = store.subscribe(()=>{
	  console.log("订阅触发")
	  console.log(store.getState())
	})
	
	unsubscribe();


#### 2.8 拆分 Reducer

Reducer 函数负责生成 State。由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。

未拆分代码：

	const chatReducer = (state = defaultState, action = {}) => {
	  const { type, payload } = action;
	  switch (type) {
	    case ADD_CHAT:
	      return Object.assign({}, state, {
	        chatLog: state.chatLog.concat(payload)
	      });
	    case CHANGE_STATUS:
	      return Object.assign({}, state, {
	        statusMessage: payload
	      });
	    case CHANGE_USERNAME:
	      return Object.assign({}, state, {
	        userName: payload
	      });
	    default: return state;
	  }
	};

上面代码中，三种 Action 分别改变 State 的三个属性。

- ADD_CHAT：chatLog属性
- CHANGE_STATUS：statusMessage属性
- CHANGE_USERNAME：userName属性

这三个属性之间没有联系，这提示我们可以把 Reducer 函数拆分。不同的函数负责处理不同属性，最终把它们合并成一个大的 Reducer 即可。

Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

    import { combineReducers } from 'redux';

	const chatReducer = combineReducers({
	  chatLog,
	  statusMessage,
	  userName
	})
	
	export default todoApp;

上面的代码通过combineReducers方法将三个子 Reducer 合并成一个大的函数。



### 3、搭配 React

Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

#### 3.1、创建react项目

通过create-react-app创建react项目。

	create-react-app 02-react-redux
#### 3.2、安装 React Redux

Redux 默认并不包含 React 绑定库，需要单独安装。
	
	npm install --save react-redux

#### 3.3 容器组件和展示组件
React-Redux 将所有组件分成两大类：展示组件（presentational component）和容器组件（container component）。

##### 3.3.1 展示（UI）组件

- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用this.state这个变量）
- 所有数据都由参数（this.props）提供
- 不使用任何 Redux 的 API

因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

##### 3.3.2 容器组件

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API
- 监听 Redux state

总之，只要记住一句话就可以了：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

#### 3.4 connect()

React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。

    import { connect } from 'react-redux'
	const VisibleTodoList = connect()(TodoList);

上面代码中，TodoList是 UI 组件，VisibleTodoList就是由 React-Redux 通过connect方法自动生成的容器组件。

但是，因为没有定义业务逻辑，上面这个容器组件毫无意义，只是 UI 组件的一个单纯的包装层。为了定义业务逻辑，需要给出下面两方面的信息。

1. 输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
2. 输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。

因此，connect方法的完整 API 如下。

    
	import { connect } from 'react-redux'
	
	const VisibleTodoList = connect(
	  mapStateToProps,
	  mapDispatchToProps
	)(TodoList)

上面代码中，connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

##### 3.4.1 mapStateToProps()

mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。

    const mapStateToProps = (state) => {
	  return {
	    myState: state.myState
	  }
	}

上面代码中，接收state作为参数，返回一个对象。这个对象有一个 myState 属性，映射 props 的 myState 中。

还可以对数据处理之后返回：

    const mapStateToProps = (state) => {
	  return {
	    todos: getVisibleTodos(state.todos, state.visibilityFilter)
	  }
	}

上面代码中，mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个todos属性，代表 UI 组件的同名参数，后面的getVisibleTodos也是一个函数，可以从state算出 todos 的值。

下面就是getVisibleTodos的一个例子，用来算出todos。


    const getVisibleTodos = (todos, filter) => {
	  switch (filter) {
	    case 'SHOW_ALL':
	      return todos
	    case 'SHOW_COMPLETED':
	      return todos.filter(t => t.completed)
	    case 'SHOW_ACTIVE':
	      return todos.filter(t => !t.completed)
	    default:
	      throw new Error('Unknown filter: ' + filter)
	  }
	}

mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。

    const mapStateToProps = (state, ownProps) => {
	  return {
	    active: ownProps.filter === state.visibilityFilter
	  }
	}

使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。

connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。




##### 3.4.2 mapDispatchToProps()

mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。


如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。


    const mapDispatchToProps = (
	  dispatch,
	  ownProps
	) => {
	  return {
	    onClick: () => {
	      dispatch({
	        type: 'SET_VISIBILITY_FILTER',
	        filter: ownProps.filter
	      });
	    }
	  };
	}


从上面代码可以看到，mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。

如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。举例来说，上面的mapDispatchToProps写成对象就是下面这样。


    const mapDispatchToProps = {
	  onClick: (filter) => {
	    type: 'SET_VISIBILITY_FILTER',
	    filter: filter
	  };
	}

#### 3.5、实例


我们想要显示一个 todo 项的列表。功能：

1. 新增一天todo
2. 一个 todo 项被点击后，会增加一条删除线并标记 completed，否则是去掉删除线。
3. show 显示全部、选中的、未选中的。


src下目录结构：

	components
		AddTodo.js // 添加todo 功能1
		App.js     // 主页面
		Filter.js  // 过滤功能 功能3
		TodoItem.js // 列表的每个元素 功能2
		TodoList.js // 列表
	index.js		// 主程序入口
	store.js		// redux store仓库


AddTodo.js  添加todo 功能1

	/**
	 * @date: 2019/8/18
	 * @author 风信子
	 * @Description: 添加元素
	 */
	
	import React ,{ useState } from "react";
	import {connect} from "react-redux"
	
	const AddTodo = (props)=>{
	  // hooks useState方法  input 表示值 setInput表示修改input方法
	  const [input, setInput] = useState("");
	  return (
	    <div>
	      <input type="text" value={input} onChange={e=>setInput(e.target.value)}/>
	      <button onClick={()=>props.addTodo(input)}>Add</button>
	    </div>
	  )
	}
	
	const mapDispatchToProps = (dispatch) =>{
	  return {
	    addTodo: input => dispatch({type:"ADD_TODO",payload:input})
	  }
	}
	
	export default connect(null,mapDispatchToProps)(AddTodo);
以上代码使用 hooks useState方法记录保存input值，通过mapDispatchToProps修改store 中的数据

TodoList.js 元素列表

	/**
	 * @date: 2019/8/18
	 * @author 风信子
	 * @Description: todo列表
	 */
	
	import React from "react";
	import {connect} from "react-redux";
	import TodoItem from "./TodoItem";
	
	const TodoList = (props)=>(
	  <ul>
	    {
	      props.todo.map((item,index)=>(
	        <TodoItem
	          key={index}
	          text={item.text}
	          completed={item.completed}
	          onClick={() => props.onTodoClick(index)}
	        />
	      ))
	    }
	  </ul>
	)
	
	const getVisibleTodos = (todos, filter) => {
	  switch (filter) {
	    case 'SHOW_COMPLETED':
	      return todos.filter(t => t.completed)
	    case 'SHOW_ACTIVE':
	      return todos.filter(t => !t.completed)
	    case 'SHOW_ALL':
	    default:
	      return todos
	  }
	}
	
	const mapStateToProps = (state) => {
	  console.log(state)
	  return {
	    todo: getVisibleTodos(state.todos,state.visibilityFilter)
	  }
	}
	
	const mapDispatchToProps = (dispatch) =>{
	  return {
	    onTodoClick: index => dispatch({type:"TOGGLE_TODO",payload:index})
	  }
	}
	
	export default connect(mapStateToProps,mapDispatchToProps)(TodoList);

以上代码 mapStateToProps获取 state值，通过getVisibleTodos 过滤显示数据， mapDispatchToProps实现功能2。

TodoItem.js 列表的每个元素 

	/**
	 * @date: 2019/8/18
	 * @author 风信子
	 * @Description: todo 列表元素
	 */
	
	import React from "react";
	
	export default ({text, completed, onClick })=>(
	  <li
	    onClick={onClick}
	    style={{textDecoration: completed ? "line-through": "none"}}
	  >
	    {text}
	  </li>
	)
以上代码 展示每个todo,为每个todo绑定事件。

Filter.js 过滤功能 

	/**
	 * @date: 2019/8/18
	 * @author 风信子
	 * @Description:
	 */
	
	import React from "react";
	import {connect} from "react-redux"
	
	const Filter = (props)=>(
	  <p>
	    Show:
	    <button onClick={()=>props.filter("SHOW_ALL")}>All</button>
	
	    <button onClick={()=>props.filter("SHOW_ACTIVE")}>Active</button>
	
	    <button onClick={()=>props.filter("SHOW_COMPLETED")}>Completed</button>
	  </p>
	)
	
	const mapDispatchToProps = (dispatch) =>{
	  return {
	    filter: type => dispatch({type:"FILTER_TODO",payload:type})
	  }
	}
	
	export default connect(null,mapDispatchToProps)(Filter);

以上代码实现 通过mapDispatchToProps记录 显示状态。

App.js  主页面

	/**
	 * @date: 2019/8/18
	 * @author 风信子
	 * @Description: APP  js 文件
	 */
	
	import React from 'react'
	import Filter from './Filter'
	import AddTodo from './AddTodo'
	import TodoList from './TodoList'
	
	const App = () => (
	  <div>
	    <AddTodo />
	    <TodoList />
	    <Filter />
	  </div>
	)
	
	export default App

以上代码引入各个功能模块。


index.js 主程序入口文件

	
	import React from 'react'
	import { render } from 'react-dom'
	import { Provider } from 'react-redux'
	
	import store from './store'
	import App from './components/App'
	
	
	
	render(
	  <Provider store={store}>
	    <App />
	  </Provider>,
	  document.getElementById('root')
	)

以上代码主要是全局引入redux，将app.js主页面挂载到主页面节点上。



