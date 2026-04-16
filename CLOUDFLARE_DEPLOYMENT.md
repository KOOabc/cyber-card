# Cloudflare Pages 部署指南

本项目已经配置好 Cloudflare Pages 部署和 Cloudflare Functions 代理。

## 📁 项目结构

```
cyber-card-new/
├── src/                    # 前端源码
│   └── App.tsx            # 主应用（已配置代理切换）
├── functions/             # Cloudflare Functions
│   ├── _middleware.js     # 中间件（CORS 配置）
│   └── api/
│       └── [[path]].js    # API 代理（处理 GMI Cloud API 请求）
├── dist/                  # 构建输出（部署到 Cloudflare）
└── package.json
```

## 🚀 部署步骤

### 1. 构建项目

```bash
npm run build
```

这会生成 `dist/` 目录，包含所有静态资源。

### 2. 部署到 Cloudflare Pages

有两种方式：

#### 方式 A：通过 Cloudflare Dashboard（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
3. 连接你的 Git 仓库（GitHub/GitLab）
4. 配置构建设置：
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 18 或更高
5. 点击 **Save and Deploy**

#### 方式 B：通过 Wrangler CLI

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署到 Cloudflare Pages
wrangler pages deploy dist --project-name=cyber-card
```

### 3. 验证部署

部署成功后，你会得到一个 URL，例如：
```
https://cyber-card.pages.dev
```

访问这个 URL，测试以下功能：
- ✅ 头像上传和显示（右侧显示，Flexbox 布局）
- ✅ AI 生成个人简介（通过 Cloudflare Functions 代理）
- ✅ 4 种名片模板正常显示

## 🔧 代理配置说明

### Cloudflare Functions 代理

位置：`functions/api/[[path]].js`

这个文件会自动处理所有 `/api/*` 请求，并转发到 GMI Cloud API：

```javascript
// 请求流程：
前端 → /api/chat/completions → Cloudflare Functions → GMI Cloud API
```

### 前端环境检测

位置：`src/App.tsx` 的 `generateBioWithAI()` 函数

```javascript
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const apiUrl = isDevelopment 
  ? 'https://api.gmi-serving.com/v1/chat/completions'  // 本地：直接调用
  : '/api/chat/completions'                           // 生产：使用代理
```

**开发环境**（localhost）：直接调用 GMI Cloud API
**生产环境**（Cloudflare）：通过 Functions 代理调用

## 🎨 头像布局修复

所有 4 个名片模板都已修复头像布局：

### 修复内容
- ✅ 头像移到右侧（使用 Flexbox 布局）
- ✅ 条件显示：只有上传头像时才显示头像区域
- ✅ 左侧文字区域 `flex: 1` 自动占满剩余空间
- ✅ 右侧头像固定宽度（80-90px），`flexShrink: 0` 防止压缩

### 模板尺寸
- **CyberOrangeCard**: 80px
- **NeoWhiteCard**: 90px
- **TerminalDarkCard**: 80px
- **ForestGreenCard**: 85px

## 🔍 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 测试 Cloudflare Functions（可选）
wrangler pages dev dist
```

## 📝 注意事项

1. **API Key 安全**：
   - 开发环境：API Key 在前端代码中（仅用于本地测试）
   - 生产环境：API Key 在 Cloudflare Functions 中（服务端，安全）

2. **CORS 处理**：
   - Cloudflare Functions 已配置 CORS 头
   - 支持所有来源（`Access-Control-Allow-Origin: *`）

3. **超时设置**：
   - 前端请求超时：30 秒
   - Cloudflare Functions 默认超时：10 秒（可在 wrangler.toml 中配置）

## 🆘 常见问题

### Q: AI 生成功能在生产环境不工作？
A: 检查以下几点：
1. Cloudflare Functions 是否部署成功（`/api/chat/completions` 应该返回响应）
2. 查看浏览器控制台和 Cloudflare Dashboard 的日志
3. 确认 API Key 在 `functions/api/[[path]].js` 中正确配置

### Q: 头像上传后不显示？
A: 检查：
1. 图片格式是否为 JPG/PNG/WebP
2. 图片大小是否超过 5MB
3. 浏览器控制台是否有错误

### Q: 本地开发时 AI 生成不工作？
A: 本地开发直接调用 GMI Cloud API，需要：
1. 网络连接正常
2. API Key 有效
3. 没有被防火墙阻止

## 📚 相关文档

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions 文档](https://developers.cloudflare.com/pages/functions/)
- [GMI Cloud API 文档](https://console.gmicloud.ai/)

## 🎉 完成！

现在你的赛博名片应用已经可以在 Cloudflare Pages 上运行了！
