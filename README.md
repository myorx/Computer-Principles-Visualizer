# 计算机原理可视化

一个基于 Vue 3 的交互式学习网站，通过图文、动画和动手演示解释计算机系统中的数据表示、指令执行、内存管理和编译过程。

## 功能

- 展示整数补码、浮点数表示与指令集设计
- 介绍 x86 启动流程、内存分段与分页、处理器计算及 I/O
- 演示顺序、分支、循环和跳转指令
- 查看 RISC-V 指令格式、Java 运行时与字节码
- 使用本机 GCC 将 C++ 示例编译为汇编代码
- 通过 Compiler Explorer API 查询编译器并查看编译结果

## 技术栈

Vue 3、Vue Router、Element Plus、Vite、Express。

## 项目结构

```text
src/
├── assets/       # 图片与样式
├── components/   # 可复用的展示和交互组件
├── router/       # 页面路由
└── views/        # 各主题页面
server.cjs        # 本地编译接口及构建产物静态服务
examples/         # 编译演示用的 C++ 示例
```

## 本地开发

需要 Node.js 20.19+ 或 22.12+，以及 npm。使用本地 C++ 编译功能时，还需要将 `g++` 加入系统 PATH。

```bash
npm ci
```

在两个终端中分别启动编译服务和前端：

```bash
# 终端 1：本地编译服务，监听 127.0.0.1:3001
npm run dev:server
```

```bash
# 终端 2：Vite 开发服务器，默认地址 http://localhost:5173
npm run dev
```

访问前端地址即可使用网站。Vite 会将 `/compile` 请求转发给本地编译服务。无需使用本地编译功能时，只启动前端也可以浏览其他内容。

## 构建与运行

```bash
npm run build
npm start
```

构建结果保存在 `dist/`，`npm start` 会在 `http://127.0.0.1:3001` 提供页面和本地编译接口。Compiler Explorer 功能需要浏览器能够访问其外部 API。

## 使用范围

本地编译接口会处理用户输入的 C++ 源码，因此仅绑定到本机地址。请勿将该接口直接暴露到公网。编译任务有输入大小和运行时间限制，但不构成安全沙箱。
