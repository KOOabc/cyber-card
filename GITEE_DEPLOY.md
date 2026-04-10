# 🚀 Gitee Pages 部署指南（国内免费方案）

完全免费，无需实名，国内访问速度快！

---

## 📝 部署步骤（10 分钟）

### 第一步：注册 Gitee 账号

1. 访问 **https://gitee.com/**
2. 点击右上角 **「注册」**
3. 使用手机号或邮箱注册（无需实名认证）

---

### 第二步：创建仓库

1. 登录后，点击右上角 **「+」** → **「新建仓库」**
2. 填写信息：
   - **仓库名称**：`cyber-card`
   - **仓库介绍**：赛博名片生成平台
   - **是否开源**：选择 **公开**（必须公开才能使用 Pages）
   - **初始化仓库**：不勾选任何选项
3. 点击 **「创建」**

---

### 第三步：推送代码到 Gitee

打开终端，运行以下命令：

```bash
# 进入项目目录
cd /Users/yefangu/Downloads/lesson66/cyber-card-new

# 添加 Gitee 远程仓库（替换 YOUR_USERNAME）
git remote add gitee https://gitee.com/YOUR_USERNAME/cyber-card.git

# 推送代码
git push -u gitee main
```

**注意**：将 `YOUR_USERNAME` 替换为您的 Gitee 用户名

如果提示需要登录，输入您的 Gitee 账号密码。

---

### 第四步：开启 Gitee Pages

1. 在 Gitee 仓库页面，点击 **「服务」** → **「Gitee Pages」**
2. 配置：
   - **部署目录**：选择 `dist`（重要！）
   - **强制使用 HTTPS**：勾选
3. 点击 **「启动」** 按钮
4. 等待 1-2 分钟部署完成

---

## 🎉 完成！

部署成功后，会显示您的网站地址：

```
https://YOUR_USERNAME.gitee.io/cyber-card
```

这个网址国内访问速度很快，可以分享给任何人！

---

## 🔄 更新网站

以后修改代码后，运行：

```bash
# 1. 重新构建
npm run build

# 2. 提交更改
git add .
git commit -m "更新内容"
git push gitee main

# 3. 在 Gitee Pages 页面点击「更新」按钮
```

⚠️ **注意**：Gitee Pages 不会自动更新，每次推送代码后需要手动点击「更新」按钮。

---

## ⚙️ 重要配置

### 构建配置已完成
项目已经构建好 `dist` 目录，直接使用即可。

### EmailJS 配置
部署完成后，需要添加 Gitee Pages 域名到 EmailJS 白名单：
1. 登录 EmailJS
2. 添加域名：`https://YOUR_USERNAME.gitee.io`

---

## 📊 对比方案

| 平台 | 访问速度 | 费用 | 实名 | 自动部署 |
|------|---------|------|------|----------|
| **Gitee Pages** | ⭐⭐⭐⭐⭐ | 免费 | 不需要 | 手动更新 |
| Vercel | ⭐⭐ | 免费 | 不需要 | 自动 |
| 腾讯云 | ⭐⭐⭐⭐⭐ | 免费 | 需要 | 手动 |

---

## 🐛 常见问题

### Q: 显示 404？
A: 确认部署目录选择的是 `dist`，不是根目录。

### Q: 样式丢失？
A: 检查 `vite.config.ts` 中的 `base` 配置（已经处理好）。

### Q: 无法访问？
A: 确认仓库是「公开」状态，私有仓库无法使用 Pages。

### Q: 需要审核吗？
A: 正常内容无需审核，可以直接使用。

---

## 🎯 快速命令

```bash
# 完整流程
cd /Users/yefangu/Downloads/lesson66/cyber-card-new
npm run build
git add dist -f
git commit -m "Add build files"
git remote add gitee https://gitee.com/YOUR_USERNAME/cyber-card.git
git push -u gitee main
```

然后在 Gitee 网站开启 Pages 服务即可！

---

需要帮助？查看 Gitee Pages 官方文档：https://gitee.com/help/articles/4136
