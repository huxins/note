# Vue

[Vue.js](https://cn.vuejs.org/) 是一个用于创建用户界面的开源 MVVM 前端 JavaScript 框架，也是一个创建单页应用的 Web 应用框架。

查询所使用 [Vue](https://cn.vuejs.org/) 版本，可以借助根节点的属性。

- 查询 [Vue 2](https://v2.cn.vuejs.org/)，如果 `__vue__` 属性存在，则为 Vue 2
  
  ```javascript
  console.dir(document.querySelector('#app').__vue__.__proto__.constructor.version)
  ```

- 查询 [Vue 3](https://cn.vuejs.org/) 的具体版本

  ```javascript
  console.dir(document.querySelector('#app').__vue_app__.version)
  ```

## 一、Vue 实例

Vue 应用通过实例化 [`Vue`](https://v2.cn.vuejs.org/v2/guide/instance.html) 构造函数创建根实例完成初始化，该核心机制作为应用开发的入口起点。

```javascript
var vm = new Vue({
  // 选项
})
```

### Vue 实例选项

#### DOM

- [**el**](https://v2.cn.vuejs.org/v2/api/#el)

  Vue 实例通过 `el` 配置项声明式指定已存在的 DOM 宿主节点，支持 CSS 选择器或 HTMLElement 对象两种形态，挂载完成后可通过 [`vm.$el`](https://v2.cn.vuejs.org/v2/api/#vm-el) 原型属性访问目标元素。

  ```javascript
  const vm = new Vue({
    el: '#app'
  })
  ```
  
  Vue 实例初始化时若声明 `el` 配置项将自动触发编译流程，否则需显式调用 [`$mount()`](https://v2.cn.vuejs.org/v2/api/#vm-mount) 方法启动挂载流程。
  
  ```javascript
  vm.$mount('#app')
  ```

#### 数据

- [**data**](https://v2.cn.vuejs.org/v2/api/#data)

  `data` 配置项定义 Vue 实例的响应式状态容器，其数据存储于 [`vm.$data`](https://v2.cn.vuejs.org/v2/api/#vm-data) 原型属性。实例通过存取器代理机制暴露数据属性，使得 `vm.a` 与 `vm.$data.a` 具有等价访问语义。

  ```javascript
  const vm = new Vue({
    el: '#app',
    data: {
      name: '新世界'
    }
  })
  ```
  
- [**methods**](https://v2.cn.vuejs.org/v2/api/#methods)

  `methods` 配置项声明的方法通过代理机制挂载至组件实例，支持在模版表达式与事件处理器中直接调用，其执行上下文通过 `this` 自动绑定当前 Vue 实例。

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
  
- [**computed**](https://v2.cn.vuejs.org/v2/api/#computed)

  `computed` 配置项声明式定义缓存计算值，其存取器函数的 `this` 上下文强制绑定当前 Vue 实例，基于响应式依赖追踪实现智能缓存更新。

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
  
  只读取时，可简写。

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
  
- [**watch**](https://v2.cn.vuejs.org/v2/api/#watch)

  `watch` 配置项实现响应式观测系统，允许开发者声明式定义深度观测器，通过自定义回调函数响应状态变更，特别适用于异步任务或性能敏感型副作用处理场景。

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

- [**props**](https://v2.cn.vuejs.org/v2/api/#props)

  `props` 配置项声明式定义组件接口契约，支持数组简写或对象类型校验语法，规范父级作用域向子组件的单向数据传递。

  ```html
  <template>
    <div id="app">
      <School :height="123"/>
    </div>
  </template>
  ```
  
  - 数组语法
  
    ```javascript
    export default {
      name: "SchoolDetails",
      props: ['size']
    };
    ```
  
  - 对象语法
  
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

#### 生命周期

- [**mounted**](https://v2.cn.vuejs.org/v2/api/#mounted)

  `mounted` 生命周期钩子在编译渲染阶段完成后触发，标志着初始 DOM 完成视图层注入且组件挂载阶段完成。

#### 资源

- [**filters**](https://v2.cn.vuejs.org/v2/api/#filters)

  `filters` 作为模板逻辑扩展机制，通过管道操作符在 Mustache [插值](https://v2.cn.vuejs.org/v2/guide/syntax.html#%E6%96%87%E6%9C%AC)或 [`v-bind`](https://v2.cn.vuejs.org/v2/api/#v-bind) 指令表达式中实现声明式值转换，遵循纯函数设计规范进行无状态数据格式化。

  ```html
  {{ message | capitalize }}
  
  <div v-bind:id="rawId | formatId"></div>
  ```

  ```javascript
  filters: {
    capitalize: function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
  ```

- [**components**](https://v2.cn.vuejs.org/v2/api/#components)

  `components` 选项声明式配置局部作用域封装的可复用自定义元素，实现组件树节点的模块化组合与隔离式状态管理。

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

- [**mixins**](https://v2.cn.vuejs.org/v2/api/#mixins)

  `mixins` 选项声明式配置可复用逻辑单元集合，通过策略性选项合并机制将混入对象遵循组件选项规范进行深度集成，实现模块化封装横切关注点。

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

- vm.[**$watch**](https://v2.cn.vuejs.org/v2/api/#vm-watch)()

  `$watch` 方法动态注册响应式观测器，基于依赖追踪系统监听计算表达式值变更，触发回调时形参严格遵循 `(newValue, oldValue)` 签名规范。

  ```javascript
  vm.$watch('address', function (val, oldVal) {
    console.log(`address 已修改，原值为 ${oldVal}，新值为 ${val}`);
  })
  ```

#### 生命周期

- vm.[**$nextTick**](https://v2.cn.vuejs.org/v2/api/#vm-nextTick)()

  `$nextTick` 方法实现异步回调调度，将任务延迟至 Vue 视图层渲染事务完成后基于事件循环机制触发执行。
  
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

- Vue.[**filter**](https://v2.cn.vuejs.org/v2/api/#Vue-filter)()

  `Vue.filter` 实现全局过滤器的声明式注册与检索，通过全局作用域注入支持跨组件模板复用逻辑的纯函数式值转换器。

  ```javascript
  Vue.filter('capitalize', function (value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  })
  ```
  
- Vue.[**extend**](https://v2.cn.vuejs.org/v2/api/#Vue-extend)()

  `Vue.extend` 作为构造器工厂方法，接收包含组件选项的配置对象，返回具备预设 Vue 原生功能的基础组件构造器，支持原型继承模式的组件体系扩展。

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

- Vue.[**component**](https://v2.cn.vuejs.org/v2/api/#Vue-component)()

  `Vue.component` 方法实现全局组件构造器的声明式注册与检索，通过命名空间标识符自动推导语义化组件名称，并完成全局作用域注入以支持跨模块复用。

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

- [**ref**](https://v2.cn.vuejs.org/v2/api/#ref)

  `ref` 用于获取对 DOM 元素或组件实例的直接访问。注册的引用信息将存储在父组件的 [`$refs`](https://v2.cn.vuejs.org/v2/api/#vm-refs) 对象中。

  ```html
  <p ref="p">hello</p>
  <child-component ref="child"></child-component>
  ```

  ```javascript
  doSomething() {
    console.log(this.$refs.p);
  }
  ```

## 二、模板语法

### 插值

#### 文本

Mustache 语法（`{{ }}`）实现声明式数据绑定的基础范式，通过模板文本插值建立响应式数据源与视图层的单向动态映射。

```html
<span>Message: {{ msg }}</span>
```

#### JavaScript 表达式

Vue 模板插值语法深度集成原生 JavaScript 表达式解析引擎，支持在数据绑定作用域内执行符合 ECMAScript 规范的单行表达式运算，其表达式在组件实例的响应式上下文中进行沙箱化求值。

```javascript
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}
```

#### 元素属性

[`v-bind`](https://v2.cn.vuejs.org/v2/api/#v-bind) 指令系统作为 HTML 特性绑定的标准范式，与 Mustache 插值语法形成视图层绑定的场景互补：Mustache 语法专司文本内容动态化，而 DOM 属性/特性绑定须通过指令系统实现响应式关联。

```html
<a v-bind:href="dynamicUrl">传送门</a>

<!-- 简写 -->
<a :href="dynamicUrl">传送门</a>
```

### 指令

#### 表单绑定

- [**v-model**](https://v2.cn.vuejs.org/v2/api/#v-model)

  `v-model` 作为[表单控件](https://v2.cn.vuejs.org/v2/guide/forms.html)双向绑定的语法糖，通过抽象层适配不同输入类型的响应式双向绑定机制，其内部根据元素类型自动映射 [`value`](https://html.spec.whatwg.org/multipage/input.html#attr-input-value)/[`checked`](https://html.spec.whatwg.org/multipage/input.html#attr-input-checked) 属性与 [`input`](https://html.spec.whatwg.org/multipage/webappapis.html#handler-oninput)/[`change`](https://html.spec.whatwg.org/multipage/webappapis.html#handler-onchange) 事件的对应关系。

  ```html
  <input v-model="message" placeholder="edit me">
  <p>Message is: {{ message }}</p>
  ```

#### 条件渲染

- [**v-show**](https://v2.cn.vuejs.org/v2/api/#v-show)

  `v-show` 指令用于条件性地展示元素。

  ```html
  <h2 v-show="true">欢迎来到 {{ address }}</h2>
  ```

- [**v-if**](https://v2.cn.vuejs.org/v2/api/#v-if)

  `v-if` 指令用于条件性地渲染一块内容，这块内容只会在指令的表达式返回 `true` 值的时候被渲染。

  ```html
  <h2 v-if="flase">欢迎来到 {{ address }}</h2>
  ```

#### 列表渲染

- [**v-for**](https://v2.cn.vuejs.org/v2/api/#v-for)

  `v-for` 指令基于一个数组来渲染一个列表。

  ```html
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.message }}
    </li>
  </ul>
  ```

## 三、事件处理

[`v-on`](https://v2.cn.vuejs.org/v2/api/#v-on) 指令系统实现声明式事件监听机制，支持 DOM 事件与组件方法/内联表达式的响应式绑定，其事件处理器自动注入原生事件对象并绑定当前组件上下文。

```html
<div id="app">
  <h2>欢迎来到 {{address}}</h2>
  <button v-on:click="showInfo">点我提示信息</button>
</div>

<!-- 简写 -->
<div id="app">
  <h2>欢迎来到 {{address}}</h2>
  <button @click="showInfo">点我提示信息</button>
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

### 内联处理

除了直接绑定到一个方法，也可以在[内联](https://v2.cn.vuejs.org/v2/guide/events.html#%E5%86%85%E8%81%94%E5%A4%84%E7%90%86%E5%99%A8%E4%B8%AD%E7%9A%84%E6%96%B9%E6%B3%95) JavaScript 语句中调用方法。

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

有时也需要在内联语句处理器中访问原始的 DOM 事件，可以用特殊变量 `$event` 把它传入方法。

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

### 事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。为了解决这个问题，Vue 为 `v-on` 提供了事件修饰符。

- `.prevent`

  阻止事件默认行为。

  ```html
  <form v-on:submit.prevent="onSubmit"></form>
  ```

### 按键修饰符

在监听键盘事件时，经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符。

```html
<input @keyup.enter="submit">
```

## 四、组件

`VueComponent` 构造函数和 `Vue` 构造函数之间存在以下关系。

```javascript
VueComponent.__proto__ === Function.prototype;
VueComponent.prototype.__proto__ === Vue.prototype;
```

### 组件注册

- **全局注册**

  全局注册可以通过 [`Vue.component()`](https://v2.cn.vuejs.org/v2/api/#Vue-component) 的方式进行。
  
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
  
- **局部注册**

  局部注册可通过在实例中的 [`components`](https://v2.cn.vuejs.org/v2/api/#components) 选项进行配置。
  
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

简单的单文件组件如下所示。

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

由 App 组件统一管理子组件。

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

最后统一挂载。

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

在子组件标签上绑定[自定义事件](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html)。

```html
<my-component v-on:my-event="doSomething"></my-component>
```

通过 `ref` 给子组件绑定自定义事件，例如在生命周期上。

```javascript
export default {
  name: 'App',
  mounted() {
    this.$refs.student.$on('my-event', this.showInfo)
  }
};
```

在子组件方法中，触发自定义事件。

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

### setup

[`setup()`](https://cn.vuejs.org/api/composition-api-setup) 钩子是在组件中使用组合式 API 的入口。

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

推荐通过 [`<script setup>`](https://cn.vuejs.org/api/sfc-script-setup.html) 以获得更加简洁及符合人体工程学的语法。

