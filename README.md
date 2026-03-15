# Bookra Official Website

Official website for Bookra - AI Reading Companion app.

## 🌐 Live Site

**Production:** https://bookara.im

## 📁 Structure

```
bookra-website/
├── index.html      # Homepage with features and CTA
├── support.html    # Support page with FAQ and contact
├── privacy.html    # Privacy policy and terms
├── vercel.json     # Vercel deployment configuration
└── README.md       # This file
```

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account (vercel.com)
- Custom domain: bookara.im registered on Vercel

### Deploy Steps

1. **Install Vercel CLI** (optional):
```bash
npm install -g vercel
```

2. **Deploy from command line**:
```bash
cd bookra-website
vercel --prod
```

3. **Or deploy via Vercel Dashboard**:
   - Go to https://vercel.com/new
   - Import this folder
   - Click "Deploy"

4. **Connect custom domain**:
   - Go to Project Settings → Domains
   - Add domain: bookara.im
   - Add www subdomain: www.bookara.im
   - Vercel will provide DNS records to configure

### DNS Configuration

Add these records in your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🎨 Design System

- **Colors**: Warm beige palette (#F4E8D8, #E9DCC9, #E07830)
- **Typography**: Inter (system font with Google Fonts fallback)
- **Framework**: Tailwind CSS (via CDN)
- **Style**: Glass morphism with gradient backgrounds

## 📄 Pages

### Homepage (/)
- Hero section with App Store download CTA
- Features showcase (6 key features)
- How it works (3-step process)
- Final CTA section

### Support (/support)
- Comprehensive FAQ (10 questions)
- Contact methods (email, Twitter)
- Link to privacy policy

### Privacy (/privacy)
- Complete privacy policy
- Data collection disclosure
- GDPR-compliant user rights
- Terms of service summary
- Contact information

## 🔧 Customization

### Update Contact Email
Search and replace in all HTML files:
- `support@bookara.im`
- `privacy@bookara.im`

### Update App Store Link
Replace `#` in download buttons with actual App Store URL:
```html
<a href="https://apps.apple.com/app/YOUR_APP_ID">
```

### Update Social Links
In support.html, update Twitter link:
```html
<a href="https://twitter.com/YOUR_HANDLE">
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 375px, 768px, 1024px, 1440px
- Glass morphism cards adapt to screen size
- Navigation collapses on mobile (implement hamburger menu if needed)

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Focus states visible on all interactive elements

## 🌍 Internationalization

To add Chinese version:

1. Create duplicate files with `-zh` suffix:
   - index-zh.html
   - support-zh.html
   - privacy-zh.html

2. Translate content

3. Add language switcher logic to toggle between versions

## 📊 Analytics (Optional)

Add Google Analytics or Plausible:

```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔒 Security Headers

Configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 📝 Apple App Store Requirements

This website provides required URLs for App Store Connect:

- **Technical Support URL**: https://bookara.im/support
- **Privacy Policy URL**: https://bookara.im/privacy
- **Marketing URL** (optional): https://bookara.im

## 🛠 Local Development

Open files directly in browser - no build process needed:

```bash
open index.html
# or
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 📦 No Dependencies

- Pure HTML/CSS/JS
- Tailwind CSS via CDN
- Google Fonts via CDN
- No npm packages
- No build step required

## 🐛 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari iOS 12+
- Chrome Android (latest)

## 📧 Contact

For website issues or questions:
- Email: support@bookara.im
- App: Settings → Help & Support

## 📄 License

© 2025 Bookra. All rights reserved.
