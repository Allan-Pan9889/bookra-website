# Bookra 官网

生产域名：https://www.bookra.im/ 。网站保持静态 HTML；Tailwind 4 在构建时编译，不在访客浏览器运行。

## 本地开发

需要 Node.js 22 或更高版本。

```sh
npm ci
npm run build
npm test
npm run preview
```

预览地址：http://127.0.0.1:8001/ 。修改 HTML、样式或脚本后重新运行 `npm run build`，再刷新浏览器。可用 `PORT=8002 npm run preview` 修改端口。

- `index.html`：中文首页，正式路径 `/`。
- `en/index.html`：英文首页，正式路径 `/en/`。两份正文直接包含在 HTML 中，不依赖 JavaScript 或 localStorage。
- `pricing/support/privacy/terms.html`：英文内页；对应 `*-zh.html` 是中文内页。
- `styles/site.css`、`styles/fonts.css`、`tailwind.config.cjs`：共享样式及 Tailwind 配置。
- `assets/fonts/`：本地托管 Inter / Caveat 的 WOFF2 子集，保留官方 OFL 许可证。
- `assets/site.js`：导航滚动效果、手机菜单关闭行为、App Store 点击事件。
- `assets/`：已优化的响应式 WebP、Logo、图标和分享图片。`assets/site.css` 由构建生成并保留，直接静态预览也能使用。
- `images/`：原始截图保留作为素材，不复制到生产目录。
- `scripts/build.mjs`：仅将正式 HTML、assets、robots、sitemap 复制到 `dist/`。
- `scripts/preview.mjs`：本地预览，模拟本项目使用的有限重定向规则；正式路由由 Vercel 执行。
- `tests/seo.test.mjs`：语言、canonical、hreflang、站内链接、资源、Schema、sitemap 和路由回归检查。

## 内容与 SEO 维护

中英文页面各自维护；新增或修改功能说明时同步两种语言。每页应保留一个 H1、自指 canonical、互相对应的 hreflang 和可直接访问的语言切换链接。站内统一使用 `https://www.bookra.im`。

免费版：30 本书、每天 2 次 AI 灵感。家庭订阅：总计最多 6 人，包含购买者。付费订阅没有免费试用期。价格以用户所在地区的 App Store 购买页为准。用户已确认家庭人数与无付费试用规则（2026-10-08）。

不得添加没有真实依据的评分、评论数量、用户人数、价格有效期或未实现的功能 Schema。FAQPage 答案应与可见帮助内容一致；现有标记不保证 Google 的富结果展示。修改帮助正文后，同步其 JSON-LD 并运行检查。

新增页面时将规范 URL 和配对语言加入 `sitemap.xml`。无法维护真实重要更新日期时省略 `lastmod`，不要在每次构建时填入当天日期。

截图使用 320 / 640 / 960px WebP，显示宽度 260 / 320px；首屏截图 eager，其余 lazy。原始截图来自 `images/`。更新素材后需重新编码，保留真实画面和正确尺寸。例如使用系统 `cwebp` 工具：

```sh
cwebp -q 84 -m 6 -resize 640 0 images/IMG_4839.PNG -o assets/zh-hero-640.webp
```

## 发布与统计

参见 [DEPLOY.md](DEPLOY.md)。发布目录是 `dist/`，Vercel 配置会执行 `npm run build`。禁止直接把整个项目目录作为生产静态输出。

GA4 保留现有 ID `G-ZVLWTRT3SB`，App Store 链接点击发送 `app_store_click`，携带页面路径、页面语言与应用链接；是否列为关键事件需要在 GA4 后台设置。Search Console 中提交 `https://www.bookra.im/sitemap.xml` 并检查规范 URL、语言版本及真实用户 CWV 数据。

构建依赖固定到 Tailwind 4.3.3，并将其文件监听依赖 `@parcel/watcher` 固定到兼容版本 2.6.0，以避开旧版本已知问题。修改构建依赖后重新运行依赖审计与页面验收。样式面向 Safari 16.4+、Chrome 111+、Firefox 128+。
