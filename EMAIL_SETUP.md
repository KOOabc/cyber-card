# 📧 EmailJS 邮件收集配置指南

通过 EmailJS 自动将表单数据发送到您的邮箱，完全免费（每月 200 封）。

---

## 🚀 快速开始（5分钟配置）

### 第一步：注册 EmailJS

1. 访问 **https://www.emailjs.com/**
2. 点击 **「Sign Up Free」** 注册账号
3. 使用邮箱注册并验证

### 第二步：创建邮件服务

1. 登录后，点击左侧菜单 **「Email Services」**
2. 点击 **「Add New Service」**
3. 选择您的邮箱提供商：
   - Gmail
   - Outlook / Hotmail
   - Yahoo
   - 或其他 SMTP
4. 按提示连接您的邮箱（授权 EmailJS 发送邮件）
5. 记录下 **Service ID**（类似 `service_xxxxxx`）

### 第三步：创建邮件模板

1. 点击左侧菜单 **「Email Templates」**
2. 点击 **「Create New Template」**
3. 模板名称：`Cyber Card Submission`
4. **复制以下模板内容**：

```
主题：🎯 新的赛博名片提交 - {{display_name}}

内容：

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 赛博名片 - 用户提交数据
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【业务调研信息】
AI 方向：{{ai_direction}}
出海计划：{{is_oversea}}
目标市场：{{oversea_markets}}
算力需求：{{cloud_need}}
业务介绍：{{business_intro}}

【用户基础信息】
真实姓名：{{real_name}}
公司名称：{{company}}
职位：{{title}}
手机号：{{phone}}
邮箱：{{email}}

【名片展示内容】
展示名称：{{display_name}}
职业身份：{{titles}}
所属机构：{{organization}}
个人简介：{{bio}}
技能标签：{{skills}}
选择模板：{{template_id}}

【提交信息】
提交时间：{{submit_time}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

此邮件由赛博名片生成平台自动发送。
```

5. 点击 **「Save」**
6. 记录下 **Template ID**（类似 `template_xxxxxx`）

### 第四步：获取 Public Key

1. 点击左侧菜单 **「Account」**
2. 找到 **「General」** 标签页
3. 复制 **Public Key**（类似 `xxxxxxxxxxxxxx`）

### 第五步：配置代码

打开 `src/App.tsx`，找到 **第 383-385 行**：

```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
```

替换为您刚才记录的值：

```typescript
const EMAILJS_SERVICE_ID = 'service_xxxxxx'      // 第二步的 Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxx'    // 第三步的 Template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxx'      // 第四步的 Public Key
```

**同时修改第 388 行**，改为您的接收邮箱：

```typescript
to_email: 'your-email@example.com',  // 🔧 改为您的邮箱
```

### 第六步：重启服务器

```bash
npm run dev
```

---

## ✅ 完成！

现在当用户提交表单时，您会收到一封包含所有数据的邮件！

---

## 📊 邮件效果预览

**主题**：🎯 新的赛博名片提交 - 张三

**内容**：格式化的表单数据，包含所有填写信息

---

## 💰 价格说明

- ✅ **免费版**：200 封/月
- 💎 **付费版**：$15/月起（1000 封）

对于个人使用，免费版完全够用。

---

## 🔒 安全提示

⚠️ **EmailJS Public Key 是公开的**，可以在前端代码中使用，不会泄露您的邮箱密码。

但建议：
- 在 EmailJS 后台限制来源域名（Allowed Origins）
- 定期检查邮件发送量，防止滥用

---

## 🐛 常见问题

### Q: 没有收到邮件？
A: 检查垃圾邮件文件夹，或在 EmailJS 后台查看发送日志。

### Q: 提示 "Service ID not found"？
A: 检查配置的 Service ID 是否正确。

### Q: 想收到多个邮箱？
A: 在模板设置中添加多个收件人，或使用邮件转发。

---

## 📝 降级策略

如果 EmailJS 配置失败，系统会自动：
1. 尝试飞书 Webhook（如已配置）
2. 最后降级到复制剪贴板

确保至少有一种数据收集方式可用！

---

## 🎯 下一步

配置完成后，测试提交一次表单，确认邮件能正常收到。

如有问题，请查看浏览器控制台（F12）的错误信息。
