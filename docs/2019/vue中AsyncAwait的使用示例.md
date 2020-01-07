---
layout: vue中AsyncAwait的使用示例
title: vue中AsyncAwait的使用示例
date: 2018-12-25 13:47:23
tags:
---
> 想要await按照预期来执行，就必须是promise

```
  methods: {
    getAll() {
      return new Promise((resolve, reject) => {
        this.$axios.get(eventApi.getAllUsers).then(response => {
          let a = response.data[0];
          console.log(a);
          resolve(a);
        });
      });
    },
    getlog() {
      return new Promise((resolve, reject) => {
        console.log("111");
        resolve("111");
      });
    },
    getLog2() {
      console.log("222");
    },
    getlog3() {
      setTimeout(() => {
        console.log("333");
      }, 100);
    },
    getlog4() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("444");
          resolve();
        }, 1000);
      });
    },
    async getAllData() {
      await this.getlog();
      await this.getlog4();
      await this.getAll();
      await this.getlog3();
      await this.getLog2();
    }
```
结果如下

![](https://user-gold-cdn.xitu.io/2018/12/21/167cf21020672ee8?w=673&h=172&f=png&s=71967)
