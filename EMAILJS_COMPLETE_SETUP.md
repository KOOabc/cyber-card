# EmailJS 完整配置指南（包含截图说明）

## 🎯 当前状态
- ✅ Template ID: `template_yhsdgst`
- ✅ Service ID: `service_tftqemj`
- ✅ Public Key: `86WCUvA3DgipnKdN3`
- ❌ 测试邮件未发送到 yefangu@gmail.com

---

## 🔧 问题诊断与解决

### 问题 1：测试邮件未收到

可能原因：
1. ❌ Email Service 未正确连接
2. ❌ 模板参数未配置
3. ❌ 邮箱地址未验证

---

## 📧 正确配置步骤（详细版）

### 步骤 1：检查 Email Service 连接

1. 在 EmailJS 左侧菜单，点击 **"Email Services"**
2. 找到 `service_tftqemj`
3. 检查状态：
   - ✅ **已连接**：显示绿色勾选，并显示邮箱地址
   - ❌ **未连接**：需要点击 "Connect" 按钮

#### 如果未连接，执行以下操作：

**选项 A：连接 Gmail（推荐）**
1. 点击 "Add New Service"
2. 选择 "Gmail"
3. 点击 "Connect Account"
4. 使用你的 Google 账号授权（建议使用 yefangu@gmail.com）
5. 授权成功后，Service ID 会自动生成

**选项 B：连接其他邮件服务**
- Outlook
- Yahoo Mail
- 或其他 SMTP 服务

### 步骤 2：配置邮件模板

#### 2.1 编辑模板 `template_yhsdgst`

1. 点击 **"Email Templates"**
2. 找到并点击 `template_yhsdgst`
3. 确保模板内容正确

#### 2.2 设置 Template Settings（重要！）

在模板编辑页面，找到 **"Settings"** 标签页：

**To Email（收件人）：**
```
{{to_email}}
```
或直接填写：
```
yefangu@gmail.com
```

**From Name（发件人名称）：**
```
赛博名片系统
```

**Subject（主题）：**
```
{{subject}}
```

**Reply To（回复地址）：**
```
{{email}}
```
（如果没有这个字段可以留空）

#### 2.3 设置 Content（内容） - Code Mode

确保使用 **Code Mode**，内容如下：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  {{{html_content}}}
</body>
</html>
```

**注意事项：**
- 使用 **三个大括号** `{{{html_content}}}`（不要用两个）
- 三个大括号表示"不转义 HTML"，这样才能正确显示表格

### 步骤 3：配置测试参数

在模板编辑页面的右侧或底部，找到 **"Test"** 区域。

#### 3.1 添加测试参数

点击 "Add Parameter" 或在已有字段中填写：

| 参数名 (Name) | 值 (Value) |
|---------------|------------|
| `to_email` | `yefangu@gmail.com` |
| `subject` | `测试邮件 - 赛博名片提交` |
| `html_content` | 见下方 👇 |

#### 3.2 html_content 测试值

复制以下内容到 `html_content` 字段：

```html
<div style="padding: 20px; background-color: #f5f5f5;">
  <div style="background: white; border-radius: 8px; padding: 30px; max-width: 800px; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="color: #E85D24; margin-top: 0;">🎯 测试邮件</h2>
    <p style="color: #666; font-size: 16px;">这是一封测试邮件，如果你看到这封邮件，说明 EmailJS 配置成功！</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr style="background: #f9f9f9;">
        <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; width: 30%;">测试字段 1</td>
        <td style="padding: 12px; border: 1px solid #ddd;">测试值 1</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">测试字段 2</td>
        <td style="padding: 12px; border: 1px solid #ddd;">测试值 2</td>
      </tr>
    </table>
    <div style="margin-top: 30px; padding: 15px; background: #fff8f0; border-left: 4px solid #E85D24;">
      <p style="margin: 0; color: #666; font-size: 14px;">✅ EmailJS 配置测试成功！</p>
    </div>
  </div>
</div>
```

### 步骤 4：发送测试邮件

1. 填写完所有测试参数后
2. 点击 **"Send Test Email"** 按钮
3. 等待 5-10 秒
4. 检查邮箱 `yefangu@gmail.com`
5. **如果没收到，检查垃圾邮件文件夹**

### 步骤 5：保存模板

确认测试邮件发送成功后：
1. 点击 **"Save"** 保存模板
2. 记录 Template ID: `template_yhsdgst`

---

## 🐛 故障排查

### 情况 1：点击 "Send Test" 后提示错误

**可能原因：**
- Email Service 未连接或已过期

**解决方法：**
1. 前往 "Email Services" 页面
2. 点击 `service_tftqemj`
3. 重新授权连接

### 情况 2：测试邮件成功发送，但没收到

**可能原因：**
- 邮件被识别为垃圾邮件
- 邮箱地址错误
- Gmail 过滤规则

**解决方法：**
1. 检查垃圾邮件文件夹
2. 在 Gmail 中搜索 "from:@emailjs.com"
3. 检查 EmailJS Dashboard 中的 "Email Logs" 查看发送记录

### 情况 3：测试显示成功，但实际未发送

**可能原因：**
- EmailJS 免费额度用完（每月 200 封）
- Service 配置问题

**解决方法：**
1. 前往 EmailJS Dashboard 查看 "Usage" 或 "Statistics"
2. 检查是否超过免费额度
3. 如果超额，等待下月重置或升级付费计划

---

## ✅ 验证配置是否正确

### 检查清单

- [ ] Email Service 已连接并显示绿色状态
- [ ] 模板 `template_yhsdgst` 已创建并保存
- [ ] 模板使用 Code Mode 编辑
- [ ] Content 中使用 `{{{html_content}}}` 三个大括号
- [ ] To Email 设置为 `{{to_email}}` 或固定邮箱
- [ ] Subject 设置为 `{{subject}}`
- [ ] 测试参数已填写完整
- [ ] 测试邮件发送成功
- [ ] 收到测试邮件（检查垃圾邮件）
- [ ] 代码中的 Template ID 已更新为 `template_yhsdgst`

---

## 🚀 完成后测试整个流程

### 在应用中测试

1. 保存所有更改
2. 重启开发服务器：
   ```bash
   npm run dev
   ```
3. 打开应用并填写表单
4. 点击「确认，生成名片」
5. 打开浏览器控制台（F12）查看日志
6. 检查邮箱 `yefangu@gmail.com`

### 预期结果

**控制台日志：**
```
📋 开始提交数据...
🚀 开始提交数据到 Google Sheets...
✅ 请求已发送（iframe 方式）
✅ 邮件发送成功（HTML 表格格式）
✅ 数据已保存到本地存储，总计: 1 条
📊 提交结果汇总:
  Google Sheets: ✅
  邮件 (HTML表格): ✅
  本地存储: ✅
✅ 数据已通过邮件发送到 yefangu@gmail.com
```

**收到的邮件：**
- 主题：🎯 新的赛博名片提交 - [用户名]
- 内容：精美的 HTML 表格，包含所有用户提交的数据

---

## 📞 需要更多帮助？

如果按照以上步骤操作后仍然有问题，请检查：

1. **EmailJS Dashboard - Email Logs**
   - 查看最近的发送记录
   - 查看错误信息

2. **浏览器控制台（F12）**
   - 查看是否有 JavaScript 错误
   - 查看 Network 标签中的请求状态

3. **EmailJS Account**
   - 确认账户状态正常
   - 确认没有被限制或暂停

---

## 💡 快速测试脚本（可选）

如果想快速测试 EmailJS 是否工作，可以在浏览器控制台运行：

```javascript
emailjs.send(
  'service_tftqemj',
  'template_yhsdgst',
  {
    to_email: 'yefangu@gmail.com',
    subject: '快速测试',
    html_content: '<div style="padding:20px;background:white;"><h2>测试成功!</h2></div>'
  },
  '86WCUvA3DgipnKdN3'
).then(
  (response) => {
    console.log('✅ 测试成功!', response.status, response.text);
    alert('邮件已发送，请检查收件箱');
  },
  (error) => {
    console.error('❌ 测试失败:', error);
    alert('发送失败: ' + error.text);
  }
);
```

在应用页面打开控制台（F12），粘贴并运行上述代码，可以直接测试邮件功能。

---

**最后更新：** 2026-04-16
**Template ID：** `template_yhsdgst`
**状态：** 🟡 等待测试验证
