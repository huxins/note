# HTML Element

## 一、文档结构

### 基础结构

```html
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>...</body>
</html>
```

#### body

[`body`](https://html.spec.whatwg.org/multipage/sections.html#the-body-element) 元素表示文档的内容。

### 元数据元素

| 元素                                                         | 作用                     | 重要属性                     |
| ------------------------------------------------------------ | ------------------------ | ---------------------------- |
| [\<head>](https://html.spec.whatwg.org/multipage/semantics.html#the-head-element) | 文档元数据容器           |                              |
| [\<title>](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element) | 页面标题                 |                              |
| [\<meta>](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element) | 定义字符集/视口/关键词等 | `charset`, `name`, `content` |
| [\<link>](https://html.spec.whatwg.org/multipage/semantics.html#the-link-element) | 外部资源引用             | `rel`, `href`                |
| [\<style>](https://html.spec.whatwg.org/multipage/semantics.html#the-style-element) | 内联样式表               | `type="text/css"`            |

#### head

[`head`](https://html.spec.whatwg.org/multipage/semantics.html#the-head-element) 元素表示 [`Document`](https://html.spec.whatwg.org/multipage/dom.html#document) 的元数据集合。

```html
<head>
  <meta charset="utf-8" />
  <title>Sample page</title>
</head>
```

#### title

[`title`](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element) 元素表示文档的标题或名称。

```html
<title>Sample page</title>
```

#### meta

[`meta`](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element) 元素表示无法使用 `title`，`base`，`link`，`style` 和 `script` 元素表示的各种元数据。

- `charset`

  [`charset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#charset) 属性指定文档使用的字符编码。
  
  ```html
  <meta charset="utf-8">
  ```

#### link

[`link`](https://html.spec.whatwg.org/multipage/semantics.html#the-link-element) 元素将文档链接到其他资源。

例如，页面添加图标。

```html
<link rel="icon" href="favicon.ico">
```

例如，应用 CSS。

```html
<link rel="stylesheet" href="index.css">
```

#### style

[`style`](https://html.spec.whatwg.org/multipage/semantics.html#the-style-element) 元素在文档中嵌入 CSS 样式表。

## 二、内容元素

### 文本内容

| 元素                                                         | 作用         | 重要属性 |
| ------------------------------------------------------------ | ------------ | -------- |
| [\<p>](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element) | 段落         |          |
| [\<ol>](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element) | 有序项目列表 |          |
| [\<ul>](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) | 无序项目列表 |          |
| [\<dl>](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element) | 关联列表     |          |
| [\<a>](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element) | 超链接       |          |
| [\<span>](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-span-element) |              |          |

#### p

[`p`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element) 元素代表一个段落。

#### ol

[`ol`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element) 元素表示一个有序项目列表。

列表的项是 `ol` 元素的 `li` 元素子节点。

```html
<ol>
  <li>沿着这条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>
```

#### ul

[`ul`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) 元素表示一个无序项目列表。

列表的项是 `ul` 元素的 `li` 元素子节点。

```html
<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```

#### dl

[`dl`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element) 元素表示由零个或多个 *name-value groups* 组成的关联列表。

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

#### a

如果 [`a`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element) 元素具有 `href` 属性，则它表示由其内容标记的超链接。

```html
<a href="https://youtu.be/tFXGhrHRLiA">星星点灯</a>
```

可以使用 `title` 属性添加支持信息。

```html
<a href="https://youtu.be/tFXGhrHRLiA" title="星星点灯-郑智化">星星点灯</a>
```

#### span

[`span`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-span-element) 元素本身没有任何意义。

### 语义化元素

| 元素                                                         | 语义            |
| ------------------------------------------------------------ | --------------- |
| [\<header>](https://html.spec.whatwg.org/multipage/sections.html#the-header-element) | 页眉/章节头     |
| [\<nav>](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element) | 导航链接集合    |
| [\<article>](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | 独立内容区块    |
| [\<section>](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | 文档通用分区    |
| [\<aside>](https://html.spec.whatwg.org/multipage/sections.html#the-aside-element) | 侧边栏/附属内容 |
| [\<footer>](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element) | 页脚/章节尾     |

## 三、表单系统

| 元素                                                         | 作用       | 重要属性                   |
| ------------------------------------------------------------ | ---------- | -------------------------- |
| [\<form>](https://html.spec.whatwg.org/multipage/forms.html#the-form-element) | 表单       |                            |
| [\<label>](https://html.spec.whatwg.org/multipage/forms.html#the-label-element) | 标题       |                            |
| [\<button>](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) | 按钮       |                            |
| [\<datalist>](https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element) | 预定义选项 |                            |
| [\<fieldset>](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element) | 表单控件组 |                            |
| [\<input>](https://html.spec.whatwg.org/multipage/input.html#the-input-element) | 数据字段   | `type`、`value`、`checked` |
| [\<select>](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element) | 选项字段   |                            |
| [\<textarea>](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element) | 多行纯文本 |                            |

### 表单容器

#### form

[`form`](https://html.spec.whatwg.org/multipage/forms.html#the-form-element) 元素允许用户通过填写表单字段来提交数据给服务器进行处理。

表单可以包含一组与之关联的控件元素，如文本框、下拉列表、单选按钮等。

这些控件可以充当编辑器，允许用户输入或选择所需的信息，最终将这些信息打包成 HTTP 请求，发送给服务器。

```html
<form action="my-handling-form-page" method="post"></form>
```

### 辅助元素

#### label

[`label`](https://html.spec.whatwg.org/multipage/forms.html#the-label-element) 元素表示用户界面中的标题。

```html
<label for="name">Name:</label>
<input type="text" id="name" name="user_name">
```

#### button

[`button`](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) 元素表示一个由其内容标记的按钮。

```html
<button type="submit">Send your message</button>
```

`button` 元素接受一个 [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#type) 属性：

- `submit`
- `reset`
- `button`

还可以使用相应类型的 `input` 元素来生成一个按钮。

```html
<input type="submit">
```

`button` 元素的主要优点是，`input` 元素只允许纯文本作为其标签，而 `button` 元素允许完整的 HTML 内容，允许更复杂、更有创意的按钮内容。

#### datalist

[`datalist`](https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element) 元素代表一组 [`option`](https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element) 元素，这些元素代表其他控件的预定义选项。

在渲染中，`datalist` 元素不代表任何内容，它及其子元素应该被隐藏。

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

#### fieldset

[`fieldset`](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element) 元素表示一组组合在一起的表单控件，可选地带有标题。

标题由作为 `fieldset` 元素的子元素的第一个 `legend` 元素给出。

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

### 输入控件

#### input

[`input`](https://html.spec.whatwg.org/multipage/input.html#the-input-element) 元素表示一个类型化的数据字段，通常带有一个表单控件以允许用户编辑数据。

[`value`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#value) 属性是输入控件的值。当在 HTML 中指定时，为 `input` 元素的默认值。

```html
<input type="text" value="by default this element is filled with this text">
```

**所有文本框都有一些通用规范**：

- 可以被标记为 [`readonly`](https://html.spec.whatwg.org/multipage/input.html#the-input-element:attr-input-readonly-3)，用户不能修改输入值。
- 甚至是 [`disabled`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#disabled)，输入值永远不会与表单数据的其余部分一起发送。
- 可以有一个 [`placeholder`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#placeholder)，这是文本输入框中出现的文本，用来简略描述输入框的目的。
- 可以使用 [`size`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#size)（框的物理尺寸）和 [`maxlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#maxlength)（可以输入的最大字符数）进行限制。

**所有选择框都有一些通用规范**：

- 任何带有 [`checked`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#checked) 属性的复选框和单选按钮在加载时都会匹配 [`:default`](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-default) 伪类，即使它们后面不再被选中。
- 任何当前被选中的元素，都会匹配 [`:checked`](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-checked) 伪类。

**通过 [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#type) 指定要渲染的控件的类型**：

- **text**

  单行纯文本编辑控件。

  ```html
  <input type="text" value="I'm a text field">
  ```

- **password**

  单行纯文本编辑控件，浏览器会隐藏该值，以便用户以外的其他人无法看到。

  ```html
  <input type="password">
  ```

- **hidden**

  不打算由用户检查或操纵的值。

  ```html
  <input type="hidden" id="timestamp" name="timestamp" value="1286705410">
  ```

- **checkbox**

  ```html
  <input type="checkbox" id="questionOne" name="subscribe" value="yes" checked>
  ```

- **radio**

  ```html
  <input type="radio" id="soup" name="meal" checked>
  ```

- **file**

  ```html
  <input type="file" name="file" id="file" accept="image/*" multiple>
  ```

**IDL 属性和方法**：

- **files**

  [`HTMLInputElement.files`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files) 属性允许访问使用 `<input type="file">` 元素选择的 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)。
  
  ```html
  <input type="file">
  
  <script>
    let input = document.querySelector('input');
  
    input.addEventListener('change', function () {
      let files = input.files;
      for (let i = 0; i < files.length; i++) {
        console.log(files[i].name);
      }
    });
  </script>
  ```

#### select

[`select`](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element) 元素表示用于在一组选项中进行选择的控件。

```html
<select id="simple" name="simple">
  <option>Banana</option>
  <option selected>Cherry</option>
  <option>Lemon</option>
</select>
```

选择框的默认值可以由要指定默认值的 `option` 元素中的 `selected` 属性设置，这样在页面加载后，该选项可以预先选中。

如果一个 `option` 元素明确设置了 `value` 属性，当表单提交时会提交那个选项对应的值。

如果像上面的例子那样省略了 `value` 属性，`option` 元素的内容会作为提交的值。

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

在多选选择框的情况下，选择框不再以下拉内容的形式显示数值，相反，所有的值都会一次性显示在一个列表中，可选的 `size` 属性决定了控件的高度。

[`option`](https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element) 元素可以嵌套在 [`optgroup`](https://html.spec.whatwg.org/multipage/form-elements.html#the-optgroup-element) 元素中，以在视觉上关联一组取值。

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

在 [`optgroup`](https://html.spec.whatwg.org/multipage/form-elements.html#the-optgroup-element) 元素中，[`label`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-optgroup-label) 属性的值在嵌套选项之前显示。

浏览器往往在视觉上将它们与选项分开，以避免它们与实际选项混淆。

#### textarea

[`textarea`](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element) 元素表示元素原始值的多行纯文本编辑控件，控件的内容代表控件的默认值。

```html
<textarea>
by default this element is filled with this text
</textarea>
```

## 四、交互功能

### 脚本支持

[`script`](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element) 元素允许作者在他们的文档中包含动态脚本和数据块。

[`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#type) 属性指定脚本类型：

- 在 HTML4 标准中，要求 `script` 标签有 `type` 特性。通常是 `type="text/javascript"`。
- 现在已经不再需要。
- 现代 HTML 标准已经完全改变了此特性的含义。

如果有大量的 JavaScript 代码，可以将它放入一个单独的文件。

脚本文件可以通过 [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#src) 添加到 HTML 文件中。

```html
<script>
  // 内联脚本
</script>
<script src="app.js" async defer></script>
```

[`integrity`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#integrity) 属性表示该元素负责的请求的完整性元数据，值为文本。未指定 `src` 属性时，不得指定 `integrity` 属性。

[`integrity`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#integrity) 是用来解决由于 CDN 资源被污染而导致的 XSS。当浏览器检测加载脚本签名与给定的签名不一致时，会拒绝执行该脚本。

启用 SRI 策略后，浏览器会对资源进行 CORS 校验，这就要求被请求的资源必须同域，或者配置了 `Access-Control-Allow-Origin` 响应头。

要使用 SRI，只需要在原有的标签里增加 `integrity` 属性即可，这个属性的签名算法支持 `sha256`、`sha384` 和 `sha512`，签名算法和摘要签名内容用 `-` 分隔。

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous">
```

可以使用 `openssl` 生成摘要签名，并进行 Base64 编码。

```sh
curl -fsSL https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css \
  | openssl dgst -sha384 -binary \
  | openssl enc -base64 -A
```

### 多媒体嵌入

#### video

[`video`](https://html.spec.whatwg.org/multipage/media.html#the-video-element) 元素用于播放视频或电影，以及带有字幕的音频文件。

```html
<video controls>
  <source src="movie.mp4" type="video/mp4">
</video>
```

#### audio

[`audio`](https://html.spec.whatwg.org/multipage/media.html#the-audio-element) 元素表示声音或音频流。

```html
<audio src="sound.ogg"></audio>
```

