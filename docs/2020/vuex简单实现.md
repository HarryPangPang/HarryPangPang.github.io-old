```language=javascript
let Vue;
class Store {
  constructor(options) {
    //实现data的双向绑定
    this.state = new Vue({
      data: options.state
    });
    this.mutations = options.mutations;
    this.actions = options.actions;
    options.getters && this.handleGetters(options.getters);
  }
  commit = (type, arg) => {
    this.mutations[type](this.state, arg);
  };

  dispatch(type, arg) {
    this.actions[type](
      {
        state: this.state,
        commit: this.commit
      },
      arg
    );
  }
  handleGetters(getters) {
    this.getters = {}; // 定义this.getters
    // 遍历getters选项，为this.getters定义property // 属性名就是选项中的key，只需定义get函数保证其只读性
    Object.keys(getters).forEach(key => {
      // 这样这些属性都是只读的
      Object.defineProperty(this.getters, key, {
        get: () => {
          // 注意依然是箭头函数
          return getters[key](this.state);
        }
      });
    });
  }
}
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    // 生命周期
    beforeCreate() {
      // 获取new Vue里的store
      Vue.prototype.$store = this.$options.store;
    }
  });
}
export default {
  Store,
  install
};

```