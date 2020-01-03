---
title: 看懂js中this关键字的指向问题
date: 2018-04-06 14:07:13
tags:
---
this总是指向函数的直接调用者（而非间接调用者）；如果有new关键字，this指向new出来的那个对象；在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window；
通俗的讲，因为ｔｈｉｓ只存在于函数中，而函数是需要被调用的，然后ｔｈｉｓ是谁（对象）调用函数就指向谁（对象）。下面我们看看不同情况下的ｔｈｉｓ指向情况。

１）单纯的函数调用
```
function test(){ 
    this.x = 1; 
    alert(this.x)／／结果为：１
 };
test();／／这里window调用了test函数， window.x即this.x
alert(this.x) ;／／结果为：１
alert('x' in window);／／结果为：true
``

２）函数作为对象的方法调用
```
var test = {
    a:1,
    b:function(){
        alert(this.a);
    }
};
test.b();／／结果为：1　test调用了函数b，this指向test
alert(this.a);//结果为：undefined　 window调用了alert函数，this指向 window而window里并没有a这个属性。
```
注：在非严格模式下，this没有正确指向，则指向window对象，在严格模式下，没有正确指向，为 undefined。默认就是非严格模式。

3)作为构造函数调用
```
    function test(){
        this.a = 1;
    };
    var test2 = new test();
    alert(test2.a);//结果为：1
```
这里this指向的是构造的新对象，也就是 test2，所以test2也有了属性a并等于1。

4)apply()、call() 调用

```
    var a = 0,
        test1 = {
            a:1,
            fun:function(){
                alert(this.a);
            }
        },
        test2 = {
            a:2
        };
    test1.fun();//结果为：1
    test1.fun.call(test2);//结果为：2
    test1.fun.call();//结果为：0
```

这里的三次调用，this分别指向test1、test2和window。第一种前面已经提到了，第二种是通过call或者apply方法使fun中原本指向test1的this变成了指向test2（即call、apply方法的第一个参数）。第三种情况属于第一个参数为空（好像为undefined时也会指向window）时，会默认指向window，..call() =》 ..call(window)。

