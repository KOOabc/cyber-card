#!/bin/bash

# 快速部署到 Cloudflare Pages
# 用法: ./deploy-cloudflare.sh

set -e

echo "🚀 开始部署到 Cloudflare Pages..."

# 1. 检查是否已安装 wrangler
if ! command -v wrangler &> /dev/null
then
    echo "❌ 未找到 wrangler CLI"
    echo "📦 正在安装 wrangler..."
    npm install -g wrangler
fi

# 2. 构建项目
echo "🔨 构建项目..."
npm run build

# 3. 部署到 Cloudflare Pages
echo "☁️ 部署到 Cloudflare Pages..."
wrangler pages deploy dist --project-name=cyber-card

echo "✅ 部署完成！"
echo "📝 请访问 Cloudflare Dashboard 查看部署状态"
echo "🔗 https://dash.cloudflare.com/pages"
