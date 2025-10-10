# Vue Router

[Vue Router](https://router.vuejs.org/zh/) 是 Vue 官方的客户端路由解决方案。

## 一、路由映射

使用 Vue.js 配合 [Vue Router](https://v3.router.vuejs.org/zh/guide/) 构建单页应用。

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* 添加视觉样式 */
        .router-link-active {
            color: #42b983;
            font-weight: bold;
            text-decoration: underline;
        }
        
        .page {
            padding: 20px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .foo { background-color: #f0fff4; }
        .bar { background-color: #f0f8ff; }
        
        .current-path {
            margin-top: 20px;
            color: #666;
        }

        /* 过渡动画 */
        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.3s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

        /* 基础布局样式 */
        a {
            margin-right: 15px;
            color: #2c3e50;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        #app {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Vue Router Demo</h1>
        
        <nav>
            <router-link to="/foo">Go to Foo</router-link>
            <router-link to="/bar">Go to Bar</router-link>
        </nav>

        <!-- 添加过渡效果 -->
        <transition name="fade" mode="out-in">
            <router-view class="page"></router-view>
        </transition>

        <!-- 显示当前路径 -->
        <p class="current-path">
            当前路径：{{ $route.path }}
        </p>
    </div>

    <script src="https://unpkg.com/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router@3/dist/vue-router.js"></script>

    <script>
        // 定义带有样式的组件
        const Foo = { 
            template: '<div class="foo">🏮 Foo 组件内容</div>' 
        };
        const Bar = { 
            template: '<div class="bar">🎯 Bar 组件内容</div>' 
        };

        // 配置路由
        const routes = [
            { path: '/', redirect: '/foo' },  // 默认重定向
            { path: '/foo', component: Foo },
            { path: '/bar', component: Bar }
        ];

        // 创建 router 实例（使用 history 模式）
        const router = new VueRouter({
            routes,
            mode: 'history'
        });

        // 创建 Vue 实例
        new Vue({
            router
        }).$mount('#app');
    </script>
</body>
</html>
```

## 二、路由对象

[路由对象](https://v3.router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)（Route Object）封装了当前激活路由的状态信息，包含当前 URL 的解析结果及其在路由匹配过程中解析出的路由记录。

- $route.**query**

  `$route.query` 封装了当前 URL 解析出的查询参数对象。例如访问 `/search?q=vue` 时，该对象将包含 `{ q: 'vue' }`，组件可通过此属性直接获取参数集。

- $route.**params**

  `$route.params` 封装了动态路由匹配的路径参数集合，当未匹配到参数时返回空集合。其内容由动态路由匹配过程中解析的路径参数构成，组件可通过此属性直接访问。

  ```javascript
  const router = new VueRouter({
    routes: [
      { path: '/user/:id', component: User }
    ]
  })
  ```

## 三、路由守卫

### 全局前置守卫

`router.beforeEach` 用于注册一个[全局前置守卫](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)。

```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

### 全局后置钩子

可以注册[全局后置钩子](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%90%8E%E7%BD%AE%E9%92%A9%E5%AD%90)，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身。

```javascript
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享守卫

可以在路由配置上直接定义 `beforeEnter` 守卫。

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内守卫

可以在路由组件内直接定义以下路由导航守卫。

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

