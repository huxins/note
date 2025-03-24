# Vuex

[Vuex](https://vuex.vuejs.org/zh/) 是专为 Vue.js 设计的状态管理框架，采用集中式存储机制实现组件间状态管理，作为应用架构核心组件保障状态变更的可预测性。

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

