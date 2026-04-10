# 🚀 Vercel 部署指南

让您的赛博名片生成平台在 5 分钟内上线，其他人都能访问！

---

## ✅ 准备工作

项目已经准备好，现在只需 3 步：

1. 注册 Vercel 账号
2. 连接 GitHub 仓库
3. 一键部署

---

## 📝 详细步骤

### 第一步：创建 GitHub 仓库

1. 访问 **https://github.com/new**
2. 创建新仓库：
   - Repository name: `cyber-card`
   - Description: `赛博名片生成平台`
   - 选择 **Public** 或 **Private**
   - **不要**勾选任何初始化选项
3. 点击 **Create repository**

### 第二步：推送代码到 GitHub

在终端执行以下命令（项目已经初始化好 Git）：

```bash
# 进入项目目录
cd /Users/yefangu/Downloads/lesson66/cyber-card-new

# 添加 GitHub 仓库地址（替换为您的仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/cyber-card.git

# 推送代码
git branch -M main
git push -u origin main
```

**注意**：将 `YOUR_USERNAME` 替换为您的 GitHub 用户名

### 第三步：部署到 Vercel

1. 访问 **https://vercel.com/signup**
2. 选择 **Continue with GitHub** 登录
3. 授权 Vercel 访问您的 GitHub
4. 点击 **Import Project**
5. 选择 **Import Git Repository**
6. 找到 `cyber-card` 仓库，点击 **Import**
7. 配置项目：
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
8. 点击 **Deploy**

---

## 🎉 完成！

部署完成后，Vercel 会给您一个网址，类似：

```
https://cyber-card.vercel.app
```

或

```
https://cyber-card-abc123.vercel.app
```

这个网址可以分享给任何人，他们都能访问！

---

## ⚡ 自动更新

以后每次修改代码，只需：

```bash
git add .
git commit -m "更新描述"
git push
```

Vercel 会自动重新部署，无需手动操作！

---

## 🌐 绑定自定义域名（可选）

如果您有自己的域名（如 `cybercard.com`）：

1. 在 Vercel 项目设置中点击 **Domains**
2. 添加您的域名
3. 按照提示在域名商（阿里云/腾讯云）配置 DNS

---

## 🔒 环境变量（可选）

如果您想隐藏 EmailJS 配置：

1. 在 Vercel 项目设置中点击 **Environment Variables**
2. 添加：
   - `VITE_EMAILJS_SERVICE_ID` = `service_tftqemj`
   - `VITE_EMAILJS_TEMPLATE_ID` = `template_e5usdvi`
   - `VITE_EMAILJS_PUBLIC_KEY` = `86WCUvA3DgipnKdN3`
3. 修改代码使用环境变量：
   ```typescript
   const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
   ```

---

## 📊 访问统计

Vercel 提供免费的访问统计：

- 访问量
- 访问来源
- 性能数据

在项目 Dashboard 中查看。

---

## 💰 费用

- ✅ **完全免费**（个人项目）
- 免费额度：
  - 无限部署
  - 100 GB 带宽/月
  - 无限访问量

---

## 🐛 常见问题

### Q: 部署后页面空白？
A: 检查浏览器控制台错误，可能是路径问题。

### Q: 修改代码后没更新？
A: 确保 `git push` 成功，查看 Vercel Dashboard 部署状态。

### Q: EmailJS 不工作？
A: 检查 EmailJS 后台的 Allowed Origins，添加您的 Vercel 域名。

---

## 📞 需要帮助？

- Vercel 文档：https://vercel.com/docs
- 部署问题：查看 Vercel 部署日志

---

## 🎯 快速部署命令（全流程）

```bash
# 1. 配置 Git 用户信息（首次使用）
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 2. 创建 GitHub 仓库后，添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/cyber-card.git

# 3. 推送代码
git push -u origin main

# 4. 访问 vercel.com 部署
```

然后在 Vercel 网站点击 Import 即可！
