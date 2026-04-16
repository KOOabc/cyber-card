// Cloudflare Workers 代理 - GMI Cloud API
// 用于代理前端到 GMI Cloud API 的请求，避免浏览器跨域问题

export async function onRequest(context) {
  const { request, env } = context;
  
  // 允许的方法
  if (request.method !== 'POST' && request.method !== 'OPTIONS') {
    return new Response('Method not allowed', { status: 405 });
  }

  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  try {
    // 从请求体获取数据
    const requestBody = await request.json();
    
    // GMI Cloud API 配置
    const GMI_API_URL = 'https://api.gmi-serving.com/v1/chat/completions';
    const GMI_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0ZmIyYzM4LTY0MDgtNDM4Zi1hY2U0LTQ0NWUxZjYzZDU2YiIsInNjb3BlIjoiaWVfbW9kZWwiLCJjbGllbnRJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9.AVjFaRkv09lar_i2nfA89Hq2Gk-PZZJ0UCEY5_t_HH8';

    // 转发请求到 GMI Cloud API
    const apiResponse = await fetch(GMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GMI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    // 获取响应数据
    const responseData = await apiResponse.text();
    
    // 返回响应给前端
    return new Response(responseData, {
      status: apiResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Proxy error', message: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
