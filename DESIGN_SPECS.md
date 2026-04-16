# 🎨 四种名片风格 - 设计规范对照表

---

## 风格 1: GLASS（橙色磨砂玻璃）

### 视觉特征
```
主题: 赛博朋克 / 玻璃拟态 / 发光效果
适用: 创意行业 / 设计师 / 时尚品牌
```

### 配色方案
```css
/* 背景渐变 */
background: linear-gradient(135deg, 
  #FFBE9D 0%,   /* 浅桃色 */
  #FF9F7A 20%,  /* 柔和橙 */
  #FF8252 40%,  /* 明亮橙 */
  #E85D24 60%,  /* 主色调 */
  #D64810 80%,  /* 深橙色 */
  #FF9870 100%  /* 回到柔和橙 */
);

/* 强调色 */
primary: #E85D24
secondary: rgba(255,255,255,0.35)
text: #FFFFFF
text-secondary: rgba(255,255,255,0.85)
```

### 布局结构
```
┌─────────────────────────────────────┐
│  [球体装饰]        [球体装饰]       │
│                                      │
│  [头像]                              │
│  ┌────────────────────────────────┐ │
│  │  [毛玻璃内容区]                │ │
│  │                                │ │
│  │  姓名 (120px, 900 weight)     │ │
│  │                                │ │
│  │  职位1                         │ │
│  │  职位2                         │ │
│  │  职位3                         │ │
│  │                                │ │
│  │            机构名称 →          │ │
│  │            邮箱地址 →          │ │
│  └────────────────────────────────┘ │
│         [球体装饰]                   │
└─────────────────────────────────────┘
```

### 核心元素
- **3D 浮动球体** - 不同大小，毛玻璃材质
- **backdrop-filter: blur(24px)** - 背景模糊效果
- **box-shadow** - 多层阴影，光晕效果
- **radial-gradient** - 径向渐变高光

---

## 风格 2: ATMOSPHERE（深绿氛围）

### 视觉特征
```
主题: 自然科技 / 渐变氛围 / 清新绿意
适用: 环保企业 / 健康行业 / 教育机构
```

### 配色方案
```css
/* 背景渐变 */
background: linear-gradient(145deg,
  #115e59 0%,   /* 深青绿 */
  #134e4a 40%,  /* 中青绿 */
  #0f3b39 100%  /* 暗青绿 */
);

/* 强调色 */
primary: #34d399        /* 翠绿色 */
secondary: rgba(52,211,153,0.15)
text: #FFFFFF
text-secondary: rgba(255,255,255,0.6)
```

### 布局结构
```
┌─────────────────────────────────────┐
│        [光晕效果]                    │
│  [叶脉纹理背景]                      │
│                                      │
│  姓名 (64px)              [头像]    │
│  职位 (32px, 绿色)                  │
│  机构 (26px, 半透明)                │
│                                      │
│  个人简介                            │
│  [技能1] [技能2] [技能3]            │
│  ─────────────────────────           │
│  📞 电话    ✉️ 邮箱                  │
└─────────────────────────────────────┘
```

### 核心元素
- **SVG 叶脉纹理** - 8% 透明度，自然感
- **radial-gradient 光晕** - 右上角大面积柔光
- **技能标签** - 半透明背景，绿色边框
- **分割线** - 1px，20% 透明度

---

## 风格 3: SURFACE（浅灰极简）

### 视觉特征
```
主题: 高端商务 / 极简设计 / 新拟态
适用: 金融/法律 / 企业高管 / 高端品牌
```

### 配色方案
```css
/* 背景渐变 */
background: linear-gradient(145deg,
  #ffffff 0%,   /* 纯白 */
  #fafafa 100%  /* 浅灰 */
);

/* 强调色 */
primary: #E85D24        /* 橙色点缀 */
text: #111111
text-secondary: #444444
text-tertiary: #888888
```

### 布局结构
```
┌─────────────────────────────────────┐
│  [微妙渐变遮罩]                      │
│                                      │
│  姓名 (68px)              [头像]    │
│  职位 (30px, 深灰)                  │
│  机构 (26px, 中灰)                  │
│                                      │
│  个人简介 (26px, 灰色)              │
│                                      │
│  技能1  技能2  技能3                │
│  (橙色下划线)                        │
│  ─────────────────────────           │
│  📞 电话    ✉️ 邮箱                  │
│                                      │
│  ████████████████████████ (橙色条)  │
└─────────────────────────────────────┘
```

### 核心元素
- **新拟态阴影** - 柔和的内外阴影
- **极致留白** - 大量空白空间
- **橙色点缀** - 底部装饰条、技能下划线
- **渐变遮罩** - 右侧 4% 透明度橙色渐变

---

## 风格 4: CODE（代码终端）

### 视觉特征
```
主题: 黑客终端 / 代码风格 / 技术美学
适用: 程序员 / 技术公司 / 开源社区
```

### 配色方案
```css
/* 背景 */
background: #0d1117      /* GitHub Dark 背景 */
border: #30363d          /* GitHub 边框 */

/* 代码高亮 */
keyword: #58a6ff         /* 蓝色 - const */
string: #a5d6ff          /* 浅蓝 - "string" */
property: #7ee787        /* 绿色 - org */
terminal: #27c93f        /* 亮绿 - 终端输出 */
comment: #8b949e         /* 灰色 - 注释 */
```

### 布局结构
```
┌─────────────────────────────────────┐
│  🔴 🟡 🟢  [终端按钮]                │
│                                      │
│  const user = {                      │
│    name: "姓名",          [头像]    │
│    role: "职位",                     │
│    org: "机构"                       │
│  }                                   │
│                                      │
│  > 个人简介▊                        │
│                                      │
│  📞 电话              #技能1 #技能2  │
│  ✉️ 邮箱              #技能3         │
└─────────────────────────────────────┘
```

### 核心元素
- **终端窗口头** - 红黄绿三色按钮，发光效果
- **代码语法高亮** - 精确的颜色语义
- **等宽字体** - JetBrains Mono
- **闪烁光标** - 绿色方块，1s 动画

---

## 风格对比总结表

| 维度 | Glass | Atmosphere | Surface | Code |
|------|-------|-----------|---------|------|
| **主色调** | 橙色 (#E85D24) | 绿色 (#34d399) | 白色 (#ffffff) | 黑色 (#0d1117) |
| **设计语言** | 玻璃拟态 | 自然氛围 | 新拟态 | 终端界面 |
| **适用行业** | 创意/时尚 | 环保/健康 | 商务/金融 | 技术/开发 |
| **视觉重量** | 中等 | 中等 | 轻量 | 重量 |
| **装饰元素** | 3D球体 | SVG纹理 | 渐变遮罩 | 代码高亮 |
| **文字对比** | 白色/高对比 | 白色/中对比 | 黑色/极简 | 彩色/代码 |
| **阴影风格** | 多层光晕 | 柔和渐变 | 新拟态 | 扁平/边框 |
| **圆角** | 18px | 40px | 48px | 24px |

---

## 关键设计约束（所有风格必须遵守）

### ✅ 必须执行

1. **横向比例** - 16:9 (960x540)
2. **正视图** - 禁止透视/倾斜/3D旋转
3. **中央留白** - 1200x600px 区域用于文字
4. **文字控制** - 所有文字必须由代码渲染
5. **极简原则** - 不杂乱，清晰易读

### ❌ 禁止

1. ❌ AI 生成文字
2. ❌ 透视/倾斜构图
3. ❌ 过度装饰
4. ❌ 不稳定的随机元素
5. ❌ 低对比度文字

---

## 字体加载清单

### 所需字体

```html
<!-- Glass / Atmosphere / Surface -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

<!-- Code -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- 中文支持（可选） -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600;800&display=swap" rel="stylesheet">
```

### 字体回退

```css
/* Western */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;

/* Code */
font-family: 'JetBrains Mono', 'Courier New', 'SF Mono', monospace;

/* Chinese */
font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
```

---

## 响应式缩放规则

### 文字大小

```css
/* 使用 clamp() 实现响应式 */

/* 姓名 */
font-size: clamp(40px, 10vw, 120px);

/* 职位 */
font-size: clamp(16px, 4vw, 38px);

/* 正文 */
font-size: clamp(12px, 2.5vw, 28px);
```

### 间距调整

```css
/* 容器内边距 */
padding: clamp(40px, 8vw, 80px);

/* 元素间距 */
gap: clamp(8px, 1.5vw, 24px);
```

---

## 测试用例数据

### 标准测试

```typescript
{
  name: 'ALEX MERCER',
  titles: ['Chief Creative Officer', 'DESIGNHOUSE'],
  organization: 'Founder of CCS & ComfyPark',
  bio: 'Visualizing the future of digital product experiences',
  skills: ['PRODUCT STRATEGY', 'BRAND NARRATIVE', 'UX'],
  phone: '+86 (123) 4567',
  email: 'alex@example.com'
}
```

### 边界测试

```typescript
// 最长姓名
name: 'MAXIMILIAN WILLIAMSON'  // 20字符

// 最长职位
titles: ['International Business Development Manager']  // 30字符

// 最长简介
bio: '专注于人工智能与区块链技术的融合创新，致力于打造下一代智能金融系统的基础设施。'  // 60字符

// 最多技能
skills: ['AI', 'BLOCKCHAIN', 'FINTECH', 'CLOUD', 'SECURITY']  // 5个
```

### 中文测试

```typescript
{
  name: '李明',
  titles: ['首席技术官', 'CTO'],
  organization: '北京科技有限公司',
  bio: '专注于人工智能与大数据领域，致力于推动技术创新',
  skills: ['人工智能', '大数据', '云计算'],
  phone: '+86 138 0000 0000',
  email: 'liming@example.com'
}
```

---

## 导出规格

### 文件规格

```
格式: PNG (Portable Network Graphics)
分辨率: 1920 x 1080 (Full HD)
色彩: RGB, 24-bit
压缩: 无损
透明度: 不透明（白色或彩色背景）
文件大小: 约 200-500 KB
```

### 命名规范

```
格式: 名片-{姓名}.png

示例:
- 名片-ALEX-MERCER.png
- 名片-李明.png
- 名片-John-Doe.png
```

---

## 质量检查清单

### 设计检查

- [ ] 配色符合风格定义
- [ ] 排版对齐准确
- [ ] 字体大小合适
- [ ] 留白空间充足
- [ ] 视觉层次清晰

### 技术检查

- [ ] 文字清晰，无锯齿
- [ ] 头像圆形裁剪正确
- [ ] 透明度渲染正确
- [ ] 阴影效果准确
- [ ] 渐变平滑无色带

### 内容检查

- [ ] 姓名显示完整
- [ ] 职位数量 ≤ 3个
- [ ] 简介长度 ≤ 60字符
- [ ] 技能标签 ≤ 5个
- [ ] 联系方式格式正确

---

**版本**: v1.0  
**最后更新**: 2026-04-14  
**设计师**: Claude AI
