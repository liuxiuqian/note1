## 目录

1. const,var,let
2. 变量的解构赋值
3. 字符串的扩展
4. 数值的扩展
5. 函数的扩展
6. 数组的扩展
7. 对象的扩展


## ECMAScript 6 简介
ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## 1、const,var,let

#### 1）.const定义的变量不可以修改，而且必须初始化。

    1 const b = 2;//正确
    2 // const b;//错误，必须初始化 
    3 console.log('函数外const定义b：' + b);//有输出值
    4 // b = 5;
    5 // console.log('函数外修改const定义b：' + b);//无法输出 

#### 2）.var定义的变量可以修改，如果不初始化会输出undefined，不会报错。

    1 var a = 1;
    2 // var a;//不会报错
    3 console.log('函数外var定义a：' + a);//可以输出a=1
    4 function change(){
    5 a = 4;
    6 console.log('函数内var定义a：' + a);//可以输出a=4
    7 } 
    8 change();
    9 console.log('函数调用后var定义a为函数内部修改值：' + a);//可以输出a=4

#### 3）.let是块级作用域，函数内部使用let定义后，对函数外部无影响。

    1 let c = 3;
    2 console.log('函数外let定义c：' + c);//输出c=3
    3 function change(){
    4 let c = 6;
    5 console.log('函数内let定义c：' + c);//输出c=6
    6 } 
    7 change();
    8 console.log('函数调用后let定义c不受函数内部定义影响：' + c);//输出c=3


## 2、变量的解构赋值

- 数组的解构赋值
- 对象的解构赋值
- 字符串的解构赋值
- 函数参数的解构赋值

#### 1）数组的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

以前，为变量赋值，只能直接指定值。

    let a = 1;
	let b = 2;
	let c = 3;

ES6 允许写成下面这样。

	let [a, b, c] = [1, 2, 3];
上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。

	let [foo, [[bar], baz]] = [1, [[2], 3]];
	foo // 1
	bar // 2
	baz // 3
	
	let [ , , third] = ["foo", "bar", "baz"];
	third // "baz"
	
	let [x, , y] = [1, 2, 3];
	x // 1
	y // 3
	
	let [head, ...tail] = [1, 2, 3, 4];
	head // 1
	tail // [2, 3, 4]
	
	let [x, y, ...z] = ['a'];
	x // "a"
	y // undefined
	z // []

如果解构不成功，变量的值就等于undefined。

#### 2）对象的解构赋值

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

	let { foo, bar } = { foo: "aaa", bar: "bbb" };
	console.log(foo); // "aaa"
	console.log(bar); // "bbb"

#### 3）字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

	const [a, b, c, d, e] = 'hello';
	console.log(a); // "h"
	console.log(b); // "e"
	console.log(c); // "l"
	console.log(d); // "l"
	console.log(e); // "o"

#### 4）函数参数的解构赋值

与对象数组解构一样，在传参数的过程中解构。

	function add({a, b}){
	  return a + b;
	}
	console.log(add({a:1, b: 2})); // 3

## 3、字符串的扩展


1. includes(), startsWith(), endsWith()
2. repeat() 
3. padStart()，padEnd()
4. 模板字符串


#### 1）字符串includes(), startsWith(), endsWith()方法

传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。



		let s = 'Hello world!';

		console.log(s.startsWith('l')) // false
		console.log(s.endsWith('!')) // true
		console.log(s.includes('o')) // true

这三个方法都支持第二个参数，表示开始搜索的位置。

#### 2）repeat()方法

repeat方法返回一个新字符串，表示将原字符串重复n次。

	'x'.repeat(3) // "xxx"
	
	console.log('hello'.repeat(2)) // "hellohello"
	console.log('na'.repeat(0)) // ""

#### 3）padStart()，padEnd()

ES6 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。

padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。

	'x'.padStart(5, 'ab') // 'ababx'
	'x'.padStart(4, 'ab') // 'abax'
	
	'x'.padEnd(5, 'ab') // 'xabab'
	'x'.padEnd(4, 'ab') // 'xaba'
	
	//超出最大长度
	'xxx'.padStart(2, 'ab') // 'xxx'
	'xxx'.padEnd(2, 'ab') // 'xxx'

注：如果省略第二个参数，默认使用空格补全长度。

#### 4）模板字符串
模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

	// 普通字符串
	`In JavaScript '\n' is a line-feed.`
	
	// 多行字符串
	`In JavaScript this is
	 not legal.`
	
	console.log(`string text line 1
	string text line 2`);
	
	// 字符串中嵌入变量
	let name = "Bob", time = "today";
	`Hello ${name}, how are you ${time}?`
模板字符串中嵌入变量，需要将变量名写在${}之中。

## 4、数值的扩展

1. Number.isFinite(), Number.isNaN()
2. Number.parseInt(), Number.parseFloat() 
3. Number.isInteger()

#### 1）Number.isFinite(), Number.isNaN()方法

Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
	
	Number.isFinite(15); // true
	Number.isFinite(0.8); // true
	Number.isFinite(NaN); // false
	Number.isFinite(Infinity); // false
	Number.isFinite(-Infinity); // false
	Number.isFinite('foo'); // false
	Number.isFinite('15'); // false
	Number.isFinite(true); // false
注意，如果参数类型不是数值，Number.isFinite一律返回false。

Number.isNaN()用来检查一个值是否为NaN。

	Number.isNaN(NaN) // true
	Number.isNaN(15) // false
	Number.isNaN('15') // false
	Number.isNaN(true) // false
	Number.isNaN(9/NaN) // true
	Number.isNaN('true' / 0) // true
	Number.isNaN('true' / 'true') // true
如果参数类型不是NaN，Number.isNaN一律返回false。

#### 2）Number.parseInt(), Number.parseFloat()方法
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

#### 3）Number.isInteger()方法
用来判断一个数值是否为整数。

	Number.isInteger(25) // true
	Number.isInteger(25.1) // false
JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

	Number.isInteger(25) // true
	Number.isInteger(25.0) // true
如果参数不是数值，Number.isInteger返回false。

#### 以下更新于2019/3/10 9:54:12 
## 5、函数的扩展  

1. 函数的参数指定默认值
2. rest 参数
3. name 属性
4. 箭头函数
5. 箭头函数

#### 1）函数的参数指定默认值

ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。