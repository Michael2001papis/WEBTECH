import { PAGES } from './content.js';

/** Escape HTML to prevent XSS. Use for any content that may come from external sources. */
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
const contentEl = document.getElementById('content');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const pageNumEl = document.getElementById('page-num');
const progressBarEl = document.getElementById('progress-bar');

function updateProgressAria() {
  if (progressBarEl) {
    progressBarEl.setAttribute('aria-valuenow', String(currentPage + 1));
    progressBarEl.setAttribute('aria-valuemax', String(TOTAL_PAGES));
  }
}

function focusContent() {
  contentEl.focus({ preventScroll: false });
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
  focusContent();
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

/** One-time setup of navigation handlers */
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

renderPage();
