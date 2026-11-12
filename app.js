const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    menuToggle.textContent = open ? '×' : '☰';
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Otwórz menu');
    menuToggle.textContent = '☰';
  }));
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', link.getAttribute('href'));
    }
  });
});

// Local-only Commons prototype. Entries stay in this browser and are never uploaded.
(() => {
  const form = document.getElementById('topicForm');
  const openButton = document.getElementById('openTopicForm');
  const cancelButton = document.getElementById('cancelTopicForm');
  const list = document.getElementById('topicList');
  const empty = document.getElementById('topicEmpty');
  if (!form || !openButton || !list || !empty) return;
  const storageKey = 'nlo-commons-local-drafts-v1';
  const starters = [
    { id: 'starter-1', title: 'Jak możemy współpracować na rzecz regeneracji przyrody?', body: 'Podzielmy się wiedzą, obserwacjami terenowymi i pomysłami na możliwe do zweryfikowania działania.', date: 'Temat wprowadzający' },
    { id: 'starter-2', title: 'Technologia, która wzmacnia autonomię człowieka', body: 'Jak tworzyć otwarte narzędzia, które szanują prywatność, wolność wyboru i prawo do odejścia?', date: 'Temat wprowadzający' },
    { id: 'starter-3', title: 'Czego potrzebuje bezpieczna przestrzeń rozmowy?', body: 'Porozmawiajmy o zasadach chroniących uczestników przed nadużyciami, fikcyjnymi profilami i presją.', date: 'Temat wprowadzający' }
  ];
  let drafts = [];
  try { drafts = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (!Array.isArray(drafts)) drafts = []; } catch { drafts = []; }
  function render() {
    const all = [...drafts, ...starters];
    list.replaceChildren();
    empty.hidden = all.length > 0;
    all.forEach(topic => {
      const card = document.createElement('article'); card.className = 'topic-entry';
      const tag = document.createElement('span'); tag.className = 'topic-entry-tag'; tag.textContent = topic.date === 'Temat wprowadzający' ? 'PROPOZYCJA ROZMOWY' : 'LOKALNY SZKIC';
      const heading = document.createElement('h4'); heading.textContent = topic.title;
      const body = document.createElement('p'); body.textContent = topic.body;
      card.append(tag, heading, body); list.append(card);
    });
  }
  openButton.addEventListener('click', () => { form.hidden = !form.hidden; if (!form.hidden) document.getElementById('topicTitle')?.focus(); });
  cancelButton?.addEventListener('click', () => { form.reset(); form.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const title = form.elements.title.value.trim(), body = form.elements.body.value.trim();
    if (!title || !body) return;
    drafts.unshift({ id: String(Date.now()), title, body, date: 'Twój lokalny szkic' });
    try { localStorage.setItem(storageKey, JSON.stringify(drafts)); }
    catch { window.alert('Nie udało się zapisać szkicu w tej przeglądarce.'); return; }
    form.reset(); form.hidden = true; render();
  });
  render();
})();
