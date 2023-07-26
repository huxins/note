# Vue

- 查询所使用 Vue 的版本，可以借助根节点的属性。

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

### 1.2. 模板语法

#### 1.2.1. 插值

- **文本**

  数据绑定最常见的形式就是使用双大括号的文本插值。
  
  ```html
  <span>Message: {{ msg }}</span>
  ```

- **JavaScript 表达式**

  对于所有的数据绑定，Vue 都提供了完全的 JavaScript 表达式支持。
  
  ```javascript
  {{ number + 1 }}
  
  {{ ok ? 'YES' : 'NO' }}
  
  {{ message.split('').reverse().join('') }}
  ```

- **元素属性**

  Mustache 语法不能作用在 HTML 属性上，应该使用 `v-bind` 指令。

  ```html
  <a v-bind:href="dynamicUrl">传送门</a>
  ```

  该指令可简写为：

  ```html
  <a :href="dynamicUrl">传送门</a>
  ```

### 1.3. 表单输入绑定

可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 `value` property 和 `input` 事件；
- checkbox 和 radio 使用 `checked` property 和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

#### 1.3.1. 文本

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

