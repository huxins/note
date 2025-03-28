# Web Worker

[Web Worker](https://html.spec.whatwg.org/multipage/workers.html#workers) 允许在浏览器后台运行独立于主线程的脚本，从而实现多线程编程。由于 JavaScript 是单线程的，长时间运行的任务会阻塞主线程，导致页面卡顿。Web Worker 解决了这一问题，使得复杂计算、数据处理等任务可以在后台执行，不影响用户交互。

## 一、核心特性

- **独立线程**：Worker 运行在独立的线程中，与主线程并行。
- **无 DOM 访问权限**：Worker 无法直接操作 DOM、`window` 或 `document` 对象。
- **通信机制**：通过 [`postMessage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage) 和 [`onmessage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/message_event) 事件与主线程通信，数据传递使用[结构化克隆](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)或 [Transferable](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects) 对象。
- **类型**
  - **Dedicated Worker**：仅能被创建它的脚本使用。
  - **Shared Worker**：可被多个脚本共享。
  - **Service Worker**：用于离线缓存、网络代理等（如 PWA）。

## 二、使用场景

- **密集型计算**
  - 如数学建模、加密解密、图像/视频处理（Canvas/WebGL）。
  - 示例：计算斐波那契数列、实时滤镜处理。
- **大数据处理**
  - 解析大型 JSON、CSV 或日志文件，避免主线程冻结。
  - 示例：排序/过滤海量数据、生成可视化图表。
- **后台任务**
  - 预加载资源、缓存数据或定期同步。
  - 示例：预加载下一页内容、心跳检测。
- **实时通信**
  - 处理 WebSocket 或 WebRTC 数据流。
  - 示例：聊天应用的消息解析、音视频流分析。
- **离线应用**
  - Service Worker 可拦截请求，实现离线缓存（PWA 的核心技术）。

## 三、示例代码

- **主线程**

  ```javascript
  // 创建 Worker
  const worker = new Worker('worker.js');
  
  // 发送数据
  worker.postMessage({ num: 40 });
  
  // 接收结果
  worker.onmessage = (e) => {
    console.log('斐波那契结果:', e.data);
  };
  
  // 错误处理
  worker.onerror = (e) => {
    console.error('Worker 错误:', e.message);
  };
  ```
  
- **worker.js（Worker 线程）**

  ```javascript
  function fibonacci(n) {
    return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  self.onmessage = (e) => {
    const result = fibonacci(e.data.num);
    self.postMessage(result);
  };
  ```

## Reference

- [使用 JavaScript 获取文件的 MD5 值 - *jealyn*](https://github.com/jealyn/js-md5)
- [梳理 Web Worker 及实战场景](https://juejin.cn/post/7176788060619669565)
- [一文彻底学会使用 Web Worker](https://juejin.cn/post/7139718200177983524)

