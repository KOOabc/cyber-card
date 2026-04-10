import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import emailjs from '@emailjs/browser'

// 类型定义
interface FormData {
  // Phase 1 问卷
  aiDirection: string[]
  isOversea: string
  overseaMarkets: string[]
  cloudNeed: string
  businessIntro: string
  // Phase 1 基础信息（用于生成名片）
  realName: string
  company: string
  title: string
  phone: string
  email: string
  // Phase 2 名片内容
  displayName: string
  titles: string[]
  organization: string
  bio: string
  skills: string[]
  avatar: string
  cardEmail: string
  wechat: string
  xiaohongshu: string
  linkedin: string
  website: string
  showEmail: boolean
  showSocial: boolean
  showWebsite: boolean
  templateId: 'cyber_orange' | 'neo_white' | 'terminal_dark' | 'forest_green'
}

const initialFormData: FormData = {
  aiDirection: [], isOversea: '', overseaMarkets: [], cloudNeed: '', businessIntro: '',
  realName: '', company: '', title: '', phone: '', email: '',
  displayName: '', titles: [], organization: '', bio: '', skills: [], avatar: '',
  cardEmail: '', wechat: '', xiaohongshu: '', linkedin: '', website: '',
  showEmail: false, showSocial: false, showWebsite: false,
  templateId: 'cyber_orange'
}

// ========== 4款精美模板 ==========

function CyberOrangeCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '340px',
      height: '200px',
      background: 'linear-gradient(135deg, #FFBE9D 0%, #FF9F7A 20%, #FF8252 40%, #E85D24 60%, #D64810 80%, #FF9870 100%)',
      borderRadius: '0',
      position: 'relative',
      overflow: 'visible',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
      boxShadow: '0 40px 120px rgba(232,93,36,0.3)',
    }}>
      {/* 背景装饰 - 浮动球体（不同大小和材质） */}
      {/* 大球体 - 光滑反光 */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '40px',
        width: '140px',
        height: '140px',
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(255,200,170,0.3) 40%, rgba(232,93,36,0.2) 70%, transparent)',
        borderRadius: '50%',
        filter: 'blur(1px)',
        boxShadow: 'inset -10px -10px 30px rgba(232,93,36,0.3), inset 8px 8px 20px rgba(255,255,255,0.4), 0 20px 40px rgba(232,93,36,0.15)',
      }} />
      
      {/* 中等球体 - 哑光 */}
      <div style={{
        position: 'absolute',
        bottom: '-40px',
        left: '-30px',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, rgba(255,180,140,0.6) 0%, rgba(232,93,36,0.4) 100%)',
        borderRadius: '50%',
        filter: 'blur(0.5px)',
        boxShadow: '0 15px 35px rgba(232,93,36,0.2)',
      }} />
      
      {/* 小球体 - 高光泽 */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '-20px',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.7), rgba(255,190,160,0.5) 30%, rgba(232,93,36,0.3) 60%, transparent 80%)',
        borderRadius: '50%',
        boxShadow: 'inset -5px -5px 15px rgba(232,93,36,0.4), inset 4px 4px 12px rgba(255,255,255,0.6), 0 10px 25px rgba(0,0,0,0.1)',
      }} />
      
      {/* 弧形环 - 不同尺寸 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '-35px',
        width: '110px',
        height: '110px',
        border: '3px solid rgba(255,255,255,0.2)',
        borderRadius: '50%',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        transform: 'rotate(25deg)',
        filter: 'blur(0.5px)',
        boxShadow: '0 5px 15px rgba(232,93,36,0.15)',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '35px',
        right: '25px',
        width: '70px',
        height: '70px',
        border: '2.5px solid rgba(255,255,255,0.18)',
        borderRadius: '50%',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        transform: 'rotate(-40deg)',
        filter: 'blur(0.3px)',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '-15px',
        left: '45%',
        width: '50px',
        height: '50px',
        border: '2px solid rgba(255,255,255,0.15)',
        borderRadius: '50%',
        borderTopColor: 'transparent',
        transform: 'rotate(60deg)',
      }} />
      
      {/* 中央毛玻璃面板 - 悬浮效果 */}
      <div style={{
        position: 'absolute',
        top: '28px',
        left: '28px',
        right: '28px',
        bottom: '28px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        borderRadius: '18px',
        border: '1.5px solid rgba(255,255,255,0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        borderRight: '1px solid rgba(255,255,255,0.15)',
        boxShadow: `
          0 12px 48px rgba(0,0,0,0.12),
          0 2px 8px rgba(0,0,0,0.08),
          inset 0 1px 2px rgba(255,255,255,0.5),
          inset 0 -1px 2px rgba(232,93,36,0.1)
        `,
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        {/* 顶部：姓名（大标题） */}
        <div>
          <h2 style={{
            color: 'rgba(255,255,255,0.98)',
            fontSize: '26px',
            fontWeight: 600,
            marginBottom: '8px',
            letterSpacing: '-0.5px',
            textShadow: '0 1px 3px rgba(0,0,0,0.1)',
            lineHeight: 1.1,
          }}>{data.displayName || 'Your Name'}</h2>
          
          {/* 职位标签 - 极简设计 */}
          {data.titles.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
              {data.titles.slice(0, 2).map((t, i) => (
                <span key={i} style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                }}>{t}</span>
              ))}
            </div>
          )}
        </div>
        
        {/* 底部：机构、简介（左对齐，小文本） */}
        <div>
          {data.organization && (
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '11px',
              marginBottom: '6px',
              fontWeight: 500,
              letterSpacing: '0.2px',
            }}>{data.organization}</p>
          )}
          
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '10px',
            lineHeight: 1.5,
            marginBottom: '10px',
            maxWidth: '85%',
            letterSpacing: '0.1px',
          }}>
            {data.bio || 'Your bio here'}
          </p>
          
          {/* 技能标签 - 极简 */}
          {data.skills.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.skills.slice(0, 3).map((s, i) => (
                <span key={i} style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.3px',
                }}>#{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 高光 - 左上角 */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 60%)',
        borderRadius: '50%',
        filter: 'blur(10px)',
        pointerEvents: 'none',
      }} />
      
      {/* 次级高光 - 右下角 */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        right: '32px',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(8px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

function NeoWhiteCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '340px', height: '200px', background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
      borderRadius: '24px', padding: '30px', position: 'relative', overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.9)',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, left: '60%', height: '100%', background: 'linear-gradient(135deg, transparent 0%, rgba(232,93,36,0.04) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ color: '#111', fontSize: '26px', fontWeight: 800, marginBottom: '10px', letterSpacing: '-1px' }}>{data.displayName || '您的姓名'}</h2>
          {data.titles[0] && <p style={{ color: '#444', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{data.titles[0]}</p>}
          {data.organization && <p style={{ color: '#888', fontSize: '12px' }}>{data.organization}</p>}
        </div>
        <div>
          <p style={{ color: '#555', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px', maxWidth: '80%' }}>{data.bio || '个人简介'}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {data.skills.slice(0, 3).map((s, i) => (
              <span key={i} style={{ color: '#E85D24', fontSize: '11px', fontWeight: 600, padding: '4px 0', borderBottom: '2px solid #E85D24' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #E85D24 0%, #ff8c42 50%, #E85D24 100%)' }} />
    </div>
  )
}

function TerminalDarkCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '340px', height: '200px', background: '#0d1117',
      borderRadius: '12px', padding: '18px', position: 'relative', overflow: 'hidden',
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      border: '1px solid #30363d', boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
    }}>
      <div style={{ display: 'flex', gap: '7px', marginBottom: '14px' }}>
        <div style={{ width: '11px', height: '11px', background: '#ff5f56', borderRadius: '50%', boxShadow: '0 0 8px rgba(255,95,86,0.5)' }} />
        <div style={{ width: '11px', height: '11px', background: '#ffbd2e', borderRadius: '50%', boxShadow: '0 0 8px rgba(255,189,46,0.5)' }} />
        <div style={{ width: '11px', height: '11px', background: '#27c93f', borderRadius: '50%', boxShadow: '0 0 8px rgba(39,201,63,0.5)' }} />
      </div>
      <div style={{ fontSize: '11px', lineHeight: 1.7 }}>
        <p style={{ color: '#8b949e' }}><span style={{ color: '#58a6ff' }}>const</span> user = {'{'}</p>
        <p style={{ color: '#8b949e', paddingLeft: '14px' }}>name: <span style={{ color: '#a5d6ff' }}>"{data.displayName || 'User'}"</span>,</p>
        <p style={{ color: '#8b949e', paddingLeft: '14px' }}>role: <span style={{ color: '#a5d6ff' }}>"{data.titles[0] || 'Developer'}"</span>,</p>
        <p style={{ color: '#8b949e', paddingLeft: '14px' }}>org: <span style={{ color: '#7ee787' }}>"{data.organization || 'Company'}"</span></p>
        <p style={{ color: '#8b949e' }}>{'}'}</p>
        <p style={{ color: '#27c93f', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          {'>'} <span style={{ marginLeft: '8px', color: '#c9d1d9' }}>{data.bio || 'Hello World'}</span>
          <span style={{ display: 'inline-block', width: '7px', height: '14px', background: '#27c93f', marginLeft: '4px', animation: 'blink 1s infinite' }} />
        </p>
      </div>
      <div style={{ position: 'absolute', bottom: '14px', right: '14px', display: 'flex', gap: '4px' }}>
        {data.skills.slice(0, 3).map((s, i) => (
          <span key={i} style={{ color: '#27c93f', fontSize: '9px', opacity: 0.6 }}>#{s}</span>
        ))}
      </div>
      <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
    </div>
  )
}

function ForestGreenCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '340px', height: '200px',
      background: 'linear-gradient(145deg, #115e59 0%, #134e4a 40%, #0f3b39 100%)',
      borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden',
      fontFamily: "'Inter', sans-serif", boxShadow: '0 20px 60px rgba(17,94,89,0.4)',
    }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 60%)', borderRadius: '50%' }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
        <pattern id="leaf-pattern" patternUnits="userSpaceOnUse" width="50" height="50">
          <path d="M25 0 Q25 25 50 25 Q25 25 25 50 Q25 25 0 25 Q25 25 25 0" stroke="#34d399" fill="none" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
      </svg>
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>{data.displayName || '您的姓名'}</h2>
          {data.titles[0] && <p style={{ color: '#34d399', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{data.titles[0]}</p>}
          {data.organization && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{data.organization}</p>}
        </div>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginBottom: '10px', lineHeight: 1.5 }}>{data.bio || '个人简介'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.skills.slice(0, 4).map((s, i) => (
              <span key={i} style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: 600, border: '1px solid rgba(52,211,153,0.3)' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== 主应用 ==========
function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [titleInput, setTitleInput] = useState('')
  const [skillInput, setSkillInput] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)

  const downloadCard = async () => {
    if (!cardRef.current) return
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true, backgroundColor: null, logging: false })
      const link = document.createElement('a')
      link.download = `赛博名片-${formData.displayName || 'card'}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('下载失败:', err)
      alert('下载失败，请重试')
    }
  }

  // 发送邮件（EmailJS）
  const sendEmail = async () => {
    // 🔧 EmailJS 配置
    const EMAILJS_SERVICE_ID = 'service_tftqemj'
    const EMAILJS_TEMPLATE_ID = 'template_e5usdvi'
    const EMAILJS_PUBLIC_KEY = '86WCUvA3DgipnKdN3'

    try {
      // 准备邮件参数
      const emailParams = {
        to_email: 'yefangu@gmail.com', // 接收邮箱
        subject: '🎯 新的赛博名片提交 - ' + formData.displayName,
        
        // 业务调研
        ai_direction: formData.aiDirection.join(', '),
        is_oversea: formData.isOversea,
        oversea_markets: formData.overseaMarkets.length > 0 ? formData.overseaMarkets.join(', ') : '无',
        cloud_need: formData.cloudNeed,
        business_intro: formData.businessIntro,
        
        // 用户信息
        real_name: formData.realName,
        company: formData.company,
        title: formData.title,
        phone: formData.phone,
        email: formData.email,
        
        // 名片内容
        display_name: formData.displayName,
        titles: formData.titles.join(', '),
        organization: formData.organization,
        bio: formData.bio,
        skills: formData.skills.join(', '),
        template_id: formData.templateId,
        
        // 提交时间
        submit_time: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      }

      // 发送邮件
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        EMAILJS_PUBLIC_KEY
      )

      if (response.status === 200) {
        console.log('✅ 邮件发送成功')
        return true
      } else {
        console.error('❌ 邮件发送失败:', response)
        return false
      }
    } catch (error) {
      console.error('❌ 发送邮件出错:', error)
      // 降级到复制剪贴板
      copyDataToClipboard()
      return false
    }
  }

  // 复制表单数据到剪贴板（表格格式）
  const copyDataToClipboard = () => {
    // 生成表格格式的数据
    const dataText = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 赛博名片 - 用户提交数据
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【业务调研信息】
AI 方向        ${formData.aiDirection.join(', ')}
出海计划        ${formData.isOversea}
目标市场        ${formData.overseaMarkets.length > 0 ? formData.overseaMarkets.join(', ') : '无'}
算力需求        ${formData.cloudNeed}
业务介绍        ${formData.businessIntro}

【用户基础信息】
真实姓名        ${formData.realName}
公司名称        ${formData.company}
职位            ${formData.title}
手机号          ${formData.phone}
邮箱            ${formData.email}

【名片展示内容】
展示名称        ${formData.displayName}
职业身份        ${formData.titles.join(', ')}
所属机构        ${formData.organization}
个人简介        ${formData.bio}
技能标签        ${formData.skills.join(', ')}
选择模板        ${formData.templateId}

【提交信息】
提交时间        ${new Date().toLocaleString('zh-CN', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  hour12: false 
                })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim()

    // 复制到剪贴板
    navigator.clipboard.writeText(dataText).then(() => {
      alert('✅ 数据已复制到剪贴板！\n\n您可以直接粘贴到：\n• Excel / WPS 表格\n• 飞书多维表格\n• 腾讯文档\n• 记事本 / 备忘录')
    }).catch(() => {
      // 降级方案
      const textarea = document.createElement('textarea')
      textarea.value = dataText
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('✅ 数据已复制到剪贴板！\n\n您可以直接粘贴到：\n• Excel / WPS 表格\n• 飞书多维表格\n• 腾讯文档\n• 记事本 / 备忘录')
    })
  }

  // 提交数据（优先邮件，降级到飞书/剪贴板）
  const submitData = async () => {
    // 优先尝试发送邮件
    const emailSent = await sendEmail()
    if (emailSent) {
      return true
    }
    
    // 邮件失败，尝试飞书
    return await submitToFeishu()
  }

  // 提交数据到飞书多维表格
  const submitToFeishu = async () => {
    // 🔧 配置您的飞书 Webhook URL
    const FEISHU_WEBHOOK = 'YOUR_FEISHU_WEBHOOK_URL_HERE'
    
    if (FEISHU_WEBHOOK === 'YOUR_FEISHU_WEBHOOK_URL_HERE') {
      // 如果没有配置飞书，使用复制到剪贴板的方式
      copyDataToClipboard()
      return true
    }

    try {
      // 准备提交的数据
      const submissionData = {
        msg_type: "post",
        content: {
          post: {
            zh_cn: {
              title: "🎯 新的名片制作提交",
              content: [
                [
                  { tag: "text", text: "📋 业务调研信息\n" }
                ],
                [
                  { tag: "text", text: "• AI方向: " + formData.aiDirection.join(', ') + "\n" }
                ],
                [
                  { tag: "text", text: "• 出海计划: " + formData.isOversea + "\n" }
                ],
                [
                  { tag: "text", text: "• 目标市场: " + (formData.overseaMarkets.length > 0 ? formData.overseaMarkets.join(', ') : '无') + "\n" }
                ],
                [
                  { tag: "text", text: "• 算力需求: " + formData.cloudNeed + "\n" }
                ],
                [
                  { tag: "text", text: "• 业务介绍: " + formData.businessIntro + "\n\n" }
                ],
                [
                  { tag: "text", text: "👤 用户基础信息\n" }
                ],
                [
                  { tag: "text", text: "• 真实姓名: " + formData.realName + "\n" }
                ],
                [
                  { tag: "text", text: "• 公司: " + formData.company + "\n" }
                ],
                [
                  { tag: "text", text: "• 职位: " + formData.title + "\n" }
                ],
                [
                  { tag: "text", text: "• 手机: " + formData.phone + "\n" }
                ],
                [
                  { tag: "text", text: "• 邮箱: " + formData.email + "\n\n" }
                ],
                [
                  { tag: "text", text: "🎨 名片内容\n" }
                ],
                [
                  { tag: "text", text: "• 展示名称: " + formData.displayName + "\n" }
                ],
                [
                  { tag: "text", text: "• 职业身份: " + formData.titles.join(', ') + "\n" }
                ],
                [
                  { tag: "text", text: "• 所属机构: " + formData.organization + "\n" }
                ],
                [
                  { tag: "text", text: "• 个人简介: " + formData.bio + "\n" }
                ],
                [
                  { tag: "text", text: "• 技能标签: " + formData.skills.join(', ') + "\n" }
                ],
                [
                  { tag: "text", text: "• 选择模板: " + formData.templateId + "\n\n" }
                ],
                [
                  { tag: "text", text: "⏰ 提交时间: " + new Date().toLocaleString('zh-CN') }
                ]
              ]
            }
          }
        }
      }

      const response = await fetch(FEISHU_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        console.log('✅ 数据已提交到飞书')
        return true
      } else {
        console.error('❌ 提交失败:', response.statusText)
        return false
      }
    } catch (error) {
      console.error('❌ 提交到飞书失败:', error)
      return false
    }
  }

  const copyShareLink = () => {
    // 生成分享链接（将表单数据编码到 URL）
    const cardData = {
      displayName: formData.displayName,
      titles: formData.titles,
      organization: formData.organization,
      bio: formData.bio,
      skills: formData.skills,
      templateId: formData.templateId,
    }
    const encodedData = btoa(encodeURIComponent(JSON.stringify(cardData)))
    const shareUrl = `${window.location.origin}${window.location.pathname}?card=${encodedData}`
    
    // 复制到剪贴板
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('✅ 分享链接已复制到剪贴板！\n\n' + shareUrl)
    }).catch(() => {
      // 降级方案：使用 textarea
      const textarea = document.createElement('textarea')
      textarea.value = shareUrl
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('✅ 分享链接已复制到剪贴板！\n\n' + shareUrl)
    })
  }

  // Step 1: 业务调研问卷
  const renderStep1 = () => {
    const aiDirections = [
      '大模型 / 基础模型研发',
      'AI 应用开发（ToB / ToC）',
      'AI 工具 / SaaS 产品',
      'AIGC 内容创作',
      'AI 落地某垂直行业',
      '投资',
      '生态资源方',
      '其他科技 / 硬件 / 芯片',
      '非科技行业（品牌 / 消费 / 文创等）'
    ]
    
    const overseaOptions = [
      { value: 'yes_main', label: '是，出海是主线' },
      { value: 'yes_partial', label: '是，出海是其中一块' },
      { value: 'planning', label: '在规划中' },
      { value: 'no', label: '暂无出海计划' },
    ]
    
    const marketOptions = ['东南亚', '中东北非', '欧洲', '北美', '日韩', '拉丁美洲', '其他']
    
    const cloudOptions = [
      { value: 'bare_metal', label: '有，倾向裸金属云 / GPU 集群' },
      { value: 'maas', label: '有，倾向 MaaS API（按需调用模型）' },
      { value: 'evaluating', label: '在评估中，还没确定' },
      { value: 'no', label: '暂无需求' },
    ]

    const showOverseaMarkets = formData.isOversea === 'yes_main' || formData.isOversea === 'yes_partial'

    const toggleAiDirection = (item: string) => {
      if (formData.aiDirection.includes(item)) {
        setFormData({ ...formData, aiDirection: formData.aiDirection.filter(d => d !== item) })
      } else {
        setFormData({ ...formData, aiDirection: [...formData.aiDirection, item] })
      }
    }

    const toggleMarket = (item: string) => {
      if (formData.overseaMarkets.includes(item)) {
        setFormData({ ...formData, overseaMarkets: formData.overseaMarkets.filter(m => m !== item) })
      } else {
        setFormData({ ...formData, overseaMarkets: [...formData.overseaMarkets, item] })
      }
    }

    const handleNext = () => {
      if (formData.aiDirection.length === 0 || !formData.isOversea || !formData.cloudNeed || formData.businessIntro.length < 10) {
        alert('请完成所有必填项（介绍至少10字）')
        return
      }
      if (showOverseaMarkets && formData.overseaMarkets.length === 0) {
        alert('请选择主要面向的市场')
        return
      }
      setStep('transition' as any)
    }

    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Step 1 / 6</div>
        <div style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Phase 1 · 业务调研</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>📋 几个简单问题</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>帮助我们更好地了解您的业务背景</p>

        {/* 题1 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '12px' }}>题 1：你在做哪个方向？<span style={{ color: '#E85D24' }}>*</span> <span style={{ fontWeight: 400, color: '#999', fontSize: '12px' }}>（多选）</span></div>
          {aiDirections.map(item => (
            <div key={item} onClick={() => toggleAiDirection(item)}
              style={{ padding: '11px 14px', border: `2px solid ${formData.aiDirection.includes(item) ? '#E85D24' : '#e0e0e0'}`, borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', background: formData.aiDirection.includes(item) ? 'rgba(232,93,36,0.08)' : '#fff', fontSize: '14px' }}>
              {formData.aiDirection.includes(item) ? '☑ ' : '☐ '}{item}
            </div>
          ))}
        </div>

        {/* 题2 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '12px' }}>题 2：业务有出海方向吗？<span style={{ color: '#E85D24' }}>*</span></div>
          {overseaOptions.map(opt => (
            <div key={opt.value} onClick={() => setFormData({ ...formData, isOversea: opt.value })}
              style={{ padding: '11px 14px', border: `2px solid ${formData.isOversea === opt.value ? '#E85D24' : '#e0e0e0'}`, borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', background: formData.isOversea === opt.value ? 'rgba(232,93,36,0.08)' : '#fff', fontSize: '14px' }}>
              {formData.isOversea === opt.value ? '● ' : '○ '}{opt.label}
            </div>
          ))}
        </div>

        {/* 题3：条件显示 */}
        {showOverseaMarkets && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ fontWeight: 600, marginBottom: '12px' }}>题 3：主要面向哪些市场？<span style={{ color: '#E85D24' }}>*</span> <span style={{ fontWeight: 400, color: '#999', fontSize: '12px' }}>（多选）</span></div>
            {marketOptions.map(item => (
              <div key={item} onClick={() => toggleMarket(item)}
                style={{ padding: '11px 14px', border: `2px solid ${formData.overseaMarkets.includes(item) ? '#E85D24' : '#e0e0e0'}`, borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', background: formData.overseaMarkets.includes(item) ? 'rgba(232,93,36,0.08)' : '#fff', fontSize: '14px' }}>
                {formData.overseaMarkets.includes(item) ? '☑ ' : '☐ '}{item}
              </div>
            ))}
          </div>
        )}

        {/* 题4 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '12px' }}>题 {showOverseaMarkets ? '4' : '3'}：有 AI 算力 / 云计算需求吗？<span style={{ color: '#E85D24' }}>*</span></div>
          {cloudOptions.map(opt => (
            <div key={opt.value} onClick={() => setFormData({ ...formData, cloudNeed: opt.value })}
              style={{ padding: '11px 14px', border: `2px solid ${formData.cloudNeed === opt.value ? '#E85D24' : '#e0e0e0'}`, borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', background: formData.cloudNeed === opt.value ? 'rgba(232,93,36,0.08)' : '#fff', fontSize: '14px' }}>
              {formData.cloudNeed === opt.value ? '● ' : '○ '}{opt.label}
            </div>
          ))}
        </div>

        {/* 题5 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '12px' }}>题 {showOverseaMarkets ? '5' : '4'}：一句话介绍你在做什么<span style={{ color: '#E85D24' }}>*</span></div>
          <textarea value={formData.businessIntro} onChange={(e) => setFormData({ ...formData, businessIntro: e.target.value })}
            placeholder="例如：我们做面向中东市场的跨境电商 SaaS 平台" maxLength={200}
            style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', resize: 'none', outline: 'none' }} rows={3} />
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#999', marginTop: '6px' }}>{formData.businessIntro.length} / 200</div>
        </div>

        <button onClick={handleNext} style={{ width: '100%', padding: '16px', background: '#E85D24', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', marginTop: '24px' }}>
          下一步，开始制作名片 →
        </button>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    )
  }

  // 过渡页
  const renderTransition = () => (
    <div style={{ position: 'fixed', inset: 0, background: '#0F0E0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '64px', height: '64px', marginBottom: '24px', border: '4px solid rgba(232,93,36,0.2)', borderTop: '4px solid #E85D24', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 700, marginBottom: '12px' }}>✅ 业务调研完成！</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px', textAlign: 'center' }}>接下来，填写生成名片所需的基础信息</p>
      <button onClick={() => setStep(2)} style={{ padding: '16px 36px', background: 'linear-gradient(135deg, #E85D24, #C94B0A)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
        开始制作我的名片 →
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  // Step 2: 基础信息（用于生成名片）
  const renderStep2 = () => {
    const handleNext = () => {
      if (!formData.realName || !formData.company || !formData.title || !formData.phone || !formData.email) {
        alert('请完成所有必填项')
        return
      }
      setStep(3)
    }

    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Step 2 / 6</div>
        <div style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Phase 1 · 信息登记</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>制作你的名片，请先填这几项</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>生成名片所需的基础信息，不会显示在名片上</p>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>真实姓名 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.realName} onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
            placeholder="请输入真实姓名" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>公司名称 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="请输入公司名称" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>职位 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="请输入职位" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>手机号 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="请输入手机号" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>邮箱 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="请输入邮箱" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <button onClick={() => setStep(1)} style={{ flex: 1, padding: '16px', background: '#fff', color: '#666', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            ← 上一步
          </button>
          <button onClick={handleNext} style={{ flex: 1, padding: '16px', background: '#E85D24', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            下一步，填写名片内容 →
          </button>
        </div>
      </div>
    )
  }

  // Step 3: 名片内容（展示信息）
  const renderStep3 = () => (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Step 3 / 6</div>
      <div style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Phase 2 · 名片制作</div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>✨ 定制您的名片</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>以下内容将展示在名片上</p>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>展示名称 <span style={{ color: '#16A34A', fontSize: '12px', marginLeft: '8px' }}>默认展示</span></div>
        <input value={formData.displayName} onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          placeholder="您希望名片上显示的名字" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>职业身份 <span style={{ color: '#16A34A', fontSize: '12px', marginLeft: '8px' }}>默认展示</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {formData.titles.map(title => (
            <span key={title} style={{ background: '#E85D24', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {title} <span onClick={() => setFormData({ ...formData, titles: formData.titles.filter(t => t !== title) })} style={{ cursor: 'pointer', fontWeight: 700 }}>×</span>
            </span>
          ))}
        </div>
        {formData.titles.length < 4 && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={titleInput} onChange={(e) => setTitleInput(e.target.value)}
              placeholder="输入职位" style={{ flex: 1, padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
            <button onClick={() => { if (titleInput.trim()) { setFormData({ ...formData, titles: [...formData.titles, titleInput.trim()] }); setTitleInput('') } }}
              style={{ padding: '10px 20px', background: '#E85D24', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>添加</button>
          </div>
        )}
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>所属机构 <span style={{ color: '#16A34A', fontSize: '12px', marginLeft: '8px' }}>默认展示</span></div>
        <input value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          placeholder="如「Founder of CCS & ComfyPark」" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>个人简介 <span style={{ color: '#16A34A', fontSize: '12px', marginLeft: '8px' }}>默认展示</span></div>
        <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="一句话介绍自己" maxLength={60} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', resize: 'none', outline: 'none' }} rows={2} />
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#999', marginTop: '6px' }}>{formData.bio.length} / 60</div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>技能标签 <span style={{ color: '#16A34A', fontSize: '12px', marginLeft: '8px' }}>默认展示</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {formData.skills.map(skill => (
            <span key={skill} style={{ background: '#E85D24', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {skill} <span onClick={() => setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) })} style={{ cursor: 'pointer', fontWeight: 700 }}>×</span>
            </span>
          ))}
        </div>
        {formData.skills.length < 5 && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
              placeholder="输入技能" style={{ flex: 1, padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
            <button onClick={() => { if (skillInput.trim()) { setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] }); setSkillInput('') } }}
              style={{ padding: '10px 20px', background: '#E85D24', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>添加</button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button onClick={() => setStep(2)} style={{ flex: 1, padding: '16px', background: '#fff', color: '#666', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
          ← 上一步
        </button>
        <button onClick={() => setStep(4)} style={{ flex: 1, padding: '16px', background: '#E85D24', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
          下一步，选择模板 →
        </button>
      </div>
    </div>
  )

  // Step 4: 选择模板
  const renderStep4 = () => {
    const templates = [
      { id: 'cyber_orange', name: 'Cyber Orange', desc: '赛博朋克 / 玻璃拟态 / 发光效果', color: '#E85D24', bg: 'linear-gradient(135deg, #1a1a2e, #0f0f23)' },
      { id: 'neo_white', name: 'Neo White', desc: '高端极简 / 新拟态 / 留白设计', color: '#111', bg: '#fff' },
      { id: 'terminal_dark', name: 'Terminal Dark', desc: '黑客终端 / 代码风格 / 绿色光标', color: '#27c93f', bg: '#0d1117' },
      { id: 'forest_green', name: 'Forest Green', desc: '自然科技 / 叶脉纹理 / 清新绿意', color: '#34d399', bg: 'linear-gradient(145deg, #115e59, #0f3b39)' },
    ]

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Step 4 / 6</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>🎨 选择您的名片风格</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {templates.map(t => (
            <div key={t.id} onClick={() => setFormData({ ...formData, templateId: t.id as any })}
              style={{
                background: '#fff', borderRadius: '16px', padding: '16px', cursor: 'pointer',
                border: `3px solid ${formData.templateId === t.id ? '#E85D24' : '#e0e0e0'}`,
                transition: 'all 0.15s', transform: formData.templateId === t.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: formData.templateId === t.id ? '0 8px 30px rgba(232,93,36,0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
              }}>
              <div style={{ width: '100%', height: '80px', background: t.bg, borderRadius: '10px', marginBottom: '12px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '8px', left: '10px', color: t.color, fontSize: '12px', fontWeight: 700 }}>{t.name}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: '#111' }}>{t.name}</div>
              <div style={{ color: '#666', fontSize: '12px' }}>{t.desc}</div>
              {formData.templateId === t.id && <div style={{ color: '#16A34A', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>✓ 已选择</div>}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <button onClick={() => setStep(3)} style={{ flex: 1, padding: '16px', background: '#fff', color: '#666', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            ← 上一步
          </button>
          <button onClick={async () => {
            // 提交数据（优先邮件，降级到飞书/剪贴板）
            await submitData()
            // 跳转到生成完成页
            setStep(5)
          }} style={{ flex: 1, padding: '16px', background: '#E85D24', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            确认，生成名片 →
          </button>
        </div>
      </div>
    )
  }

  // Step 5: 生成完成
  const renderStep5 = () => (
    <div style={{ position: 'fixed', inset: 0, background: '#0F0E0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '24px' }}>Step 5 / 6</div>
      <h1 style={{ color: '#fff', fontSize: '30px', fontWeight: 700, marginBottom: '32px' }}>🎉 您的名片已生成！</h1>
      
      <div ref={cardRef} style={{ marginBottom: '24px' }}>
        {formData.templateId === 'cyber_orange' && <CyberOrangeCard data={formData} />}
        {formData.templateId === 'neo_white' && <NeoWhiteCard data={formData} />}
        {formData.templateId === 'terminal_dark' && <TerminalDarkCard data={formData} />}
        {formData.templateId === 'forest_green' && <ForestGreenCard data={formData} />}
      </div>

      <div style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '10px', padding: '12px 20px', marginBottom: '28px' }}>
        <span style={{ color: '#34d399', fontSize: '13px' }}>✨ 已根据您的设置隐藏敏感信息</span>
      </div>

      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <button onClick={downloadCard} style={{ padding: '18px', background: 'linear-gradient(135deg, #E85D24, #C94B0A)', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '17px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(232,93,36,0.4)' }}>
          ⬇ 保存图片到相册
        </button>
        <button onClick={copyShareLink} style={{ padding: '18px', background: 'transparent', color: '#E85D24', border: '2px solid #E85D24', borderRadius: '14px', fontSize: '17px', fontWeight: 600, cursor: 'pointer' }}>
          🔗 复制分享链接
        </button>
      </div>

      <div style={{ display: 'flex', gap: '28px', marginTop: '36px' }}>
        <button onClick={() => setStep(3)} style={{ color: '#999', background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
          ✏️ 重新编辑名片
        </button>
        <button onClick={() => { setFormData(initialFormData); setStep(1); }} style={{ color: '#777', background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
          ← 重新开始
        </button>
      </div>
    </div>
  )

  // 渲染顶部 Banner
  const renderBanner = () => (
    <div style={{ background: '#0A0A0A', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: '1200px', width: '100%', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>GMI Cloud</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11.5px', marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.12)' }}>
            赛博名片由 Inference Engine API 实时生成
          </span>
        </div>
        <a href="https://console.gmicloud.ai/model-library" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '4px 10px', textDecoration: 'none' }}>
          探索 Inference Engine →
        </a>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F5F4F2' }}>
      {renderBanner()}
      {step === 1 && renderStep1()}
      {step === 'transition' && renderTransition()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
    </div>
  )
}

export default App
