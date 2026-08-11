const video = document.querySelector('#association-video');
const portraitQuery = window.matchMedia('(orientation: portrait) and (max-width: 820px)');

function selectVideo() {
  if (!video) return;
  const nextSource = portraitQuery.matches ? video.dataset.portrait : video.dataset.landscape;
  const currentSource = video.getAttribute('src');
  if (currentSource === nextSource) return;

  const wasPlaying = !video.paused;
  const currentTime = video.currentTime || 0;
  video.src = nextSource;
  video.load();
  video.addEventListener('loadedmetadata', () => {
    video.currentTime = Math.min(currentTime, video.duration || currentTime);
    if (wasPlaying) video.play().catch(() => {});
  }, {once: true});
}

selectVideo();
portraitQuery.addEventListener?.('change', selectVideo);

const formDrawer = document.querySelector('#inscricao.form-drawer');
const formLinks = document.querySelectorAll('a[href="#inscricao"]');

function openFormDrawer() {
  if (!formDrawer) return;
  formDrawer.open = true;
}

formLinks.forEach((link) => link.addEventListener('click', openFormDrawer));
if (window.location.hash === '#inscricao') openFormDrawer();

const membershipForm = document.querySelector('#membership-form');
const childrenList = document.querySelector('#children-list');
const childrenQuantity = document.querySelector('#children-quantity');
const formMessage = document.querySelector('#form-message');
const maxChildren = 5;

function renderChildren(quantity) {
  if (!childrenList) return;
  const previousNames = [...childrenList.querySelectorAll('[name="childName"]')].map((input) => input.value);
  const previousClasses = [...childrenList.querySelectorAll('[name="childClass"]')].map((input) => input.value);
  const safeQuantity = Math.min(Math.max(Number(quantity) || 0, 0), maxChildren);
  childrenList.replaceChildren();
  for (let index = 0; index < safeQuantity; index += 1) {
    const row = document.createElement('div');
    row.className = 'child-row';
    row.innerHTML = `
      <label>Filho ${index + 1} — nome<input name="childName" required /></label>
      <label>Ano/turma<input name="childClass" required /></label>
    `;
    row.querySelector('[name="childName"]').value = previousNames[index] || '';
    row.querySelector('[name="childClass"]').value = previousClasses[index] || '';
    childrenList.appendChild(row);
  }
}

childrenQuantity?.addEventListener('change', () => renderChildren(childrenQuantity.value));

membershipForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = membershipForm.querySelector('[type="submit"]');
  const data = new FormData(membershipForm);
  const childNames = data.getAll('childName');
  const childClasses = data.getAll('childClass');
  const payload = {
    registrationType: data.get('registrationType'),
    fullName: data.get('fullName'),
    email: data.get('email'),
    phone: data.get('phone'),
    children: childNames.map((name, index) => ({name, className: childClasses[index]})),
    internalCommunication: data.get('internalCommunication') === 'on',
  };

  submitButton.disabled = true;
  formMessage.hidden = false;
  formMessage.textContent = 'A enviar a inscrição…';
  try {
    const response = await fetch('/api/inscricoes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('submission_failed');
    formMessage.textContent = 'Inscrição enviada com sucesso.';
    membershipForm.reset();
    childrenList.replaceChildren();
  } catch {
    formMessage.textContent = 'Ainda não foi possível enviar. Tenta novamente dentro de momentos.';
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
