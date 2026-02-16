import { PAGES } from './content.js';

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
        return `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

let currentPage = 0;
const contentEl = document.getElementById('content');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const pageNumEl = document.getElementById('page-num');

function renderPage() {
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

  nextBtn.onclick = () => { if (currentPage < PAGES.length - 1) { currentPage++; renderPage(); } };
  prevBtn.onclick = () => { if (currentPage > 0) { currentPage--; renderPage(); } };
}

function renderContent(page) {
  contentEl.innerHTML = `<h1>${page.title}</h1>` + textToHtml(page.text);
  contentEl.classList.remove('quiz-mode');
}

function renderQuiz(quiz) {
  contentEl.classList.add('quiz-mode');
  contentEl.innerHTML = `
    <div class="quiz-header">
      <span class="quiz-badge">חידון</span>
      <h1>${quiz.title}</h1>
    </div>
    <p class="quiz-learn">${quiz.learn}</p>
    <div class="quiz-question">${quiz.question}</div>
    <div class="quiz-options" id="quiz-options">
      ${['א', 'ב', 'ג', 'ד'].map(k => `
        <button class="quiz-option" data-key="${k}">
          <span class="opt-letter">${k}</span>
          <span class="opt-text">${quiz.options[k]}</span>
        </button>
      `).join('')}
    </div>
    <div class="quiz-feedback hidden" id="quiz-feedback">
      <div class="quiz-explanation" id="quiz-explanation"></div>
    </div>
  `;

  const optionsEl = contentEl.querySelector('#quiz-options');
  const feedbackEl = contentEl.querySelector('#quiz-feedback');
  const explanationEl = contentEl.querySelector('#quiz-explanation');

  contentEl.querySelectorAll('.quiz-option').forEach(btn => {
    btn.onclick = () => {
      if (optionsEl.dataset.answered) return;
      optionsEl.dataset.answered = '1';

      const chosen = btn.dataset.key;
      const isCorrect = chosen === quiz.correct;

      contentEl.querySelectorAll('.quiz-option').forEach(b => {
        b.disabled = true;
        if (b.dataset.key === quiz.correct) b.classList.add('correct');
        else if (b.dataset.key === chosen && !isCorrect) b.classList.add('wrong');
      });

      explanationEl.innerHTML = `
        <p class="quiz-result ${isCorrect ? 'correct' : 'wrong'}">
          ${isCorrect ? '✓ נכון!' : '✗ לא הפעם'}
        </p>
        <p class="quiz-explanation-text">${quiz.explanation}</p>
      `;
      feedbackEl.classList.remove('hidden');
    };
  });
}

renderPage();
