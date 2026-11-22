(function () {
  const state = {
    fontScale: 1,
    lineHeight: 1.65,
    viewMode: 'default', // default | dark | contrast | reading
    colorBlind: 'none'    // none | protanopia | deuteranopia | tritanopia
  };

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      alert('المتصفح لا يدعم القراءة الصوتية.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function applySettings() {
    const html = document.documentElement;
    html.style.setProperty('--font-scale', state.fontScale);
    html.style.setProperty('--line-height', state.lineHeight);

    html.classList.remove('mode-dark', 'mode-contrast', 'mode-reading');
    if (state.viewMode !== 'default') html.classList.add(`mode-${state.viewMode}`);

    html.classList.remove('cb-protanopia', 'cb-deuteranopia', 'cb-tritanopia');
    if (state.colorBlind !== 'none') html.classList.add(`cb-${state.colorBlind}`);

    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewMode === state.viewMode);
    });
    document.querySelectorAll('[data-cb-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cbMode === state.colorBlind);
    });
  }

  function injectWidget() {
    // زر عائم لفتح لوحة الوصول
    const fab = document.createElement('button');
    fab.className = 'a11y-fab';
    fab.id = 'a11yToggleBtn';
    fab.setAttribute('aria-label', 'فتح أدوات إمكانية الوصول (Alt + A)');
    fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '♿ أدوات الوصول';

    // لوحة التحكم
    const drawer = document.createElement('aside');
    drawer.className = 'a11y-drawer';
    drawer.id = 'a11yDrawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'لوحة إعدادات إمكانية الوصول');

    drawer.innerHTML = `
      <h3>
        <span>إمكانية الوصول (Accessibility)</span>
        <button id="a11yCloseBtn" class="btn btn-sm btn-secondary" aria-label="إغلاق اللوحة">✕</button>
      </h3>

      <div class="a11y-group">
        <span class="a11y-group-title">🔊 القراءة الصوتية (Voiceover)</span>
        <div class="a11y-row">
          <button class="a11y-chip" id="a11yReadSelection">اقرأ النص المحدد</button>
          <button class="a11y-chip" id="a11yStopSpeech">إيقاف الصوت</button>
        </div>
      </div>

      <div class="a11y-group">
        <span class="a11y-group-title">🔠 حجم النص وتباعد الأسطر (Alt + / -)</span>
        <div class="a11y-row">
          <button class="a11y-chip" id="fontIncBtn">تكبير +</button>
          <button class="a11y-chip" id="fontDecBtn">تصغير -</button>
          <button class="a11y-chip" id="lineSpaceBtn">تباعد الأسطر</button>
        </div>
      </div>

      <div class="a11y-group">
        <span class="a11y-group-title">👁️ أوضاع العرض (View Modes)</span>
        <div class="a11y-row">
          <button class="a11y-chip active" data-view-mode="default">افتراضي</button>
          <button class="a11y-chip" data-view-mode="dark">ليلي</button>
          <button class="a11y-chip" data-view-mode="contrast">تباين عالٍ</button>
          <button class="a11y-chip" data-view-mode="reading">قراءة هادئة</button>
        </div>
      </div>

      <div class="a11y-group">
        <span class="a11y-group-title">🎨 فلاتر عمى الألوان (Color Blindness)</span>
        <div class="a11y-row">
          <button class="a11y-chip active" data-cb-mode="none">طبيعي</button>
          <button class="a11y-chip" data-cb-mode="protanopia">أحمر (Protanopia)</button>
          <button class="a11y-chip" data-cb-mode="deuteranopia">أخضر (Deuteranopia)</button>
          <button class="a11y-chip" data-cb-mode="tritanopia">أزرق (Tritanopia)</button>
        </div>
      </div>

      <div class="a11y-row">
        <button class="a11y-chip" id="a11yResetBtn">↺ إعادة ضبط الكل (Alt + R)</button>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(drawer);

    // الأحداث
    const toggleDrawer = () => {
      const isOpen = drawer.classList.toggle('open');
      fab.setAttribute('aria-expanded', String(isOpen));
    };

    fab.addEventListener('click', toggleDrawer);
    drawer.querySelector('#a11yCloseBtn').addEventListener('click', toggleDrawer);

    drawer.querySelector('#a11yReadSelection').addEventListener('click', () => {
      const selected = window.getSelection().toString().trim();
      speak(selected || document.querySelector('main').innerText.slice(0, 350));
    });

    drawer.querySelector('#a11yStopSpeech').addEventListener('click', stopSpeaking);

    drawer.querySelector('#fontIncBtn').addEventListener('click', () => {
      state.fontScale = Math.min(1.5, +(state.fontScale + 0.1).toFixed(1));
      applySettings();
    });

    drawer.querySelector('#fontDecBtn').addEventListener('click', () => {
      state.fontScale = Math.max(0.9, +(state.fontScale - 0.1).toFixed(1));
      applySettings();
    });

    drawer.querySelector('#lineSpaceBtn').addEventListener('click', () => {
      state.lineHeight = state.lineHeight === 1.65 ? 2.1 : 1.65;
      applySettings();
    });

    drawer.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.viewMode = btn.dataset.viewMode;
        applySettings();
      });
    });

    drawer.querySelectorAll('[data-cb-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.colorBlind = btn.dataset.cbMode;
        applySettings();
      });
    });

    drawer.querySelector('#a11yResetBtn').addEventListener('click', () => {
      state.fontScale = 1;
      state.lineHeight = 1.65;
      state.viewMode = 'default';
      state.colorBlind = 'none';
      stopSpeaking();
      applySettings();
    });

    // اختصارات لوحة المفاتيح (Keyboard Shortcuts)
    document.addEventListener('keydown', (e) => {
      if (!e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === 'a') { e.preventDefault(); toggleDrawer(); }
      if (key === '=' || key === '+') { e.preventDefault(); state.fontScale = Math.min(1.5, +(state.fontScale + 0.1).toFixed(1)); applySettings(); }
      if (key === '-') { e.preventDefault(); state.fontScale = Math.max(0.9, +(state.fontScale - 0.1).toFixed(1)); applySettings(); }
      if (key === 'v') { e.preventDefault(); speak(document.getElementById('detailTitle')?.textContent || 'مُيسّر الاستثمار العماني'); }
      if (key === 'r') { e.preventDefault(); drawer.querySelector('#a11yResetBtn').click(); }
    });
  }

  window.OmanA11y = { speak, stopSpeaking };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWidget);
  } else {
    injectWidget();
  }
})();