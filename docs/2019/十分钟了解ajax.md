---
title: 十分钟了解ajax
date: 2016-09-06 14:09:16
tags:
---
ajax其实是实现异步刷新，他的用处是在不重新载入页面的情况下，与与服务器交换数据并更新网页。
看下面的例子,不着急看懂，后面我会详细解释
```
<span>输入账号</span>
<input id="name" name="name" onkeyup="check()" type="text">  
<span id="checkResult"></span>
```

```
<script>
var xmlhttp;
function check(){
var name =document.getElementById('name').value;
var url="/study/checkName.jsp?name="+name;

xmlhttp =new XMLHttpRequest(); 
  xmlhttp.onreadystatechange=checkResult; //响应函数
  xmlhttp.open("GET",url,true);   //设置访问的页面
  xmlhttp.send(null);  //执行访问

function checkResult(){
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    document.getElementById('checkResult').innerHTML=xmlhttp.responseText;
  
}
</script>
```
第一步：ajax请求的示意图如下，大概了解是怎么走的：
![](https://user-gold-cdn.xitu.io/2018/12/21/167cf29b4557b6c0?w=495&h=345&f=png&s=23735)

第二步：创建XMLHttpRequest（XHR）
XHR是一个javascript对象，他是在幕后通过一个小线程与服务器进行数据交互的，从而实现无刷新效果。
```
<script>
var xmlhttp = new XMLHttpRequest();
documen.write(xmlhttp);
</script>
```
结果：
```
[object XMLHttpRequest]
```

第三步：设置响应函数
XHR对象的作用是和服务器进行交互，所以不仅发送消息给服务器，也接受服务器返回的响应。当从服务器返回响应时我们想做点什么该怎么办？
通过xmlhttp.onreadystatechange=checkResult 就可以指定用checkResult 函数进行处理。

第四步：设置并发出请求
通过open函数设置幕后的小线程，将要访问的url。在本例中就是 /study/checkName.jsp
```
xmlhttp.open('GET',url,true);//规定请求的类型、URL 以及是否异步处理请求。method：请求的类型；GET 或 POST url：文件在服务器上的位置 async：true（异步）或 false（同步）
```
通过send函数进行实际的访问
```
xmlhttp.send(null);//send(string),将请求发送到服务器。
```

第五步：处理响应信息
在checkResult 函数中处理响应
```
function checkResult(){
  if(xmlhttp.readyStats==4 && xmlhttp.status ==200)
   document.getElementById('checkResult').innerHTML=xmlhttp.responseText;
}
```
xmlhttp.readyState 4 表示请求已完成
xmlhttp.status 200 表示响应成功
xmlhttp.responseText; 用于获取服务端传回来的文本
document.getElementById('checkResult').innerHTML 设置span的内容为服务端传递回来的文本



![](https://user-gold-cdn.xitu.io/2018/12/21/167cf29b456d09ab?w=605&h=268&f=jpeg&s=21414)

再返回来看第一段代码，是不是就理解了呢