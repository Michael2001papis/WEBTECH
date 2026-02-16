// ============================================================
// 📝 תוכן מעודכן מ-raw-content.txt + חידונים
// ============================================================

export const PAGES = [
  {
    title: 'חלק 1 - מה זה Hybrid בכלל?',
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
    learn: `SSR = השרת שולח HTML מוכן. SPA = הדפדפן מריץ כמו אפליקציה. Hybrid = שילוב של שניהם.`,
    question: 'Hybrid ב-Next.js אומר ש...',
    options: {
      א: 'אתה חייב לבחור: רק SPA או רק SSR',
      ב: 'אתה יכול לערבב — דפים מ-Server וחלקים אינטראקטיביים כ-SPA',
      ג: 'SSR תמיד יותר איטי מ-SPA',
      ד: 'אין קשר ל-SEO'
    },
    correct: 'ב',
    explanation: `מצוין! Hybrid = שילוב. דפים נטענים מהשרת (מהיר + SEO), ואז הדפדפן ממשיך כמו אפליקציה חלקה.`
  },
  {
    title: 'חלק 2 - Server Components מול Client Components',
    text: `הטריק הגדול של Next.js.

ב-Next.js (App Router) ברירת המחדל היא Server Components:

• רץ בשרת
• מביא דאטה בקלות
• שולח פחות JavaScript לדפדפן (יותר מהיר)

וכשצריך אינטראקטיביות (כפתורים עם state, טפסים חכמים, אנימציות, useEffect וכו') — משתמשים ב-Client Components עם "use client".

זה לב ה-Hybrid.`
  },
  {
    title: 'חלק 3 - איך זה ייראה באתר פורטפוליו שלך',
    text: `באתר שלך:

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
    question: 'מה ההבדל בין Server Component ל-Client Component?',
    options: {
      א: 'Server = להצגת מידע מהר. Client = לאינטראקטיביות וחוויית משתמש',
      ב: 'אין הבדל',
      ג: 'Client תמיד מהיר יותר',
      ד: 'Server רק ל-API'
    },
    correct: 'א',
    explanation: `נכון! Server Component להצגת מידע מהר וביעילות. Client Component לאינטראקטיביות ולחוויית משתמש.`
  },
  {
    title: 'המשפט המדויק לזכור',
    text: `Server Component = להצגת מידע מהר וביעילות

Client Component = לאינטראקטיביות וחוויית משתמש`
  },
  {
    title: 'משהו חשוב מאוד שתדע',
    text: `חברות גדולות (Netflix, Facebook וכו'):
לא משתמשות רק ב-Client.
הן משתמשות בדיוק בגישה הזו: Hybrid = Server + Client ביחד.

• כמה שיותר Server (ביצועים)
• Client רק איפה שצריך (אינטראקטיביות)`
  },
  {
    title: 'הכלל הכי חשוב ב-Hybrid',
    text: `אם הקומפוננטה:

רק מציגה מידע → Server

יש בה state / events / hooks → Client

זה כל הסיפור.`
  },
  {
    type: 'quiz',
    title: 'חידון 3',
    learn: `state = זיכרון (למשל "כמה פעמים לחצתי"). events = לחיצות. hooks = useState, useEffect. אם אחד מהם → Client.`,
    question: 'מתי צריך להוסיף "use client" לקומפוננטה?',
    options: {
      א: 'תמיד, בכל קומפוננטה',
      ב: 'רק כשיש useState, useEffect, onClick או אינטראקטיביות',
      ג: 'רק בדפים ראשיים',
      ד: 'רק כשיש טופס'
    },
    correct: 'ב',
    explanation: `בדיוק! "use client" נדרש כשאתה משתמש ב-hooks (useState, useEffect) או באירועים (onClick). בלי אלה — השאר Server.`
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

אם תיצור: app/projects/page.tsx — יהיה דף: /projects
כל תיקייה = Route.

layout.tsx = ה-Layout הכללי: Header, Footer, Navigation. כל הדפים נכנסים בתוכו.`
  },
  {
    type: 'quiz',
    title: 'חידון 4',
    learn: `כל תיקייה ב-app = Route. app/about/page.tsx → הכתובת /about`,
    question: 'אם אני יוצר app/about/page.tsx — מה יהיה ה-URL?',
    options: {
      א: '/about',
      ב: '/page/about',
      ג: '/app/about',
      ד: 'about.localhost:3000'
    },
    correct: 'א',
    explanation: `נכון! כל תיקייה ב-app יוצרת Route. app/about/page.tsx = הכתובת /about`
  },
  {
    title: 'איפה נכנס ה-Hybrid?',
    text: `חשוב מאוד: ב-App Router כל קומפוננטה היא Server כברירת מחדל.

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
    title: 'כלל זהב (תשמור את זה)',
    text: `אם אתה רואה:

useState / useEffect / event

אז:

"use client"

וזה Client Component`
  },
  {
    type: 'quiz',
    title: 'חידון 5',
    learn: `קומפוננטה בלי "use client" = Server (ברירת מחדל). עם "use client" = Client.`,
    question: 'אם קומפוננטה בלי "use client" — היא Server או Client?',
    options: {
      א: 'Client Component',
      ב: 'Server Component',
      ג: 'לא תקין',
      ד: 'תלוי ב-React גרסה'
    },
    correct: 'ב',
    explanation: `מצוין! ב-Next.js App Router — ברירת המחדל תמיד Server. רק "use client" הופך ל-Client.`
  },
  {
    title: 'שלב 3 - SSR ו-Data Fetching',
    text: `מצוין. עכשיו נכנסים ללב של ה-Hybrid.
שלב 3 הוא מה שמבדיל אתר "רגיל" מאתר מקצועי.

מה זה SSR בפועל?
SSR = Server Side Rendering

המשתמש נכנס ל-URL
השרת: מביא נתונים (API / Database), בונה HTML מוכן
הדפדפן מקבל דף מוכן

יתרונות:
• טעינה ראשונית מהירה
• SEO מצוין
• פחות JavaScript בדפדפן

ב-Next.js זה קורה אוטומטית כשעושים fetch בתוך Server Component.`
  },
  {
    title: 'איך מביאים נתונים ב-Server Component',
    text: `דוגמה:
// app/projects/page.tsx
async function getProjects() {
  const res = await fetch("https://api.example.com/projects");
  return res.json();
}
export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div>
      <h1>Projects</h1>
      {projects.map((p) => <div key={p.id}>{p.title}</div>)}
    </div>
  );
}

שימו לב:
• הפונקציה של הדף היא async
• אין "use client"
• זה רץ בשרת
• הדפדפן מקבל HTML מוכן
זה SSR.`
  },
  {
    title: 'איך זה הופך ל-Hybrid - שלב 3',
    text: `משלבים Client בתוך Server.

Server Page: מביא פרויקטים ב-fetch, מעביר ל-ProjectSearch
Client Component (ProjectSearch): יש useState לחיפוש, מסנן את הרשימה

מה קורה?
• הנתונים מגיעים מהשרת (SSR)
• החיפוש עובד בדפדפן (SPA)
• זה Hybrid אמיתי

השרת עושה את fetch — הדף נטען מהר.
הדפדפן מריץ את החיפוש — אינטראקטיבי.`
  },
  {
    type: 'quiz',
    title: 'חידון 6 - שלב 3',
    learn: `fetch בשרת = SSR. הדפדפן מקבל HTML מוכן. אין צורך ב-"use client" ל-fetch בשרת.`,
    question: 'אם אני עושה fetch בתוך Server Component — זה SSR או SPA?',
    options: {
      א: 'SSR (השרת מביא נתונים ומרנדר)',
      ב: 'SPA (הדפדפן מביא)',
      ג: 'שניהם',
      ד: 'לא תלוי'
    },
    correct: 'א',
    explanation: `נכון! fetch בתוך Server Component רץ בשרת. השרת מביא נתונים, בונה HTML, ושולח לדפדפן. זה SSR.`
  },
  {
    type: 'quiz',
    title: 'חידון 7',
    learn: `Server Component יכול לעשות fetch בלי "use client". הנתונים מגיעים לפני שהדף נשלח.`,
    question: 'האם צריך "use client" כדי לעשות fetch בשרת?',
    options: {
      א: 'כן, תמיד',
      ב: 'לא — fetch בשרת עובד ב-Server Component בלי "use client"',
      ג: 'רק עם useEffect',
      ד: 'תלוי ב-API'
    },
    correct: 'ב',
    explanation: `בדיוק! ב-Server Component אתה פשוט כותב async + fetch. אין צורך ב-"use client". ה-fetch רץ בשרת.`
  },
  {
    type: 'quiz',
    title: 'חידון 8',
    learn: `להביא בשרת = מהיר (הדף נטען עם הנתונים), טוב ל-SEO, פחות JavaScript בדפדפן.`,
    question: 'למה עדיף להביא רשימת פרויקטים בשרת ולא ב-Client?',
    options: {
      א: 'הדף נטען מהיר יותר עם הנתונים, SEO טוב יותר, פחות עומס על הדפדפן',
      ב: 'Client תמיד מהיר יותר',
      ג: 'אין הבדל',
      ד: 'רק בגלל SEO'
    },
    correct: 'א',
    explanation: `נכון! בשרת: טעינה ראשונית מהירה, גוגל רואה תוכן, פחות JavaScript. ב-Client: הדף נטען ריק ואז מחכה לנתונים.`
  }
];
