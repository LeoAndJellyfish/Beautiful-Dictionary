# EdgeOne 部署指南

## 项目概述

这是一个基于React的美丽词典应用，现在已适配EdgeOne平台部署。项目包含：
- 前端React应用
- Edge Functions API服务
- 字典查询和AI释义功能

## Edge Functions 架构

### API路由映射

部署到EdgeOne后，API路由将自动映射：

| 文件路径 | 访问路由 | 功能描述 |
|---------|---------|---------|
| `/edge-functions/api/dictionary/[word].js` | `/api/dictionary/:word` | 字典查询API |
| `/edge-functions/api/ai/[word].js` | `/api/ai/:word` | AI释义API |
| `/edge-functions/api/query/[word].js` | `/api/query/:word` | 统一查询API |

### 环境变量配置

在EdgeOne平台需要配置以下环境变量：

- `OPENAI_API_KEY`: 零一万物(01-AI)的API密钥

## 部署步骤

### 1. 准备代码仓库

确保代码已推送到GitHub仓库。

### 2. 在EdgeOne平台部署

1. 登录 [EdgeOne控制台](https://console.cloud.tencent.com/edgeone)
2. 创建新的Pages项目
3. 连接你的GitHub仓库
4. 配置构建设置：
   - 构建命令: `npm run build`
   - 输出目录: `build`
5. 在环境变量中设置 `OPENAI_API_KEY`
6. 开始部署

### 3. 验证部署

部署完成后，访问以下URL测试功能：

- 主应用: `https://your-domain.edgeone.pages.dev/`
- 字典API: `https://your-domain.edgeone.pages.dev/api/dictionary/hello`
- AI API: `https://your-domain.edgeone.pages.dev/api/ai/hello`
- 统一查询: `https://your-domain.edgeone.pages.dev/api/query/hello`

## 本地开发

### 开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

## API接口说明

### 1. 字典查询 API

**端点**: `GET /api/dictionary/:word`

**响应示例**:
```json
{
  "word": "hello",
  "meaning": "used as a greeting or to begin a telephone conversation",
  "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
  "source": "dictionary-api"
}
```

### 2. AI释义 API

**端点**: `GET /api/ai/:word`

**响应示例**:
```json
{
  "word": "hello",
  "meaning": "你好，这是一个常见的问候语。",
  "source": "ai-api"
}
```

### 3. 统一查询 API

**端点**: `GET /api/query/:word`

**响应示例**:
```json
{
  "word": "hello",
  "dictionary": {
    "meaning": "used as a greeting or to begin a telephone conversation",
    "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
    "source": "dictionary-api",
    "success": true
  },
  "ai": {
    "meaning": "你好，这是一个常见的问候语。",
    "source": "ai-api",
    "success": true
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 优势

### 安全性提升
- API密钥不再暴露在前端代码中
- 所有敏感操作都在Edge Functions中安全处理

### 性能优化
- 边缘节点部署，降低访问延迟
- 自动负载均衡和弹性扩容

### 开发体验
- 统一的API接口设计
- 完整的错误处理机制
- 支持CORS跨域访问

## 故障排除

### 常见问题

1. **API调用失败**
   - 检查环境变量 `OPENAI_API_KEY` 是否正确设置
   - 验证网络连接和API服务可用性

2. **CORS错误**
   - Edge Functions已配置CORS支持
   - 检查前端URL是否正确

3. **构建失败**
   - 检查Node.js版本兼容性
   - 验证package.json依赖配置

## 技术支持

如有问题，请参考：
- [EdgeOne官方文档](https://edgeone.cloud.tencent.com/pages/document/184787623566569472)
- 项目GitHub Issues
- EdgeOne技术支持