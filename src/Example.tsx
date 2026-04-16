// 使用示例 - 集成到现有 App.tsx

import { useState } from 'react';
import { createBusinessCardPipeline, downloadCardImage } from './services/cardPipeline';
import { CardData, CardStyle } from './services/cardGenerator';

function CardGeneratorDemo() {
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>('');

  // 示例用户数据
  const sampleData: CardData = {
    name: 'ALEX MERCER',
    titles: ['Chief Creative Officer', 'DESIGNHOUSE'],
    organization: 'Founder of CCS & ComfyPark',
    bio: 'Visualizing the future of digital product experiences',
    skills: ['PRODUCT STRATEGY', 'BRAND NARRATIVE', 'UX'],
    phone: '+86 123 4567',
    email: 'alex@example.com',
    avatarUrl: '/path/to/avatar.jpg' // 可选
  };

  const handleGenerateCard = async (style: CardStyle) => {
    setLoading(true);
    try {
      // 调用生成 pipeline
      const imageUrl = await createBusinessCardPipeline(sampleData, style);
      setGeneratedImage(imageUrl);

      alert('✅ 名片生成成功！');
    } catch (error) {
      console.error(error);
      alert('❌ 生成失败：' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      downloadCardImage(generatedImage, `名片-${sampleData.name}.png`);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>🎨 名片生成器</h1>

      {/* 风格选择按钮 */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <button
          onClick={() => handleGenerateCard('glass')}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: '#E85D24',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? '生成中...' : 'Glass 风格'}
        </button>

        <button
          onClick={() => handleGenerateCard('atmosphere')}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: '#115e59',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? '生成中...' : 'Atmosphere 风格'}
        </button>

        <button
          onClick={() => handleGenerateCard('surface')}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: '#fff',
            color: '#111',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            cursor: 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? '生成中...' : 'Surface 风格'}
        </button>

        <button
          onClick={() => handleGenerateCard('code')}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: '#0d1117',
            color: '#27c93f',
            border: '1px solid #30363d',
            borderRadius: '8px',
            cursor: 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? '生成中...' : 'Code 风格'}
        </button>
      </div>

      {/* 预览区域 */}
      {generatedImage && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>预览：</h2>
          <img
            src={generatedImage}
            alt="Generated Card"
            style={{
              maxWidth: '100%',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
            }}
          />

          <button
            onClick={handleDownload}
            style={{
              marginTop: '16px',
              padding: '14px 32px',
              background: '#16A34A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ⬇️ 下载名片
          </button>
        </div>
      )}

      {/* 用户数据展示 */}
      <div style={{
        marginTop: '32px',
        padding: '24px',
        background: '#f5f5f5',
        borderRadius: '12px'
      }}>
        <h3 style={{ marginBottom: '16px' }}>当前数据：</h3>
        <pre style={{
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '14px'
        }}>
          {JSON.stringify(sampleData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default CardGeneratorDemo;
