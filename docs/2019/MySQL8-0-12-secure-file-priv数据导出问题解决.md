---
title: MySQL8.0.12--secure-file-priv数据导出问题解决
date: 2018-12-20 14:10:03
tags:
---
想在mysql里导入和导出数据，因为navicat在万条以上数据导出时有概率会出现卡死，重启的状况，所有只能采用命令窗口里操作，但是苍天没饶过我

在mysql shell里面导入和导出时提示以下错误

![](https://user-gold-cdn.xitu.io/2018/12/21/167cf3288e3368ef?w=956&h=88&f=png&s=9526)
```
 The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
```
别慌，我们能赢，在百度了诸多方案，在被像皮球一样踢来踢去中，我！终于找到了解决方案。下面开始：

1. 进入mysql，输入
```
show global variables like '%secure%';
```

2. 看到如下
![](https://user-gold-cdn.xitu.io/2018/12/21/167cf34fe44d3924?w=370&h=123&f=png&s=4823)
就是介个Null在不让我们导出数据

3. 找到my.ini（我是windows.linux或者其他可能时my.conf）文件，新增一条
```
secure_file_priv=
```
记住，等于后后面别加东西比较稳
4.执行语句
```
 select * into outfile 'C:\aaa.xlsx' FROM table1 WHERE name is null;
```
5. 下个everything去寻找aaa.xlsx这个文件吧