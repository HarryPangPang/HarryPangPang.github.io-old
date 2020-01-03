---
title: React虚拟dom和diff算法
date: 2019-01-30 15:02:10
tags:
---
## 什么是虚拟dom？
这就要从react如何渲染出页面开始
通常情况下的步骤是这样
1. 获取state数据
2. JSX模板
3. state+JSX模板结合，生成真实dom并显示

这个是在state不发生变化的情况下，（state或者prop发生变化都会调用render函数，重新渲染页面）

state数据变化时，通常理解下应该是下面的步骤
1. 获取state数据
2. JSX模板
3. state数据+JSX模板结合，生成真实dom并显示
4. state数据发生变化
5. 新的state数据+JSX模板结合，生成真实dom并显示

这样可以实现，但是非常消耗性能，因为会渲染两次dom树，所以react就采用一种虚拟dom的方法来进行dom更新。


JSX转成dom流程
> 用JSX语法时，渲染dom的流程：JSX——JS dom描述对象——真实dom

具体步骤：
1. 获取state数据
2. JSX模板
3. 生成虚拟dom（虚拟dom就是一个JS对象，里面包含了对真实dom的描述

```
['div',{id:'a'},['span',{},'hello']]
```
4. 用虚拟dom解构，生成真实dom并显示
```
<div id='a'><span>hello</span></div>
```
5. state数据发生变化（比如hello变成了hi）
6. 生成新的虚拟dom
```
['div',{id:'a'},['span',{},'hi']]
```
7. 比较原始虚拟dom和新的虚拟dom的区别，找出区别是span里的内容
8. 直接操作dom，只改变span里的内容

####  虚拟dom的好处
1. 性能提升，dom比对变成js对象比对
2. 使得跨端应用得以实现（react native）
>在浏览器中可以用虚拟dom生成真实dom显示，在原生应用中也可以用虚拟dom生成对应的方式来显示页面

## 虚拟dom中的diff算法
在上面我们介绍了react中state变化时，dom是如何发生变化的，在第七步中比较原始虚拟dom和新的虚拟dom的区别采用的方法，就是diff算法（diffrence）

虚拟dom在什么时候会发生比对？没错，数据发生变化时，也就是调用setState时

react的虚拟dom其实是同级比较的

![](https://user-gold-cdn.xitu.io/2019/1/30/1689dac3232d3b6d?w=582&h=300&f=png&s=69471)
如上图
他的对比步骤如下
1. 红色原始虚拟dom和新的虚拟dom，没有变化，保持不变，往下继续比对
2. 蓝色原始虚拟dom和新的虚拟dom，没有变化，保持不变，往下继续比对
3. 绿色原始虚拟dom和新的虚拟dom，没有变化，保持不变，往下继续比对，浅蓝色原始虚拟dom和新的虚拟dom，没有变化，保持不变，往下继续比对

> 但凡在上面哪一步骤出现不同，就不再继续比对，而是删除下面的全部节点，采用新的虚拟dom(例如：如果红色框的原始虚拟dom和新的虚拟dom不一致，那么就不在进行比对，采用新的虚拟dom来生成dom)

#### key的作用
react利用key来识别组件，它是一种身份标识标识，来提高虚拟dom的比对速度看下面

![](https://user-gold-cdn.xitu.io/2019/1/30/1689dbb06ec80cda?w=477&h=191&f=png&s=7412)
比如我要在abcde中添加一个f

如果我们没有key值，那我们就需要A比对一遍，B对比一遍，以此类推很好性能，而有了key，就像下面的图一样，我们很快就知道只有f与之前不同，提高了列表渲染的性能
![](https://user-gold-cdn.xitu.io/2019/1/30/1689dbbc688199b4?w=565&h=201&f=png&s=11659)

