---
title: Vue使用踩坑记录
date: 2019-01-14 13:52:15
tags:
---
> 主要记录在Vue项目中遇到的一些问题
1. 
```
error: Unexpected console statement (no-console) at src\components\leftSideBar\index.vue:41:9:
```
解决：
```
  /* eslint no-console: 0*/
  console.log('a')
```
2. 使用module.exports时遇到问题
```
menu-conf.js?6ce3:1 Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'

"export 'default' (imported as 'sidebarconf') was not found in '../../conf/menu-conf'
```

解决：
改用
```
let a = {

}

export default a;

```