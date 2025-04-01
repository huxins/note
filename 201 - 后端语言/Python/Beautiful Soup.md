# Beautiful Soup

[Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) 是一个可以从 HTML 或 XML 文件中提取数据的 Python 库。它能用你喜欢的解析器和习惯的方式实现文档树的导航、查找、和修改。

可以通过 `pip` 安装：

```sh
pip install beautifulsoup4
```

## 一、解析器

Beautiful Soup 支持 Python 标准库中的 [HTML 解析器](https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/#id10)，还支持一些第三方的解析器。

例如，以 Python 标准库的 [`html.parser`](https://docs.python.org/3/library/html.parser.html) 进行解析。

```python
import requests
from bs4 import BeautifulSoup

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}
response = requests.get('https://www.csdn.net', headers=headers)
html_doc = response.text

soup = BeautifulSoup(html_doc, 'html.parser')
print(soup.title)
```

## 二、对象

Beautiful Soup 将复杂的 HTML 文档转换成一个由 Python 对象构成的树形结构，但处理对象的过程只包含四种类型的对象：`Tag`、`NavigableString`、`BeautifulSoup` 和 `Comment`。

`Tag` 对象与 XML 或 HTML 原生文档中的标签元素相同。

```html
<title>CSDN - 专业开发者社区</title>
```

一个 HTML 或 XML 的标签可能有很多属性，可以像处理一个字段一样来处理标签的属性。

```python
soup = BeautifulSoup(html_doc, 'html.parser')
print(soup.div['style'])
```

也可以通过 `.attrs` 获取属性。

```python
soup = BeautifulSoup(html_doc, 'html.parser')
print(soup.div.attrs['style'])
```

## 三、搜索文档树

### CSS 选择器

`BeautifulSoup` 对象和 `Tag` 对象支持通过 `.css` 属性实现 CSS 选择器。

```python
soup = BeautifulSoup(html_doc, 'html.parser')
print(soup.select('title'))
print(soup.css.select('title'))
```

### 过滤器

[`find_all()`](https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/#find-all) 方法搜索当前标签的所有子节点，并判断是否符合过滤器的条件。

例如，搜索所有 `div` 元素，并根据 `id` 属性进行过滤。

```python
soup = BeautifulSoup(html_doc, 'html.parser')
find_all = soup.findAll("div", {"class": lambda x: x and x.startswith('www_live')})
find_all = soup.findAll("div", {"class": re.compile('www_live.*')})
```

