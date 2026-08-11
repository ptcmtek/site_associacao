const video = document.querySelector('#association-video');
const portraitQuery = window.matchMedia('(orientation: portrait) and (max-width: 820px)');
const language = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
const copy = {
  pt: {
    childName: (number) => `Filho ${number} — nome`,
    className: 'Ano/turma',
    select: 'Seleciona',
    invalidPhone: 'Introduz um número válido, incluindo o indicativo internacional (por exemplo, +351 912 345 678).',
    sending: 'A enviar a inscrição…',
    error: 'Ainda não foi possível enviar. Tenta novamente dentro de momentos.',
    reference: 'Referência',
  },
  en: {
    childName: (number) => `Child ${number} — name`,
    className: 'Year/class',
    select: 'Select',
    invalidPhone: 'Enter a valid number including its international country code (for example, +351 912 345 678).',
    sending: 'Submitting your registration…',
    error: 'We could not submit your registration. Please try again in a moment.',
    reference: 'Reference',
  },
}[language];

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

const formDrawer = document.querySelector('.form-drawer');
const formLinks = document.querySelectorAll('a[href="#inscricao"], a[href="#registration"]');

function openFormDrawer() {
  if (!formDrawer) return;
  formDrawer.open = true;
}

formLinks.forEach((link) => link.addEventListener('click', openFormDrawer));
if (formDrawer && window.location.hash === `#${formDrawer.id}`) openFormDrawer();

const membershipForm = document.querySelector('#membership-form');
const childrenList = document.querySelector('#children-list');
const childrenQuantity = document.querySelector('#children-quantity');
const formMessage = document.querySelector('#form-message');
const registrationSuccess = document.querySelector('#registration-success');
const successReference = document.querySelector('#success-reference');
const closeSuccess = document.querySelector('#close-success');
const phoneInput = membershipForm?.querySelector('[name="phone"]');
const countryCodeSelect = membershipForm?.querySelector('[name="countryCode"]');
const maxChildren = 5;
const classOptions = Array.from({length: 9}, (_, year) =>
  ['A', 'B', 'C'].map((classLetter) => `${year + 1}${classLetter}`)
).flat();

function countryFlag(iso) {
  return iso.replace(/./g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)));
}

function populateCountryCodes() {
  if (!countryCodeSelect || !window.COUNTRY_CALLING_CODES) return;
  const displayNames = new Intl.DisplayNames([language === 'pt' ? 'pt-PT' : 'en'], {type: 'region'});
  const countries = [...window.COUNTRY_CALLING_CODES].sort(([isoA], [isoB]) => {
    if (isoA === 'PT') return -1;
    if (isoB === 'PT') return 1;
    return displayNames.of(isoA).localeCompare(displayNames.of(isoB), language);
  });
  countryCodeSelect.replaceChildren(...countries.map(([iso, code]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = `${countryFlag(iso)} ${displayNames.of(iso)} (${code})`;
    option.selected = iso === 'PT';
    return option;
  }));
}

populateCountryCodes();

function normalizePhone(value, countryCode = '') {
  const compact = value.replace(/[\s().-]/g, '');
  if (compact.startsWith('+')) return compact;
  if (compact.startsWith('00')) return `+${compact.slice(2)}`;
  return countryCode ? `${countryCode}${compact}` : compact;
}

function validatePhone() {
  if (!phoneInput) return;
  const normalized = normalizePhone(phoneInput.value, countryCodeSelect?.value);
  const isValid = /^\+[1-9]\d{7,14}$/.test(normalized);
  phoneInput.setCustomValidity(isValid || !phoneInput.value ? '' : copy.invalidPhone);
}

phoneInput?.addEventListener('input', validatePhone);
countryCodeSelect?.addEventListener('change', validatePhone);
membershipForm?.addEventListener('reset', () => requestAnimationFrame(validatePhone));
validatePhone();

function showRegistrationSuccess(memberId) {
  if (formDrawer) formDrawer.open = false;
  if (successReference) {
    successReference.hidden = !memberId;
    successReference.textContent = memberId ? `${copy.reference}: ${memberId}` : '';
  }
  if (!registrationSuccess) return;
  if (typeof registrationSuccess.showModal === 'function') registrationSuccess.showModal();
  else registrationSuccess.setAttribute('open', '');
}

closeSuccess?.addEventListener('click', () => {
  if (typeof registrationSuccess?.close === 'function') registrationSuccess.close();
  else registrationSuccess?.removeAttribute('open');
});

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
      <label>${copy.childName(index + 1)}<input name="childName" required /></label>
      <label>${copy.className}
        <select name="childClass" required>
          <option value="" disabled selected>${copy.select}</option>
          ${classOptions.map((value) => `<option value="${value}">${value}</option>`).join('')}
        </select>
      </label>
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
    email: data.get('email').trim(),
    phone: normalizePhone(data.get('phone'), data.get('countryCode')),
    children: childNames.map((name, index) => ({name, className: childClasses[index]})),
    internalCommunication: data.get('internalCommunication') === 'on',
  };

  submitButton.disabled = true;
  formMessage.hidden = false;
  formMessage.textContent = copy.sending;
  try {
    const response = await fetch('/api/inscricoes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('submission_failed');
    const result = await response.json();
    formMessage.hidden = true;
    membershipForm.reset();
    childrenList.replaceChildren();
    showRegistrationSuccess(result.memberId);
  } catch {
    formMessage.textContent = copy.error;
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
