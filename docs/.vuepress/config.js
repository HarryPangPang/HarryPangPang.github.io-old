module.exports = {
  title: "Harry's Blog",
  description: "Just playing around",
  themeConfig: {
    activeHeaderLinks: false,
    sidebar: [
        {
            title: "javascript设计模式", // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1, // 可选的, 默认值是 1
            children: [
                '/js设计模式/Javascript设计模式学习1',
                '/js设计模式/Javascript设计模式学习2'
            ]
          },
      {
        title: "过去的博客", // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          "/2018/10个前端面试必会题",
          "/2018/201901面试题分享",
          "/2018/常用的一些git命令行",
          "/2018/发布流程",
          "/2018/函数节流与防抖",
          "/2018/函数柯里化",
          "/2018/函数声明VS函数表达式",
          "/2018/看懂js中this关键字的指向问题",
          "/2018/浏览器缓存的了解",
          "/2018/前端进阶学习路径",
          "/2018/前端知识点190111",
          "/2018/强制缓存（200）和协商缓存（304）",
          "/2018/如何理解es6中的class以及class中的constructor函数",
          "/2018/如何让小孩学习javascript",
          "/2018/十分钟了解ajax",
          "/2018/是时候谈谈JavaScript面向对象了",
          "/2018/手把手教你实现脚手架工具Koa-generator",
          "/2018/HTTP请求的四种方式区别",
          "/2018/javascript-闭包",
          "/2018/Javascript常见的内存泄漏",
          "/2018/javascript跨域",
          "/2018/JavaScript执行环境-执行栈",
          "/2018/MySQL8-0-12-secure-file-priv数据导出问题解决",
          "/2018/React_V16入门手册",
          "/2018/react16配置",
          "/2018/react生命周期",
          "/2018/React虚拟dom和diff算法",
          "/2018/React学习笔记",
          "/2018/Vue使用踩坑记录",
          "/2018/vue中AsyncAwait的使用示例",
          "/2018/webpack下build报错",
          "/2018/zabbix平台搭建"
        ]
      },
      
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
