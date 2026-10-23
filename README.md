# Beautiful Dictionary

更美观的字典。React 前端与 EdgeOne Functions 提供单词查询。

使用 Node.js 22.12 或更新版本。

`npm ci` 安装锁定依赖；`npm start` 启动仅监听本机的开发服务；`npm run build` 生成 `build/` 静态文件。

生产构建采用 Vite 6.4.5，移除已停止维护的 CRA/Webpack 开发及测试工具。现有页面、Tailwind 样式、API 路由和 EdgeOne 输出目录保持兼容。Axios 与 Framer Motion 未在应用中使用，已移除。API 密钥配置在 EdgeOne 服务端环境变量中。
