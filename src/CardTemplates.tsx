import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

// 类型定义
interface FormData {
  industry: string
  isOversea: string
  businessDesc: string
  eventPurpose: string[]
  channel: string
  name: string
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
  industry: '', isOversea: '', businessDesc: '', eventPurpose: [], channel: '',
  name: '', titles: [], organization: '', bio: '', skills: [], avatar: '',
  cardEmail: '', wechat: '', xiaohongshu: '', linkedin: '', website: '',
  showEmail: false, showSocial: false, showWebsite: false,
  templateId: 'cyber_orange'
}

// ========== 模板组件 ==========

// 1. Cyber Orange - 赛博朋克风格（增强版）
function CyberOrangeCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '340px',
      height: '200px',
      background: 'linear-gradient(135deg, #FFBE9D 0%, #FF9F7A 15%, #FF8252 35%, #E85D24 60%, #D64810 80%, #FF9870 100%)',
      borderRadius: '20px',
      position: 'relative',
      overflow: 'visible',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
      boxShadow: '0 40px 120px rgba(232,93,36,0.35)',
    }}>
      {/* 背景装饰 - 浮动球体 */}
      <div style={{ position: 'absolute', top: '-35px', right: '15px', width: '90px', height: '90px', background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,200,170,0.25) 40%, rgba(232,93,36,0.15) 70%, transparent)', borderRadius: '50%', filter: 'blur(3px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-30px', left: '-25px', width: '70px', height: '70px', background: 'linear-gradient(135deg, rgba(255,180,140,0.45), rgba(232,93,36,0.3))', borderRadius: '50%', filter: 'blur(2px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '30px', right: '-20px', width: '55px', height: '55px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '50%', borderLeftColor: 'transparent', borderBottomColor: 'transparent', transform: 'rotate(25deg)', pointerEvents: 'none', zIndex: 0 }} />

      {/* 毛玻璃面板 - Swiss 布局 */}
      <div style={{
        position: 'absolute',
        top: '18px',
        left: '26px',
        right: '26px',
        bottom: '18px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 100%)',
        backdropFilter: 'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        borderRadius: '14px',
        border: '1.5px solid rgba(255,255,255,0.4)',
        borderBottom: '1px solid rgba(255,255,255,0.25)',
        borderRight: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 14px 35px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.55), inset 0 -1px 2px rgba(232,93,36,0.1)',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {/* 顶部：姓名 + 职位 */}
        <div>
          <h1 style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.8px',
            lineHeight: 1.1,
            margin: '0 0 8px 0',
            textAlign: 'left',
            textShadow: '0 1px 4px rgba(0,0,0,0.12)',
          }}>
            {data.name || 'Your Name'}
          </h1>

          {data.titles.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              {data.titles.slice(0, 2).map((t, i) => (
                <div key={i} style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.88)',
                  fontWeight: 500,
                  margin: '3px 0',
                  letterSpacing: '0.2px',
                  lineHeight: 1.3,
                  textAlign: 'left',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {t}
                </div>
              ))}
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '6px' }}>
              {data.skills.slice(0, 3).map((s, i) => (
                <span key={i} style={{
                  background: 'rgba(255,255,255,0.22)',
                  color: 'rgba(255,255,255,0.92)',
                  padding: '3px 9px',
                  borderRadius: '9px',
                  fontSize: '8px',
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.28)',
                }}>{s}</span>
              ))}
            </div>
          )}
        </div>

        {/* 底部：机构 + 联系方式 */}
        <div style={{ textAlign: 'left' }}>
          {data.bio && (
            <div style={{
              fontSize: '8px',
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.4,
              marginBottom: '6px',
              maxWidth: '88%',
            }}>
              {data.bio}
            </div>
          )}

          {data.organization && (
            <div style={{
              fontSize: '9px',
              color: 'rgba(255,255,255,0.82)',
              marginBottom: '4px',
              fontWeight: 500,
            }}>
              {data.organization}
            </div>
          )}

          {(data.cardPhone || data.cardEmail) && (
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {data.cardPhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '8px', color: 'rgba(255,255,255,0.72)' }}>
                  <span style={{ fontSize: '9px' }}>📞</span>
                  <span>{data.cardPhone}</span>
                </div>
              )}
              {data.cardEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '8px', color: 'rgba(255,255,255,0.72)' }}>
                  <span style={{ fontSize: '9px' }}>✉️</span>
                  <span>{data.cardEmail}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 高光 */}
      <div style={{ position: 'absolute', top: '22px', left: '30px', width: '45px', height: '45px', background: 'radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(12px)', pointerEvents: 'none', zIndex: 2 }} />
    </div>
  )
}

// 2. Neo White - 高端极简
function NeoWhiteCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '340px',
      height: '200px',
      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
      borderRadius: '24px',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1), inset 0 -2px 10px rgba(0,0,0,0.03)',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* 微妙纹理 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 100% 0%, rgba(232,93,36,0.03) 0%, transparent 50%)',
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#1a1a1a', fontSize: '22px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.5px' }}>
            {data.name || '您的姓名'}
          </h2>
          {data.titles[0] && (
            <p style={{ color: '#666', fontSize: '12px', fontWeight: 500, marginBottom: '4px' }}>{data.titles[0]}</p>
          )}
          {data.organization && (
            <p style={{ color: '#999', fontSize: '11px' }}>{data.organization}</p>
          )}
        </div>
        
        <div style={{ flexShrink: 0, marginTop: '12px' }}>
          <p style={{ color: '#666', fontSize: '11px', lineHeight: 1.4, marginBottom: '8px' }}>
            {data.bio || '个人简介'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.skills.slice(0, 4).map((s, i) => (
              <span key={i} style={{
                color: '#E85D24',
                fontSize: '10px',
                fontWeight: 500,
                padding: '2px 6px',
                borderBottom: '1px solid #E85D24',
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* 装饰线 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #E85D24, #ff8c42)',
      }} />
    </div>
  )
}

// 3. Terminal Dark - 黑客终端
function TerminalDarkCard({ data }: { data: FormData }) {
  const [showCursor] = useState(true)
   
  return (
    <div style={{
      width: '340px',
      height: '200px',
      background: '#0d1117',
      borderRadius: '12px',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      border: '1px solid #30363d',
    }}>
      {/* 终端头部 */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '12px',
      }}>
        <div style={{ width: '10px', height: '10px', background: '#ff5f56', borderRadius: '50%' }} />
        <div style={{ width: '10px', height: '10px', background: '#ffbd2e', borderRadius: '50%' }} />
        <div style={{ width: '10px', height: '10px', background: '#27c93f', borderRadius: '50%' }} />
      </div>
      
      {/* 内容 - 重新布局以避免遮挡 */}
      <div style={{ fontSize: '10px', lineHeight: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <p style={{ color: '#8b949e', marginBottom: '4px' }}>
            <span style={{ color: '#58a6ff' }}>const</span> profile = {'{'}
          </p>
          <p style={{ color: '#8b949e', marginBottom: '4px', paddingLeft: '16px' }}>
            name: <span style={{ color: '#a5d6ff' }}>"{data.name || 'User'}"</span>,
          </p>
          <p style={{ color: '#8b949e', marginBottom: '4px', paddingLeft: '16px' }}>
            title: <span style={{ color: '#a5d6ff' }}>"{data.titles[0] || 'Title'}"</span>,
          </p>
          <p style={{ color: '#8b949e', marginBottom: '4px', paddingLeft: '16px' }}>
            org: <span style={{ color: '#a5d6ff' }}>"{data.organization || 'Organization'}"</span>,
          </p>
          <p style={{ color: '#8b949e', marginBottom: '4px', paddingLeft: '16px' }}>
            skills: <span style={{ color: '#7ee787' }}>[{data.skills.slice(0, 3).map(s => `"${s}"`).join(', ') || '""'}]</span>
          </p>
          <p style={{ color: '#8b949e', marginBottom: '4px' }}>
            {'}'}
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <p style={{ color: '#27c93f', fontSize: '10px' }}>
            {'>'} {data.bio || 'Hello World'}{showCursor ? <span style={{ 
              display: 'inline-block', 
              width: '6px', 
              height: '12px', 
              background: '#27c93f', 
              marginLeft: '2px',
              verticalAlign: 'middle',
            }} /> : null}
          </p>
        </div>
      </div>
    </div>
  )
}

// 4. Forest Green - 自然科技
function ForestGreenCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '340px',
      height: '200px',
      background: 'linear-gradient(145deg, #134e4a 0%, #0f3b39 50%, #0a2e2c 100%)',
      borderRadius: '20px',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* 光晕效果 */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 60%)',
        borderRadius: '50%',
      }} />
      
      {/* 叶脉纹理 */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}>
        <pattern id="leaves" patternUnits="userSpaceOnUse" width="40" height="40">
          <path d="M0 20 Q20 0 40 20 Q20 40 0 20" stroke="#34d399" fill="none" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#leaves)" />
      </svg>
      
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>
            {data.name || '您的姓名'}
          </h2>
          {data.titles[0] && (
            <p style={{ color: 'rgba(52,211,153,0.9)', fontSize: '12px', fontWeight: 500 }}>{data.titles[0]}</p>
          )}
        </div>
        
        <div>
          {data.organization && (
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '4px' }}>{data.organization}</p>
          )}
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '10px' }}>{data.bio || '个人简介'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.skills.slice(0, 4).map((s, i) => (
              <span key={i} style={{
                background: 'rgba(52,211,153,0.1)',
                color: '#34d399',
                padding: '3px 10px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: 500,
              }}>{s}</span>
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
  const cardRef = useRef<HTMLDivElement>(null)

  const downloadCard = async () => {
    if (!cardRef.current) return
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      })
      
      const link = document.createElement('a')
      link.download = `赛博名片-${formData.displayName || 'card'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('下载失败:', err)
      alert('下载失败，请重试')
    }
  }

  // ... 保持之前的 Step 1-3 代码不变，只更新 renderStep4
  
  const renderStep4 = () => (
    <div style={{
      position: 'fixed', inset: 0, background: '#0F0E0D',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '24px' }}>Step 4 / 5</div>
      <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>🎉 您的名片已生成！</h1>
      
      {/* 名片预览 - 添加 ref 用于下载 */}
      <div ref={cardRef} style={{ marginBottom: '24px' }}>
        {formData.templateId === 'cyber_orange' && <CyberOrangeCard data={formData} />}
        {formData.templateId === 'neo_white' && <NeoWhiteCard data={formData} />}
        {formData.templateId === 'terminal_dark' && <TerminalDarkCard data={formData} />}
        {formData.templateId === 'forest_green' && <ForestGreenCard data={formData} />}
      </div>

      {/* 提示 */}
      <div style={{ 
        background: 'rgba(22,163,74,0.15)', 
        border: '1px solid rgba(22,163,74,0.3)', 
        borderRadius: '8px', 
        padding: '10px 16px', 
        marginBottom: '24px' 
      }}>
        <span style={{ color: '#34d399', fontSize: '13px' }}>✨ 已根据您的设置隐藏敏感信息</span>
      </div>

      {/* 下载按钮 */}
      <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={downloadCard}
          style={{ 
            padding: '16px', 
            background: 'linear-gradient(135deg, #E85D24, #C94B0A)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '12px', 
            fontSize: '16px', 
            fontWeight: 600, 
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(232,93,36,0.4)',
          }}>
          ⬇ 保存图片到相册
        </button>
        <button style={{ 
          padding: '16px', 
          background: 'transparent', 
          color: '#E85D24', 
          border: '2px solid #E85D24', 
          borderRadius: '12px', 
          fontSize: '16px', 
          fontWeight: 600, 
          cursor: 'pointer' 
        }}>
          🔗 复制分享链接
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
        <button onClick={() => setStep(2)} style={{ color: '#888', background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
          ✏️ 重新编辑名片
        </button>
        <button onClick={() => { setFormData(initialFormData); setStep(1); }} style={{ color: '#666', background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
          ← 重新开始
        </button>
      </div>
    </div>
  )

  // ... 其余代码保持不变
}
