# 🚀 快速部署指南 - Vercel CLI

已经准备好项目，现在只需 3 步即可上线！

---

## ⚡ 方法 1：Vercel CLI（推荐，最快）

### 步骤 1：登录 Vercel

在终端运行：

```bash
cd /Users/yefangu/Downloads/lesson66/cyber-card-new
npx vercel login
```

会打开浏览器，选择登录方式：
- **GitHub**（推荐）
- **GitLab**
- **Bitbucket**
- **Email**

### 步骤 2：部署

登录成功后，运行：

```bash
npx vercel --prod
```

按照提示操作：
1. `Set up and deploy?` → 回车（Yes）
2. `Which scope?` → 选择您的账号（回车）
3. `Link to existing project?` → N（首次部署）
4. `What's your project's name?` → 输入 `cyber-card` 或直接回车
5. `In which directory?` → 直接回车（当前目录）
6. `Detected Project Settings` → 回车（自动检测）

等待 1-2 分钟，部署完成！

### 步骤 3：获取网址

部署成功后会显示：

```
✅ Production: https://cyber-card-xxx.vercel.app [1m 23s]
```

这就是您的网站地址！分享给任何人都能访问。

---

## 🌐 方法 2：Vercel 网站部署

如果 CLI 遇到问题，使用网站部署：

### 步骤 1：推送到 GitHub

```bash
# 1. 在 GitHub 创建新仓库：https://github.com/new
# 仓库名：cyber-card

# 2. 推送代码
cd /Users/yefangu/Downloads/lesson66/cyber-card-new
git remote add origin https://github.com/YOUR_USERNAME/cyber-card.git
git push -u origin main
```

**注意**：将 `YOUR_USERNAME` 替换为您的 GitHub 用户名

### 步骤 2：导入到 Vercel

1. 访问 **https://vercel.com/new**
2. 使用 GitHub 登录
3. 点击 **Import Git Repository**
4. 选择 `cyber-card` 仓库
5. 点击 **Import**
6. 配置检查（自动识别 Vite）：
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. 点击 **Deploy**

等待 1-2 分钟，完成！

---

## 📱 部署后配置

### 1. EmailJS 域名白名单

⚠️ **重要**：需要将 Vercel 域名添加到 EmailJS 白名单

1. 登录 **https://dashboard.emailjs.com/**
2. 点击 **Account** → **General**
3. 找到 **Allowed Origins**
4. 添加您的 Vercel 域名：
   ```
   https://cyber-card-xxx.vercel.app
   ```
5. 点击 **Save**

不添加这个配置，邮件功能会失败！

### 2. 自定义域名（可选）

在 Vercel 项目设置中：
1. 点击 **Domains**
2. 添加您的域名
3. 配置 DNS（在域名商网站）

---

## 🔄 更新网站

以后修改代码后，只需：

```bash
cd /Users/yefangu/Downloads/lesson66/cyber-card-new
git add .
git commit -m "更新内容描述"
git push
```

**如果用 CLI 部署**，再运行：
```bash
npx vercel --prod
```

**如果用 GitHub 部署**，Vercel 会自动检测并重新部署！

---

## ✅ 检查清单

部署完成后，测试这些功能：

- [ ] 页面能正常打开
- [ ] 表单能填写提交
- [ ] 名片能正常生成
- [ ] 名片能下载
- [ ] 分享链接能复制
- [ ] **邮件能收到**（记得配置 EmailJS 白名单！）

---

## 💡 提示

### 免费额度
- ✅ 无限部署次数
- ✅ 100 GB 带宽/月
- ✅ 无限访问量

### 性能优化
Vercel 自动提供：
- 全球 CDN 加速
- 自动 HTTPS
- 图片优化
- 压缩优化

### 访问统计
在 Vercel Dashboard 查看：
- 访问量
- 访问来源
- 性能指标

---

## 🐛 常见问题

### Q: 部署失败怎么办？
A: 查看 Vercel 部署日志，通常是依赖问题。运行 `npm install` 确保依赖完整。

### Q: 网站打不开？
A: 检查浏览器控制台错误。可能是 EmailJS 未配置白名单。

### Q: 邮件收不到？
A: 
1. 检查 EmailJS 白名单是否添加了 Vercel 域名
2. 检查 EmailJS 模板是否创建
3. 查看浏览器控制台错误

### Q: 想换域名？
A: 在 Vercel 项目设置 → Domains 中添加新域名即可。

---

## 🎯 快速命令（全流程）

```bash
# 进入项目目录
cd /Users/yefangu/Downloads/lesson66/cyber-card-new

# 登录 Vercel
npx vercel login

# 部署到生产环境
npx vercel --prod

# 完成！复制显示的网址
```

---

需要帮助？
- Vercel 文档：https://vercel.com/docs
- EmailJS 文档：https://www.emailjs.com/docs

🎉 祝您部署成功！
