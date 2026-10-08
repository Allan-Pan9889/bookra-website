# 发布 Bookra 官网

仓库：https://github.com/Allan-Pan9889/bookra-website

生产主域：https://www.bookra.im/

## 发布前检查

```sh
npm ci
npm run build
npm test
npm run preview
```

检查中文 `/`、英文 `/en/`、手机菜单、价格和服务条款。构建只输出正式静态资源到 `dist/`。本地预览模拟项目路由；Vercel 的条件跳转仍需上线后核验。

## Vercel

项目已有 GitHub 集成，main 更新触发生产部署。`vercel.json` 指定 Framework 为 null、Build Command 为 `npm run build`、Output Directory 为 `dist`，保留内页 `.html` 正式路径。

有有效 Vercel CLI 登录时也可使用：

```sh
vercel --prod
```

在 Vercel Domains 中将 `www.bookra.im` 作为正式域名；`bookra.im` 应永久跳转到 `www.bookra.im`（308）。如果 Dashboard 已配置 307 域名跳转，它可能先于仓库中的规则执行，需要把 Dashboard 的跳转状态改成 308。不要反转域名方向。

## 上线核验

- `/`、`/en/` 和 8 个 `.html` 内页直接返回 200，页面 canonical 指向自身。
- `/terms` 永久跳转到 `/terms.html`，正文是 Terms of Service。
- `/support`、`/privacy`、`/pricing` 和相应中文别名永久跳转。
- `/index.html` → `/`；`/en`、`/en/index.html` → `/en/`。
- `/?lang=en` → `/en/`，保留来源参数；目标页面的 canonical 是无参数的英文 URL。
- 非 www 主域永久跳到 www；不应形成循环。
- 不存在的页面应返回 404。
- sitemap 为 10 个正式语言页面，robots 中的地址与主域一致。
- 在实际 iPhone 上分别检查中文和英文下载链接；网页实验室测量不能替代跨地区真机检查。

## 后台后续检查

提交修正 sitemap 到 Search Console，查看 Google 选定的 canonical、真实查询和页面收录情况。在 GA4 设置 `app_store_click` 关键事件，按语言和落地页查看下载点击。

Lighthouse 只能提供实验室指标；LCP、INP、CLS 的真实用户第 75 百分位应依据后续 CrUX / Search Console 数据。独立功能页选题应依据真实查询和可展示的产品内容决定，不预设搜索量或流量增长。
