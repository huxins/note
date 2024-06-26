# HTML

## 一、基本结构

一个基本的 HTML 文档如下所示。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Sample page</title>
  </head>
  <body>
    <h1>Sample page</h1>
    <p>This is a <a href="demo.html">simple</a> sample.</p>
    <img src="https://placekitten.com/200/300" alt="My test image" />
    <!-- this is a comment -->
  </body>
</html>
```

## 二、通用基础

### 2.1. 微语法

HTML 中有许多地方可以接受特定的数据类型，例如日期或数字。

#### 2.1.1. Boolean 属性

元素上存在布尔属性表示真值，不存在该属性表示假值。

如果存在该属性，则其值必须是空字符串或与属性的规范名称匹配的不区分大小写的 ASCII 值，并且没有前导或尾随空格。

布尔属性不允许使用值 `true` 和 `false`。要表示假值，必须完全省略该属性。

例如 `disabled` 属性，他们可以标记表单输入使之变为不可用，此时用户不能向他们输入任何数据。

```html
<input type="text" disabled="disabled">
```

方便起见，可以将其写成以下形式。

```html
<input type="text" disabled>
```

## 三、HTML API

### 3.1. 元素

#### 3.1.1. 元素定义

规范中的每个元素都有一个定义，其中包括以下信息。

- ***Categories***

  元素所属的类别列表。为每个元素定义内容模型时使用。

- ***Content model***

  对必须包含哪些内容作为元素的子元素和后代元素的规范性描述。

- ***Tag omission in text/html***

  在 `text/html` 语法中是否可以省略开始和结束标记的非规范性描述。

#### 3.1.2. 内容模型

规范中定义的每个元素都有一个内容模型：对元素预期内容的描述。HTML 元素的内容必须符合元素内容模型中描述的要求。元素的内容是它在 DOM 中的子元素。

元素之间始终允许使用 ASCII 空格。User agents 将源标记中元素之间的这些字符表示为 DOM 中的文本节点。空文本节点和仅由这些字符序列组成的文本节点被视为元素间空白。

在确定元素的内容是否与元素的内容模型匹配时，必须忽略元素间的空白、注释节点和处理指令节点，并且在遵循定义文档和元素语义的算法时必须忽略。

- **nothing**

  当元素的内容模型为 `nothing` 时，该元素必须不包含文本节点（除了元素间空白）和元素节点。

HTML 中的每个元素都属于零个或多个类别，这些类别将具有相似特征的元素组合在一起。

- **块级元素**

  块级元素占据其父元素的整个水平空间，垂直空间等于其内容高度，因此创建了一个块。

  默认情况下，块级元素会新起一行。一般块级元素可以包含行内元素和其他块级元素。这种结构上的包含继承区别可以使块级元素创建比行内元素更大型的结构。

  HTML 标准中块级元素和行内元素至高出现在 [4.01](https://www.w3.org/TR/html401/struct/global.html#h-7.5.3) 标准中。在 HTML5，这种区别被一个更复杂的 [Element content categories](https://html.spec.whatwg.org/multipage/indices.html#element-content-categories) 代替。块级类别大致相当于 HTML5 中的 [Flow content](https://html.spec.whatwg.org/multipage/dom.html#flow-content) 类别，而行内类别相当于 HTML5 中的 [Phrasing content](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content) 类别，不过除了这两个还有其他类别。

  块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等。一个以 `block` 形式展现的块级元素不会被嵌套进行内元素中，但可以嵌套在其它块级元素中。

- 行内元素

  一个行内元素只占据它对应标签的边框所包含的空间。

  一般情况下，行内元素只能包含数据和其他行内元素。而块级元素可以包含行内元素和其他块级元素。

  默认情况下，行内元素不会以新行开始，而块级元素会新起一行。

  内联元素不会导致文本换行：它通常出现在一堆文字之间，例如超链接元素 `<a>` 或者强调元素 `<em>` 和 `<strong>`。

## 四、元素

### 4.1. Document metadata

#### 4.1.1. head

`head` 元素表示 `Document` 的元数据集合。

```html
<head>
  <meta charset="utf-8" />
  <title>Sample page</title>
</head>
```

#### 4.1.2. title

`title` 元素表示文档的标题或名称。

```html
<title>Sample page</title>
```

#### 4.1.3. link

`link` 元素允许作者将他们的文档链接到其他资源。

- 页面添加图标

  ```html
  <link rel="icon" href="favicon.ico">
  ```

- 应用 CSS

  ```html
  <link rel="stylesheet" href="index.css">
  ```

#### 4.1.4. meta

`meta` 元素表示无法使用 `title`，`base`，`link`，`style` 和 `script` 元素表示的各种元数据。

- `charset` 属性指定文档使用的字符编码

  ```html
  <meta charset="utf-8">
  ```

#### 4.1.5. style

`style` 元素允许作者在他们的文档中嵌入 CSS 样式表。

### 4.2. Sections

#### 4.2.1. body

`body` 元素表示文档的内容。

### 4.3. 分组内容

#### 4.3.1. p

`p` 元素代表一个段落。

#### 4.3.2. ol

`ol` 元素表示有序项目列表。

列表的项是 `ol` 元素的 `li` 元素子节点。

```html
<ol>
  <li>沿着条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>
```

#### 4.3.3. ul

`ul` 元素表示一个无序项目列表。

列表的项是 `ul` 元素的 `li` 元素子节点。

```html
<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```

#### 4.3.4. dl

`dl` 元素表示由零个或多个 name-value groups 组成的关联列表。

```html
<dl>
  <dt>内心独白</dt>
    <dd>戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。</dd>
  <dt>语言独白</dt>
    <dd>戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。</dd>
  <dt>旁白</dt>
    <dd>戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。</dd>
</dl>
```

### 4.4. 文本级语义

#### 4.4.1. a

如果 `a` 元素具有 `href` 属性，则它表示由其内容标记的超链接。

```html
<a href="https://youtu.be/tFXGhrHRLiA">星星点灯</a>
```

- 使用 `title` 属性添加支持信息

  ```html
  <a href="https://youtu.be/tFXGhrHRLiA" title="星星点灯-郑智化">星星点灯</a>
  ```

#### 4.4.2. span

`span` 元素本身没有任何意义。

### 4.5. 表单

#### 4.5.1. form

`form` 元素允许用户通过填写表单字段来提交数据给服务器进行处理。表单可以包含一组与之关联的控件元素，如文本框、下拉列表、单选按钮等，这些控件可以充当编辑器，允许用户输入或选择所需的信息，最终将这些信息打包成 HTTP 请求，发送给服务器。

```html
<form action="my-handling-form-page" method="post"></form>
```

#### 4.5.2. label

`label` 元素表示用户界面中的标题。

```html
<label for="name">Name:</label>
<input type="text" id="name" name="user_name">
```

#### 4.5.3. input

`input` 元素表示一个类型化的数据字段，通常带有一个表单控件以允许用户编辑数据。

`value` 属性给出了 `input` 元素的默认值。

```html
<input type="text" value="by default this element is filled with this text">
```

  - 单行文本框

    ```html
    <input type="text" value="I'm a text field">
    ```

  - 密码框

    ```html
    <input type="password">
    ```

  - 隐藏内容

    ```html
    <input type="hidden" id="timestamp" name="timestamp" value="1286705410">
    ```

    所有文本框都有一些通用规范。

    - 它们可以被标记为 `readonly`，用户不能修改输入值；甚至是 `disabled`，输入值永远不会与表单数据的其余部分一起发送。
    - 它们可以有一个 `placeholder`，这是文本输入框中出现的文本，用来简略描述输入框的目的。
    - 它们可以使用 `size`（框的物理尺寸）和 `maxlength`（可以输入的最大字符数）进行限制。

  - 复选框

    ```html
    <input type="checkbox" id="questionOne" name="subscribe" value="yes" checked>
    ```

  - 单选按钮

    ```html
    <input type="radio" id="soup" name="meal" checked>
    ```

    任何带有 `checked` 属性的复选框和单选按钮在加载时都会匹配 [`:default`](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-default) 伪类，即使它们后面不再被选中。任何当前被选中的元素，都会匹配 [`:checked`](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-checked) 伪类。

  - 文件选择器

    ```html
    <input type="file" name="file" id="file" accept="image/*" multiple>
    ```

#### 4.5.4. button

`button` 元素表示一个由其内容标记的按钮。

```html
<button type="submit">Send your message</button>
```

`button` 元素接受一个 `type` 属性，它接受 `submit`、`reset` 或者 `button` 三个值中的任一个。

还可以使用相应类型的 `input` 元素来生成一个按钮，如 `<input type="submit">`。`button` 元素的主要优点是，`input` 元素只允许纯文本作为其标签，而 `button` 元素允许完整的 HTML 内容，允许更复杂、更有创意的按钮内容。

#### 4.5.5. select

`select` 元素表示用于在一组选项中进行选择的控件。

```html
<select id="simple" name="simple">
  <option>Banana</option>
  <option selected>Cherry</option>
  <option>Lemon</option>
</select>
```

如果需要的话，选择框的默认值可以由要指定默认值的 `option` 元素中的 `selected` 属性设置，这样在页面加载后，该选项可以预先选中。

如果一个 `option` 元素明确设置了 `value` 属性，当表单提交时会提交那个选项对应的值。如果像上面的例子那样省略了 `value` 属性，`option` 元素的内容会作为提交的值。所以 `value` 属性并不是必需的，然而你可能需要向服务器中发送与视觉所见相比缩短或者改变过的值。

```html
<select id="simple" name="simple">
  <option value="banana">Big, beautiful yellow banana</option>
  <option value="cherry">Succulent, juicy cherry</option>
  <option value="lemon">Sharp, powerful lemon</option>
</select>
```

默认情况下，选择框的高度足以显示单个值。可选的 `size` 属性控制在选择框不处于聚焦状态时，可见选项的数量。

默认情况下，选择框只允许用户选择单个值。通过向 `select` 元素添加 `multiple` 属性，可以允许用户使用操作系统提供的机制选择多个值，如按下 `Ctrl` 并先后单击多个值。

```html
<select id="multi" name="multi" multiple size="2">
  <optgroup label="fruits">
    <option>Banana</option>
    <option selected>Cherry</option>
    <option>Lemon</option>
  </optgroup>
  <optgroup label="vegetables">
    <option>Carrot</option>
    <option>Eggplant</option>
    <option>Potato</option>
  </optgroup>
</select>
```

在多选选择框的情况下，你会注意到选择框不再以下拉内容的形式显示数值，相反，所有的值都会一次性显示在一个列表中，可选的 `size` 属性决定了控件的高度。

#### 4.5.6. optgroup

`option` 元素可以嵌套在 `optgroup` 元素中，以在视觉上关联一组取值。

```html
<select id="groups" name="groups">
  <optgroup label="fruits">
    <option>Banana</option>
    <option selected>Cherry</option>
    <option>Lemon</option>
  </optgroup>
  <optgroup label="vegetables">
    <option>Carrot</option>
    <option>Eggplant</option>
    <option>Potato</option>
  </optgroup>
</select>
```

在 `optgroup` 元素中，`label` 属性的值在嵌套选项之前显示。浏览器往往在视觉上将它们与选项分开，以避免它们与实际选项混淆。

#### 4.5.7. datalist

`datalist` 元素代表一组 `option` 元素，这些元素代表其他控件的预定义选项。在渲染中，`datalist` 元素不代表任何内容，它及其子元素应该被隐藏。

```html
<label for="myFruit">What's your favorite fruit?</label>
<input type="text" name="myFruit" id="myFruit" list="mySuggestion">
<datalist id="mySuggestion">
  <option>Apple</option>
  <option>Banana</option>
  <option>Blackberry</option>
  <option>Blueberry</option>
  <option>Lemon</option>
  <option>Lychee</option>
  <option>Peach</option>
  <option>Pear</option>
</datalist>
```

#### 4.5.8. textarea

`textarea` 元素表示元素原始值的多行纯文本编辑控件。控件的内容代表控件的默认值。

```html
<textarea>
by default this element is filled with this text
</textarea>
```

#### 4.5.9. fieldset 和 legend

`fieldset` 元素表示一组组合在一起的表单控件，可选地带有标题。标题由作为 `fieldset` 元素的子元素的第一个 `legend` 元素给出。

  ```html
  <form>
    <fieldset>
      <legend>Fruit juice size</legend>
      <p>
        <input type="radio" name="size" id="size_1" value="small">
        <label for="size_1">Small</label>
      </p>
      <p>
        <input type="radio" name="size" id="size_2" value="medium">
        <label for="size_2">Medium</label>
      </p>
      <p>
        <input type="radio" name="size" id="size_3" value="large">
        <label for="size_3">Large</label>
      </p>
    </fieldset>
  </form>
  ```

### 4.6. 脚本

脚本允许作者将交互性添加到文档中。

鼓励作者尽可能使用声明性替代脚本，因为声明性机制通常更易于维护，并且许多用户禁用脚本。

#### 4.6.1. script

`script` 元素允许作者在他们的文档中包含动态脚本和数据块。该元素不代表用户的内容。

- **type**

  `type` 属性指定脚本类型。在 HTML4 标准中，要求 `script` 标签有 `type` 特性。通常是 `type="text/javascript"`。现在已经不再需要。而且，现代 HTML 标准已经完全改变了此特性的含义。

- **src**

  如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。脚本文件可以通过 `src` 添加到 HTML 文件中。

- **integrity**

  `integrity` 属性表示该元素负责的请求的完整性元数据。值为文本。未指定 `src` 属性时，不得指定 `integrity` 属性。

  `integrity` 是用来解决由于 CDN 资源被污染而导致的 XSS。当浏览器检测加载脚本签名与给定的签名不一致时，会拒绝执行该脚本。

  启用 SRI 策略后，浏览器会对资源进行 CORS 校验，这就要求被请求的资源必须同域，或者配置了 `Access-Control-Allow-Origin` 响应头。

  要使用 SRI，只需要在原有的标签里增加 `integrity` 属性即可，这个属性的签名算法支持 `sha256`、`sha384` 和 `sha512`，签名算法和摘要签名内容用 `-` 分隔。
  
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  ```

  可以使用 `openssl` 生成摘要签名，并进行 Base64 编码。
  
  ```sh
  $ curl -fsSL https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css | openssl dgst -sha384 -binary | openssl enc -base64 -A
  ```

## 五、Web API

### 5.1. 用户提示

#### 5.1.1. 简单对话框

- *window*.**alert**(*message*)

  显示一个带有指定消息的模态警告框，并等待用户关闭它。

### 5.2. 脚本

#### 5.2.1. Events

##### 5.2.1.1. Event handlers

许多对象都可以指定事件处理程序，比如 `button`、`input`、`img` 等。这些事件处理程序针对指定的对象充当非捕获型事件监听器。

```javascript
const myButton = document.getElementById('myButton');

myButton.addEventListener('click', function () {
  console.log('Button clicked!');
});
```

##### 5.2.1.2. 事件类型

| 事件处理程序 | 事件类型 | 目标        | 描述                         |
| ------------ | -------- | ----------- | ---------------------------- |
| `onsubmit`   | `submit` | `form` 元素 | 提交表单时在表单元素上触发。 |

## 六、Web 存储

### 6.1. Storage

Storage 提供了访问特定域名下的会话存储或本地存储的功能。

- *storage*.**getItem**(*key*)

  接受一个键名作为参数，并返回对应键名的值。

- *storage*.**setItem**(*key*, *value*)

  接受一个键名和值作为参数，将会把键名添加到给定的 `Storage` 对象中，如果键名已存在，则更新其对应的值。

- *storage*.**removeItem**(*key*)

  接受一个键名作为参数，会从给定的 `Storage` 对象中删除该键名。

### 6.2. sessionStorage

存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。

### 6.3. localStorage

存储在 `localStorage` 的数据可以长期保留。

