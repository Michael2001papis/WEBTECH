# WEBTECH – לימודי Next.js (Hybrid & SSR)

אתר לימודי אינטראקטיבי להבנת קונספטים ב-Next.js: Hybrid, Server/Client Components, ו-SSR.

---

## הפעלה (חובה – דרך שרת)

**⚠️ לא לפתוח את `index.html` ישירות בדפדפן (file://)** – הנתיבים `/src/` לא יעבדו וכל האתר ייראה שבור. יש תמיד להריץ דרך שרת פיתוח או build.

### התקנה

```bash
npm install
```

### פיתוח (Development)

```bash
npm run dev
```

פותח שרת מקומי. בדפדפן: **http://localhost:5173**

### Build לפרודקשן

```bash
npm run build
```

תוצר ב-`dist/`.

### תצוגה מקדימה של Build

```bash
npm run preview
```

מריץ שרת סטטי מהתיקייה `dist/` – סימולציה לפרודקשן.

---

## פריסה (Deploy)

### Vercel (מומלץ)

1. חבר את ה-repo ל-Vercel
2. Vercel מזהה אוטומטית Vite – אין צורך בהגדרות נוספות
3. Build Command: `npm run build`
4. Output Directory: `dist`

### סביבות אחרות

- **Netlify / GitHub Pages / אחר:** השתמש ב-`npm run build` והעלה את תוכן `dist/`
- **תת-נתיב:** אם האתר מתפרסם ב-`https://example.com/webtech/` – עדכן `base` ב-`vite.config.js` ל-`/webtech/`

---

## מבנה הפרויקט

| קובץ | תיאור |
|------|-------|
| `index.html` | דף ראשי |
| `src/main.js` | לוגיקה, ניווט, רינדור |
| `src/content.js` | מאגר התוכן (שיעורים + חידונים) |
| `src/style.css` | עיצוב |
| `vite.config.js` | תצורת Vite |

**הערה על תוכן:** מקור האמת לתוכן הלימודי הוא `src/content.js`. אם קיים קובץ `raw-content.txt` – זה חומר גולמי מקורי בלבד; אין לו שימוש ישיר באפליקציה. לעדכון תוכן יש לערוך את `content.js`.

---

## טכנולוגיות

- Vite 5
- Vanilla JS (ES Modules)
- CSS עם משתנים (Custom Properties)
