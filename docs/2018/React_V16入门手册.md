---
layout: react
title: React_V16入门手册
date: 2019-01-18 17:09:19
tags:
---
原文[https://medium.freecodecamp.org/the-react-handbook-b71c27b0a795]()

开始着手学习React，就看到大佬推荐的这篇文章，因为是英文，就尽自己能力翻译一下有错的烦请指正。原文一共220页A4纸，内容有点多，所以会分期更新，见谅
## 介绍
这本React手册遵循二八原则：用20%的时间学习80%的内容

在本手册里使用了React Hooks，所以你需要使用高于等于 16.7.0-alpha.2 版本的React和ReactDom.

如果你使用create-react-app初始化项目时，在初始化项目之后运行``` npm install react@16.7.0-alpha.2 react-dom@16.7.0-
alpha.2 ```

我希望你能在你阅读完本手册后能达到一个目标：学会React的基础

## React介绍
先来介绍一下React库
####  什么是React
React是一个旨在简化开发可视化界面的Javascript库。它由Facebook开发，并于2013年向世界发布，并支持着很多被广泛使用的App，包括Facebook和Instagram等无数应用程序。
它的主要目标是通过将UI划分为一组组件，使得在任何时间点都可以轻松地构建界面及其状态。
#### 为什么React这么流行？
React席卷了整个前端开发领域，为什么？

#### 比其他框架更低的复杂性
在React出道之前，Ember.js和Angular1.X是主流框架。这两种方法在代码上强加了太多的约定，以至于移植现有的应用程序一点都不方便。React选择了非常容易集成到现有项目中的方式，因为Facebook必须实现这一点，这样才能将其引入现有代码库。另外，这两个框架本身包含的内容太多了，而React只选择实现视图层而不是完整的MVC技术栈。
#### 完美的时间
当谷歌宣布Angular2.X时，宣称Angular1.X并不能平滑升级到Angular2.X，这两个就像不同的框架一样，所以想要从Angular1.X升级到Angular2.X就得重构项目。因为这一点，再加上React承诺说能带来执行速度的提升，所以很多程序员就迫不及待的尝试。
#### Facebook的支持
如果一个项目最终成功，得到Facebook的支持显然也会让它受益。Facebook目前对React非常感兴趣，并看到了它开源的价值，这对所有在自己项目中使用React的开发者来说都是一个巨大的优势。

#### React学起来容易吗？
虽然我说React要比其他框架简单，但是深入学习React的话还是挺有难度的，难的主要原因是要与React搭配使用的技术，比如Redux,GraphQL等等。

React本身有一个非常小的API，你至少需要理解4个概念才能开始:
* Components
* JSX
* State
* Props

上面这些（甚至更多）都会在手册中一一解释

## 如何安装React
#### 如何在你的电脑上安装React?
React是一个库，所以说安装这个词会有点奇怪，倒不如说“设置”更贴切。在你的app或者网页中有很多方式可以设置React

#### 直接在网页里引入
最简单的方法是直接将React JavaScript文件添加到页面中。当React应用与单个页面上的元素进行交互，而不是实际控制整个导航时，这是最好的选择。

下面的例子中，你在body的最后添加了两个script标签

```
<html>
...
    <body>
    ...
        <script
        src="https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0-alpha.2/umd/react.development.js" 
        crossorigin>
        </script>
        <script
        src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0-alpha.2/umd/react-dom.production.min.js"
        crossorigin>
        </script>
    </body>
</html>
```
在这里我们引入两个库（React和React Dom），是为什么呢？因为React是百分之的独立于浏览器的，你也可以在浏览器之外使用React（比如用React Native开发移动应用时，也能用React），因此需要React Dom来操作dom。

在引入Javascript文件后，你需要为react，在html里添加script标签，才能使用JSX语法，下面两种方式都可以
```
//在app.js里写JSX
<script src="app.js"></script>
<!-- or -->

//直接在标签内写JSX
<script>
//my app
</script>

```
如果要使用JSX，你还需要引入Babel

```
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
引入后要在之前写的script标签里添加type="text/babel"才会生效，如下：
```
<script src="app.js" type="text/babel"></script>

```
现在你可以在你的app.js里写JSX的代码了。

```
const Button = () => {
return <button>Click me!</button>
}
ReactDOM.render(<Button />, document.getElementById('root'))

```
演示代码地址：
[https://glitch.com/edit/#!/react-example-inline-jsx?path=index.html:21:19](演示代码)
#### 用官方脚手架create-react-app（推荐）
create-react-app旨在让你能快速构建一个React项目，任何React应用都可以使用create-react-app来生成一个单页页面。

首先你需要安装npm和node （地址：[https://nodejs.org/en/]()）就不多说了
然后执行

```
npx create-react-app todolist
```
npx是npm 5.2之后才有的工具，npx会下载create-react-app，然后解压安装，然后执行```create-react-app todolist```,然后再把create-react-app从系统中删除。这样你就永远能够使用最新的create-react-app，不会在电脑里存放着过时的create-react-app。

执行完之后你能看到下面的界面

![](https://user-gold-cdn.xitu.io/2019/1/18/168602568623fb3a?w=741&h=677&f=png&s=36167)

create-react-app会在文件夹内创建相应的文件结构，文件名就是todolist（自己取的）
package.json也同样生成了，只需要安装指示，进入相应的文件夹，执行npm start就可以启动项目了

如图

![](https://user-gold-cdn.xitu.io/2019/1/18/168602a792310119?w=454&h=260&f=png&s=12615)

打开浏览器进入http://localhost:3000/就能看到最开始的界面了。

除了 npm start , create-react-app这两个命令之外，还有下面一些命令
* npm run build ：要在构建文件夹中构建准备部署到服务器的React应用程序文件
* npm test：运行Jest测试包
* npm eject ：弹出配置文件 
何时用npm eject？create-react-app已经做了很多工作了，但你想要完成更多的工作时，就要弹出配置文件来自己配置。


因为create-react-app 是为了满足大部分人的需求和有限的配置，当你有一些独特的需求时，就需要自己来配置一些内容了。

当你使用npm eject时，你的页面就不会自动更新了，但你可以在Babel和Webpack配置中获得更大的灵活性。

eject时是不可逆的，当你执行后你会获得两个新的文件夹，配置和脚本。你就可以开始自由的编辑他们了。

> 下节预告：下节我们将学习在学习React之前需要了解的JS语法及一些知识

## 使用React需要什么样的JS能力
#### 在深入学习React之前找到你必须要掌握的内容
如果你想学习React时，首先你需要做一些事情。您必须熟悉一些必要的技术，特别是你将在React中反复使用的一些最新JavaScript特性相关的技术。

有些人以为一些功能是React提供的一些特定的功能，实际上它们只是Javascript最新的语法。

立即掌握这些新语法，成为这方面的专家是不可能的，也没必要。但你如果想要深入研究React，那你就需要熟练掌握他们了。

我会把它们列举下来让你快速了解一下。

## 变量
变量是分配给标识符的文字，因此您可以引用它并在后面的程序里使用它。学习如何用JavaScript声明一个。

JavaScript中的变量没有附加任何类型。将特定的文字类型分配给变量后，可以稍后再给这个变量分配类型，而不会出现类型错误或任何问题。

所以这就是为什么有时候Javascript会报'untyped'这样的问题。

一个变量必须在你使用之前就声明。有三种方法可以做到这一点，使用var、let或const，这三种方法在以后与变量的交互方式上有所不同。

#### 用Var
知道ES2015，var一直都是定义变量的唯一方法。
```
var a = 0
```
如果你忘了添加var，你给未声明的变量赋值，结果可能会有所不同，在严格模式下，会得到一个错误，在旧的环境，或者禁用严格模式下，就会使得该变量成为一个全局变量，赋值也自然会赋值给一个全局变量。

如果你没有将变量初始化，那他的值就是undefined

```
var a //typeof a === 'undefined'

```
你可以多次声明变量

```
var a = 1
var a = 2
```
最重要的，你可以一次就声明多个变量

```
var a = 1, b = 2
```
作用域是代码中变量可见的部分（有效）。在函数外部声明一个变量，变量就是全局的，所有的函数都可以获得该变量的值，但在函数内部声明一个变量，变量就是局部的，只有在该函数内才能获得该变量的值，就像函数的一个参数。

在与全局变量同名的函数中定义的任何变量都优先于全局变量，并对其进行跟踪。

重要的是要理解一个块(由一对花括号标识)没有定义一个新的作用域。新作用域只在创建函数时创建，因为var没有块作用域，而是函数作用域。

函数内部,在函数的所有代码中，变量在任何位置都是可见的,即使函数的变量声明在函数最后仍然可以引用。,因为JavaScript执行代码之前将所有变量提升。但为了避免混淆，总是在函数的开头声明变量。

#### 用Let

let是ES2015中引入的一个新特性，它本质上是var的块范围版本。它的作用域仅限于定义它的块、语句或表达式以及所有包含的内部块。

现代JavaScript开发人员可能选择只使用let，而完全放弃使用var。

> 如果let看起来是一个模糊的术语，只要看let color = 'red'就是让颜色是红色，这就更容易理解了

与var相反，在任何函数外部定义let都不会创建全局变量。
#### 用Const

用var或let声明的变量可以稍后在程序中更改并重新分配。一旦const被初始化，它的值就再也不会被更改，也不能被重新分配到不同的值。

```
const a = 'test'
```
我们不能给a常量定义不同的文字了。但是，如果对象提供了改变其内容的方法，我们可以对它进行变异。
const 定义了就不能修改或重新赋值

const和let一样都有块级作用域

现代JavaScript开发人员可能会选择始终对不需要在程序中稍后重新分配的变量使用const。

> 为什么?因为我们应该总是使用最简单的结构来避免将来犯错误。

## 箭头函数

箭头函数是在ES6 / ECMAScript 2015中引入的，自从引入以来，它们彻底改变了JavaScript代码的外观(和工作方式)。

在我看来，这种变化非常受欢迎，以至于你现在很少看到在现代代码库中使用function关键字。

从视觉上看，这是一个简单而受欢迎的改变，它允许你用更短的语法编写函数，从:
```
const myFunction = function() {
//...
}
```
到

```
const myFunction = () => {
//...
}
```
如果函数体只包含一条语句，则可以省略括号，并将所有内容写在一行中:

```
const myFunction = () => doSomething()
```
参数在括号中传递:

```
const myFunction = (param1, param2) => doSomething(param1, param2)
```
如果有一个(且只有一个)参数，可以完全省略括号:

```
const myFunction = param => doSomething(param)
```
由于这种简短的语法，箭头函数让我们能使用小体积的函数。

#### 隐式返回

箭头函数允许你使用隐式返回：返回的值不需要使用return关键字。

当函数体中有一行语句时，它就可以工作:

```
const myFunction = () => 'test'
myFunction() //'test'
```
另一个例子，当返回一个对象时，记得将大括号括起来，以避免它被认为是括起来的函数的括号:

```
const myFunction = () => ({ value: 'test' })
myFunction() //{value: 'test'}
```
#### this在箭头函数里如何工作
this是一个很难理解的概念。因为它会根据上下文和JavaScript的模式(严格模式或非严格模式)产生不同的含义。

澄清这个概念很重要，因为在箭头函数中的this与常规函数中的this非常不同。

当定义一个对象的方法时，在常规函数中的this指向这个对象，案例如下：

```
const car = {
    model: 'Fiesta',
    manufacturer: 'Ford',
    fullName: function() {
        return `${this.manufacturer} ${this.model}`
    }
}
car.fullName() //"Ford Fiesta"
```
执行car.fullName()时会返回"Ford Fiesta"

带有箭头函数的this作用域是从执行上下文中继承的。箭头函数根本不绑定this，因此它的值将在调用堆栈中查找。因此在这个代码car.fullName()中不起作用，并将返回字符串“undefined undefined”:

```
const car = {
    model: 'Fiesta',
    manufacturer: 'Ford',
    fullName: () => {
        return `${this.manufacturer} ${this.model}`
    }
}
car.fullName() //"undefined undefined"
```
参考上面两个例子，可以看出，箭头函数并不适用于对象的方法。

箭头函数也不能用作构造函数，因为实例化对象时将报错TypeError。当不需要动态上下文时，应该在这里使用箭头函数来代替常规函数。

在处理事件时还有一个问题，DOM事件侦听器将this设置为目标元素，如果在事件处理程序中依赖于此元素，则需要一个常规函数:

```
const link = document.querySelector('#link')
link.addEventListener('click', () => {
    // this === window
})
```

```
const link = document.querySelector('#link')
link.addEventListener('click', function() {
    // this === link
})
```
## 使用Rest和Spread处理对象和数组
#### 学习使用JavaScript处理数组和对象的两种现代技术
您可以使用spread操作符展开数组、对象或字符串  ...

看下面的例子：

```
const a = [1, 2, 3]
```
你可以像下面一样创建一个新数组

```
const b = [...a, 4, 5, 6]
```
还可以像下面一样创建一个数组的副本
```
const b = [...a]
```
也能用这种方式拷贝一个对象

```
const newObj = { ...oldObj }
```
使用字符串时，spread操作符创建一个数组，数组内是每个字符:

```
const hey = 'hey'
const arrayized = [...hey] // ['h', 'e', 'y']
```
这个操作符有一些非常有用的应用。最重要的是能够以一种非常简单的方式将数组作为函数参数:

```
const f = (foo, bar) => {}
const a = [1, 2]
f(...a)
```
(在过去，你可以用f.apply(null, a) 来做这个但是这样做不太好，可读性也不好)

rest元素和spread元素在使用数组解构赋值时非常有用:

```
const numbers = [1, 2, 3, 4, 5]
[first, second, ...others] = numbers

const numbers = [1, 2, 3, 4, 5]
const sum = (a, b, c, d, e) => a + b + c + d + e
const sum = sum(...numbers)
```

ES2018引入了rest属性，它们是相同的，但是是用于对象。

Rest属性

```
const { first, second, ...others } = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5
}
first // 1
second // 2
others // { third: 3, fourth: 4, fifth: 5 }
```

扩展属性允许通过合并在扩展操作符之后传递的对象属性来创建一个新对象:

```
const items = { first, second, ...others }
items //{ first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
```
## 数组和对象的解构赋值
#### 学习如何使用解构赋值语法来处理JavaScript中的数组和对象
给定一个对象，使用解构赋值语法，您可以提取一些值，并将它们放入命名变量:

```
const person = {
firstName: 'Tom',
lastName: 'Cruise',
actor: true,
age: 54 //made up
}
const { firstName: name, age } = person //name: Tom, age: 54
```
name和age包含了所需要的值。

这个语法也可以在数组上使用

```
const a = [1, 2, 3, 4, 5]
const [first, second] = a
```
该语句通过从数组a中获取索引0、1、4的项来创建3个新变量（first，second，fifth）

```
const [first, second, , , fifth] = a
```
## 模板字符串
在ES2015(又名ES6)中引入的模板字符串提供了一种声明字符串的新方法，也提供了一些已经非常流行的有趣的新构造方法。

#### 模板字符串介绍

模板文字是ES2015 / ES6的新特性，与ES5及以下版本相比，它允许你以一种新颖的方式处理字符串。
语法乍一看非常简单，只需使用反引号而不是单引号或双引号:

```
const a_string = `something`
```
它们是很独特的的，因为它们提供了许多用引号构建的普通字符串所没有的特性，特别是:
* 它们提供了一个很好的语法来定义多行字符串
* 它们提供了一种简单的方法在字符串中用变量和表达式插值
* 它们允许您使用模板标记创建DSL (DSL意味着特定于领域的语言，例如在React by style组件中使用DSL为组件定义CSS)

#### 让我们详细研究上面三个东西
#### 多行字符串
在es6之前，要创建一个跨越两行的字符串，您必须在一行末尾使用\字符

```
const string =
  'first part \
second part'
```
这允许在两行创建一个字符串，但它只呈现在一行:

```
first part second part
```
要在多行渲染字符串，你需要显式地在每行末尾添加\n，如下所示:

```
const string =
  'first line\n \
second line'

//或者
const string = 'first line\n' + 'second line'
```
用模板字符串就简单多了

一旦模板文字使用回车，你只需按回车键来创建一个没有特殊字符的新行，它就会按原样呈现:

```
const string = `Hey
this

string
is awesome!`

//结果如下
Hey
this

string
is awesome!
```
记住，模板字符串的空格是有意义的，所以这样做:

```
const string = `First
                Second`
                
                
//结果如下
First
                Second
```
解决这个问题的一种简单方法是，在第一行中设置一个空行，并在结束后加上trim()方法，这将消除第一个字符之前的任何空格:

```
const string = `
First
Second`.trim()
```
#### 模板字符串插值
模板字符串提供了一种将变量和表达式插入字符串的简单方法。
你可以用这样的语法```${...}```：

```
const var = 'test'
const string = `something ${var}` //something test
```
在```${...}```里你可以插入任何东西，甚至是表达式

```
const string = `something ${1 + 2 + 3}`
const string2 = `something ${foo() ? 'x' : 'y'}`
```
## Class（类）
2015年，ECMAScript 6 (ES6)标准引入了类。

JavaScript有一种非常少见的实现继承的方法:原型继承。虽然原型继承在我看来很好，但它不同于大多数其他流行编程语言的继承实现，后者是基于类的。

来自Java、Python或其他语言的人很难理解原型继承的复杂性，所以ECMAScript委员会决定在原型继承的基础上添加语法糖，这样就像其他流行实现中的基于类的继承一样。

这一点很重要:底层的JavaScript仍然是相同的，您还是可以用常规的方式访问对象原型。

#### 一个class类的定义
一个类长下面这样

```
class Person {
  constructor(name) {
    this.name = name
  }
  hello() {
    return 'Hello, I am ' + this.name + '.'
  }
}
```
类有一个标识符，我们可以使用它来使用new ClassIdentifier()创建新对象

初始化对象时，调用constructor方法，并传递任意参数。

一个类也有它所需要的所有方法。在这种情况下，hello是一个方法，这个类派生的所有对象都可以调用这个方法:

```
const flavio = new Person('Flavio')
flavio.hello()
```
#### 类的实例

类可以扩展另一个类，使用该类初始化的对象继承父类的所有方法。

如果继承的类的方法与层次结构中较高层的类的名称相同，则最近的方法优先:


```
class Programmer extends Person {
  hello() {
    return super.hello() + ' I am a programmer.'
  }
}
const flavio = new Programmer('Flavio')
flavio.hello()
//输出 Hello, I am Flavio. I am a programmer.
```
类没有显式的类变量声明，但是必须初始化构造函数中的任何变量

在类中，可以用super()来引用父类。

#### 静态方法
通用方法是在实例上定义的，而不是在类上定义的。
静态方法在类上执行:

```
class Person {
  static genericHello() {
    return 'Hello'
  }
}
Person.genericHello() //Hello
```
#### 私有方法
JavaScript没有内置的方法来定义私有或受保护的方法。（可以参考闭包等概念）

有一些变通方法，但我不会在这里描述它们。
#### Getters 和 setters
你可以添加以get或set为前缀的方法来创建getter和setter，这是根据您正在做的事情执行两段不同的代码:访问变量或修改其值。

```
class Person {
  constructor(name) {
    this._name = name
  }
  set name(value) {
    this._name = value
  }
  get name() {
    return this._name
  }
}
```
如果您只有一个getter，则无法设置该属性，并且任何这样做的尝试都将被忽略:

```
class Person {
  constructor(name) {
    this.name = name
  }
  get name() {
    return this.name
  }
}
```
如果你只有一个setter，你可以改变值，但不能从外部访问它:

```
class Person {
  constructor(name) {
    this.name = name
  }
  set name(value) {
    this.name = value
  }
}
```
## 回调
计算机在设计上是异步的。

异步意味着事情可以独立于主程序流发生。

在当前的客户端计算机中，每个程序都运行一个特定的时间段，然后停止执行，让另一个程序继续执行。这个东西以一种无法察觉的速度循环运行，我们认为计算机同时运行许多程序，但这是一种错觉(多处理器机器除外)。

程序在内部使用中断——这是一种向处理器发出的信号，以引起系统的注意。

我不会深入讨论它的内部原理，但是要记住，程序是异步的是很正常的，在它们需要注意的时候停止它们的执行，而计算机可以同时执行其他事情。当程序正在等待来自网络的响应时，它不能在请求完成之前停止处理器。

通常，编程语言是同步的，有些语言提供了一种方法来管理语言或库中的异步性。C, Java, c#， PHP, Go, Ruby, Swift, Python，它们默认都是同步的。其中一些通过使用线程处理异步，生成一个新进程。

JavaScript默认是同步的，并且是单线程的。这意味着代码不能创建新线程并并行运行。

一行接一行的执行代码，例如:


```
const a = 1
const b = 2
const c = a * b
console.log(c)
doSomething()
```
但是JavaScript是在浏览器中诞生的，它最初的主要工作是响应用户操作，比如onClick、onMouseOver、onChange、onSubmit等等。它如何使用同步编程模型实现这一点呢?

答案就在它所处的环境中。浏览器提供了一种方法，它提供了一组api来处理这种功能。

最近，NodeJS引入了一个非阻塞I/O环境，将这个概念扩展到文件访问、网络调用等。

你不知道用户什么时候会点击按钮，所以你要做的是，为点击事件定义一个事件处理器。此事件处理程序接受一个函数，该函数将在事件触发时被调用:


```
document.getElementById('button').addEventListener('click', () => {
  //item clicked
})
```
这就是回调（callback)

回调是一个简单的函数，它作为一个值传递给另一个函数，只在事件发生时执行。我们可以这样做，因为JavaScript具有一流的函数，可以将其分配给变量并传递给其他函数(称为高阶函数)

将所有代码包装在windows对象上的load事件监听器中是很常见的，它只在页面准备好时才运行回调函数:


```
window.addEventListener('load', () => {
  //window loaded
  //do what you want
})
```

回调可以用在任何地方，不只是dom事件上

一个常用的定时器例子：

```
setTimeout(() => {
  // runs after 2 seconds
}, 2000)
```

XHR请求也接受回调，在本例中，它将一个函数分配给一个属性，该属性将在特定事件发生时被调用(在本例中，请求状态发生变化):

```
const xhr = new XMLHttpRequest()
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    xhr.status === 200 ? console.log(xhr.responseText) : console.error('error')
  }
}
xhr.open('GET', 'https://yoursite.com')
xhr.send()
```

#### 处理回调中的错误

如何在回调处理错误?一个非常常见的策略是使用Node所采用的方法:任何回调函数中的第一个参数都是error对象:error-first回调

如果没有错误，则对象为null。如果有错误，它包含错误的一些描述和其他信息。


```
fs.readFile('/file.json', (err, data) => {
  if (err !== null) {
    //handle error
    console.log(err)
    return
  }
  //no errors, process data
  console.log(data)
})
```

#### 回调存在的问题

回调对于简单的情况非常有用

然而，每个回调都会增加一个嵌套级别，当你有很多回调时，代码开始变得非常复杂:


```
window.addEventListener('load', () => {
  document.getElementById('button').addEventListener('click', () => {
    setTimeout(() => {
      items.forEach(item => {
        //your code here
      })
    }, 2000)
  })
})
```

这只是一个简单的4层代码，但我见过更多级别的嵌套，这并不有趣。
怎么解呢?

## 回调的替代品
从ES6开始，JavaScript引入了几个特性，帮助我们处理不涉及回调的异步代码:

* Promises (ES6)
* Async/Await (ES8)
## Promise
Promise是处理异步代码的一种方法，无需在代码中编写太多回调。

尽管它们已经存在多年，但是在ES2015中已经被标准化并引入，现在在ES2017中已经被异步函数所取代。

Async函数使用promise API作为它们的构建块，因此理解它们是非常重要的，即使在较新的代码中您可能会使用Async函数而不是promise。

#### 简而言之，Promise是如何工作的
一旦Promise被调用，它将以pending状态启动。这意味着调用方函数将继续执行，同时等待Promise自己进行处理，并给调用方函数一些反馈。

此时，调用方函数等待它以resolved状态或rejected状态返回承诺，但如您所知，JavaScript是异步的，因此函数在Promise工作时继续执行。

#### 哪个JS API使用Promise?
除了您自己的代码和库代码之外，Promises还被标准的现代Web api(如Fetch或Service Workers)使用。

在现代JavaScript中，您不太可能不使用承诺，所以让我们开始深入研究它们。

#### 创建一个promise

Promise API公开了一个Promise构造函数，您可以使用它进行初始化```new Promise()```：

```
let done = true
const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = 'Here is the thing I built'
    resolve(workDone)
  } else {
    const why = 'Still working on something else'
    reject(why)
  }
})
```
正如您所看到的，promise检查done全局常量，如果它为真，则返回一个resolve的promise，否则返回一个 reject的promise。

使用resolve和reject，我们可以返回一个值，在上面的例子中，我们只返回一个字符串，但它也可以是一个对象。

#### 使用promise
在上一节中，我们介绍了如何创建承诺。
现在让我们看看如何使用承诺。

```
const isItDoneYet = new Promise()
//...
const checkIfItsDone = () => {
  isItDoneYet
    .then(ok => {
      console.log(ok)
    })
    .catch(err => {
      console.error(err)
    })
}
```
运行checkIfItsDone()将执行isItDoneYet() promise，并使用then回调等待它解决，如果出现错误，它将在catch回调中处理它。

#### promise链

一个promise可以返回给另一个promise，创建一个promise链。

Fetch API是链接承诺的一个很好的例子，它是XMLHttpRequest API之上的一层，我们可以使用它来获取资源，并在获取资源时对要执行的promise链进行排队。

Fetch API是一种基于promise的机制，调用Fetch()相当于使用new promise()定义我们自己的promise。

例子：

```
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))
}
const json = response => response.json()
fetch('/todos.json')
  .then(status)
  .then(json)
  .then(data => {
    console.log('Request succeeded with JSON response', data)
  })
  .catch(error => {
    console.log('Request failed', error)
  })
```

在本例中，我们调用fetch()从TODO中获取TODO项的列表。在域根目录中找到json文件，然后创建promise链。

运行 fetch()后返回一个响应，它有很多属性，在这些属性中我们引用:
* status表示HTTP状态代码的数值
* statusText状态消息，如果是OK就是请求成功

response也有一个json()方法，它返回一个promise，该promise将解析处理并转换为JSON的主体内容。

在这些前提下，会发生这样的情况:链中的第一个promise是我们定义的一个函数status()，它检查响应状态，如果它不是一个成功响应(在200到299之间)，则拒绝该promise。

此操作将导致promise链跳过列出的所有链接的promise，并直接跳到底部的catch()语句，记录请求失败的文本和错误消息。

如果成功，则调用我们定义的json()函数。由于上一个promise成功时返回响应对象，所以我们将它作为第二个promise的输入。

在这种情况下，我们返回JSON处理过的数据，所以第三个promise直接接收JSON:


```
.then((data) => {
  console.log('Request succeeded with JSON response', data)
})
```
我们只需将其打印到控制台

#### 处理错误
在上面的例子中，在上一节中，我们有一个catch，它被附加到promise链中。

当promise链中的任何内容失败并引发错误或拒绝promise时，该控件将转到链中最近的catch()语句。


```
new Promise((resolve, reject) => {
  throw new Error('Error')
}).catch(err => {
  console.error(err)
})
// or
new Promise((resolve, reject) => {
  reject('Error')
}).catch(err => {
  console.error(err)
})
```
#### 串联错误
如果在catch()中引发错误，可以附加第二个catch()来处理它，依此类推。

```
new Promise((resolve, reject) => {
  throw new Error('Error')
})
  .catch(err => {
    throw new Error('Error')
  })
  .catch(err => {
    console.error(err)
  })
```
#### 用 Promise.all()来编排promise
如果您需要同步执行不同的promise，Promise.all()可以帮助您定义一个promise列表，并在所有promise都得到解析时执行某些操作。

例子：

```
const f1 = fetch('/something.json')
const f2 = fetch('/something2.json')
Promise.all([f1, f2])
  .then(res => {
    console.log('Array of results', res)
  })
  .catch(err => {
    console.error(err)
  })
```

ES2015析构赋值语法也允许您这样做


```
Promise.all([f1, f2]).then(([res1, res2]) => {
  console.log('Results', res1, res2)
})
```

当然你不局限于使用fetch，任何promise都是好的。
#### 用Promise.race()编排promise

Promise.race()在您传递给它的某个promise解析时立即运行，并且在解析第一个promise的结果时，它只运行附加的回调一次（最先执行成功的promise后就返回该promise，其他的promise就不管了）。

例子：


```
const promiseOne = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one')
})
const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two')
})
Promise.race([promiseOne, promiseTwo]).then(result => {
  console.log(result) // 'two'
})
```
## Async/Await
JavaScript在很短的时间内从回调发展到了promise (ES2015)，而且由于ES2017异步JavaScript使用async/ wait语法更加简单。

异步函数是 promise和generate的组合，基本上，它们是比promise更高层次的抽象。让我重复一遍:async/ wait基于promise。

#### 为什么要Async/Await

这种方式减少了promise的使用，和‘不打破promise链’的限制

当promise在ES2015中引入时，它们是为了解决异步代码的问题，它们确实解决了这个问题，但是在ES2015和ES2017分开的两年时间里，很明显promise并不是最终的解决方案。

引入promise是为了解决著名的回调地狱问题，但它们本身也带来了复杂性，以及语法复杂性。

它们语义化更好，可以向开发人员提供更好的语法，因此当时机成熟时，我们就可以使用async函数。

它们使代码看起来是同步的，但在幕后它是异步的，非阻塞的。

#### async如何工作的

一个async函数返回一个promise，就像这个例子:

```
const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 3000)
  })
}
```
当您想要调用这个函数时，您需要预先等待，调用代码将停止，直到promise被resolve或reject。一个警告:函数必须定义为async的。这里有一个例子:


```
const doSomething = async () => {
  console.log(await doSomethingAsync())
}
```
#### 一个快速的案例
这是一个简单的async/await 的例子，用于异步运行一个函数:

```
const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 3000)
  })
}
const doSomething = async () => {
  console.log(await doSomethingAsync())
}
console.log('Before')
doSomething()
console.log('After')
```
以上代码将打印以下内容到浏览器控制台:

```
Before
After
I did something //after 3s
```
#### 所有的事都是promise
在任何函数前面加上async关键字意味着函数将返回一个promise。

即使它没有显式地返回promise，它也会在内部让它返回一个promise。

这就是为什么这个代码是有效的:

```
const aFunction = async () => {
  return 'test'
}
aFunction().then(alert) // This will alert 'test'
```
上面也和下面一样

```
const aFunction = async () => {
  return Promise.resolve('test')
}
aFunction().then(alert) // This will alert 'test'
```
#### 代码更易读
正如您在上面的示例中看到的，我们的代码看起来非常简单。将其与使用纯promise(带有链接和回调函数)的代码进行比较。

这是一个非常简单的例子，当代码更加复杂时，主要的好处就会显现出来。

例如，下面是如何获得JSON资源，并使用promise对其进行解析:

```
const getFirstUserData = () => {
  return fetch('/users.json') // get users list
    .then(response => response.json()) // parse JSON
    .then(users => users[0]) // pick first user
    .then(user => fetch(`/users/${user.name}`)) // get user data
    .then(userResponse => response.json()) // parse JSON
}
getFirstUserData()
```
用await/async来实现上面的功能时

```
const getFirstUserData = async () => {
  const response = await fetch('/users.json') // get users list
  const users = await response.json() // parse JSON
  const user = users[0] // pick first user
  const userResponse = await fetch(`/users/${user.name}`) // get user data
  const userData = await user.json() // parse JSON
  return userData
}
getFirstUserData()
```
#### 串联多个异步函数
异步函数可以很容易地链接起来，而且语法比普通的承诺更易读

```
const promiseToDoSomething = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 10000)
  })
}
const watchOverSomeoneDoingSomething = async () => {
  const something = await promiseToDoSomething()
  return something + ' and I watched'
}
const watchOverSomeoneWatchingSomeoneDoingSomething = async () => {
  const something = await watchOverSomeoneDoingSomething()
  return something + ' and I watched as well'
}
watchOverSomeoneWatchingSomeoneDoingSomething().then(res => {
  console.log(res)
})

//输出
I did something and I watched and I watched as well
```
#### 更好debug
调试promise很困难，因为调试器不会跳过异步代码。

Async/ wait使这一切变得非常简单，因为对于编译器来说，它就像同步代码一样。

## ES 模块
ES模块是用于处理模块的ECMAScript标准。

nodeJS多年来一直使用CommonJS标准，浏览器从来没有模块系统，因为每一个重大决策，比如模块系统，都必须首先由ECMAScript标准化，然后由浏览器实现。

这个标准化过程用ES6完成，浏览器开始实现这个标准，试图保持一切正常运行，以相同的方式工作，现在在Chrome、Safari、Edge和Firefox(从版本60开始)中都支持ES模块。

模块非常酷，因为它们允许您封装各种功能，并将这些功能作为库公开给其他JavaScript文件。

#### ES模块语法
导入模块的语法是:

```
import package from 'module-name'
```
用CommonJS 时：

```
const package = require('module-name')
```
模块是一个JavaScript文件，它使用export关键字导出一个或多个值(对象、函数或变量)。例如，这个模块导出一个函数，返回一个大写字符串:
> uppercase.js

```
export default str => str.toUpperCase()
```

在本例中，模块定义了一个default export，因此它可以是一个匿名函数。否则，它需要一个名称来将其与其他导出区分开。

现在，通过导入这个文件，任何其他JavaScript模块都可以用导入的uppercase.js提供的功能。
HTML页面可以使用
```<script>``` 标记添加模块，该标记具有特殊的```type="module"```属性:
```
<script type="module" src="index.js"></script>
```
> 注意:此模块导入的行为类似于defer脚本加载。

需要注意的是，使用```type="module"```加载的任何脚本都是在严格模式下加载的。

在这个例子中，uppercase.js 模块定义了一个 default export,所以当我们导入它的时候，我们可以给它分配一个我们喜欢的名字:


```
import toUpperCase from './uppercase.js'
```

我们可以这样使用

```
toUpperCase('test') //'TEST'
```
您还可以使用模块导入的绝对路径，来引用在另一个域中定义的模块:

```
import toUpperCase from 'https://flavio-es-modules-example.glitch.me/uppercase.js'
```
这也是有效的导入语法:

```
import { foo } from '/uppercase.js'
import { foo } from '../uppercase.js'
```
下面是不对的：

```
import { foo } from 'uppercase.js'
import { foo } from 'utils/uppercase.js'
```
它要么是绝对的，要么在名字前有一个./或者/。

## 其他 import/export方法
我们看到上面的例子:

```
export default str => str.toUpperCase()
```
这将创建一个默认导出。在一个文件中，你可以导出多个东西，通过使用以下语法:


```
const a = 1
const b = 2
const c = 3
export { a, b, c }
```
另一个模块可以使用import *来导入所有这些export的内容

```
import * from 'module'
```
你可以只导入其中的几个导出，使用析构赋值:

```
import { a } from 'module'
import { a, b } from 'module'
```
为了方便，可以使用as重命名任何导入

```
import { a, b as two } from 'module'
```
您可以按名称导入默认导出和任何非默认导出，如以下常见的React导入:


```
import React, { Component } from 'react'
```
## CORS(跨域)
使用CORS获取模块。这意味着如果您引用来自其他域的脚本，它们必须具有允许跨站点加载的有效CORS头（比如Access-Control-Allow-Origin: *）
#### 那么不支持模块的浏览器呢?
结合使用```type="module"``` 和```nomodule```

```
<script type="module" src="module.js"></script>
<script nomodule src="fallback.js"></script>
```
ES模块是现代浏览器中引入的最大特性之一。它们是ES6的一部分，但实现它们的道路是漫长的。

我们现在可以使用它们了!但是我们还必须记住，如果有多个模块，那么页面的性能将受到影响，因为这是浏览器在运行时必须执行更多一个步骤。

即使ES模块在浏览器里能用了，Webpack可能仍然是一个巨大的玩家，但是直接在语言中构建这样的特性对于统一模块在客户端和nodeJS的工作方式是非常重要的。

> 下节预告：React的概念
