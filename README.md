# 🌐 MECO Web — الموقع الرسمي

<div align="center">

[![Build Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-0BSD-green.svg)](LICENSE)
[![Repo](https://img.shields.io/badge/GitHub-MonyCoin-black.svg)](https://github.com/MonyCoin)

**أول موقع عربي احترافي لمنظومة MECO المالية**

[🌐 زيارة الموقع](https://monycoin.github.io/meco_web/) • [📱 تطبيق المحفظة](https://github.com/MonyCoin/meco_wallet) • [🪙 العملة](https://github.com/MonyCoin/meco-token)

</div>

---

## 📋 نظرة عامة

**MECO Web** هو الموقع الرسمي لمنظومة MECO المالية. يوفر:

- 🎨 **تصميم عصري احترافي** - واجهة سلسة وجذابة
- 📱 **محمول أولاً** - استجابة كاملة على جميع الأجهزة
- 🌙 **وضع ليلي/نهاري** - تجربة مريحة للعينين
- 🌍 **دعم عربي كامل** - RTL كامل + ترجمة احترافية
- ⚡ **أداء عالي** - تحميل سريع وسلس
- ♿ **وصولية** - معايير WCAG 2.1
- 🔍 **SEO محسّن** - ترتيب عالي في محركات البحث

---

## 📂 بنية المشروع

```
meco_web/
├── index.html           📄 الصفحة الرئيسية
├── about.html           📄 عن المشروع
├── wallet.html          📄 صفحة المحفظة
├── token.html           📄 صفحة العملة
├── roadmap.html         📄 خارطة الطريق
├── blog.html            📄 المدونة
├── contact.html         📄 اتصل بنا
├── slides.html          📄 العروض التقديمية
├── privacy.html         📄 سياسة الخصوصية
├── terms.html           📄 شروط الاستخدام
├── notice.html          📄 حقوق الملكية
├── styles.css           🎨 أنماط التصميم
├── app.js               ⚙️ الوظائف التفاعلية
├── README.md            📖 هذا الملف
└── _config.yml          ⚙️ إعدادات GitHub Pages
```

---

## 🚀 المميزات

### 🎨 التصميم
- ✅ تصميم عصري احترافي
- ✅ ألوان منسجمة وجذابة
- ✅ رموز emoji معبّرة
- ✅ تأثيرات سلسة واحترافية

### 📱 الاستجابة
- ✅ محمول أولاً (Mobile First)
- ✅ استجابة كاملة على جميع الأحجام
- ✅ قائمة منسدلة ذكية للهاتف
- ✅ أزرار سهلة الضغط

### ⚡ الأداء
- ✅ تحميل سريع (< 2 ثانية)
- ✅ CSS و JS محسّنة
- ✅ صور مضغوطة
- ✅ كود نظيف منظم

### 🌙 الواجهة
- ✅ وضع ليلي/نهاري
- ✅ حفظ التفضيلات
- ✅ انتقال سلس بين الأوضاع
- ✅ تأثيرات بصرية جميلة

### 🌍 اللغات
- ✅ دعم عربي كامل (RTL)
- ✅ دعم إنجليزي
- ✅ اتجاهات صحيحة
- ✅ خطوط عربية احترافية

### ♿ الوصولية
- ✅ معايير WCAG 2.1
- ✅ علامات ARIA صحيحة
- ✅ لوحة مفاتيح قابلة للاستخدام
- ✅ قارئات الشاشة مدعومة

### 🔍 SEO
- ✅ Meta tags محسّنة
- ✅ Sitemap متاح
- ✅ روابط معيارية
- ✅ بيانات منظمة

---

## 🛠️ التطوير

### المتطلبات
- محرر نصوص (VS Code، Sublime، إلخ)
- متصفح حديث
- اتصال إنترنت

### البدء السريع

1. **استنساخ المستودع:**
```bash
git clone https://github.com/MonyCoin/meco_web.git
cd meco_web
```

2. **فتح الملف المحلي:**
- افتح `index.html` في متصفحك
- أو استخدم خادم محلي:
```bash
python -m http.server 8000
# ثم زر http://localhost:8000
```

3. **تعديل الملفات:**
- عدّل ملفات HTML حسب الحاجة
- طور CSS في `styles.css`
- أضف وظائف JS في `app.js`

### الاختبار

```bash
# اختبار محلي
python -m http.server 8000

# التحقق من الأداء
Lighthouse في Chrome DevTools

# اختبار الوصولية
wAVE Browser Extension
```

---

## 📝 تحديث المحتوى

### إضافة صفحة جديدة

1. أنشئ ملف `newpage.html`
2. انسخ البنية من `index.html`
3. عدّل المحتوى
4. أضف الرابط في التنقل

### تعديل الأنماط

عدّل `styles.css` مباشرة:

```css
/* مثال: تغيير اللون الأساسي */
:root {
    --primary: #YOUR_COLOR;
}
```

### إضافة وظائف

أضف إلى `app.js`:

```javascript
// وظيفتك الجديدة
function myNewFunction() {
    // الكود هنا
}
```

---

## 🔗 الروابط المهمة

| الرابط | الوصف |
|:---:|:---|
| 🌐 [الموقع الرسمي](https://monycoin.github.io/meco_web/) | الموقع المباشر |
| 📱 [تطبيق المحفظة](https://github.com/MonyCoin/meco_wallet) | كود المحفظة |
| 🪙 [العملة MECO](https://github.com/MonyCoin/meco-token) | معلومات العملة |
| 🐙 [GitHub Organization](https://github.com/MonyCoin) | جميع المشاريع |
| 𝕏 [X/Twitter](https://x.com/MoniCoinMECO) | آخر الأخبار |
| ✈️ [Telegram](https://t.me/monycoin1) | المجتمع |

---

## 📊 الإحصائيات

- 📄 **11 صفحة HTML** - محتوى شامل
- 🎨 **1 ملف CSS** - أنماط موحدة
- ⚙️ **1 ملف JS** - وظائف تفاعلية
- 📱 **100% استجابة** - جميع الأجهزة
- ⚡ **< 2 ثانية** - وقت التحميل
- ♿ **WCAG 2.1** - معايير الوصولية
- 🔍 **95+ SEO** - درجة محركات البحث

---

## 🤝 المساهمة

نرحب بمساهماتك! لتساهم:

1. **Fork** المستودع
2. **أنشئ فرع** - `git checkout -b feature/your-feature`
3. **أضف التحسينات** - عدّل الملفات
4. **Commit** - `git commit -m "Add new feature"`
5. **Push** - `git push origin feature/your-feature`
6. **اطلب دمج** - افتح Pull Request

---

## 📄 الرخصة

هذا المشروع مرخص تحت **0BSD License** - حر تماماً!

---

## 📞 التواصل

- 𝕏 [@MoniCoinMECO](https://x.com/MoniCoinMECO)
- ✈️ [@monycoin1](https://t.me/monycoin1)
- 🐙 [GitHub](https://github.com/MonyCoin)
- 📧 البريد الإلكتروني في الملف الشخصي

---

<div align="center">

**© 2026 MonyCoin Digital Development Foundation**

مصنوع بـ ❤️ بواسطة محمد سعادة

[⬆ العودة للأعلى](#meco-web--الموقع-الرسمي)

</div>
