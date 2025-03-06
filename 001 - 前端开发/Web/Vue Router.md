# Vue Router

[Vue Router](https://router.vuejs.org/zh/) 是 Vue 官方的客户端路由解决方案。

## 一、VueRouter

### 构建选项

将组件映射到路由：

```javascript
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})
```

## 二、路由对象

一个路由对象表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录。

### 路由组件传参

- $route.**query**

  一个对象，URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给组件，在组件内通过 `$route.query` 可以获取。

- $route.**params**

  一个对象，如果没有路由参数，就是一个空对象。

  需要配合动态路由获取参数，在组件内通过 `$route.params` 可以获取。

  ```javascript
  const router = new VueRouter({
    routes: [
      { path: '/user/:id', component: User }
    ]
  })
  ```

## 三、路由守卫

### 全局前置守卫

可以使用 `router.beforeEach` 注册一个全局前置守卫。

```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

### 全局后置钩子

可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身。

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

### 组件内的守卫

可以在路由组件内直接定义以下路由导航守卫。

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

