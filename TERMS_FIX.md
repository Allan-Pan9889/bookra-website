# 服务条款链接修复完成

**修复日期**: 2026-03-20
**修复内容**: 创建独立的 `/terms` 页面和重定向

---

## ✅ 已完成

### 1. 创建重定向页面
- ✅ **terms.html** - 英文服务条款重定向
- ✅ **terms-zh.html** - 中文服务条款重定向
- 两个页面都会自动跳转到对应的 privacy.html#terms

### 2. 更新 Vercel 配置
- ✅ 在 `vercel.json` 中添加 `/terms` 路由
- 重定向到 `privacy.html#terms`

### 3. 验证现有链接
所有页面的服务条款链接已经正确：
- ✅ index.html → privacy.html#terms
- ✅ pricing.html → privacy.html#terms
- ✅ privacy.html → privacy.html#terms
- ✅ support.html → privacy.html#terms
- ✅ pricing-zh.html → privacy-zh.html#terms
- ✅ privacy-zh.html → privacy-zh.html#terms
- ✅ support-zh.html → privacy-zh.html#terms

---

## 📤 部署步骤

### 方法 1：Git + Vercel 自动部署（推荐）

```bash
cd /Users/allan/Desktop/bookra-website

# 添加新文件
git add terms.html terms-zh.html vercel.json

# 提交
git commit -m "Add standalone terms pages and redirect"

# 推送到远程
git push origin main
```

Vercel 会自动检测变更并部署。

### 方法 2：使用部署脚本

```bash
cd /Users/allan/Desktop/bookra-website
./deploy.sh
```

---

## 🔍 部署后验证

部署完成后（约 1-2 分钟），测试以下 URL：

### 英文版本
- ✅ https://www.bookra.im/terms
- ✅ https://www.bookra.im/terms.html
- ✅ https://www.bookra.im/privacy.html#terms

### 中文版本
- ✅ https://www.bookra.im/terms-zh.html
- ✅ https://www.bookra.im/privacy-zh.html#terms

所有链接都应该能正常访问服务条款内容。

---

## 📱 App Store Connect 使用

现在可以在 App Store Connect 中使用任一 URL：

**推荐使用**（更清晰）：
```
https://www.bookra.im/terms
```

**也可以使用**（更明确）：
```
https://www.bookra.im/privacy.html#terms
```

两者都会正确显示服务条款内容。

---

## 🎯 技术说明

### 重定向方式
1. **HTML meta refresh**：`<meta http-equiv="refresh" content="0; url=...">`
2. **JavaScript redirect**：`window.location.href = '...'`
3. **Vercel 路由**：在 vercel.json 中配置

### 为什么使用锚点而不是独立页面？
- 服务条款内容已包含在隐私政策页面中
- 使用锚点避免内容重复
- 更容易维护（只需更新一个页面）
- 符合 Apple 审核要求

---

**修复人**: Claude
**状态**: ✅ 完成，等待部署
