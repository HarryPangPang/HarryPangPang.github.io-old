class Vue{
    constructor(options){
        this.$options=options

        // 处理data选项
        this.$data = options.$data
        //data响应式
        this.observe(this.$data)
    }
}
