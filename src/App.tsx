import { useState, useRef } from 'react'
import domtoimage from 'dom-to-image-more'
import emailjs from '@emailjs/browser'

// Toggle 可见性组件
const VisibilityToggle = ({ visible, onChange, tooltip }: { visible: boolean; onChange: (v: boolean) => void; tooltip?: string }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  
  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={() => onChange(!visible)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 150ms ease',
          transform: visible ? 'scale(1)' : 'scale(0.85)',
        }}
        title={tooltip}
      >
        {visible ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        )}
      </button>
      {showTooltip && tooltip && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '4px',
          padding: '4px 8px',
          background: '#1F2937',
          color: '#fff',
          fontSize: '11px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          {tooltip}
        </div>
      )}
    </div>
  )
}

// 默认头像 SVG 组件 - 赛博风格
const DefaultAvatar = ({ size = 80, glowColor = '#E85D24' }: { size?: number; glowColor?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="48" fill="rgba(26,26,46,0.6)" stroke={glowColor} strokeWidth="2" filter="url(#glow)"/>
    <circle cx="50" cy="35" r="15" fill="none" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 25 70 Q 25 55 50 55 Q 75 55 75 70" fill="none" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="45" cy="33" r="2" fill={glowColor}/>
    <circle cx="55" cy="33" r="2" fill={glowColor}/>
  </svg>
)

// 类型定义
interface FormData {
  // Phase 1 问卷
  aiDirection: string[]
  isOversea: string
  overseaMarkets: string[]
  cloudNeed: string
  businessIntro: string
  // Phase 1 基础信息（用于收集）
  realName: string
  company: string
  title: string
  phone: string
  email: string
  // Phase 2 名片内容（所有字段必填用于后台收集）
  name: string              // 姓名（预填自 realName）
  titles: string[]          // 职业身份（预填自 title）
  organization: string      // 所属机构（预填自 company）
  cardPhone: string         // 手机号（预填自 phone）
  cardEmail: string         // 邮箱（预填自 email）
  bio: string               // 个人简介（选填）
  skills: string[]          // 技能标签（选填）
  avatarPreview: string     // 头像预览 URL
  socialAccounts: {
    wechat?: string
    xiaohongshu?: string
    x?: string
    linkedin?: string
  }
  link: string              // 个人主页链接
  // 可见性控制
  visibility: {
    name: boolean           // 默认 true
    titles: boolean         // 默认 true
    organization: boolean   // 默认 true
    phone: boolean          // 默认 true
    email: boolean          // 默认 true
    bio: boolean            // 默认 true
    skills: boolean         // 默认 true
    avatar: boolean         // 默认 true
    social: boolean         // 默认 false
    link: boolean           // 默认 false
  }
  templateId: 'cyber_orange' | 'neo_white' | 'terminal_dark' | 'forest_green'
}

const initialFormData: FormData = {
  aiDirection: [], isOversea: '', overseaMarkets: [], cloudNeed: '', businessIntro: '',
  realName: '', company: '', title: '', phone: '', email: '',
  name: '', titles: [], organization: '', cardPhone: '', cardEmail: '',
  bio: '', skills: [], avatarPreview: '',
  socialAccounts: { wechat: '', xiaohongshu: '', x: '', linkedin: '' },
  link: '',
  visibility: {
    name: true,
    titles: true,
    organization: true,
    phone: true,
    email: true,
    bio: true,
    skills: true,
    avatar: true,
    social: false,
    link: false
  },
  templateId: 'cyber_orange'
}

// ========== 4款精美模板 ==========

function CyberOrangeCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '640px',
      height: '360px',
      background: 'linear-gradient(145deg, #F5A962 0%, #E88A42 18%, #D66A28 38%, #B84A18 58%, #8C2A0E 80%, #6B1A08 100%)',
      borderRadius: '0',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Helvetica Neue', Arial, sans-serif",
    }}>
      {/* 底部3D球体 - 暖橙琥珀色调 */}
      <div style={{ 
        position: 'absolute', 
        top: '15px', 
        right: '50px', 
        width: '200px', 
        height: '200px', 
        background: 'radial-gradient(circle at 32% 32%, rgba(255,200,140,0.6), rgba(245,169,98,0.45) 30%, rgba(214,106,40,0.35) 55%, rgba(140,42,14,0.25) 75%, transparent 90%)', 
        borderRadius: '50%', 
        boxShadow: 'inset -10px -10px 30px rgba(107,26,8,0.4), inset 6px 6px 20px rgba(255,210,160,0.35)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '-40px', 
        left: '30px', 
        width: '140px', 
        height: '140px', 
        background: 'radial-gradient(circle at 38% 38%, rgba(255,180,120,0.55), rgba(232,138,66,0.4) 40%, rgba(184,74,24,0.3) 70%, transparent 90%)', 
        borderRadius: '50%',
        boxShadow: 'inset -6px -6px 18px rgba(107,26,8,0.35), inset 4px 4px 12px rgba(255,190,140,0.3)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ 
        position: 'absolute', 
        top: '55%', 
        right: '18%', 
        width: '80px', 
        height: '80px', 
        background: 'radial-gradient(circle at 35% 35%, rgba(255,190,130,0.5), rgba(214,106,40,0.3) 50%, transparent 80%)', 
        borderRadius: '50%',
        boxShadow: 'inset -4px -4px 12px rgba(107,26,8,0.3)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      {/* 3D圆环 - 琥珀色调 */}
      <div style={{ 
        position: 'absolute', 
        top: '12%', 
        left: '18%', 
        width: '110px', 
        height: '110px', 
        border: '4px solid rgba(255,190,140,0.28)', 
        borderRadius: '50%',
        boxShadow: '0 0 15px rgba(184,74,24,0.15), inset 0 0 10px rgba(255,200,160,0.1)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '22%', 
        right: '6%', 
        width: '60px', 
        height: '60px', 
        border: '3px solid rgba(245,169,98,0.22)', 
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(140,42,14,0.12)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ 
        position: 'absolute', 
        top: '42%', 
        left: '4%', 
        width: '45px', 
        height: '45px', 
        border: '2px solid rgba(214,106,40,0.18)', 
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* 毛玻璃卡片 - 琥珀色调半透明 */}
      <div style={{
        position: 'absolute',
        top: '28px',
        left: '28px',
        right: '28px',
        bottom: '28px',
        background: 'rgba(255,248,240,0.42)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderRadius: '20px',
        border: '1.5px solid rgba(255,255,255,0.4)',
        boxShadow: '0 8px 32px rgba(107,26,8,0.15), inset 0 1px 2px rgba(255,255,255,0.5)',
        padding: '32px 36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 1,
      }}>
        {/* 顶部区域 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 700,
              color: '#2a1a10',
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              margin: '0 0 14px 0',
            }}>
              {data.name || 'Your Name'}
            </h1>

            {data.titles.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                {data.titles.slice(0, 2).map((t, i) => (
                  <div key={i} style={{
                    fontSize: '16px',
                    color: '#3a2518',
                    fontWeight: 500,
                    margin: '4px 0',
                    lineHeight: 1.4,
                  }}>
                    {t}
                  </div>
                ))}
              </div>
            )}

            {data.organization && (
              <div style={{
                fontSize: '15px',
                color: '#5a3d2a',
                fontWeight: 400,
              }}>
                {data.organization}
              </div>
            )}
          </div>

          {data.avatarPreview && (
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.65)',
              boxShadow: '0 4px 20px rgba(107,26,8,0.2)',
              flexShrink: 0,
              marginLeft: '24px',
            }}>
              <img src={data.avatarPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {/* 底部区域 */}
        <div>
          {data.skills && data.skills.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {data.skills.slice(0, 4).map((s, i) => (
                <span key={i} style={{
                  background: 'rgba(140,42,14,0.12)',
                  color: '#6B1A08',
                  padding: '5px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: '1px solid rgba(140,42,14,0.18)',
                }}>{s}</span>
              ))}
            </div>
          )}

          {data.bio && (
            <div style={{
              fontSize: '14px',
              color: '#4a3020',
              lineHeight: 1.5,
              marginBottom: '12px',
              fontWeight: 300,
            }}>
              {data.bio}
            </div>
          )}

          {((data.visibility.phone && data.cardPhone) || (data.visibility.email && data.cardEmail)) && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
              {data.visibility.phone && data.cardPhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#5a3d2a' }}>
                  <span>📞</span><span>{data.cardPhone}</span>
                </div>
              )}
              {data.visibility.email && data.cardEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#5a3d2a' }}>
                  <span>✉️</span><span>{data.cardEmail}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function NeoWhiteCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '640px',
      height: '360px',
      background: '#f0f0f0',
      borderRadius: '0',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        bottom: '20px',
        background: 'linear-gradient(145deg, #ffffff 0%, #f7f7f7 100%)',
        borderRadius: '20px',
        boxShadow: '8px 8px 24px rgba(0,0,0,0.06), -8px -8px 24px rgba(255,255,255,0.9), inset 0 1px 1px rgba(255,255,255,0.8)',
        padding: '32px 36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'linear-gradient(135deg, transparent 0%, rgba(232,93,36,0.03) 100%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#111', fontSize: '42px', fontWeight: 700, marginBottom: '14px', letterSpacing: '-1.5px', lineHeight: 1.05 }}>
                {data.name || 'Your Name'}
              </h2>
              {data.titles.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  {data.titles.slice(0, 2).map((t, i) => (
                    <div key={i} style={{ color: '#555', fontSize: '16px', fontWeight: 500, margin: '4px 0' }}>{t}</div>
                  ))}
                </div>
              )}
              {data.organization && (
                <p style={{ color: '#999', fontSize: '15px', fontWeight: 400 }}>{data.organization}</p>
              )}
            </div>

            {data.avatarPreview && (
              <div style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #e0e0e0',
                boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.8)',
                background: '#fff',
                flexShrink: 0,
                marginLeft: '24px',
              }}>
                <img src={data.avatarPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {data.bio && (
            <p style={{ color: '#777', fontSize: '15px', lineHeight: 1.6, marginBottom: '14px', fontWeight: 300 }}>
              {data.bio}
            </p>
          )}

          {data.skills && data.skills.length > 0 && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {data.skills.slice(0, 4).map((s, i) => (
                <span key={i} style={{
                  color: '#E85D24',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '4px 0',
                  borderBottom: '2px solid #E85D24',
                }}>{s}</span>
              ))}
            </div>
          )}

          {((data.visibility.phone && data.cardPhone) || (data.visibility.email && data.cardEmail)) && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '24px',
              paddingTop: '12px',
              borderTop: '1px solid #ebebeb',
            }}>
              {data.visibility.phone && data.cardPhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#bbb', fontSize: '14px' }}>📞</span>
                  <span style={{ color: '#555', fontSize: '14px', fontWeight: 500 }}>{data.cardPhone}</span>
                </div>
              )}
              {data.visibility.email && data.cardEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#bbb', fontSize: '14px' }}>✉️</span>
                  <span style={{ color: '#555', fontSize: '14px', fontWeight: 500 }}>{data.cardEmail}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E85D24 0%, #ff8c42 50%, #E85D24 100%)' }} />
      </div>
    </div>
  )
}

function TerminalDarkCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '640px',
      height: '360px',
      background: 'linear-gradient(160deg, #161b22 0%, #0d1117 40%, #0a0e14 100%)',
      borderRadius: '14px',
      padding: '28px 36px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Courier New', monospace",
      border: '1px solid #21262d',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}>
      {/* 终端头部 */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        alignItems: 'center',
      }}>
        <div style={{ width: '12px', height: '12px', background: '#ff5f56', borderRadius: '50%' }} />
        <div style={{ width: '12px', height: '12px', background: '#ffbd2e', borderRadius: '50%' }} />
        <div style={{ width: '12px', height: '12px', background: '#27c93f', borderRadius: '50%' }} />
        <span style={{ marginLeft: '12px', color: '#484f58', fontSize: '13px' }}>profile.js</span>
      </div>

      {/* 代码内容区域 */}
      <div style={{ fontSize: '16px', lineHeight: 1.7 }}>
        <p style={{ color: '#8b949e', margin: '0 0 2px 0' }}><span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#d2a8ff' }}>profile</span> <span style={{ color: '#ff7b72' }}>=</span> {'{'}</p>
        <p style={{ color: '#8b949e', margin: '0 0 2px 0', paddingLeft: '24px' }}>name: <span style={{ color: '#a5d6ff' }}>"{data.name || 'User'}"</span>,</p>
        {data.titles.length > 0 && (
          <p style={{ color: '#8b949e', margin: '0 0 2px 0', paddingLeft: '24px' }}>role: <span style={{ color: '#a5d6ff' }}>"{data.titles[0]}"</span>,</p>
        )}
        {data.organization && (
          <p style={{ color: '#8b949e', margin: '0 0 2px 0', paddingLeft: '24px' }}>org: <span style={{ color: '#7ee787' }}>"{data.organization}"</span>,</p>
        )}
        {data.skills.length > 0 && (
          <p style={{ color: '#8b949e', margin: '0 0 2px 0', paddingLeft: '24px' }}>skills: <span style={{ color: '#7ee787' }}>[{data.skills.slice(0, 3).map(s => `"${s}"`).join(', ')}]</span></p>
        )}
        <p style={{ color: '#8b949e', margin: '0' }}>{'}'}</p>
      </div>

      {/* 底部区域：bio + 联系方式 */}
      <div style={{ position: 'absolute', bottom: '28px', left: '36px', right: '36px' }}>
        {/* Bio 命令行 */}
        {data.bio && (
          <p style={{ color: '#27c93f', margin: '0 0 16px 0', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#27c93f' }}>{'>'}</span>
            <span style={{ marginLeft: '10px', color: '#c9d1d9' }}>{data.bio}</span>
            <span style={{ display: 'inline-block', width: '8px', height: '16px', background: '#27c93f', marginLeft: '6px', animation: 'blink 1s infinite' }} />
          </p>
        )}

        {/* 联系方式 + 头像 */}
        {((data.visibility.phone && data.cardPhone) || (data.visibility.email && data.cardEmail) || data.avatarPreview) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '12px', borderTop: '1px solid #21262d' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              {data.visibility.phone && data.cardPhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#484f58', fontSize: '13px' }}>📞</span>
                  <span style={{ color: '#8b949e', fontSize: '13px' }}>{data.cardPhone}</span>
                </div>
              )}
              {data.visibility.email && data.cardEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#484f58', fontSize: '13px' }}>✉️</span>
                  <span style={{ color: '#8b949e', fontSize: '13px' }}>{data.cardEmail}</span>
                </div>
              )}
            </div>

            {data.avatarPreview && (
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid #27c93f',
                boxShadow: '0 0 12px rgba(39,201,63,0.3)',
                background: '#0d1117',
                flexShrink: 0,
              }}>
                <img src={data.avatarPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
    </div>
  )
}

function ForestGreenCard({ data }: { data: FormData }) {
  return (
    <div style={{
      width: '640px',
      height: '360px',
      background: 'linear-gradient(135deg, #1a4a3a 0%, #0f3528 20%, #0a2a1e 40%, #061f15 60%, #03150d 80%, #010a06 100%)',
      borderRadius: '20px',
      padding: '36px 40px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}>
      {/* 右上角微光渐变 */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle at center, rgba(72,220,170,0.18) 0%, rgba(52,211,153,0.1) 25%, rgba(40,180,130,0.05) 45%, transparent 65%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      {/* 左下角微弱光晕 */}
      <div style={{
        position: 'absolute',
        bottom: '-25%',
        left: '-5%',
        width: '280px',
        height: '280px',
        background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 55%)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }}>
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5"/>
      </svg>

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: '#fff', fontSize: '42px', fontWeight: 700, marginBottom: '14px', letterSpacing: '-1.5px', lineHeight: 1.05 }}>
              {data.name || 'Your Name'}
            </h2>
            {data.titles.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                {data.titles.slice(0, 2).map((t, i) => (
                  <div key={i} style={{ color: 'rgba(52,211,153,0.9)', fontSize: '16px', fontWeight: 500, margin: '4px 0' }}>{t}</div>
                ))}
              </div>
            )}
            {data.organization && (
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>{data.organization}</p>
            )}
          </div>

          {data.avatarPreview && (
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1.5px solid rgba(52,211,153,0.25)',
              boxShadow: '0 0 20px rgba(52,211,153,0.15)',
              background: 'rgba(10,31,20,0.8)',
              flexShrink: 0,
              marginLeft: '24px',
            }}>
              <img src={data.avatarPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <div>
          {data.bio && (
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', marginBottom: '14px', lineHeight: 1.6, fontWeight: 300 }}>{data.bio}</p>
          )}

          {data.skills && data.skills.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              {data.skills.slice(0, 4).map((s, i) => (
                <span key={i} style={{
                  background: 'rgba(52,211,153,0.08)',
                  color: 'rgba(52,211,153,0.75)',
                  padding: '6px 16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: '1px solid rgba(52,211,153,0.15)',
                }}>{s}</span>
              ))}
            </div>
          )}

          {((data.visibility.phone && data.cardPhone) || (data.visibility.email && data.cardEmail)) && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '24px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(52,211,153,0.08)',
            }}>
              {data.visibility.phone && data.cardPhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'rgba(52,211,153,0.35)', fontSize: '13px' }}>📞</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 400 }}>{data.cardPhone}</span>
                </div>
              )}
              {data.visibility.email && data.cardEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'rgba(52,211,153,0.35)', fontSize: '13px' }}>✉️</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 400 }}>{data.cardEmail}</span>
                </div>
              )}
            </div>
          )}
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
  const [isDragging, setIsDragging] = useState(false)
  const [isGeneratingBio, setIsGeneratingBio] = useState(false)
  const [bioHighlight, setBioHighlight] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理头像上传
  const handleAvatarUpload = (file: File) => {
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('请上传 JPG、PNG 或 WebP 格式的图片')
      return
    }

    // 验证文件大小（5MB）
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('图片大小不能超过 5MB')
      return
    }

    // 读取文件并转换为 base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setFormData({ ...formData, avatarPreview: result })
    }
    reader.readAsDataURL(file)
  }

  // 处理点击上传
  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleAvatarUpload(file)
    }
  }

  // 处理拖拽事件
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleAvatarUpload(file)
    }
  }

  // AI 生成个人简介
  const generateBioWithAI = async () => {
    // 检查必要信息是否填写
    if (!formData.name && !formData.realName) {
      alert('请先填写姓名信息')
      return
    }
    
    if (formData.titles.length === 0 && !formData.title) {
      alert('请先填写职位信息')
      return
    }

    setIsGeneratingBio(true)

    try {
      // 构建 prompt
      const userName = formData.name || formData.realName
      const userTitle = formData.titles[0] || formData.title
      const userOrg = formData.organization || formData.company
      const userSkills = formData.skills.length > 0 ? formData.skills.join('、') : ''
      const aiDirection = formData.aiDirection.join('、')
      const businessIntro = formData.businessIntro

      const prompt = `你是一位专业的个人品牌顾问，请根据以下信息，为用户生成一句精炼、有吸引力的个人简介（50字以内）：

姓名：${userName}
职位：${userTitle}
${userOrg ? `机构：${userOrg}` : ''}
${userSkills ? `技能：${userSkills}` : ''}
${aiDirection ? `业务方向：${aiDirection}` : ''}
${businessIntro ? `业务介绍：${businessIntro}` : ''}

要求：
1. 简洁有力，突出核心优势
2. 体现专业性和个人特色
3. 适合商务场合的名片展示
4. 50字以内，不要换行
5. 直接输出简介文本，不要包含任何前缀或解释

个人简介：`

      console.log('🚀 正在调用 GMI Cloud API...')
      console.log('📝 Prompt:', prompt)

      // 使用 Cloudflare Workers 代理（部署后自动生效，本地开发会fallback到直接调用）
      // 开发环境：直接调用 API
      // 生产环境：使用 /api 路径（Cloudflare Functions 会自动处理）
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const apiUrl = isDevelopment 
        ? 'https://api.gmi-serving.com/v1/chat/completions' 
        : '/api/chat/completions'
      
      console.log('🌐 API URL:', apiUrl)
      console.log('🔧 Environment:', isDevelopment ? 'Development (Direct API)' : 'Production (Cloudflare Proxy)')
      
      const requestBody = {
        model: 'deepseek-ai/DeepSeek-V3.2',  // 使用正确的模型名称
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      }

      console.log('📦 Request Body:', requestBody)
      
      // 开发环境需要 API Key，生产环境由 Workers 代理处理
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }
      
      if (isDevelopment) {
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0ZmIyYzM4LTY0MDgtNDM4Zi1hY2U0LTQ0NWUxZjYzZDU2YiIsInNjb3BlIjoiaWVfbW9kZWwiLCJjbGllbnRJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9.AVjFaRkv09lar_i2nfA89Hq2Gk-PZZJ0UCEY5_t_HH8'
        headers['Authorization'] = `Bearer ${apiKey}`
        console.log('🔑 Using API Key:', apiKey.substring(0, 20) + '...')
      }

      // 添加重试机制（最多重试 2 次）
      let lastError: Error | null = null
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`📡 尝试第 ${attempt} 次请求...`)
          
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(30000) // 30秒超时
          })

          console.log('📡 Response Status:', response.status)
          console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()))

          // 读取响应文本
          const responseText = await response.text()
          console.log('📄 Response Text:', responseText)

          if (!response.ok) {
            console.error('❌ API 返回错误:', responseText)
            
            // 如果是 404 或 400 错误，不重试
            if (response.status === 404 || response.status === 400) {
              throw new Error(`API 请求失败: ${response.status} - ${responseText}`)
            }
            
            // 其他错误，记录并继续重试
            lastError = new Error(`API 请求失败: ${response.status} - ${responseText}`)
            console.log(`⚠️ 第 ${attempt} 次尝试失败，${attempt < 3 ? '准备重试...' : '已达最大重试次数'}`)
            if (attempt < 3) {
              await new Promise(resolve => setTimeout(resolve, 1000 * attempt)) // 递增延迟
              continue
            }
            throw lastError
          }

          // 解析 JSON
          let data
          try {
            data = JSON.parse(responseText)
            console.log('✅ Parsed Data:', data)
          } catch (parseError) {
            console.error('❌ JSON 解析失败:', parseError)
            throw new Error('API 返回的数据格式错误')
          }

          const generatedBio = data.choices?.[0]?.message?.content?.trim() || ''
          console.log('💬 Generated Bio:', generatedBio)

          if (generatedBio) {
            // 清理可能的引号或多余字符
            const cleanBio = generatedBio.replace(/^["']|["']$/g, '').trim()
            setFormData({ ...formData, bio: cleanBio })
            // 高亮效果
            setBioHighlight(true)
            setTimeout(() => setBioHighlight(false), 500)
            console.log('✅ AI 生成成功!')
            return // 成功，退出函数
          } else {
            throw new Error('AI 返回的内容为空')
          }
          
        } catch (fetchError) {
          lastError = fetchError as Error
          console.error(`❌ 第 ${attempt} 次请求失败:`, fetchError)
          
          // 如果是超时或网络错误，继续重试
          if (attempt < 3 && (
            fetchError instanceof TypeError || 
            (fetchError as Error).message.includes('timeout') ||
            (fetchError as Error).message.includes('fetch')
          )) {
            console.log(`⚠️ 网络错误，${attempt < 3 ? '1秒后重试...' : ''}`)
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
            continue
          }
          
          // 其他错误或最后一次尝试失败，抛出错误
          if (attempt === 3) {
            throw lastError
          }
        }
      }

      // 如果所有重试都失败
      throw lastError || new Error('所有请求尝试都失败了')

    } catch (error) {
      console.error('❌ AI 生成失败:', error)
      // 显示详细错误信息
      if (error instanceof Error) {
        alert(`AI 生成失败：${error.message}\n\n请检查:\n1. 网络连接是否正常\n2. API 密钥是否有效\n3. 浏览器控制台查看详细错误`)
      } else {
        alert('AI 生成失败，请稍后重试或手动填写')
      }
    } finally {
      setIsGeneratingBio(false)
    }
  }

  const downloadCard = async () => {
    if (!cardRef.current) {
      alert('无法找到名片元素，请重试')
      return
    }

    try {
      console.log('🎨 开始截取名片...')

      // 获取实际的卡片元素
      const cardElement = cardRef.current.firstElementChild as HTMLElement
      if (!cardElement) {
        alert('无法找到名片元素，请重试')
        return
      }

      // 使用 dom-to-image-more 截取，效果更准确
      const dataUrl = await domtoimage.toPng(cardElement, {
        width: 640,
        height: 360,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        quality: 1,
        pixelRatio: 5, // 提升到5倍分辨率 (3200x1800)
      })

      console.log('✅ 图片生成成功')

      // 下载
      const link = document.createElement('a')
      link.download = `赛博名片-${formData.name || formData.realName || 'card'}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      console.log('✅ 下载已触发')

    } catch (err) {
      console.error('❌ 下载失败:', err)
      alert('下载失败，请重试\n\n错误信息：' + (err instanceof Error ? err.message : String(err)))
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
        subject: '🎯 新的赛博名片提交 - ' + formData.name,
        
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
        name: formData.name,
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
展示名称        ${formData.name}
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

  // 提交数据到 Google Sheets
  const submitData = async () => {
    try {
      // 添加超时保护
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('提交超时')), 8000)
      )
      
      await Promise.race([submitToGoogleSheets(), timeoutPromise])
      console.log('✅ 数据已成功提交到在线表格')
      return true
    } catch (error) {
      console.error('❌ 提交失败:', error)
      // 不阻塞流程，静默失败
      console.warn('⚠️ 数据提交失败，但继续流程')
      return true // 返回 true 让流程继续
    }
  }

  // 提交数据到 Google Sheets
  const submitToGoogleSheets = async () => {
    console.log('🚀 开始提交数据到 Google Sheets...')
    
    // 准备提交的数据
    const rowData = [
      new Date().toLocaleString('zh-CN'),
      formData.realName,
      formData.company,
      formData.title,
      formData.phone,
      formData.email,
      formData.aiDirection.join(', '),
      formData.isOversea,
      formData.overseaMarkets.join(', '),
      formData.cloudNeed,
      formData.businessIntro,
      formData.name,
      formData.titles.join(', '),
      formData.organization,
      formData.bio,
      formData.skills.join(', '),
      formData.templateId,
    ]
    
    console.log('📊 准备提交的数据:', rowData)
    
    // Google Apps Script Web App URL
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzQ4QkBdTVHV-m21fnFGXeK3_3uk8F96ZUPSBbnxFgp-kdfQh9hVn-NtoD8I6xBcvxF/exec'
    
    // 方案1：使用 URL 参数（GET 请求 - 最兼容）
    try {
      console.log('📡 尝试 GET 方式提交...')
      const params = new URLSearchParams()
      params.append('data', JSON.stringify(rowData))
      
      const getUrl = `${WEB_APP_URL}?${params.toString()}`
      console.log('🔗 请求 URL 长度:', getUrl.length)
      
      // 创建隐藏的 iframe 来发送请求（绕过 CORS）
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = getUrl
      document.body.appendChild(iframe)
      
      // 等待 2 秒后移除 iframe
      setTimeout(() => {
        if (iframe.parentNode) {
          document.body.removeChild(iframe)
        }
      }, 2000)
      
      console.log('✅ 请求已发送（iframe 方式）')
      return true
      
    } catch (error) {
      console.error('❌ iframe 方式失败:', error)
      
      // 方案2：使用 FormData POST（备用）
      try {
        console.log('📡 尝试 FormData POST 方式...')
        const formData2 = new FormData()
        formData2.append('data', JSON.stringify(rowData))
        
        await fetch(WEB_APP_URL, {
          method: 'POST',
          body: formData2,
          mode: 'no-cors'
        })
        
        console.log('✅ FormData POST 请求已发送')
        return true
      } catch (postError) {
        console.error('❌ FormData POST 也失败:', postError)
        throw postError
      }
    }
  }

  const copyShareLink = () => {
    // 生成分享链接（将表单数据编码到 URL）
    const cardData = {
      displayName: formData.name,
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
      <button onClick={() => {
        // 自动预填 Phase1 数据到 Phase2
        if (!formData.name) {
          setFormData({
            ...formData,
            name: formData.realName,
            organization: formData.company,
            cardPhone: formData.phone,
            cardEmail: formData.email,
            titles: formData.title ? [formData.title] : []
          })
        }
        setStep(2)
      }} style={{ padding: '16px 36px', background: 'linear-gradient(135deg, #E85D24, #C94B0A)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
        开始制作我的名片 →
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  // Step 2: 基础信息（合并版 - 包含联系方式）
  const renderStep2 = () => {
    const handleNext = () => {
      if (!formData.realName || !formData.company || !formData.title || !formData.phone || !formData.email) {
        alert('请完成所有必填项')
        return
      }
      // 自动预填数据到名片字段
      setFormData({
        ...formData,
        name: formData.realName,
        organization: formData.company,
        cardPhone: formData.phone,
        cardEmail: formData.email,
        titles: formData.title ? [formData.title] : []
      })
      setStep(3)
    }

    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Step 2 / 5</div>
        <div style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Phase 2 · 基础信息</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>📝 填写基础信息</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>这些信息将用于生成名片，下一步可选择是否展示</p>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>姓名 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.realName} onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
            placeholder="请输入姓名（将显示在名片上）" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>职位 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="例如：产品经理、设计师" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>公司/机构 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="例如：阿里巴巴、字节跳动" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>手机号 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="例如：138 0000 0000" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>邮箱 <span style={{ color: '#E85D24' }}>*</span></div>
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="例如：name@example.com" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <button onClick={() => setStep(1)} style={{ flex: 1, padding: '16px', background: '#fff', color: '#666', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            ← 上一步
          </button>
          <button onClick={handleNext} style={{ flex: 1, padding: '16px', background: '#E85D24', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            下一步，自定义名片 →
          </button>
        </div>
      </div>
    )
  }

  // Step 3: 自定义名片（简化版 - 只编辑头像/简介/技能 + 选择是否展示信息）
  const renderStep3 = () => (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Step 3 / 5</div>
      <div style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Phase 3 · 名片定制</div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>✨ 自定义您的名片</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>上传头像、填写简介，选择要展示的信息</p>

      {/* 信息展示控制 */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>📋 选择要展示的信息</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '14px' }}>姓名</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{formData.realName}</div>
            </div>
            <VisibilityToggle
              visible={formData.visibility.name}
              onChange={(v) => setFormData({ ...formData, visibility: { ...formData.visibility, name: v } })}
              tooltip="姓名展示"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '14px' }}>职位</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{formData.title}</div>
            </div>
            <VisibilityToggle
              visible={formData.visibility.titles}
              onChange={(v) => setFormData({ ...formData, visibility: { ...formData.visibility, titles: v } })}
              tooltip="职位展示"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '14px' }}>公司/机构</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{formData.company}</div>
            </div>
            <VisibilityToggle
              visible={formData.visibility.organization}
              onChange={(v) => setFormData({ ...formData, visibility: { ...formData.visibility, organization: v } })}
              tooltip="机构展示"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '14px' }}>手机号</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{formData.phone}</div>
            </div>
            <VisibilityToggle
              visible={formData.visibility.phone}
              onChange={(v) => setFormData({ ...formData, visibility: { ...formData.visibility, phone: v } })}
              tooltip="手机号展示"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: 500, fontSize: '14px' }}>邮箱</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formData.email}</div>
            </div>
            <VisibilityToggle
              visible={formData.visibility.email}
              onChange={(v) => setFormData({ ...formData, visibility: { ...formData.visibility, email: v } })}
              tooltip="邮箱展示"
            />
          </div>
        </div>
      </div>

      {/* 头像上传区域 */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>
          📸 头像上传
          <span style={{ color: '#999', fontSize: '11px', marginLeft: '8px' }}>（选填，支持 JPG/PNG/WebP，最大 5MB）</span>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* 头像预览 */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid',
            borderColor: formData.avatarPreview ? '#E85D24' : '#e0e0e0',
            boxShadow: formData.avatarPreview ? '0 0 20px rgba(232,93,36,0.3)' : 'none',
          }}>
            {formData.avatarPreview ? (
              <img src={formData.avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <DefaultAvatar size={60} />
            )}
          </div>

          {/* 上传区域 */}
          <div style={{ flex: 1 }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div
              onClick={handleAvatarClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${isDragging ? '#E85D24' : '#e0e0e0'}`,
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: isDragging ? 'rgba(232,93,36,0.05)' : '#fafafa',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ color: '#E85D24', fontSize: '24px', marginBottom: '8px' }}>📸</div>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>
                {isDragging ? '释放以上传' : '点击上传或拖拽图片到此处'}
              </div>
              <div style={{ color: '#999', fontSize: '12px' }}>支持 JPG、PNG、WebP 格式，最大 5MB</div>
            </div>
            {formData.avatarPreview && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setFormData({ ...formData, avatarPreview: '' })
                }}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  background: 'transparent',
                  color: '#E85D24',
                  border: '1px solid #E85D24',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                重新上传
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 个人简介 */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>
          📝 个人简介
          <span style={{ color: '#999', fontSize: '11px', marginLeft: '8px' }}>（选填，最多60字）</span>
        </div>
        <textarea 
          value={formData.bio} 
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="一句话介绍自己，展示在名片上" 
          maxLength={60} 
          style={{ 
            width: '100%', 
            padding: '12px 14px', 
            border: `2px solid ${bioHighlight ? '#E85D24' : '#e0e0e0'}`, 
            borderRadius: '10px', 
            fontSize: '14px', 
            resize: 'none', 
            outline: 'none',
            opacity: isGeneratingBio ? 0.6 : 1,
            transition: 'border-color 500ms ease'
          }} 
          rows={2}
          disabled={isGeneratingBio}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '12px', color: '#999' }}>{formData.bio.length} / 60</div>
          <button
            onClick={generateBioWithAI}
            disabled={isGeneratingBio}
            style={{
              fontSize: '12px',
              color: isGeneratingBio ? 'rgba(232,93,36,0.5)' : '#E85D24',
              border: `1px solid ${isGeneratingBio ? 'rgba(232,93,36,0.2)' : 'rgba(232,93,36,0.3)'}`,
              borderRadius: '6px',
              padding: '3px 10px',
              background: isGeneratingBio ? 'transparent' : 'transparent',
              cursor: isGeneratingBio ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isGeneratingBio) {
                e.currentTarget.style.background = 'rgba(232,93,36,0.06)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {isGeneratingBio ? '⟳ 生成中...' : '✦ AI 生成简介'}
          </button>
        </div>
      </div>

      {/* 技能标签 */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>
          🏷️ 技能标签
          <span style={{ color: '#999', fontSize: '11px', marginLeft: '8px' }}>（选填，最多5个）</span>
        </div>
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
          下一步，选择风格 →
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
        <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Step 4 / 5</div>
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
    <div style={{ position: 'fixed', inset: 0, background: '#0F0E0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}>
      <div style={{ color: '#E85D24', fontSize: '14px', fontWeight: 500, marginBottom: '24px' }}>Step 5 / 5</div>
      <h1 style={{ color: '#fff', fontSize: '30px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>🎉 您的名片已生成！</h1>
      
      <div ref={cardRef} style={{ marginBottom: '24px', maxWidth: '100%', transform: 'scale(1)', transformOrigin: 'center' }}>
        <div style={{ display: 'inline-block', transform: window.innerWidth < 700 ? 'scale(0.5)' : 'scale(1)', transformOrigin: 'center', transition: 'transform 0.3s ease' }}>
          {formData.templateId === 'cyber_orange' && <CyberOrangeCard data={formData} />}
          {formData.templateId === 'neo_white' && <NeoWhiteCard data={formData} />}
          {formData.templateId === 'terminal_dark' && <TerminalDarkCard data={formData} />}
          {formData.templateId === 'forest_green' && <ForestGreenCard data={formData} />}
        </div>
      </div>

      <div style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '10px', padding: '12px 20px', marginBottom: '28px', maxWidth: '90%', textAlign: 'center' }}>
        <span style={{ color: '#34d399', fontSize: '13px' }}>✨ 已根据您的设置隐藏敏感信息</span>
      </div>

      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '14px', padding: '0 20px' }}>
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
    <div style={{ background: '#0A0A0A', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: '1200px', width: '100%', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo 位置预留 - 上传后替换 */}
          <img src="/gmi-logo.png" alt="GMI Cloud" style={{ height: '24px', marginRight: '10px' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>GMI Cloud</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginLeft: '14px', paddingLeft: '14px', borderLeft: '1px solid rgba(255,255,255,0.15)' }}>
            赛博名片由 Inference Engine API 实时生成
          </span>
        </div>
        <a href="https://console.gmicloud.ai/model-library" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '6px 12px', textDecoration: 'none' }}>
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
