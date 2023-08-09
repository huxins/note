# Vue

## 〇、奇淫技巧

### 0.1. Vue 版本

查询所使用 Vue 的版本，可以借助根节点的属性。

- 查询 Vue 2，如果 `__vue__` 属性存在，则为 Vue 2。
  
  ```javascript
  console.dir(document.querySelector('#app').__vue__)
  ```

- 查询 Vue 3 的具体版本。

  ```javascript
  console.dir(document.querySelector('#app').__vue_app__.version)
  ```

## 一、基础

### 1.1. Vue 实例

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 Vue 实例开始的。

```javascript
var vm = new Vue({
  // 选项
})
```

#### 1.1.1. Vue 实例选项

##### 1.1.1.1. DOM

- **el**

  提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

  在实例挂载之后，元素可以用 `vm.$el` 访问。

  ```javascript
  const vm = new Vue({
    el: '#app'
  })
  ```

  如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 `vm.$mount()` 手动开启编译。

  ```javascript
  vm.$mount('#app')
  ```

##### 1.1.1.2. 数据

- **data**

  Vue 实例的数据对象。

  实例创建之后，可以通过 `vm.$data` 访问原始数据对象。Vue 实例也代理了 data 对象上所有的 property，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

  ```javascript
  const vm = new Vue({
    el: '#app',
    data: {
      name: '新世界'
    }
  })
  ```

- **methods**

  可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 Vue 实例。

  ```javascript
  const vm = new Vue({
    el: '#app',
    methods: {
      showInfo() {
        alert('你好呀')
      }
    }
  })
  ```

- **computed**

  计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 `this` 上下文自动地绑定为 Vue 实例。

  ```javascript
  const vm = new Vue({
    el: '#app',
    computed: {
      email: {
        get() {
          return `${this.address}地区`;
        }
      }
    }
  })
  ```

  只读取时，可简写为：
  
  ```javascript
  const vm = new Vue({
    el: '#app',
    computed: {
      email() {
        return `${this.address}地区`;
      }
    }
  })
  ```

- **watch**

  Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

  ```javascript
  const vm = new Vue({
    el: '#app',
    data: {
      address: '上海',
      dynamicUrl: "https://www.baidu.com/"
    },
    watch: {
      address: {
        handler(val, oldVal) {
          console.log(`address 已修改，原值为 ${oldVal}，新值为 ${val}`);
        }
      }
    }
  })
  ```

##### 1.1.1.3. 生命周期

- **mounted**

  Vue 完成模板的解析并把真实的初始 DOM 元素放入页面后，调用 `mounted`。

##### 1.1.1.4. 资源

- **filters**

  过滤器可以用在两个地方：双花括号插值和 `v-bind` 表达式。过滤器应该被添加在 JavaScript 表达式的尾部，由 `|` 符号指示。

  ```html
  {{ message | capitalize }}
  
  <div v-bind:id="rawId | formatId"></div>
  ```

  可以在一个组件的选项中定义本地过滤器。

  ```javascript
  filters: {
    capitalize: function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
  ```

- **components**

  局部注册 Vue 实例的可用组件。

  ```javascript
  const school = Vue.extend({
    template: `<h2>{{schoolName}}</h2>`,
    data() {
      return {
        schoolName: '上海中学'
      }
    },
  })
  
  new Vue({
    el: '#app',
    components: {
      school
    }
  })
  ```

#### 1.1.2. Vue 实例方法

##### 1.1.2.1. 数据

- vm.**$watch**()

  观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。

  ```
  vm.$watch( expOrFn, callback, [options] )
  ```

  - 监听属性变化。

    ```javascript
    vm.$watch('address', function (val, oldVal) {
      console.log(`address 已修改，原值为 ${oldVal}，新值为 ${val}`);
    })
    ```

#### 1.1.3. Vue 静态方法

- Vue.**filter**()

  注册或获取全局过滤器。

  ```
  Vue.filter( id, [definition] )
  ```

  - 在创建 Vue 实例之前定义全局过滤器。

    ```javascript
    Vue.filter('capitalize', function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    })
    ```

- Vue.**extend**()

  创建一个组件。参数是一个包含组件选项的对象。

  ```javascript
  const school = Vue.extend({
    template: `<h2>{{schoolName}}</h2>`,
    data() {
      return {
        schoolName: '上海中学'
      }
    },
  })
  ```

- Vue.**component**()

  注册或获取全局组件。注册还会自动使用给定的 `id` 设置组件的名称。

  ```javascript
  const school = Vue.extend({
    template: `<h2>{{schoolName}}</h2>`,
    data() {
      return {
        schoolName: '上海中学'
      }
    },
  })
  
  Vue.component('school', school)
  ```

### 1.2. 插值

#### 1.2.1. 文本

数据绑定最常见的形式就是使用双大括号的文本插值。

```html
<span>Message: {{ msg }}</span>
```

#### 1.2.2. JavaScript 表达式

对于所有的数据绑定，Vue 都提供了完全的 JavaScript 表达式支持。

```javascript
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}
```

#### 1.2.3. 元素属性

Mustache 语法不能作用在 HTML 属性上，应该使用 `v-bind` 指令。

```html
<a v-bind:href="dynamicUrl">传送门</a>
```

`v-bind` 指令可简写为 `:`。

```html
<a :href="dynamicUrl">传送门</a>
```

### 1.3. 指令

#### 1.3.1. 表单绑定

- **v-model**

  可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。

  `v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件。

  - text 和 textarea 元素使用 `value` property 和 `input` 事件；
  - checkbox 和 radio 元素使用 `checked` property 和 `change` 事件；
  - select 元素使用 `value` property 和 `change` 事件。

  ```html
  <input v-model="message" placeholder="edit me">
  <p>Message is: {{ message }}</p>
  ```

#### 1.3.2. 事件处理

- **v-on**

  可以用 `v-on` 指令监听 DOM 事件，还可以接收一个需要调用的方法名称。
  
  ```html
  <div id="app">
    <h2>欢迎来到 {{address}}</h2>
    <button v-on:click="showInfo">点我提示信息</button>
  </div>
  ```
  
  ```javascript
  const vm = new Vue({
    el: '#app',
    data,
    methods: {
      showInfo() {
        alert('你好呀')
      }
    }
  })
  ```
  
  `v-on` 可以缩写为 `@`。
  
  ```html
  <div id="app">
    <h2>欢迎来到 {{address}}</h2>
    <button @click="showInfo">点我提示信息</button>
  </div>
  ```

##### 1.3.2.1. 内联处理器

除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法。

```html
<div id="app">
  <h2>欢迎来到 {{address}}</h2>
  <button @click="showInfo('hi')">点我提示信息</button>
</div>
```

```javascript
const vm = new Vue({
  el: '#app',
  data,
  methods: {
    showInfo(message) {
      alert(message)
    }
  }
})
```

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法。

```html
<div id="app">
  <h2>欢迎来到 {{address}}</h2>
  <button @click="showInfo($event, 'hi')">点我提示信息</button>
</div>
```

```javascript
const vm = new Vue({
  el: '#app',
  data,
  methods: {
    showInfo(event, message) {
      console.log(event, message)
    }
  }
})
```

##### 1.3.2.2. 事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。为了解决这个问题，Vue 为 `v-on` 提供了事件修饰符。

- `.prevent`

  阻止事件默认行为。

  ```html
  <form v-on:submit.prevent="onSubmit"></form>
  ```

##### 1.3.2.3. 按键修饰符

在监听键盘事件时，经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符。

```html
<input @keyup.enter="submit">
```

#### 1.3.3. 条件渲染

- **v-show**

  `v-show` 指令用于条件性地展示元素。

  ```html
  <h2 v-show="true">欢迎来到 {{address}}</h2>
  ```

- **v-if**

  `v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 True 值的时候被渲染。

  ```html
  <h2 v-if="flase">欢迎来到 {{address}}</h2>
  ```

#### 1.3.4. 列表渲染

- **v-for**

  可以用 `v-for` 指令基于一个数组来渲染一个列表。

  ```html
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.message }}
    </li>
  </ul>
  ```

##### 1.3.4.1. 数组更新检测

Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法如下。

- `push()`

### 1.4. 组件

`VueComponent` 构造函数和 `Vue` 构造函数之间存在以下关系。

```javascript
VueComponent.__proto__ === Function.prototype;
VueComponent.prototype.__proto__ === Vue.prototype;
```

#### 1.4.1. 组件注册

##### 1.4.1.1. 全局注册

全局注册可以通过 `Vue.component()` 的方式进行。

```javascript
const school = Vue.extend({
  template: `<h2>{{schoolName}}</h2>`,
  data() {
    return {
      schoolName: '上海中学'
    }
  },
})

Vue.component('school', school)
```

##### 1.4.1.2. 局部注册

局部注册可通过在实例中的 `components` 选项进行配置。

```javascript
const school = Vue.extend({
  template: `<h2>{{schoolName}}</h2>`,
  data() {
    return {
      schoolName: '上海中学'
    }
  },
})

new Vue({
  el: '#app',
  components: {
    school
  }
})
```

#### 1.4.2. 单文件组件

简单的单文件组件如下所示：

```vue
// School.vue
<template>
  <p>{{ schoolName }}</p>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      schoolName: "上海中学",
    };
  },
};
</script>

<style>
</style>
```

由 App 组件统一管理子组件：

```vue
// App.vue
<template>
  <div id="app">
    <School />
  </div>
</template>

<script>
import School from "./components/School";

export default {
  name: "App",
  components: {
    School,
  }
}
</script>

<style>
</style>
```

最后统一挂载：

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

