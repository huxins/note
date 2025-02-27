

- **坐标系转换**：PDF默认使用**左下角为原点**的坐标系，而网页通常使用左上角，需注意是否需要翻转Y轴。
- **文本项结构**：`item.str` 是文本内容，`item.transform` 包含位置和缩放信息（数组中的索引4和5是X和Y坐标）。



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



