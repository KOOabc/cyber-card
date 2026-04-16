# EmailJS 邮件模板配置指南

## 📧 重要提示

当前代码已经优化，会发送**精美的 HTML 表格格式邮件**。为了确保邮件正确显示，你需要在 EmailJS 后台配置邮件模板。

---

## 🔧 配置步骤

### 第 1 步：登录 EmailJS

访问：https://www.emailjs.com/
使用你的账号登录

### 第 2 步：找到邮件模板

1. 点击左侧菜单「Email Templates」
2. 找到模板 ID：`template_e5usdvi`
3. 点击「Edit」编辑

### 第 3 步：修改邮件模板内容

**将模板内容替换为以下代码：**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>新的赛博名片提交</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
  {{{html_content}}}
</body>
</html>
```

**注意：** 使用 `{{{html_content}}}` 三个大括号，这样 EmailJS 会保留 HTML 格式。

### 第 4 步：测试邮件模板

1. 在 EmailJS 后台点击「Test it」
2. 在测试参数中添加：
   ```json
   {
     "html_content": "<div style='padding: 20px; background: white;'><h2 style='color: #E85D24;'>测试邮件</h2><p>这是一封测试邮件</p></div>",
     "to_email": "yefangu@gmail.com"
   }
   ```
3. 点击「Send Test Email」
4. 检查邮箱是否收到测试邮件

### 第 5 步：保存模板

确认测试成功后，点击「Save」保存模板。

---

## 📝 模板变量说明

代码会自动传递以下变量到邮件模板：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `html_content` | **完整的 HTML 表格内容** | `<div>...</div>` |
| `to_email` | 接收邮箱 | `yefangu@gmail.com` |
| `subject` | 邮件主题 | `🎯 新的赛博名片提交 - 张三` |
| `ai_direction` | AI 方向（备用） | `大模型研发, AI应用` |
| `real_name` | 真实姓名（备用） | `张三` |
| ... | 其他字段（备用） | ... |

**主要使用 `html_content`**，其他字段作为备用（如果模板需要）。

---

## ✅ 邮件效果预览

配置完成后，用户提交表单时会收到类似这样的邮件：

---

**主题：** 🎯 新的赛博名片提交 - 张三

**邮件内容：**

<div style="background: #f5f5f5; padding: 20px;">
  <div style="background: white; border-radius: 8px; padding: 30px; max-width: 800px; margin: 0 auto;">
    <h2 style="color: #E85D24;">🎯 新的赛博名片提交</h2>
    <p style="color: #666;">提交时间: 2026/04/16 14:30:25</p>
    
    <h3 style="color: #333; border-bottom: 2px solid #E85D24;">📋 业务调研信息</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f9f9f9;">
        <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">AI 方向</td>
        <td style="padding: 12px; border: 1px solid #ddd;">大模型研发, AI应用开发</td>
      </tr>
      <!-- 更多行... -->
    </table>
    
    <!-- 更多表格... -->
  </div>
</div>

---

## 🚨 常见问题

### Q1: 邮件中只显示 `{{{html_content}}}`，没有实际内容？
**A:** 确保使用 **三个大括号** `{{{html_content}}}`，而不是两个 `{{html_content}}`。三个大括号表示不转义 HTML。

### Q2: 邮件格式乱了，没有样式？
**A:** 检查邮件模板中是否包含了完整的 HTML 结构（`<html>`, `<body>` 标签），以及是否使用了 `{{{html_content}}}`。

### Q3: 邮件没有收到？
**A:** 
1. 检查垃圾邮件文件夹
2. 确认 EmailJS 账户还有发送额度（免费版每月 200 封）
3. 查看浏览器控制台是否有错误日志

### Q4: 如何修改接收邮箱？
**A:** 编辑 `src/App.tsx`，找到第 1162 行：
```typescript
to_email: 'yefangu@gmail.com',
```
修改为你的邮箱地址。

### Q5: 能否发送到多个邮箱？
**A:** 可以！在 EmailJS 模板设置中，将「To Email」字段设置为多个邮箱（用逗号分隔）：
```
yefangu@gmail.com, another@example.com
```

---

## 🔍 调试技巧

### 查看发送的 HTML 内容

在浏览器控制台（F12）中，提交表单时会看到：

```javascript
// 搜索关键词：html_content
// 可以看到完整的 HTML 代码
```

你可以将这段 HTML 代码复制到在线 HTML 预览工具（如 CodePen）查看效果。

---

## 💡 优化建议

### 添加邮件过滤器（Gmail）

在 Gmail 中设置过滤器，自动归类赛博名片提交邮件：

1. 打开 Gmail 设置
2. 「过滤器和被阻止的地址」→「创建新过滤器」
3. 主题包含：`赛博名片提交`
4. 操作：应用标签「赛博名片」，标记为重要
5. 保存

这样所有提交邮件会自动归类到同一个标签下，方便查看。

---

## ✅ 配置检查清单

完成以下步骤后，邮件功能即可正常使用：

- [ ] 登录 EmailJS
- [ ] 找到模板 `template_e5usdvi`
- [ ] 将模板内容替换为上述 HTML 代码
- [ ] 确保使用 `{{{html_content}}}` 三个大括号
- [ ] 发送测试邮件
- [ ] 检查邮箱（包括垃圾邮件文件夹）
- [ ] 确认邮件格式正确显示
- [ ] 保存模板

完成后，提交表单即可收到精美的 HTML 表格邮件！📧✨
