<h2 align="center">🎉 QK-MONEY 后台管理系统 UI 模板</h2>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/Vue-3.x-green" alt="Vue">
  <img src="https://img.shields.io/badge/Vite-4.x-orange" alt="Vite">
  <img src="https://img.shields.io/badge/Element_Plus-2.x-blue" alt="Element Plus">
</p>

<p align="center">Money - VueJS 3 & Element Plus Admin UI Template</p>

> 配套后端：[QK-MONEY](https://github.com/ycf1998/qk-money)

![Dashboard Preview](README.assets/image-20231014155427084.png)

## ✨ 特性

- **现代化技术栈**：基于 Vue 3、Vite、Pinia 和 Element Plus，代码结构清晰易维护。
- **响应式设计**：适配各种屏幕尺寸，从桌面到移动端。
- **Mock 数据支持**：纯前端开发时，支持 Mock 数据，无需依赖后端。

## 📦 技术栈

- [Vue 3](https://github.com/vuejs/vue-next) - 渐进式 JavaScript 框架。
- [Vue Router](https://router.vuejs.org/zh/) - 官方路由管理器。
- [Pinia](https://pinia.vuejs.org/zh/) - 轻量级状态管理库。
- [Element Plus](https://element-plus.org/zh-CN) - 基于 Vue 3 的 UI 组件库。
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的 CSS 框架。
- [Vite](https://vitejs.dev) - 下一代前端构建工具。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地启动

```bash
npm run dev
```

纯前端开发时，修改 [.env.development](./.env.development) 配置

```properties
# 填写该值开启纯前端模式，所有请求不会真实触发，使用 mock.js 里的数据。可选值：alert/log
VITE_ONLY_UI=log
VITE_TITLE=麦尼后台管理系统
VITE_BASE_URL=http://localhost:9000/qk-money
```

### 打包

```bash
npm run build
```