# 赛博名片 - 数据导出完整指南

## 📊 你的数据存储在哪里？

你的应用使用了 **3种数据存储方式**：

### 1. ✅ EmailJS（主要方式 - 推荐）
所有用户提交都会发送邮件到：**yefangu@gmail.com**
- ✅ 最可靠，所有数据都在邮箱
- ✅ 包含完整的用户信息
- ✅ 支持批量导出

### 2. ⚠️ localStorage（仅本地浏览器）
- ❌ 数据存储在用户自己的浏览器中
- ❌ 无法看到其他用户的提交
- ⚠️ `admin.html` 管理后台只能看到**当前浏览器**的数据

### 3. ⚠️ Google Sheets（可能失败）
- ⚠️ 可能因 CORS 限制导致提交失败
- ⚠️ 需要检查 Google Apps Script 配置

---

## 🎯 推荐：从邮箱导出数据（3种方法）

### 方法1：使用邮件解析工具（最简单）✅

1. **访问工具页面**：
   ```
   https://cyber-card.pages.dev/email-parser.html
   ```

2. **登录 Gmail**：
   - 打开 [Gmail](https://mail.google.com)
   - 搜索：`赛博名片提交` 或 `from:service@emailjs.com`

3. **复制邮件内容**：
   - 打开邮件
   - 全选（Ctrl+A / Cmd+A）
   - 复制（Ctrl+C / Cmd+C）
   - 可以连续复制多封邮件

4. **粘贴并导出**：
   - 粘贴到工具页面的文本框
   - 点击"解析邮件数据"
   - 点击"导出为 Excel (CSV)"

5. **打开文件**：
   - 用 Excel / WPS / Google Sheets 打开导出的 CSV 文件
   - 完整的用户数据表格！

---

### 方法2：Gmail 批量导出（高级）

**步骤1：使用 Gmail Takeout**
1. 访问：https://takeout.google.com/
2. 只选择"邮件"
3. 筛选标签：搜索包含 "赛博名片" 的邮件
4. 导出为 MBOX 格式

**步骤2：解析 MBOX 文件**
- 使用工具：[mbox-viewer](https://www.mboxviewer.com/) 
- 或者 Python 脚本（需要技术支持）

---

### 方法3：手动整理（适合数据量小）

如果用户数量不多（<20人），可以：

1. 登录 Gmail
2. 搜索：`赛博名片提交`
3. 逐个打开邮件
4. 复制信息到 Excel 表格

**Excel 表格列名：**
```
提交时间 | 姓名 | 公司 | 职位 | 手机 | 微信 | 邮箱 | AI方向 | 出海计划 | 目标市场 | 算力需求 | 业务介绍
```

---

## 🔧 本地管理后台使用说明

**访问地址**：https://cyber-card.pages.dev/admin.html

**功能**：
- ✅ 查看当前浏览器存储的数据
- ✅ 导出 CSV / Excel / JSON
- ✅ 数据统计
- ⚠️ **仅显示当前浏览器的数据**（不是所有用户）

**适用场景**：
- 测试时查看自己提交的数据
- 开发调试
- ❌ 不适合查看所有用户的提交

---

## 📧 EmailJS 配置检查

当前配置：
```javascript
Service ID: service_tftqemj
Template ID: template_yhsdgst
Public Key: 86WCUvA3DgipnKdN3
收件邮箱: yefangu@gmail.com
```

**验证邮件是否成功发送**：
1. 登录 [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. 查看 Email Services → service_tftqemj
3. 检查发送记录和配额

---

## 🎨 数据字段说明

每条用户数据包含以下字段：

### 业务调研信息
- `aiDirection` - AI 方向（多选）
- `isOversea` - 出海计划
- `overseaMarkets` - 目标市场
- `cloudNeed` - 算力需求
- `businessIntro` - 业务介绍

### 用户基础信息
- `realName` - 姓名
- `company` - 公司
- `title` - 职位
- `phone` - 手机号
- `wechat` - 微信号
- `email` - 邮箱

### 名片展示内容
- `displayName` - 展示名称
- `titles` - 职业身份
- `organization` - 所属机构
- `bio` - 个人简介
- `skills` - 技能标签
- `templateId` - 选择的模板

### 元数据
- `submitTime` - 提交时间
- `id` - 记录 ID

---

## 🚀 快速开始（5分钟导出数据）

1. ✅ 访问：https://cyber-card.pages.dev/email-parser.html
2. ✅ 登录 Gmail，搜索 `赛博名片提交`
3. ✅ 复制邮件内容，粘贴到工具
4. ✅ 点击"导出为 Excel"
5. ✅ 完成！打开 CSV 文件查看数据

---

## ❓ 常见问题

**Q: 为什么 admin.html 看不到其他用户的数据？**
A: 因为 localStorage 只存储在当前浏览器，每个用户的数据在他们自己的浏览器里。真正的数据在你的邮箱！

**Q: 如何查看历史所有提交？**
A: 登录 yefangu@gmail.com，搜索 "赛博名片提交"，所有数据都在邮件里。

**Q: 可以自动导出吗？**
A: 可以！使用 email-parser.html 工具，批量复制邮件内容即可一键导出。

**Q: 数据安全吗？**
A: 所有数据通过 HTTPS 加密传输，存储在 EmailJS 和 Gmail，都是安全的。

---

## 📞 技术支持

如有问题，请检查：
1. EmailJS 配额是否用完：https://dashboard.emailjs.com/
2. Gmail 邮件是否被过滤到垃圾箱
3. 网络连接是否正常

---

**最后更新**：2026-04-23
**文档版本**：v1.0
