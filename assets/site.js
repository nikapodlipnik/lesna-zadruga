// Prikaže povezavo do javnega Google Koledarja, če je nastavljena.
const calendarFrame = document.querySelector('[data-calendar]');
if (calendarFrame) {
  const url = calendarFrame.dataset.calendar;
  if (url && /^https:\/\/calendar\.google\.com\/calendar\/embed\?/.test(url)) {
    const iframe = document.createElement('iframe');
    iframe.className = 'calendar';
    iframe.title = 'Zasedenost apartmaja Podčetrtek';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.src = url;
    calendarFrame.replaceChildren(iframe);
  }
}


// Povečava fotografij z upravljanjem prek miške, dotika in tipkovnice.
const photos = [...document.querySelectorAll('a.lightbox-trigger')];
if (photos.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-lightbox';
  dialog.setAttribute('aria-label', 'Povečan prikaz fotografije');
  dialog.innerHTML = `
    <div class="lightbox-stage">
      <button class="lightbox-close" type="button" aria-label="Zapri fotografijo">×</button>
      <button class="lightbox-prev" type="button" aria-label="Prejšnja fotografija">‹</button>
      <img class="lightbox-image" alt="" />
      <button class="lightbox-next" type="button" aria-label="Naslednja fotografija">›</button>
      <p class="lightbox-caption" aria-live="polite"></p>
    </div>`;
  document.body.append(dialog);
  const enlarged = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('.lightbox-caption');
  let selected = 0;
  let previousFocus;
  function showPhoto(index) {
    selected = (index + photos.length) % photos.length;
    const link = photos[selected];
    enlarged.src = link.href;
    enlarged.alt = link.querySelector('img')?.alt || 'Fotografija';
    caption.textContent = enlarged.alt + ' · ' + (selected + 1) + '/' + photos.length;
  }
  photos.forEach((link, index) => link.addEventListener('click', (event) => {
    event.preventDefault();
    previousFocus = document.activeElement;
    showPhoto(index);
    dialog.showModal();
  }));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(selected - 1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(selected + 1));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showPhoto(selected - 1);
    if (event.key === 'ArrowRight') showPhoto(selected + 1);
  });
  dialog.addEventListener('close', () => previousFocus?.focus());
}
