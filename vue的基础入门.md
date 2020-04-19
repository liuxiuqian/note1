
1. 生命周期钩子
2. vue常用指令
3. computed（计算选项）与 Watch （监控数据）
4. Methods （方法选项）
5. props 属性设置


### 1、生命周期钩子

vue中有11个生命周期钩子，分别担任不同的工作。所有的生命周期钩子自动绑定 this 上下文到实例中。因此你可以访问数据，对属性和方法进行运算。这意味着你不能使用箭头函数来定义一个生命周期方法。（created: () => this.fetchTodos())）。因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同，this.fetchTodos 的行为未定义。

- beforeCreate 初始化之后
- created  在实例创建完成后被立即调用
- beforeMount 在挂载开始之前被调用
- mounted 被创建（视图渲染完毕） 此时可以获取到 $el （挂载的dom元素）
- beforeUpdate 数据更新时调用，在虚拟Dom执行之前。
- updated 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
- activated keep-alive 组件激活时调用。<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
- deactivated keep-alive 组件停用时调用。
- beforeDestroy 销毁之前
- destroyed 销毁之后
- errorCaptured 2.5.0+ 新增 当捕获一个来自子孙组件的错误时被调用。

### 2、vue常用指令

#### 2.1 v-text 
更新元素的文本内容

	<span v-text="msg"></span>
	<!-- 和下面的一样 -->
	<span>{{msg}}</span>

#### 2.2 v-html
更新元素的 innerHTML

    <div v-html="html"></div>

#### 2.3 v-show

根据表达式之真假值，切换元素的 display CSS 属性。

     <h1 v-text="title" v-show="true"></h1>
#### 2.4 v-if v-else v-else-if

根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。

当和 v-if 一起使用时，v-for 的优先级比 v-if 更高。

#### 2.5 v-for

基于源数据多次渲染元素或模板块。

    <div v-for="item in items">
	  {{ item.text }}
	</div>

#### 2.6 v-on

绑定事件监听器。缩写：@

    <!-- 方法处理器 -->
	<button v-on:click="doThis"></button>
	
	<!-- 动态事件 (2.6.0+) -->
	<button v-on:[event]="doThis"></button>
	
	<!-- 内联语句 -->
	<button v-on:click="doThat('hello', $event)"></button>
	
	<!-- 缩写 -->
	<button @click="doThis"></button>
	
	<!-- 动态事件缩写 (2.6.0+) -->
	<button @[event]="doThis"></button>
	
	<!-- 停止冒泡 -->
	<button @click.stop="doThis"></button>
	
	<!-- 阻止默认行为 -->
	<button @click.prevent="doThis"></button>
	
	<!-- 阻止默认行为，没有表达式 -->
	<form @submit.prevent></form>
	
	<!--  串联修饰符 -->
	<button @click.stop.prevent="doThis"></button>
	
	<!-- 键修饰符，键别名 -->
	<input @keyup.enter="onEnter">
	
	<!-- 键修饰符，键代码 -->
	<input @keyup.13="onEnter">
	
	<!-- 点击回调只会触发一次 -->
	<button v-on:click.once="doThis"></button>
	
	<!-- 对象语法 (2.4.0+) -->
	<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

#### 2.7 v-bind

动态地绑定一个或多个特性，或一个组件 prop 到表达式。缩写：:

在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。

	<!-- 绑定一个属性 -->
	<img v-bind:src="imageSrc">
    <!-- class 绑定 -->
	<div :class="{ red: isRed }"></div>
	<div :class="[classA, classB]"></div>
	<div :class="[classA, { classB: isB, classC: isC }]">

#### 2.8 v-model
在表单控件或者组件上创建双向绑定。

     <input type="text" v-model="inputValue">

### 3、computed（计算选项）与 Watch （监控数据）

#### 3.1 computed（计算选项）


computed 的属性可以被视为是 data 一样，可以读取和设值，因此在 computed 中可以分成 getter（读取） 和 setter（设值），一般情况下是没有 setter 的，computed 预设只有 getter ，也就是只能读取，不能改变设值。

正常的使用：

    computed:{
	    filterNewsList(){
	      return this.newsList.filter((item) => item.show)
	    }, 
  	},


input 是直接绑 v-model="fullName"，如果我们这里直接修改了fullName的值，那么就会触发setter，同时也会触发getter以及updated函数。其执行顺序是setter -> getter -> updated，如下：

	<div id="demo">
      <p> {{ fullName }} </p>
      <input type="text" v-model="fullName">
      <input type="text" v-model="firstName">
      <input type="text" v-model="lastName">
    </div>

    computed:{
    fullName:{
      // getter
      get(){
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue){
        console.log(newValue)
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
 	},



#### 3.2 Watch （监控数据）
观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。


      watch: {
	    firstName(newName, oldName) {
	      this.fullName = newName + ' ' + this.lastName;
	    },
	    lastName:{
	      handler(newName, oldName) {
	        this.fullName = this.firstName + ' ' + newName;
	      },
	      immediate: true , // 这样使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。
	      deep: true, // 当需要监听一个对象的改变时,此时就需要deep属性对对象进行深度监听。
	    }
	  },



### 4、Methods （方法选项）


methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。



### 5、props 属性设置

props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。


	// 简单语法
	Vue.component('props-demo-simple', {
	  props: ['size', 'myMessage']
	})
	
	// 对象语法，提供验证
	Vue.component('props-demo-advanced', {
	  props: {
	    // 检测类型
	    height: Number,
	    // 检测类型 + 其他验证
	    age: {
	      type: Number, // 数据的类型
	      default: 0,	// 默认值
	      required: true,  // 是否必填
	      validator: function (value) {  // 自定义验证函数
	        return value >= 0
	      }
	    }
	  }
	})




