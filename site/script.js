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

document.querySelector('#year').textContent = new Date().getFullYear();
