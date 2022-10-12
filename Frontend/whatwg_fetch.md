# Fetch

## Fetch API

### Headers class

#### 构造函数

使用 `Headers()` 构造方法创建一个新的 `Headers` 对象。

```javascript
var myHeaders = new Headers(init);
```

通过已存在的 `Headers` 对象构造：

```javascript
var oldHeaders = new Headers( {a:'v'} );
var myHeaders = new Headers(oldHeaders);
```

#### 方法

##### append()

在一个 `Headers` 对象内部，`Headers` 接口的 `append()` 方法可以追加一个新值到已存在的 headers 上，或者新增一个原本不存在的 header。

```javascript
myHeaders.append(name,value);
```

### Request class

#### 构造函数

`Request()` 构造器创建一个新的 `Request` 对象。

```javascript
var myRequest = new Request(input[, init])
```

请求相对地址：

```javascript
var myRequest = new Request('flowers.jpg');
```

#### 属性

##### url

`Request` 接口的 `url` 属性是只读的，以字符串形式返回请求的 URL。

```javascript
var myURL = request.url;
```

### Response class

#### 构造函数

`Response()` 构造函数创建了一个新的 `Response` 对象。

```javascript
let myResponse = new Response(body, init);
```

使用自定义 header：

```javascript
var myBlob = new Blob();
var headers = new Headers( {a:'v'} );
var myResponse = new Response(myBlob, {headers: headers});
```

#### 属性

##### headers

`Response` 接口的 `headers` 属性是只读的，将响应的 `headers` 作为 `Headers` 对象返回。

```javascript
var myHeaders = response.headers;
```

### Fetch method

全局的 `fetch()` 方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 `Response` 对象。

```javascript
fetch(new Request("https://api.ipify.org/"), {
    headers: {
        'User-Agent': 'Cloudflare Workers'
    }
})
```

## 参见

- [Fetch Standard - WHATWG](https://fetch.spec.whatwg.org/)

