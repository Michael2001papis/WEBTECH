// ============================================================
// 📝 תוכן + חידונים (א ב ג ד)
// type: 'page' | 'quiz'
// ============================================================

export const PAGES = [
  {
    title: 'שלב 1 - מה זה Hybrid בכלל?',
    text: `ב-Next.js אתה לא חייב לבחור "רק SPA" או "רק SSR".
אתה יכול לבנות אתר שבו:

דפים מסוימים נטענים מהשרת עם HTML מוכן (SSR) = טוב ל-SEO ומהירות טעינה ראשונית.

חלקים אינטראקטיביים עובדים כמו אפליקציה בתוך הדפדפן (SPA/Client) = חוויה חלקה, בלי רענונים מיותרים.

במילים פשוטות:
השרת עושה את העבודה הכבדה בהתחלה, והדפדפן ממשיך את החוויה כמו אפליקציה.`
  },
  {
    type: 'quiz',
    title: 'חידון 1',
    learn: `בוא נבדוק שהבנת את הרעיון. זיכור: SSR = השרת שולח HTML מוכן. SPA = הדפדפן מריץ הכל כמו אפליקציה.`,
    question: 'Hybrid ב-Next.js אומר ש...',
    options: {
      א: 'אתה חייב לבחור: רק SSR או רק SPA',
      ב: 'אתה יכול לערבב — דפים מ-Server וחלקים אינטראקטיביים כ-SPA',
      ג: 'SSR תמיד יותר איטי מ-SPA',
      ד: 'אין קשר ל-SEO'
    },
    correct: 'ב',
    explanation: `מצוין! Hybrid = שילוב. דפים נטענים מהשרת (מהיר + SEO), ואז הדפדפן ממשיך כמו אפליקציה חלקה.`
  },
  {
    title: 'Server Components מול Client Components',
    text: `הטריק הגדול של Next.js.

ב-Next.js (App Router) ברירת המחדל היא Server Components:

• רץ בשרת
• מביא דאטה בקלות
• שולח פחות JavaScript לדפדפן (יותר מהיר)

וכשצריך אינטראקטיביות (כפתורים עם state, טפסים חכמים, אנימציות, useEffect וכו') — משתמשים ב-Client Components עם "use client".

זה לב ה-Hybrid.`
  },
  {
    title: 'דוגמה לאתר פורטפוליו',
    text: `איך זה ייראה באתר שלך:

• דף Home / Projects: רובו יהיה Server (מהיר + SEO)
• כרטיס פרויקט: יכול להיות Server
• חיפוש/פילטר/סורט מיידי: Client (כמו SPA)
• טופס יצירת קשר עם ולידציה/Toast: Client
• אם בעתיד תוסיף Dashboard / Admin: יכול להיות SSR או שילוב עם פעולות שרת.`
  },
  {
    type: 'quiz',
    title: 'חידון 2',
    learn: `המשפט לזכור: Server = להצגת מידע. Client = לאינטראקטיביות.`,
    question: 'קומפוננטה שמציגה רשימת פרויקטים מה-API, בלי כפתורים או state — היא:',
    options: {
      א: 'Server Component',
      ב: 'Client Component',
      ג: 'שניהם ביחד',
      ד: 'תלוי במהירות האינטרנט'
    },
    correct: 'א',
    explanation: `נכון! היא רק מציגה מידע. אין state, אין onClick, אין hooks — לכן Server מתאים ומהיר. Client נדרש רק כשיש אינטראקטיביות.`
  },
  {
    title: 'המשפט המדויק לזכור',
    text: `Server Component = להצגת מידע מהר וביעילות

Client Component = לאינטראקטיביות וחוויית משתמש`
  },
  {
    title: 'Netflix, Facebook והכלל הכי חשוב',
    text: `חברות גדולות (Netflix, Facebook וכו'):
לא משתמשות רק ב-Client.
הן משתמשות בדיוק בגישה הזו: Hybrid = Server + Client ביחד.

• כמה שיותר Server (ביצועים)
• Client רק איפה שצריך (אינטראקטיביות)

הכלל הכי חשוב (תשמור אותו):
אם הקומפוננטה רק מציגה מידע → Server
אם יש בה state / events / hooks → Client

זה כל הסיפור.`
  },
  {
    type: 'quiz',
    title: 'חידון 3',
    learn: `הכלל: state, events, hooks = Client. רק הצגה = Server.`,
    question: 'מתי בדיוק צריך להוסיף "use client" לקומפוננטה?',
    options: {
      א: 'תמיד, בכל קומפוננטה',
      ב: 'רק כשיש useState, useEffect, onClick או אינטראקטיביות',
      ג: 'רק בדפים ראשיים',
      ד: 'רק כשיש טופס'
    },
    correct: 'ב',
    explanation: `בדיוק! "use client" נדרש כשאתה משתמש ב-hooks (useState, useEffect) או באירועים (onClick וכו'). בלי אלה — השאר Server.`
  },
  {
    title: 'שלב 1 – סיכום',
    text: `חלק 1: Hybrid = שילוב Server + Client

חלק 2: Server כברירת מחדל ב-Next.js

חלק 3: Client רק כשצריך אינטראקטיביות`
  },
  {
    title: 'שלב 2 - יצירת פרויקט Next.js',
    text: `יוצרים פרויקט חדש:
npx create-next-app@latest my-portfolio

במהלך ההתקנה בחר:
• TypeScript → Yes
• App Router → Yes
• ESLint → Yes
• Tailwind → Yes (מומלץ)
• src folder → Yes
• import alias → Yes

אחרי התקנה:
cd my-portfolio
npm run dev

ותפתח: http://localhost:3000`
  },
  {
    title: 'מבנה התיקיות - App Router',
    text: `בתוך הפרויקט תראה:

src/app/
  layout.tsx
  page.tsx
  globals.css

מה כל דבר?
app/ = הלב של האתר
page.tsx = הדף הראשי /

אם תיצור: app/projects/page.tsx
יהיה דף: /projects
כל תיקייה = Route.

layout.tsx = Layout הכללי: Header, Footer, Navigation. כל הדפים נכנסים בתוכו.`
  },
  {
    type: 'quiz',
    title: 'חידון 4',
    learn: `בתיקיית app — כל תיקייה = Route. app/about/page.tsx → הכתובת /about`,
    question: 'אם תיצור את הקובץ app/contact/page.tsx — מה תהיה הכתובת בדפדפן?',
    options: {
      א: '/contact',
      ב: '/page/contact',
      ג: '/app/contact',
      ד: 'contact.localhost:3000'
    },
    correct: 'א',
    explanation: `נכון! כל תיקייה ב-app יוצרת Route. app/contact/page.tsx = הכתובת /contact`
  },
  {
    title: 'איפה נכנס ה-Hybrid?',
    text: `ב-App Router: כל קומפוננטה היא Server כברירת מחדל.

לדוגמה:
export default function Page() {
  return <h1>Hello</h1>
}
זה Server Component.

אם אתה רוצה Client:
"use client";
import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

רק אם יש "use client" — זה רץ בדפדפן.`
  },
  {
    title: 'דוגמה אמיתית ל-Hybrid',
    text: `Home page (Server):
מביא פרויקטים מה-API

ProjectFilter (Client):
חיפוש/פילטר בזמן אמת

כלומר:
Server Page
↓
בתוכה Client Component`
  },
  {
    type: 'quiz',
    title: 'חידון סופי',
    learn: `קומפוננטה בלי "use client" = Server. עם "use client" = Client.`,
    question: 'קומפוננטה ללא "use client" בראש הקובץ — היא:',
    options: {
      א: 'Client Component',
      ב: 'Server Component',
      ג: 'לא תקין',
      ד: 'תלוי ב-React גרסה'
    },
    correct: 'ב',
    explanation: `מצוין! ב-Next.js App Router — ברירת המחדל תמיד Server. רק "use client" הופך ל-Client.`
  }
];
