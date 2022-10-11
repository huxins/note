# Service Worker

Service Worker 是浏览器和网络间的代理。通过拦截文档中发出的请求，可以达到离线运行的目的。

## 入门

### 注册

使用 `ServiceWorkerContainer.register()` 方法注册 Service Worker。

```javascript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./handle.js', { scope: './' })
            .then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
            .catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
```

### 安装

```javascript
window.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v2').then(function(cache) {
            return cache.addAll([
                './index.html'
            ]);
        })
    );
});
```

## 接口

### FetchEvent

通过 `FetchEvent` 可以自定义请求的响应。

```javascript
this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
    );
});
```

#### 属性

- `FetchEvent.request`：浏览器想要发送的 `Request`。

## 参考文献

- [Service Worker API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 参见

- [Service Workers - W3C](https://www.w3.org/TR/service-workers/)

