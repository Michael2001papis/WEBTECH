/**
 * WEBTECH – Application Logic
 * Core functionality developed by Michael Papismedov
 * Website Developer – 2026
 */

import { PAGES } from './content.js';

const STORAGE_KEY = 'webtech-progress';

/** Escape HTML to prevent XSS. */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function textToHtml(text) {
  return text
    .split(/\n\n+/)
    .map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      const lines = trimmed.split('\n');
      const hasBullets = lines.some(l => l.trim().startsWith('•'));
      if (hasBullets) {
        const items = lines.map(l => l.replace(/^[•\-]\s*/, '').trim()).filter(Boolean);
        return `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
      }
      return `<p>${escapeHtml(trimmed).replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

const TOTAL_PAGES = PAGES.length;
let currentPage = 0;
let cameFromMap = 'hero';

const lessonsCount = PAGES.filter(p => !p.type || p.type !== 'quiz').length;
const quizzesCount = PAGES.filter(p => p.type === 'quiz').length;

const contentEl = document.getElementById('content');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const pageNumEl = document.getElementById('page-num');
const progressBarEl = document.getElementById('progress-bar');
const progressSummaryEl = document.getElementById('progress-summary');
const heroScreen = document.getElementById('hero-screen');
const resumeOverlay = document.getElementById('resume-overlay');
const mapScreen = document.getElementById('map-screen');
const mapListEl = document.getElementById('map-list');
const mapProgressText = document.getElementById('map-progress-text');
const learningView = document.getElementById('learning-view');

function getStoredProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const page = parseInt(data.lastPage, 10);
    return isNaN(page) || page < 0 || page >= TOTAL_PAGES ? null : page;
  } catch {
    return null;
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastPage: currentPage }));
  } catch {}
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

function showScreen(name) {
  heroScreen.classList.toggle('hidden', name !== 'hero');
  resumeOverlay.classList.toggle('hidden', name !== 'resume');
  mapScreen.classList.toggle('hidden', name !== 'map');
  learningView.classList.toggle('hidden', name !== 'learning');
}

function goToLearning(page = 0) {
  currentPage = Math.max(0, Math.min(page, TOTAL_PAGES - 1));
  showScreen('learning');
  renderPage();
  saveProgress();
}

function initHero() {
  document.getElementById('hero-lessons').textContent = String(lessonsCount);
  document.getElementById('hero-quizzes').textContent = String(quizzesCount);
  updateProgressBar(0);

  document.getElementById('hero-start').onclick = () => goToLearning(0);
  document.getElementById('hero-map').onclick = () => {
    cameFromMap = 'hero';
    showScreen('map');
    renderMap();
  };
}

function initResume(savedPage) {
  document.getElementById('resume-continue').onclick = () => goToLearning(savedPage);
  document.getElementById('resume-restart').onclick = () => {
    clearProgress();
    currentPage = 0;
    showScreen('hero');
  };
}

function renderMap() {
  updateProgressBar(((currentPage + 1) / TOTAL_PAGES) * 100);
  const completed = currentPage;
  mapProgressText.textContent = `התקדמות: ${completed} מתוך ${TOTAL_PAGES}`;

  mapListEl.innerHTML = PAGES.map((p, i) => {
    let status = 'future';
    let icon = '⏳';
    if (i < completed) {
      status = 'completed';
      icon = '✓';
    } else if (i === currentPage) {
      status = 'current';
      icon = '▶';
    }
    const label = p.type === 'quiz' ? `חידון: ${escapeHtml(p.title)}` : escapeHtml(p.title);
    return `<li class="map-item ${status}" data-index="${i}" role="button" tabindex="0">
      <span class="map-icon" aria-hidden="true">${icon}</span>
      <span>${label}</span>
    </li>`;
  }).join('');

  mapListEl.querySelectorAll('.map-item').forEach(item => {
    const idx = parseInt(item.dataset.index, 10);
    const go = () => goToLearning(idx);
    item.onclick = go;
    item.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') go(); };
  });
}

document.getElementById('map-back').onclick = () => {
  if (cameFromMap === 'learning') {
    showScreen('learning');
    renderPage();
  } else {
    showScreen('hero');
  }
};

document.getElementById('map-link').onclick = () => {
  cameFromMap = 'learning';
  showScreen('map');
  renderMap();
};

function updateProgressAria() {
  if (progressBarEl) {
    progressBarEl.setAttribute('aria-valuenow', String(currentPage + 1));
    progressBarEl.setAttribute('aria-valuemax', String(TOTAL_PAGES));
  }
}

function focusContent() {
  contentEl.focus({ preventScroll: false });
}

function updateProgressSummary() {
  if (progressSummaryEl) {
    progressSummaryEl.textContent = `התקדמות: ${currentPage + 1} מתוך ${TOTAL_PAGES}`;
  }
}

function updateProgressBar(percent) {
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) progressFill.style.width = `${percent}%`;
}

function renderPage() {
  if (!PAGES.length) return;
  currentPage = Math.max(0, Math.min(currentPage, PAGES.length - 1));
  const item = PAGES[currentPage];
  document.title = item.title;

  if (item.type === 'quiz') {
    renderQuiz(item);
  } else {
    renderContent(item);
  }

  const isLastPage = currentPage >= PAGES.length - 1;
  const isFirstPage = currentPage === 0;

  nextBtn.textContent = 'לעמוד הבא ←';
  nextBtn.classList.toggle('hidden', isLastPage);
  prevBtn.textContent = '→ לעמוד הקודם';
  prevBtn.classList.toggle('hidden', isFirstPage);

  if (pageNumEl) pageNumEl.textContent = `${currentPage + 1} / ${PAGES.length}`;

  const progressFill = document.getElementById('progress-fill');
  if (progressFill) progressFill.style.width = `${((currentPage + 1) / PAGES.length) * 100}%`;

  updateProgressAria();
  updateProgressSummary();
  focusContent();
  saveProgress();
}

function renderContent(page) {
  contentEl.classList.remove('quiz-mode');
  contentEl.setAttribute('aria-label', `תוכן: ${escapeHtml(page.title)}`);
  contentEl.innerHTML = `<h1>${escapeHtml(page.title)}</h1>` + textToHtml(page.text);
}

function renderQuiz(quiz) {
  contentEl.classList.add('quiz-mode');
  const optionKeys = Object.keys(quiz.options);
  const questionId = 'quiz-question';
  const optionsId = 'quiz-options';
  const feedbackId = 'quiz-feedback';

  contentEl.setAttribute('aria-label', `חידון: ${escapeHtml(quiz.title)}`);
  contentEl.innerHTML = `
    <div class="quiz-header">
      <span class="quiz-badge">חידון</span>
      <h1>${escapeHtml(quiz.title)}</h1>
    </div>
    <p class="quiz-learn">${escapeHtml(quiz.learn)}</p>
    <div id="${questionId}" class="quiz-question">${escapeHtml(quiz.question)}</div>
    <div class="quiz-options" id="${optionsId}" role="group" aria-labelledby="${questionId}" aria-label="בחר תשובה">
      ${optionKeys.map(k => `
        <button class="quiz-option" data-key="${escapeHtml(k)}" type="button" aria-pressed="false">
          <span class="opt-letter">${escapeHtml(k)}</span>
          <span class="opt-text">${escapeHtml(quiz.options[k])}</span>
        </button>
      `).join('')}
    </div>
    <div class="quiz-feedback hidden" id="${feedbackId}" role="status" aria-live="polite" aria-atomic="true">
      <div class="quiz-explanation" id="quiz-explanation"></div>
    </div>
  `;

  const optionsEl = contentEl.querySelector(`#${optionsId}`);
  const feedbackEl = contentEl.querySelector(`#${feedbackId}`);
  const explanationEl = contentEl.querySelector('#quiz-explanation');

  contentEl.querySelectorAll('.quiz-option').forEach(btn => {
    btn.onclick = () => {
      if (optionsEl.dataset.answered) return;
      optionsEl.dataset.answered = '1';

      const chosen = btn.dataset.key;
      const isCorrect = chosen === quiz.correct;

      contentEl.querySelectorAll('.quiz-option').forEach(b => {
        b.disabled = true;
        b.setAttribute('aria-pressed', b.dataset.key === chosen ? 'true' : 'false');
        if (b.dataset.key === quiz.correct) b.classList.add('correct');
        else if (b.dataset.key === chosen && !isCorrect) b.classList.add('wrong');
      });

      const resultText = isCorrect ? 'נכון!' : 'לא הפעם';
      explanationEl.innerHTML = `
        <p class="quiz-result ${isCorrect ? 'correct' : 'wrong'}">
          ${isCorrect ? '✓ נכון!' : '✗ לא הפעם'}
        </p>
        <p class="quiz-explanation-text">${escapeHtml(quiz.explanation)}</p>
      `;
      feedbackEl.classList.remove('hidden');
      feedbackEl.setAttribute('aria-label', `תוצאה: ${resultText}. ${escapeHtml(quiz.explanation)}`);
    };
  });
}

nextBtn.addEventListener('click', () => {
  if (currentPage < PAGES.length - 1) {
    currentPage++;
    renderPage();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

// App entry – Core architecture and logic by Michael Papismedov
const savedPage = getStoredProgress();

if (savedPage !== null && savedPage > 0) {
  currentPage = savedPage;
  showScreen('resume');
  initResume(savedPage);
  document.body.classList.add('app-ready');
} else {
  initHero();
  showScreen('hero');
  document.body.classList.add('app-ready');
}
