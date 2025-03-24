# Vue

[Vue.js](https://cn.vuejs.org/) 是一个用于创建用户界面的开源 MVVM 前端 JavaScript 框架，也是一个创建单页应用的 Web 应用框架。

查询所使用 [Vue](https://cn.vuejs.org/) 版本，可以借助根节点的属性。

- 查询 [Vue 2](https://v2.cn.vuejs.org/)，如果 `__vue__` 属性存在，则为 Vue 2
  
  ```javascript
  console.dir(document.querySelector('#app').__vue__)
  ```

- 查询 [Vue 3](https://cn.vuejs.org/) 的具体版本

  ```javascript
  console.dir(document.querySelector('#app').__vue_app__.version)
  ```

## 一、Vue 实例

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 Vue 实例开始的。

```javascript
var vm = new Vue({
  // 选项
})
```

### Vue 实例选项

#### DOM

- **el**

  提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。

  可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

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

#### 数据

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

- **props**

  `props` 可以是数组或对象，用于接收来自父组件的数据。

  数组语法：

  ```javascript
  export default {
    name: "SchoolDetails",
    props: ['size']
  };
  ```

  对象语法：

  ```javascript
  export default {
    name: "SchoolDetails",
    props: {
      height: Number,
      size: {
        type: Number,
        default: 0,
        required: true,
      }
    }
  };
  ```

  父组件传递参数：

  ```html
  <template>
    <div id="app">
      <School :height="123"/>
    </div>
  </template>
  ```

#### 生命周期

- **mounted**

  Vue 完成模板的解析并把真实的初始 DOM 元素放入页面后，调用 `mounted`。

#### 资源

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

#### 组合

- **mixins**

  `mixins` 选项接收一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中。

  ```javascript
  var mixin = {
    created: function () { console.log(1) }
  }
  
  var vm = new Vue({
    created: function () { console.log(2) },
    mixins: [mixin]
  })
  ```

### Vue 实例方法

#### 数据

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

#### 生命周期

- vm.**$nextTick**()

  将回调延迟到下次 DOM 更新循环之后执行。

  ```javascript
  new Vue({
    methods: {
      example: function () {
        this.message = 'changed'
        this.$nextTick(function () {
          this.doSomethingElse()
        })
      }
    }
  })
  ```

### Vue 静态方法

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

### Vue 特殊属性

- **ref**

  `ref` 被用来给元素或子组件注册引用信息。

  ```html
  <p ref="p">hello</p>
  <child-component ref="child"></child-component>
  ```

  调用方式：

  ```javascript
  doSomething() {
    console.log(this.$refs.p);
  }
  ```

## 二、插值

### 文本

数据绑定最常见的形式就是使用双大括号的文本插值。

```html
<span>Message: {{ msg }}</span>
```

### JavaScript 表达式

对于所有的数据绑定，Vue 都提供了完全的 JavaScript 表达式支持。

```javascript
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}
```

### 元素属性

Mustache 语法不能作用在 HTML 属性上，应该使用 `v-bind` 指令。

```html
<a v-bind:href="dynamicUrl">传送门</a>
```

`v-bind` 指令可简写为 `:`。

```html
<a :href="dynamicUrl">传送门</a>
```

## 三、指令

### 表单绑定

- **v-model**

  可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。

  `v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件。

  - `text` 和 `textarea` 元素使用 `value` property 和 `input` 事件；
  - `checkbox` 和 `radio` 元素使用 `checked` property 和 `change` 事件；
  - `select` 元素使用 `value` property 和 `change` 事件。

  ```html
  <input v-model="message" placeholder="edit me">
  <p>Message is: {{ message }}</p>
  ```

### 事件处理

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

#### 内联处理器

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

#### 事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。为了解决这个问题，Vue 为 `v-on` 提供了事件修饰符。

- `.prevent`

  阻止事件默认行为。

  ```html
  <form v-on:submit.prevent="onSubmit"></form>
  ```

#### 按键修饰符

在监听键盘事件时，经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符。

```html
<input @keyup.enter="submit">
```

### 条件渲染

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

### 列表渲染

- **v-for**

  可以用 `v-for` 指令基于一个数组来渲染一个列表。

  ```html
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.message }}
    </li>
  </ul>
  ```

#### 数组更新检测

Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法如下。

- `push()`

## 四、组件

`VueComponent` 构造函数和 `Vue` 构造函数之间存在以下关系。

```javascript
VueComponent.__proto__ === Function.prototype;
VueComponent.prototype.__proto__ === Vue.prototype;
```

### 组件注册

#### 全局注册

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

#### 局部注册

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

### 单文件组件

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

### 自定义事件

在子组件标签上绑定自定义事件：

```html
<my-component v-on:my-event="doSomething"></my-component>
```

通过 `ref` 给子组件绑定自定义事件，例如在生命周期上：

```javascript
export default {
  name: 'App',
  mounted() {
    this.$refs.student.$on('my-event', this.showInfo)
  }
};
```

在子组件方法中，触发自定义事件：

```javascript
export default {
  name: 'School',
  methods: {
    showInfo() {
      this.$emit('my-event', args)
    }
  }
};
```

通过自定义事件，也能实现子组件向父组件传递信息。不同的是，`props` 是父组件将回调函数先传递到子组件，而自定义事件是直接触发事件。

## 五、组合式 API

### setup()

`setup()` 钩子是在组件中使用组合式 API 的入口。

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    return {
      count
    }
  }
}
</script>
```

推荐通过 `<script setup>` 以获得更加简洁及符合人体工程学的语法。

