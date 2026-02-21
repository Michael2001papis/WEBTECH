# WEBTECH – Interactive Next.js Learning Platform

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://webtech-ochre.vercel.app)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)](https://vitejs.dev)
[![RTL](https://img.shields.io/badge/RTL-Hebrew-blue)](https://www.w3.org/International/questions/qa-html-dir)

Interactive learning platform for understanding modern Next.js concepts including:

- **Hybrid Rendering** – Server + Client in one application
- **Server vs Client Components** – When and why to use each
- **SSR (Server Side Rendering)** – Data fetching on the server
- **Project structure** – App Router, file-based routing, real-world patterns

**Live site:** [https://webtech-ochre.vercel.app](https://webtech-ochre.vercel.app)

---

## Project Overview

WEBTECH is a Single Page Application (SPA) designed to provide a structured, product-like learning experience. It simulates a real learning platform with a polished user experience.

| Metric        | Count |
|---------------|-------|
| Lessons       | 16    |
| Quizzes       | 8     |
| Total steps   | 24    |

**The system includes:**

- Progress tracking & persistence
- Learning map with status indicators
- Resume learning on return
- Responsive design (mobile & desktop)
- Accessibility support (ARIA, keyboard, RTL)
- Security (XSS protection via content escaping)

---

## Main Features

### 1. Hero Screen

- Clear introduction to the course
- Course statistics (lessons + quizzes)
- **"התחל ללמוד"** – Quick start button
- **"מפת לימוד"** – Access to learning map

### 2. Resume Learning

- Automatically saves last page to `localStorage`
- On return: **"חזרנו לשיעור האחרון שלך"**
- Choose: **המשך** (Continue) or **התחל מחדש** (Restart)
- Data stored locally in the browser – no server required

### 3. Learning Map

- Displays all 24 course items in one view
- Status indicators:
  - **✓** Completed
  - **▶** Current
  - **⏳** Upcoming
- Direct navigation to any lesson or quiz

### 4. Progress System

- **"התקדמות: X מתוך Y"** – Progress summary
- Visual progress bar at the top
- Real-time updates on navigation
- Accessible ARIA progress support for screen readers

### 5. Interactive Quizzes

- Single answer selection (4 options)
- Correct / incorrect visual feedback
- Explanation displayed after answer
- Multiple attempts prevented per quiz

### 6. Accessibility & UX

- **RTL** – Full Hebrew right-to-left support
- **Keyboard** – Focus management on page change
- **ARIA** – `role`, `aria-label`, `aria-live` for screen readers
- **Mobile** – Responsive layout (breakpoint at 520px)
- **Transitions** – Smooth fade-in on screen load
- **Focus** – Content receives focus after navigation

---

## Technologies Used

| Technology          | Purpose                |
|---------------------|------------------------|
| **Vite 5**          | Build tool & dev server|
| **Vanilla JavaScript** | ES Modules, no framework |
| **CSS**             | Custom Properties, Flexbox, animations |
| **LocalStorage**    | Progress persistence   |
| **Google Fonts**    | Assistant (400, 600, 700) |
| **Vercel**          | Deployment             |

**No runtime dependencies in production** – minimal bundle size.

---

## Project Structure

```
WEBTECH/
├── index.html        # Main entry point
├── src/
│   ├── main.js       # Application logic, navigation, rendering
│   ├── content.js    # Lessons and quizzes (editable)
│   └── style.css     # All styling
├── vite.config.js    # Build configuration
├── vercel.json       # Deployment & SPA routing
├── package.json      # Dependencies & scripts
└── README.md         # This file
```

---

## Installation & Development

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open: **http://localhost:5173**

> ⚠️ **Do not open `index.html` directly via `file://`** – asset paths will fail. Always use the dev server or build preview.

---

## Production Build

```bash
npm run build
```

Output: `dist/`

### Preview locally

```bash
npm run preview
```

---

## Deployment

**Recommended platform:** [Vercel](https://vercel.com)

| Setting          | Value              |
|------------------|--------------------|
| Build Command    | `npm run build`    |
| Output Directory | `dist`             |

SPA routing (all paths → `index.html`) is configured in `vercel.json`.

---

## Content Management

All learning content is managed in:

```
src/content.js
```

- **Lessons:** `{ title, text }`
- **Quizzes:** `{ type: 'quiz', title, learn, question, options, correct, explanation }`

Add or edit items in the `PAGES` array to extend the course.

---

## Why This Project Matters (Professional Level)

This project demonstrates:

- **Product-level UX** – Hero, resume, map, progress – not a basic demo
- **Accessibility** – ARIA, focus, RTL – production standards
- **Security** – Content escaping – XSS awareness
- **Deployment readiness** – Vite + Vercel – real pipeline
- **Clean structure** – Separation of concerns, maintainable code

**Suitable for:** Junior+ / Mid level portfolio | Real client projects | Learning platform references

---

## Author

**Michael Papismedov (MP)**  
GitHub: [@Michael2001papis](https://github.com/Michael2001papis)

---

## Project Status

✅ **Production ready** – Fully deployed and operational
