#### vue-property-decorator使用指南

vue-property-decorator是在你构建vue项目时选择class风格时使用的组件

一共有这么多属性：
```
@Prop
@PropSync
@Model
@Watch
@Provide
@Inject
@ProvideReactive
@InjectReactive
@Emit
@Ref
@Component
```

这里只介绍常见的几种使用方法

1. @Component
   @Component其实是vue-class-component插件提供的，但我们使用时，仍然可以采用下面的方法：
   ```
        <template>
        <div class="home">
            <img alt="Vue logo" src="../assets/logo.png" />
            <div>{{title}}</div>
            <HelloWorld msg="Welcome to Your Vue.js App" />
        </div>
        </template>

        <script lang='ts'>
        import { Component, Prop, Vue } from 'vue-property-decorator';
        import HelloWorld from '@/uiFeatures/HelloWorld.vue';

        // 组件注册
        @Component({
        components: {
            HelloWorld,
        },
        })

        export default class Home extends Vue {
        // 这里是为了防止this.$toast报错，暂时还没想到别的处理方法
        $toast:any

        // 这里就是data属性
        title:String = 'title'

        created() {
            this.$toast({
            msg: 'This is Toast',
            visable: true,
            });
        }
        }
        </script>

   ```