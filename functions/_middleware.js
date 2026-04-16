// Cloudflare Workers 配置
export default {
  async fetch(request) {
    return await handleRequest(request);
  },
};

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // 添加中国优化的响应头
  const headers = new Headers({
    'Cache-Control': 'public, max-age=3600',
    'CDN-Cache-Control': 'public, max-age=86400',
    'Cloudflare-CDN-Cache-Control': 'public, max-age=86400',
  });
  
  // 获取静态资源
  const response = await fetch(request);
  const newResponse = new Response(response.body, response);
  
  // 添加优化头
  for (const [key, value] of headers.entries()) {
    newResponse.headers.set(key, value);
  }
  
  return newResponse;
}
