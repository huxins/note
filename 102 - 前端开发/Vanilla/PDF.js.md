# PDF.js

[PDF.js](https://github.com/mozilla/pdf.js) 是基于 HTML5 的 PDF 查看器解决方案。

## 一、抓取字段

- **坐标系转换**：PDF 默认使用**左下角为原点**的坐标系，而网页通常使用左上角，需注意是否需要翻转 Y 轴。
- **文本项结构**：[`item.str`](https://github.com/mozilla/pdf.js/blob/00e3a4d87a22d92938687f7535bc35961a2a40e3/src/display/api.js#L1244) 是文本内容，[`item.transform`](https://github.com/mozilla/pdf.js/blob/00e3a4d87a22d92938687f7535bc35961a2a40e3/src/display/api.js#L1246) 包含位置和缩放信息（数组中的索引 `4` 和 `5` 是 X 和 Y 坐标）。

[`item.transform`](https://github.com/mozilla/pdf.js/blob/00e3a4d87a22d92938687f7535bc35961a2a40e3/src/display/api.js#L1246) 是一个 6 元素的数组，对应 PDF 规范中的 3x3 仿射变换矩阵。

```typescript
type Transform = [
  a: number,  // 水平缩放和旋转分量
  b: number,  // 垂直倾斜分量
  c: number,  // 水平倾斜分量
  d: number,  // 垂直缩放和旋转分量
  e: number,  // 水平平移（X 坐标）
  f: number   // 垂直平移（Y 坐标）
];
```

### 左下角原点

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF 文字提取</title>
    <style>
        #preview {
            margin: 20px 0;
        }

        #result {
            color: #333;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <input type="file" id="fileInput" accept=".pdf" />
    <div id="preview"></div>
    <div id="result"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js"></script>
    <script>
        const fileInput = document.getElementById('fileInput');
        const previewDiv = document.getElementById('preview');
        const resultDiv = document.getElementById('result');

        // 定义要提取文字的区域（根据实际PDF调整这些值）
        const targetArea = {
            x: 480,    // 从左边缘开始的 pt 数
            y: 335,    // 从下边缘开始的 pt 数
            width: 70, // 区域宽度
            height: 10 // 区域高度
        };

        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // 显示文件名
            previewDiv.innerHTML = `已选择文件：${file.name}`;
            resultDiv.innerHTML = "处理中...";

            // 读取文件为ArrayBuffer
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const pdfData = new Uint8Array(e.target.result);
                    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                    const page = await pdf.getPage(1);

                    const textContent = await page.getTextContent();

                    let extractedText = '';
                    textContent.items.forEach((item) => {
                        const tx = item.transform[4];
                        const ty = item.transform[5];

                        if (tx >= targetArea.x &&
                            ty >= targetArea.y &&
                            tx <= targetArea.x + targetArea.width &&
                            ty <= targetArea.y + targetArea.height) {
                            extractedText += item.str + ' ';
                        }
                    });

                    resultDiv.innerHTML = `提取结果：${extractedText || '未找到文字'}`;
                } catch (error) {
                    resultDiv.innerHTML = `处理失败：${error.message}`;
                }
            };
            reader.readAsArrayBuffer(file);
        });
    </script>
</body>

</html>
```

### 左上角原点

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF 文字提取</title>
    <style>
        #preview {
            margin: 20px 0;
        }

        #result {
            color: #333;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <input type="file" id="fileInput" accept=".pdf" />
    <div id="preview"></div>
    <div id="result"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js"></script>
    <script>
        const fileInput = document.getElementById('fileInput');
        const previewDiv = document.getElementById('preview');
        const resultDiv = document.getElementById('result');

        // 定义要提取文字的区域（根据实际PDF调整这些值）
        const targetArea = {
            x: 480,    // 从左边缘开始的 pt 数
            y: 51,     // 从顶边缘开始的 pt 数（原从底边计算的坐标需要转换）
            width: 70, // 区域宽度
            height: 10 // 区域高度
        };

        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // 显示文件名
            previewDiv.innerHTML = `已选择文件：${file.name}`;
            resultDiv.innerHTML = "处理中...";

            // 读取文件为ArrayBuffer
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const pdfData = new Uint8Array(e.target.result);
                    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                    const page = await pdf.getPage(1);

                    // 获取视口信息
                    const viewport = page.getViewport({ scale: 1 });

                    // 转换目标区域坐标到左下角原点
                    const adjustedArea = {
                        ...targetArea,
                        // 保持原物理位置，需要转换y坐标
                        y: viewport.height - targetArea.y - targetArea.height
                    };

                    const textContent = await page.getTextContent();

                    let extractedText = '';
                    textContent.items.forEach((item) => {
                        const tx = item.transform[4];
                        const ty = item.transform[5];

                        if (tx >= adjustedArea.x &&
                            ty >= adjustedArea.y &&
                            tx <= adjustedArea.x + adjustedArea.width &&
                            ty <= adjustedArea.y + adjustedArea.height) {
                            extractedText += item.str + ' ';
                        }
                    });

                    resultDiv.innerHTML = `提取结果：${extractedText || '未找到文字'}`;
                } catch (error) {
                    resultDiv.innerHTML = `处理失败：${error.message}`;
                }
            };
            reader.readAsArrayBuffer(file);
        });
    </script>
</body>

</html>
```

## 二、参数配置

### Worker

- [No "GlobalWorkerOptions.workerSrc" specified.](https://github.com/mozilla/pdf.js/issues/10478#issuecomment-2242664642)
- [导入脚本作为 Worker](https://cn.vite.dev/guide/assets#importing-script-as-a-worker)
- [带有查询后缀的导入](https://cn.vite.dev/guide/features#import-with-query-suffixes)

```typescript
import workerSrc from 'pdfjs-dist/build/pdf.worker?worker&url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
```

