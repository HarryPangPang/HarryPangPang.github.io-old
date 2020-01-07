---
layout: postman
title: HTTP请求的四种方式区别
date: 2018-12-07 13:46:28
tags:
---
1：form-data
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf2609a81690a?w=886&h=147&f=png&s=2001)
此时对应的
```
Content-Type:multipart/form-data;
```
```
<form action="${pageContext.request.contextPath}/imageUpload_saveOrUpdate.action" method="post" enctype="multipart/form-data"> 
<div> 
<label>请选择上传图片地址:</label> 
<input type="file" name="image"/> 
</div> 
</div> 
<div> 
<input type="submit" value="上传"/> 
</div> 
</form> 
```
它会将表单的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。当上传的字段是文件时，会有content-type来说明文件类型；content-disposition，用来说明字段的一些信息；由于有boundary隔离，所以multipart/form-data既可以上传文件，也可以上传键值对，它采用了键值对的方式，所以可以上传多个文件。

2：x-www-form-urlencoded
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf2609a9026c8?w=1033&h=90&f=png&s=1795)
就是**application/x-www-from-urlencoded**,会将表单内的数据转换为键值对，比如,name=Java&age = 23
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf2609adcdcaf?w=658&h=296&f=png&s=25955)
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf2609b0359e9?w=507&h=234&f=png&s=17279)

3：raw
可以上传任意格式的文本，可以上传text、json、xml、html等
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf2609af8f3cf?w=754&h=419&f=png&s=30029)

4：binary
相当于Content-Type:application/octet-stream,从字面意思得知，只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件。





multipart/form-data与x-www-form-urlencoded区别

               multipart/form-data：既可以上传文件等二进制数据，也可以上传表单键值对，只是最后会转化为一条信息；

               x-www-form-urlencoded：只能上传键值对，并且键值对都是间隔分开的。
参考[]