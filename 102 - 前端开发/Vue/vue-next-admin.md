# vue-next-admin

[vue-next-admin](https://gitee.com/lyt-top/vue-next-admin) 是基于 Vue 3、TypeScript、Vite、Element Plus 等，适配手机、平板、PC 的后台开源免费模板库。

## 一、菜单配置

### 路由缓存

如需开启[路由缓存](https://lyt-top.github.io/vue-next-admin-doc-preview/config/menu/#%E8%B7%AF%E7%94%B1%E7%BC%93%E5%AD%98)，路由配置中的 `name` 需与组件的 `name` 相同且 `唯一`，且 `meta.isKeepAlive` 设为 `true`（[Issues](https://gitee.com/lyt-top/vue-next-admin/issues/I6W73V)）。

路由配置：

```javascript
{
    path: '/suppliers/delixi',
    name: 'suppliersDelixi',
    component: () = >import('/@/views/suppliers/delixi/index.vue'),
    meta: {
        title: '德力西',
        isLink: '',
        isHide: false,
        isKeepAlive: true,
        isAffix: false,
        isIframe: false,
        roles: ['admin'],
        icon: 'iconfont icon-shuxingtu',
    },
}
```

组件配置：

```html
<script setup lang="ts" name="suppliersDelixi"></script>
```

## Reference

- [lyt-top/vue-next-admin - *Gitee*](https://gitee.com/lyt-top/vue-next-admin)
- [lyt-top/vue-next-admin - *GitHub*](https://github.com/lyt-top/vue-next-admin)
- [开发文档 - *GitHub Pages*](https://lyt-top.github.io/vue-next-admin-doc-preview/)
- [pig-mesh/pig-ui](https://github.com/pig-mesh/pig-ui)

