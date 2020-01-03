---
title: 函数柯里化（curry)
date: 2019-01-10 10:34:05
tags:
---
> 函数柯里化的概念很简单，其实就是只提前接受一部分参数，但不执行结果，而是返回一个可以接受另一部分参数的函数。

你可以像下面一样，一次性的调用curry函数，返回每次只传一次参数，传两次来获得想要的结果

```
function MathSumA(x){
    return function MathSumB(y){
        return x+y
    }
}
// 先传如一个x=2
let x = MathSumA(2);

// 再传入一个y=10
let result = x(10); //result = x+y =2+10 =12

```
