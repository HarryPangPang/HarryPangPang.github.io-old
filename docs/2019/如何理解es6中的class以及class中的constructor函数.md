---
title: 如何理解es6中的class以及class中的constructor函数
date: 2018-06-17 14:06:08
tags:
---
首先，“语法糖”的意思是现有技术本可以实现，但是采用某种写法会更加简洁优雅。最常见的就是声明对象采用的就是语法糖 var a={b:111}。
ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
```
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
```
等同于
```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
在constructor中必须调用 super方法，子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。super代表了父类构造函数。对于你的实例相当于执行Component(props)。但是注意，此处this指向 子类。更严谨的是相当于
```
Component.prototype.constructor.call(this,props)。
```
