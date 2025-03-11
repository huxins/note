# Vuex

[Vuex](https://vuex.vuejs.org/zh/) 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。

## 一、安装

安装 Vuex 之后，创建一个 `store`，供后续调用。

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

