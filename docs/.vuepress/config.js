module.exports = {
  title: "Harry's Blog",
  description: "Just playing around",
  themeConfig: {
    activeHeaderLinks: false,
    sidebar: [
      {
        title: "2020年博客", // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          "/2020/docker部署jenkins",
          "/2020/gitpages自动部署"
        ]
      },
      {
        title: "js忍者秘籍读书笔记",
        collapsable: true,
        sidebarDepth: 0, 
        children: [
          "/js忍者秘籍读书笔记/1",
        ]
      },
      {
        title: "python基础学习",
        collapsable: true,
        sidebarDepth: 1, 
        children: [
          "/python基础学习/1",
          "/python基础学习/2",
        ]
      },
      {
        title: "javascript设计模式", // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          "/js设计模式/Javascript设计模式学习1",
          "/js设计模式/Javascript设计模式学习2"
        ]
      },
      {
        title: "过去的博客", // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          "/2019/10个前端面试必会题",
          "/2019/201901面试题分享",
          "/2019/常用的一些git命令行",
          "/2019/发布流程",
          "/2019/函数节流与防抖",
          "/2019/函数柯里化",
          "/2019/函数声明VS函数表达式",
          "/2019/看懂js中this关键字的指向问题",
          "/2019/浏览器缓存的了解",
          "/2019/前端进阶学习路径",
          "/2019/前端知识点190111",
          "/2019/强制缓存（200）和协商缓存（304）",
          "/2019/如何理解es6中的class以及class中的constructor函数",
          "/2019/如何让小孩学习javascript",
          "/2019/十分钟了解ajax",
          "/2019/是时候谈谈JavaScript面向对象了",
          "/2019/手把手教你实现脚手架工具Koa-generator",
          "/2019/HTTP请求的四种方式区别",
          "/2019/javascript-闭包",
          "/2019/Javascript常见的内存泄漏",
          "/2019/javascript跨域",
          "/2019/JavaScript执行环境-执行栈",
          "/2019/MySQL8-0-12-secure-file-priv数据导出问题解决",
          "/2019/React_V16入门手册",
          "/2019/react16配置",
          "/2019/react生命周期",
          "/2019/React虚拟dom和diff算法",
          "/2019/React学习笔记",
          "/2019/Vue使用踩坑记录",
          "/2019/vue中AsyncAwait的使用示例",
          "/2019/webpack下build报错",
          "/2019/zabbix平台搭建"
        ]
      },
      {
        title: "others", // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          "/others/qrcode"
        ]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@alias": "path/to/some/dir"
      }
    }
  }
};
