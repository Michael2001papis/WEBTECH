# WEBTECH – דוח הבחנה מלא ומפורט (moko)

**פרויקט:** WEBTECH – אתר לימודי אינטראקטיבי ל-Next.js (Hybrid, SSR, Server/Client Components)  
**כתובת פרודקשן:** https://webtech-ochre.vercel.app  
**תאריך דוח:** 21 פברואר 2026  
**מפתח:** מיכאל פפיסמדוב (MP)

---

# חלק א׳ – מבנה הפרויקט

## 1.1 רשימת קבצים מלאה

| קובץ | סוג | תפקיד |
|------|-----|--------|
| `index.html` | HTML | דף ראשי, נקודת כניסה |
| `src/main.js` | JavaScript | לוגיקת האפליקציה – ניווט, רינדור, חידונים |
| `src/content.js` | JavaScript | מאגר תוכן – מערך PAGES (שיעורים + חידונים) |
| `src/style.css` | CSS | עיצוב מלא |
| `vite.config.js` | Config | תצורת Vite – build, base, outDir |
| `vercel.json` | Config | תצורת Vercel – build, output, SPA rewrites |
| `package.json` | Config | תלויות (Vite) וסקריפטים |
| `.gitignore` | Config | דפוסי התעלמות ל-Git |

---

# חלק ב׳ – ניתוח קובץ־קובץ (מפורט)

## 2.1 index.html

### מבנה מלא
```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>לימודי Next.js</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/style.css" />
</head>
<body>
  <div class="progress-bar" id="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="1" aria-label="התקדמות בקורס">
    <div class="progress-fill" id="progress-fill"></div>
  </div>
  <div id="app">
    <main class="page-container">
      <article class="content" id="content" tabindex="-1" aria-live="polite"></article>
      <footer class="footer">
        <button id="prev-btn" class="nav-btn prev-btn">→ לעמוד הקודם</button>
        <span id="page-num" class="page-num">1 / 1</span>
        <button id="next-btn" class="nav-btn next-btn">לעמוד הבא ←</button>
      </footer>
    </main>
  </div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### פירוט שורה־שורה (נבחרות)

| שורה / אלמנט | תפקיד | סטטוס |
|---------------|--------|--------|
| `<!DOCTYPE html>` | הכרזה על HTML5 | ✅ תקין |
| `lang="he"` | שפת העמוד לעברית | ✅ נגישות |
| `dir="rtl"` | כיוון מימין לשמאל | ✅ נכון לעברית |
| `charset="UTF-8"` | תמיכה בעברית ודמויות Unicode | ✅ |
| `viewport` | התאמה למובייל | ✅ |
| `title` | מתעדכן דינמית ב-main.js | ✅ |
| `preconnect` (fonts) | חיבור מוקדם לגוגל פונטס | ✅ ביצועים |
| `link` ל-style.css | `/src/style.css` – Vite ממיר ל-assets ב-build | ✅ |
| `progress-bar` | `role="progressbar"`, `aria-valuenow/min/max`, `aria-label` | ✅ נגישות |
| `article#content` | `tabindex="-1"` לפוקוס, `aria-live="polite"` להכרזה | ✅ נגישות |
| `script type="module"` | טעינת main.js כ-ES Module | ✅ |

### שיקול נוסף
- נתיבים `/src/...` עובדים ב־Vite dev; ב־build הם מוחלפים לנתיבי assets. פתיחה ישירה כ־file:// לא תעבוד.

---

## 2.2 src/main.js

### מבנה ופונקציות עיקריות

#### 2.2.1 escapeHtml(str)
**תפקיד:** מניעת XSS – המרת תווים מסוכנים ל-HTML entities.  
**עיקרון:** יצירת `div`, `textContent = str`, החזרת `innerHTML`.  
**שימוש:** כל תוכן שמגיע מ־PAGES לפני הזרקה ל־innerHTML.

#### 2.2.2 textToHtml(text)
**תפקיד:** המרת טקסט גולמי ל־HTML.  
**לוגיקה:**
1. פיצול לפי `\n\n+` (פסקאות)
2. זיהוי רשימות (שורות שמתחילות ב־•)
3. יצירת `<ul><li>...</li></ul>` או `<p>...</p>`
4. Escape לכל פריט

#### 2.2.3 updateProgressAria()
**תפקיד:** עדכון `aria-valuenow` ו־`aria-valuemax` של ה־progress bar לקוראי מסך.

#### 2.2.4 focusContent()
**תפקיד:** העברת פוקוס ל־`contentEl` אחרי ניווט – לתמיכה במקלדת וטכנולוגיות מסייעות.

#### 2.2.5 renderPage()
**תפקיד:** רינדור העמוד הנוכחי.  
**פעולות:**
- עדכון `document.title`
- הפעלת `renderContent` או `renderQuiz`
- עדכון כפתורי ניווט והסתרתם בקצוות
- עדכון מספר עמוד ו־progress bar
- קריאה ל־`updateProgressAria` ו־`focusContent`

#### 2.2.6 renderContent(page)
**תפקיד:** רינדור עמוד תוכן רגיל – כותרת + טקסט (כולל escape).

#### 2.2.7 renderQuiz(quiz)
**תפקיד:** רינדור חידון.  
**מבנה:** כותרת, learn, שאלה, כפתורי אפשרויות (`Object.keys(quiz.options)`), אזור feedback.  
**נגישות:** `role="group"`, `aria-labelledby`, `aria-label`, `role="status"`, `aria-live="polite"`, `aria-pressed`.  
**מניעת לחיצה חוזרת:** `dataset.answered`.

#### 2.2.8 Event listeners
- `nextBtn` / `prevBtn`: `addEventListener('click', ...)` פעם אחת (לא בכל render).

### קבועים ומשתנים גלובליים
- `TOTAL_PAGES`, `currentPage`
- הפניות ל־DOM: `contentEl`, `nextBtn`, `prevBtn`, `pageNumEl`, `progressBarEl`

---

## 2.3 src/content.js

### מבנה
- `export const PAGES = [...]` – מערך אובייקטים.

### סוגי עמודים
1. **עמוד תוכן:** `{ title, text }`
2. **חידון:** `{ type: 'quiz', title, learn, question, options: { א, ב, ג, ד }, correct, explanation }`

### תכנים
- שלבים 1–3: Hybrid, Server/Client, מבנה פרויקט, SSR.
- 8 חידונים.
- סדר לוגי מתאים למתחילים.

---

## 2.4 src/style.css

### משתני CSS (`:root`)
- `--accent`, `--accent-light`, `--accent-dark` (סגול)
- `--success`, `--error`
- `--bg`, `--card`, `--text`, `--text-muted`, `--border`, `--radius`

### סקשנות עיקריות
- **Reset:** `* { margin: 0; padding: 0; box-sizing: border-box }`
- **Body:** פונט, רקע גרדיאנט, `min-height: 100vh`
- **page-container:** כרטיס מרכזי, צל, `opacity: 0` + `body.app-ready` לאנימציית fade-in
- **חידון:** badge, שאלה, כפתורי אפשרויות (hover, correct, wrong)
- **Footer:** כפתורי ניווט, מספר עמוד
- **Progress bar:** fixed לרוחב המסך
- **Media query 520px:** התאמות למובייל

---

## 2.5 vite.config.js

```javascript
root: '.',
base: '/',
build: { outDir: 'dist', emptyOutDir: true, assetsDir: 'assets' }
```

- **root:** שורש הפרויקט
- **base:** `/` – מתאים לפריסה בשורש הדומיין
- **outDir:** `dist` – תוצאת build
- **assetsDir:** קבצי assets ב־`dist/assets/`

---

## 2.6 vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- **buildCommand:** build מפורש
- **outputDirectory:** הפעלת הפרויקט מתוך `dist`
- **rewrites:** SPA fallback – כל נתיב שאינו קובץ סטטי מחזיר `index.html`

---

## 2.7 package.json

- **name:** spa-text-pages
- **scripts:** `dev`, `build`, `preview` (Vite)
- **devDependencies:** vite ^5.0.0
- **type:** module

---

## 2.8 .gitignore

התעלמות מ: `node_modules/`, `dist/`, `.env*`, `*.log`, `.vscode/*` (מלבד settings.json), `.DS_Store`, `Thumbs.db`.

---

# חלק ג׳ – מה תקין (בסדר גמור)

| נושא | פרטים |
|------|--------|
| מבנה פרויקט | הפרדה ברורה בין HTML, CSS, JS, קובץ תוכן מרכזי |
| HTML | `lang`, `dir`, `charset`, `viewport`, preconnect |
| נגישות | ARIA ל־progress bar, article, חידון; `tabindex`, `aria-live`, `focusContent` |
| אבטחה | `escapeHtml` לכל תוכן מוזרק |
| עיצוב | משתני CSS, responsive, אנימציית fade-in |
| פריסה | `vercel.json`, SPA rewrites, תצורת build |
| Event handlers | הגדרה פעם אחת, לא בתוך render |

---

# חלק ד׳ – מה ניתן לשפר (המלצות)

| נושא | סיכום | פעולה מומלצת |
|------|--------|---------------|
| README | חסר | הוספת README עם הפעלה, build, deploy |
| תת־נתיב | base קבוע | אם מפרסמים ב־/webtech/, לעדכן `base` ב־vite.config |
| נגישות מתקדמת | WCAG, contrast | בדיקת contrast, zoom, ניווט מקלדת מלא |
| Error handling | PAGES ריק | כבר מטופל – בדיקה בתחילת `renderPage` |
| Magic numbers | 520 וכו׳ | אופציונלי – העברת ל־constants בראש הקובץ |

---

# חלק ה׳ – פתרון תקלות

## 5.1 webpage_content_reporter.js – Unexpected token 'export'

**משמעות:** קובץ JS נטען כ־script רגיל אך מכיל `export`.

**אבחון:**
1. בדיקה באינקוגניטו – האם השגיאה נעלמת?
2. חיפוש הקובץ ב־`dist/` אחרי build.
3. השם מרמז על תוסף דפדפן / כלי בדיקה.

**מסקנה:** אם הקובץ לא ב־dist – כנראה תוסף. אין צורך בתיקון קוד.

---

## 5.2 Vercel NOT_FOUND (404)

**אבחון:**
- `/` עובד אבל נתיבים אחרים לא → SPA fallback – `vercel.json` עם rewrites.
- Assets ב־404 → בדיקת `outputDirectory`, `base`.
- URL פנימי לא קיים – האתר SPA ללא routes.

**מה תוקן:** `vercel.json` כולל rewrites ו־output directory.

---

## 5.3 אתר "הרוס" / בלי עיצוב

**סיבות אפשריות:** Cache, לינק שגוי, נתיב פנימי שגוי, 404 על CSS/JS.

**צעדים:**
1. וידוא URL נכון.
2. Hard Refresh (Ctrl+Shift+R).
3. בדיקת Network – אין 404 על assets.

---

## 5.4 שיפור לא מורגש

**הסבר:** שיפורים מבניים (תיעוד, נגישות) לא תמיד נראים ישירות.

**מה נוסף:** אנימציית fade-in בטעינה (0.4s) – חוויית טעינה ברורה יותר.

---

# חלק ו׳ – בדיקות קבלה (Acceptance)

- [ ] מובייל: iPhone Safari, Android Chrome
- [ ] דסקטופ: Chrome, Edge, Firefox
- [ ] ניווט: כפתורי הבא/הקודם, פוקוס עובר לתוכן
- [ ] חידון: בחירה אחת, תוצאה ברורה, אין לחיצה חוזרת
- [ ] פריסה: build ו־preview עובדים
- [ ] Vercel: https://webtech-ochre.vercel.app עובד

---

# חלק ז׳ – סיכום מנהלים

**מצב נוכחי:** המערכת עובדת, עם תשתית מקצועית – תצורת build, נגישות, אבטחת תוכן, SPA fallback, ומיקרו־UX (fade-in).

**מה בוצע:**  
תצורת Vite ו־Vercel, escape לתוכן, ARIA ופוקוס, event listeners יעילים, אנימציית טעינה, `.gitignore`.

**המלצה להמשך:**  
הוספת README, בדיקת נגישות מלאה, ושמירה על escape לתוכן אם יגיע ממקור חיצוני בעתיד.
