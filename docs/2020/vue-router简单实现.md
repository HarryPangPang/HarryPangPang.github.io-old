```
import Home from "@/views/Home.vue";
import Vue from "vue";

class VueRouter {
  [x: string]: any;
  constructor(options: object) {
    this.$options = options;
    this.routeMap = {};
    //挂在vue data上识别当前路由
    this.app = new Vue({
      data: {
        current: "/"
      }
    });
  }
  static install: (Vue: any) => void;
  init() {
    this.bindEvent(); //监听路由变化
    this.createRouteMap(); //构建路由键值对
    this.initComponent(); //初始化router 的组件
  }
  bindEvent() {
    window.addEventListener("load", this.onHashChange.bind(this));
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }
  //  hash变化时
  onHashChange() {
    // 当前全局状态 current 就是目前hash对象的名称
    this.app.current = window.location.hash.slice(1) || "/";
  }
  createRouteMap() {
  // 构建键值对以便找到模版
    this.$options.routes.forEach((ele: object) => {
      this.routeMap[ele.path] = ele.component;
    });
  }
  initComponent() {
    // router-link,router-view
    // <router-link to="">fff</router-link>
    Vue.component("router-link", {
      props: { to: String },
      render(h) {
      	//	h就是createElement 来创建VNode
        // h(tag, data, children)
        return h("a", { attrs: { href: "#" + this.to } }, [
          this.$slots.default
        ]);
      }
    });
    // <router-view></router-view>
    Vue.component("router-view", {
      render: h => {
        const comp = this.routeMap[this.app.current];
        return h(comp);
      }
    });
  }
}
VueRouter.install = function(Vue) {
  // 混入所有组件
  Vue.mixin({
    // 钩子函数
    beforeCreate() {
      // 仅在根组件执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  });
};

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});
```

