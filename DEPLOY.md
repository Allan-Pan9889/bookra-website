# 🚀 Bookra Website Deployment Guide

快速部署指南 - 将网站部署到 bookara.im

## 📋 前提条件

- ✅ 已在 Vercel 注册 bookara.im 域名
- ✅ 有 Vercel 账号登录权限
- ✅ 网站文件已准备好（本文件夹内容）

## 🎯 部署方式（三选一）

### 方式1：Vercel Dashboard（最简单）✨

1. **访问 Vercel 控制台**
   - 打开 https://vercel.com/dashboard
   - 登录您的账号

2. **创建新项目**
   - 点击 "Add New..." → "Project"
   - 选择 "Import Git Repository"（如果代码在 GitHub）
   - 或直接拖拽 `bookra-website` 文件夹到页面上

3. **配置项目**
   - Project Name: `bookra-website`
   - Framework Preset: `Other`
   - Root Directory: `./` (默认)
   - Build Command: 留空（不需要构建）
   - Output Directory: `./` (默认)

4. **部署**
   - 点击 "Deploy"
   - 等待 30-60 秒完成部署

5. **绑定域名**
   - 部署完成后，进入项目设置
   - Settings → Domains
   - 添加域名：`bookara.im`
   - 添加子域名：`www.bookara.im`

### 方式2：Vercel CLI（推荐开发者）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 进入网站目录
cd /Users/allan/Desktop/AIBook/bookra-website

# 4. 部署到生产环境
vercel --prod

# 5. 按提示操作
# - Set up and deploy? Y
# - Which scope? 选择您的账号
# - Link to existing project? N
# - Project name? bookra-website
# - Directory? ./ (默认)

# 6. 等待部署完成
# 会显示部署 URL，例如：https://bookra-website.vercel.app
```

### 方式3：GitHub 自动部署（最专业）

1. **创建 GitHub 仓库**
```bash
cd /Users/allan/Desktop/AIBook/bookra-website
git init
git add .
git commit -m "Initial commit: Bookra website"
git remote add origin https://github.com/YOUR_USERNAME/bookra-website.git
git push -u origin main
```

2. **连接 Vercel**
   - 在 Vercel Dashboard 点击 "Add New..." → "Project"
   - 选择 "Import Git Repository"
   - 选择刚创建的 GitHub 仓库
   - 点击 "Import"

3. **自动部署**
   - 每次 push 到 main 分支都会自动部署
   - Pull Request 会创建预览部署

## 🌐 DNS 配置

### Vercel 提供的 DNS 记录

部署后，Vercel 会显示需要添加的 DNS 记录。通常是：

```
类型: A
名称: @
值: 76.76.21.21
TTL: Auto

类型: CNAME
名称: www
值: cname.vercel-dns.com
TTL: Auto
```

### 在域名提供商配置

1. 登录您的域名注册商（如 Namecheap、GoDaddy、Cloudflare）
2. 找到 bookara.im 的 DNS 管理页面
3. 添加上述 DNS 记录
4. 保存更改
5. 等待 DNS 传播（可能需要 5 分钟到 48 小时）

### 验证 DNS

```bash
# 检查 A 记录
dig bookara.im

# 检查 CNAME 记录
dig www.bookara.im

# 或使用在线工具
# https://dnschecker.org/#A/bookara.im
```

## ✅ 部署后检查清单

### 1. 功能测试

- [ ] 访问 https://bookara.im 显示首页
- [ ] 访问 https://bookara.im/support 显示支持页
- [ ] 访问 https://bookara.im/privacy 显示隐私政策
- [ ] 所有导航链接正常工作
- [ ] 响应式设计在移动端正常显示
- [ ] 页面加载速度 < 3 秒

### 2. SEO 检查

- [ ] 每个页面有正确的 `<title>` 标签
- [ ] 每个页面有 meta description
- [ ] 图片有 alt 属性
- [ ] 链接有描述性文本

### 3. 安全检查

- [ ] HTTPS 正常工作（绿色锁图标）
- [ ] 安全头部已配置（vercel.json）
- [ ] 没有混合内容警告

### 4. 性能检查

使用这些工具测试：
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

目标分数：
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

## 🔧 部署后需要更新的内容

### 1. App Store Connect 配置

在 App Store Connect 中更新这些 URL：

- **技术支持 URL**: `https://bookara.im/support`
- **隐私政策 URL**: `https://bookara.im/privacy`
- **营销 URL**: `https://bookara.im`

### 2. 更新 App Store 下载链接

当 App 上架后，更新所有页面的下载链接：

```bash
# 在所有 HTML 文件中查找并替换
find . -name "*.html" -type f -exec sed -i '' 's|href="#"|href="https://apps.apple.com/app/idXXXXXXXXXX"|g' {} +
```

或手动编辑：
- index.html: 两个 "Download on App Store" 按钮
- support.html: 页脚链接
- privacy.html: 页脚链接

### 3. 更新联系邮箱

确认这些邮箱地址已设置并可用：
- support@bookara.im
- privacy@bookara.im
- legal@bookara.im

如需修改邮箱地址，全局搜索替换。

## 🎨 自定义设置

### 更改配色

在每个 HTML 文件的 `<script>` 标签中更新 Tailwind 配置：

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                beige: {
                    50: '#FAF7F3',   // 修改这些颜色值
                    100: '#F4E8D8',
                    200: '#E9DCC9',
                    // ...
                },
                accent: '#E07830',    // 主色调
                'accent-dark': '#C56524',
            }
        }
    }
}
```

### 添加 Google Analytics

在所有 HTML 文件的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 添加 Favicon

1. 生成 favicon: https://favicon.io/
2. 将文件放在根目录
3. 在所有 HTML 的 `<head>` 中添加：

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

## 🐛 常见问题

### 问题1：域名无法访问

**原因**: DNS 未生效或配置错误

**解决**:
```bash
# 检查 DNS 是否指向 Vercel
dig bookara.im

# 应该看到 Vercel 的 IP (76.76.21.21)
# 如果不是，重新检查 DNS 配置
```

### 问题2：CSS 样式不显示

**原因**: Tailwind CDN 加载失败

**解决**: 检查网络连接，或使用本地 Tailwind 构建：
```bash
npm install -D tailwindcss
npx tailwindcss -i ./input.css -o ./output.css --watch
```

### 问题3：页面 404 错误

**原因**: Vercel 路由配置问题

**解决**: 确保 `vercel.json` 存在且包含正确的路由配置

### 问题4：HTTPS 证书错误

**原因**: SSL 证书未生效

**解决**: 等待 Vercel 自动签发证书（5-10分钟），或在 Project Settings → Domains 中手动刷新

## 📱 测试网站

### 桌面端测试

```bash
# Chrome
open -a "Google Chrome" https://bookara.im

# Safari
open -a Safari https://bookara.im

# Firefox
open -a Firefox https://bookara.im
```

### 移动端测试

1. **真机测试**
   - 在 iPhone/Android 上访问 https://bookara.im
   - 测试所有交互和响应式布局

2. **Chrome DevTools 模拟**
   - 打开 Chrome DevTools (F12)
   - 点击设备工具栏图标（Toggle device toolbar）
   - 选择不同设备（iPhone 12, iPad, etc.）

3. **在线测试工具**
   - BrowserStack: https://www.browserstack.com/
   - LambdaTest: https://www.lambdatest.com/

## 🔄 更新网站

### 方式1：通过 Vercel CLI

```bash
cd /Users/allan/Desktop/AIBook/bookra-website

# 修改文件后
vercel --prod
```

### 方式2：通过 Git (如果使用 GitHub 集成)

```bash
git add .
git commit -m "Update: 描述修改内容"
git push

# Vercel 会自动检测并重新部署
```

### 方式3：通过 Vercel Dashboard

1. 上传修改后的文件到 GitHub
2. Vercel 自动检测变更并部署
3. 或在 Deployments 页面手动触发 "Redeploy"

## 📊 监控和分析

### Vercel Analytics (推荐)

1. 在 Project Settings → Analytics 中启用
2. 免费提供基础分析数据
3. 包括页面浏览量、性能指标等

### 设置 Uptime 监控

使用免费服务监控网站可用性：
- UptimeRobot: https://uptimerobot.com/
- StatusCake: https://www.statuscake.com/
- Pingdom: https://www.pingdom.com/

配置：
- URL: https://bookara.im
- 检查频率: 5 分钟
- 通知方式: Email

## 🎉 部署完成！

您的 Bookra 官网已成功部署！

**下一步：**
1. ✅ 更新 App Store Connect 中的 URL
2. ✅ 测试所有页面功能
3. ✅ 配置 Google Analytics（可选）
4. ✅ 设置 uptime 监控（可选）
5. ✅ 在社交媒体分享网站链接

**需要帮助？**
- 📧 Email: support@bookara.im
- 📚 Vercel 文档: https://vercel.com/docs
- 💬 Vercel 社区: https://github.com/vercel/vercel/discussions
