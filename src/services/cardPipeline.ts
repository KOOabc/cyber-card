import { generateBusinessCard, CardData, CardStyle } from './cardGenerator';

/**
 * 完整名片生成流程
 * 用户数据 → 验证 → 生成背景 → 叠加文字 → 输出图片
 */
export async function createBusinessCardPipeline(
  userData: CardData,
  style: CardStyle
): Promise<string> {
  try {
    // Step 1: 验证数据
    validateCardData(userData);

    // Step 2: 生成名片（背景 + 文字叠加）
    console.log('🎨 开始生成名片...');
    const imageDataUrl = await generateBusinessCard(userData, style);

    // Step 3: 返回结果
    console.log('✅ 名片生成成功！');
    return imageDataUrl;

  } catch (error) {
    console.error('❌ 名片生成失败:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage || '未知错误');
  }
}

/**
 * 验证用户数据
 */
function validateCardData(data: CardData): void {
  if (!data.name || data.name.trim().length === 0) {
    throw new Error('姓名不能为空');
  }

  if (data.name.length > 20) {
    throw new Error('姓名不能超过20个字符');
  }

  if (data.titles.length === 0) {
    throw new Error('至少需要一个职位');
  }

  if (data.titles.some(t => t.length > 30)) {
    throw new Error('职位描述不能超过30个字符');
  }

  if (data.bio && data.bio.length > 60) {
    throw new Error('个人简介不能超过60个字符');
  }

  if (data.skills.length > 5) {
    throw new Error('技能标签最多5个');
  }
}

/**
 * 下载名片图片
 */
export function downloadCardImage(dataUrl: string, fileName: string = '名片.png'): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
