#!/bin/bash
# Bookra Website 一键部署脚本

echo "🚀 开始部署 Bookra 官网到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

# 登录并部署
echo "🔐 请在浏览器中完成登录..."
vercel login

echo "🚢 开始部署..."
vercel --prod

echo "✅ 部署完成！"
echo "📝 接下来在 Vercel Dashboard 中绑定域名 bookara.im"
