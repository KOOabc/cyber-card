// 名片生成服务 - 完全重写版本
import html2canvas from 'html2canvas';

export interface CardData {
  name: string;
  titles: string[];
  organization: string;
  bio: string;
  skills: string[];
  phone?: string;
  email?: string;
  avatarUrl?: string;
}

export type CardStyle = 'glass' | 'atmosphere' | 'surface' | 'code';

/**
 * 生成完整名片（背景 + 文字叠加）
 */
export async function generateBusinessCard(
  data: CardData,
  style: CardStyle
): Promise<string> {
  console.log('🎨 [cardGenerator] 开始生成名片, style:', style);
  console.log('📊 [cardGenerator] 数据:', data);

  // 1. 创建临时容器
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.zIndex = '-1';
  container.style.width = '960px';
  container.style.height = '540px';
  container.style.background = 'transparent';
  document.body.appendChild(container);

  try {
    // 2. 渲染名片 DOM
    container.innerHTML = renderCardHTML(data, style);
    console.log('✅ [cardGenerator] HTML 已渲染');

    // 2.5 等待多帧让浏览器完成渲染
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));

    // 3. 等待字体和图片加载
    console.log('⏳ [cardGenerator] 等待字体加载...');
    await document.fonts.ready;

    // 额外等待确保所有样式都应用
    await new Promise(resolve => setTimeout(resolve, 100));

    const images = Array.from(container.querySelectorAll('img'));
    if (images.length > 0) {
      console.log('⏳ [cardGenerator] 等待图片加载...');
      await Promise.all(
        images.map(img =>
          img.complete ? Promise.resolve() : new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          })
        )
      );
    }

    // 4. 验证元素存在
    const element = container.firstChild as HTMLElement;
    if (!element) {
      throw new Error('无法创建名片元素');
    }
    console.log('✅ [cardGenerator] 元素已准备好:', element.tagName);

    // 5. 转换为 Canvas - 优化配置
    console.log('🖼️ [cardGenerator] 开始转换为 Canvas...');
    
    let canvas: HTMLCanvasElement;
    try {
      canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: 960,
        height: 540,
        windowWidth: 960,
        windowHeight: 540,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // 确保克隆文档中的样式正确应用
          const clonedElement = clonedDoc.body.firstChild as HTMLElement;
          if (clonedElement) {
            clonedElement.style.position = 'relative';
            clonedElement.style.left = '0';
            clonedElement.style.top = '0';
          }
        }
      });
    } catch (canvasError) {
      console.error('❌ [cardGenerator] Canvas 转换失败:', canvasError);
      // 回退方案：尝试简化配置
      console.log('🔄 [cardGenerator] 尝试简化配置...');
      canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 960,
        height: 540,
      });
    }

    console.log('✅ [cardGenerator] Canvas 转换完成, 尺寸:', canvas.width, 'x', canvas.height);

    // 6. 导出为 PNG
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    console.log('✅ [cardGenerator] PNG 导出完成, 大小:', Math.round(dataUrl.length / 1024), 'KB');

    if (dataUrl.length < 1000) {
      throw new Error('生成的图片数据异常，请重试');
    }

    return dataUrl;

  } catch (error) {
    console.error('❌ [cardGenerator] 生成失败:', error);
    throw error;
  } finally {
    // 7. 清理临时容器
    if (container.parentNode) {
      document.body.removeChild(container);
    }
  }
}

/**
 * 渲染名片 HTML - 参考设计图样式（增强版）
 */
function renderCardHTML(data: CardData, style: CardStyle): string {
  const backgrounds: Record<CardStyle, string> = {
    glass: `
      <div style="
        width: 960px;
        height: 540px;
        background: linear-gradient(135deg, #FFBE9D 0%, #FF9F7A 15%, #FF8252 35%, #E85D24 60%, #D64810 80%, #FF9870 100%);
        border-radius: 32px;
        position: relative;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
        box-shadow: 0 40px 120px rgba(232,93,36,0.35);
      ">
        <!-- 背景装饰 - 浮动球体 -->
        <div style="position: absolute; top: -100px; right: 50px; width: 260px; height: 260px; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,200,170,0.25) 40%, rgba(232,93,36,0.15) 70%, transparent); border-radius: 50%; filter: blur(4px); z-index: 0;"></div>
        <div style="position: absolute; bottom: -90px; left: -70px; width: 200px; height: 200px; background: linear-gradient(135deg, rgba(255,180,140,0.45), rgba(232,93,36,0.3)); border-radius: 50%; filter: blur(3px); z-index: 0;"></div>
        <div style="position: absolute; top: 90px; right: -50px; width: 150px; height: 150px; border: 2px solid rgba(255,255,255,0.2); border-radius: 50%; border-left-color: transparent; border-bottom-color: transparent; transform: rotate(25deg); z-index: 0;"></div>

        <!-- 毛玻璃面板 - Swiss 布局 -->
        <div style="
          position: absolute;
          top: 50px;
          left: 70px;
          right: 70px;
          bottom: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 100%);
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          border-radius: 28px;
          border: 1.5px solid rgba(255,255,255,0.4);
          border-bottom: 1px solid rgba(255,255,255,0.25);
          border-right: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 14px 35px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.55), inset 0 -1px 2px rgba(232,93,36,0.1);
          padding: 45px 55px;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        ">
          <!-- 顶部：姓名 + 职位 -->
          <div>
            <h1 style="
              font-size: 62px;
              font-weight: 800;
              color: #FFFFFF;
              letter-spacing: -2px;
              line-height: 1.1;
              margin: 0 0 18px 0;
              text-align: left;
              text-shadow: 0 1px 4px rgba(0,0,0,0.12);
            ">
              ${data.name || 'Your Name'}
            </h1>

            ${data.titles.length > 0 ? `
              <div style="margin-bottom: 14px;">
                ${data.titles.slice(0, 2).map(t => `
                  <div style="
                    font-size: 18px;
                    color: rgba(255,255,255,0.88);
                    font-weight: 500;
                    margin: 5px 0;
                    letter-spacing: 0.3px;
                    line-height: 1.4;
                    text-align: left;
                  ">
                    ${t}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${data.skills && data.skills.length > 0 ? `
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px;">
                ${data.skills.slice(0, 3).map(s => `
                  <span style="
                    background: rgba(255,255,255,0.22);
                    color: rgba(255,255,255,0.92);
                    padding: 5px 12px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 500;
                    border: 1px solid rgba(255,255,255,0.28);
                  ">${s}</span>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- 底部：机构 + 联系方式 -->
          <div style="text-align: left;">
            ${data.bio ? `
              <div style="
                font-size: 15px;
                color: rgba(255,255,255,0.78);
                line-height: 1.5;
                margin-bottom: 14px;
                max-width: 85%;
              ">
                ${data.bio}
              </div>
            ` : ''}

            ${data.organization ? `
              <div style="
                font-size: 17px;
                color: rgba(255,255,255,0.82);
                margin-bottom: 12px;
                font-weight: 500;
              ">
                ${data.organization}
              </div>
            ` : ''}

            ${(data.phone || data.email) ? `
              <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                ${data.phone ? `
                  <div style="display: flex; align-items: center; gap: 6px; font-size: 14px; color: rgba(255,255,255,0.72);">
                    <span style="font-size: 15px;">📞</span>
                    <span>${data.phone}</span>
                  </div>
                ` : ''}
                ${data.email ? `
                  <div style="display: flex; align-items: center; gap: 6px; font-size: 14px; color: rgba(255,255,255,0.72);">
                    <span style="font-size: 15px;">✉️</span>
                    <span>${data.email}</span>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- 高光 -->
        <div style="position: absolute; top: 60px; left: 80px; width: 130px; height: 130px; background: radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 70%); border-radius: 50%; filter: blur(15px); pointer-events: none; z-index: 2;"></div>
      </div>
    `,

    atmosphere: `
      <div style="
        width: 960px;
        height: 540px;
        background: linear-gradient(145deg, #115e59 0%, #134e4a 40%, #0f3b39 100%);
        border-radius: 24px;
        padding: 60px;
        position: relative;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
      ">
        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.08;">
          <pattern id="leaf-pattern" patternUnits="userSpaceOnUse" width="50" height="50">
            <path d="M25 0 Q25 25 50 25 Q25 25 25 50 Q25 25 0 25 Q25 25 25 0" stroke="#34d399" fill="none" stroke-width="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>

        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <h2 style="color: #fff; font-size: 100px; font-weight: 800; margin: 0 0 20px 0; letter-spacing: -2px;">
            ${data.name}
          </h2>
          ${data.titles[0] ? `
            <p style="color: #34d399; font-size: 42px; font-weight: 600; margin: 0 0 15px 0;">
              ${data.titles[0]}
            </p>
          ` : ''}
          ${data.organization ? `
            <p style="color: rgba(255,255,255,0.6); font-size: 32px; margin: 0 0 30px 0;">
              ${data.organization}
            </p>
          ` : ''}

          ${(data.phone || data.email) ? `
            <div style="display: flex; gap: 30px; justify-content: center;">
              ${data.phone ? `
                <span style="color: rgba(255,255,255,0.7); font-size: 24px;">📞 ${data.phone}</span>
              ` : ''}
              ${data.email ? `
                <span style="color: rgba(255,255,255,0.7); font-size: 24px;">✉️ ${data.email}</span>
              ` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `,

    surface: `
      <div style="
        width: 960px;
        height: 540px;
        background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
        border-radius: 32px;
        padding: 60px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 30px 80px rgba(0,0,0,0.12);
        font-family: 'Inter', sans-serif;
      ">
        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <h2 style="color: #111; font-size: 100px; font-weight: 800; margin: 0 0 20px 0; letter-spacing: -3px;">
            ${data.name}
          </h2>
          ${data.titles[0] ? `
            <p style="color: #444; font-size: 40px; font-weight: 600; margin: 0 0 15px 0;">
              ${data.titles[0]}
            </p>
          ` : ''}
          ${data.organization ? `
            <p style="color: #888; font-size: 32px; margin: 0 0 30px 0;">
              ${data.organization}
            </p>
          ` : ''}

          ${(data.phone || data.email) ? `
            <div style="display: flex; gap: 30px; justify-content: center;">
              ${data.phone ? `
                <span style="color: #444; font-size: 24px;">📞 ${data.phone}</span>
              ` : ''}
              ${data.email ? `
                <span style="color: #444; font-size: 24px;">✉️ ${data.email}</span>
              ` : ''}
            </div>
          ` : ''}
        </div>

        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #E85D24 0%, #ff8c42 50%, #E85D24 100%);"></div>
      </div>
    `,

    code: `
      <div style="
        width: 960px;
        height: 540px;
        background: #0d1117;
        border-radius: 16px;
        padding: 40px 50px;
        position: relative;
        overflow: hidden;
        font-family: 'JetBrains Mono', 'Courier New', 'Consolas', monospace;
        border: 2px solid #30363d;
      ">
        <!-- 终端头部按钮 -->
        <div style="display: flex; gap: 10px; margin-bottom: 36px;">
          <div style="width: 16px; height: 16px; background: #ff5f56; border-radius: 50%;"></div>
          <div style="width: 16px; height: 16px; background: #ffbd2e; border-radius: 50%;"></div>
          <div style="width: 16px; height: 16px; background: #27c93f; border-radius: 50%;"></div>
        </div>

        <!-- 代码内容 - 左对齐，分层布局 -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; height: calc(100% - 60px);">
          <!-- 顶部：代码块 -->
          <div style="font-size: 20px; line-height: 1.8; color: #8b949e;">
            <p style="margin: 0;"><span style="color: #58a6ff;">const</span> user = {</p>
            <p style="margin: 0; padding-left: 30px;">name: <span style="color: #a5d6ff;">"${data.name || 'User'}"</span>,</p>
            ${data.titles.length > 0 ? `
              <p style="margin: 0; padding-left: 30px;">role: <span style="color: #a5d6ff;">"${data.titles[0]}"</span>,</p>
            ` : ''}
            ${data.organization ? `
              <p style="margin: 0; padding-left: 30px;">org: <span style="color: #7ee787;">"${data.organization}"</span></p>
            ` : ''}
            <p style="margin: 0;">}</p>

            ${data.bio ? `
              <p style="color: #27c93f; margin: 20px 0 0 0; display: flex; align-items: center;">
                {'>'} <span style="margin-left: 10px; color: #c9d1d9;">${data.bio}</span>
                <span style="display: inline-block; width: 10px; height: 20px; background: #27c93f; margin-left: 6px;"></span>
              </p>
            ` : ''}
          </div>

          <!-- 底部：信息区 - 避免重叠 -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px;">
            <!-- 左侧：联系方式 -->
            ${(data.phone || data.email) ? `
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${data.phone ? `
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="color: #8b949e; font-size: 14px;">📞</span>
                    <span style="color: #8b949e; font-size: 14px;">${data.phone}</span>
                  </div>
                ` : ''}
                ${data.email ? `
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="color: #8b949e; font-size: 14px;">✉️</span>
                    <span style="color: #8b949e; font-size: 14px;">${data.email}</span>
                  </div>
                ` : ''}
              </div>
            ` : '<div></div>'}

            <!-- 右侧：技能标签 -->
            ${data.skills.length > 0 ? `
              <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; max-width: 400px;">
                ${data.skills.slice(0, 3).map(s => `
                  <span style="color: #27c93f; font-size: 12px; opacity: 0.7;">#${s}</span>
                `).join('')}
              </div>
            ` : '<div></div>'}
          </div>
        </div>
      </div>
    `
  };

  return backgrounds[style];
}
