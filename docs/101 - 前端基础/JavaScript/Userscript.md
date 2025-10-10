# Userscript

## 一、脚本管理器

- [Tampermonkey](https://www.tampermonkey.net/)：多浏览器支持，功能全面，长期维护
- [Violentmonkey](https://violentmonkey.github.io/)：多浏览器支持，界面现代化，开源项目
- [Greasemonkey](https://addons.mozilla.org/zh-CN/firefox/addon/greasemonkey/)：仅限 Firefox，API 实现与其他管理器存在差异

## 二、元数据规范

### 基础元数据

```javascript
// ==UserScript==
// @name         脚本显示名称
// @namespace    作者域名（如：https://example.com）
// @version      版本号（推荐语义化版本，如：1.0.0）
// @description  脚本功能描述（建议 50 字以内）
// @author       作者名称
// @license      许可证（如：MIT）
```

### 运行控制

```javascript
// @match       *://*.example.com/*
// @include     /^https?:\/\/(www|api)\.site\.com\/.*/
// @exclude     *://admin.example.com/*
```

## Reference

- [GM 开发手册](https://jixunmoe.github.io/gmDevBook/)
- [Tampermonkey 文档](https://www.tampermonkey.net/documentation.php)
- [Violentmonkey API](https://violentmonkey.github.io/api/gm/)
- [Greasemonkey 文档](https://wiki.greasespot.net/Greasemonkey_Manual:API)

