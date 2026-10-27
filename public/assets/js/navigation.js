(function () {
  document.querySelectorAll('.tgp-footer a[href="/about"]').forEach(function (link) {
    if (link.textContent.trim() === 'About Us') link.textContent = 'About';
  });
  document.querySelectorAll('.contact-community-link[href="https://community.thegrandplan.org"], .tgp-footer a[href="https://www.facebook.com/groups/2991527814527315/"], .commband a.btn[href="https://community.thegrandplan.org"], .commband a.btn[href="https://community.thegrandplan.org/checkout/on-demand-experience-individual"]').forEach(function (link) {
    link.target = '_blank';
    link.relList.add('noopener');
  });
})();

(function () {
  var t = document.querySelector('.navtoggle');
  var m = document.getElementById('menu');
  if (t && m) {
    var nav = t.closest('.nav');
    var cta = nav && nav.querySelector(':scope > a.btn.blue');
    if (cta && !m.querySelector('.nav-mobile-cta')) {
      var item = document.createElement('li');
      item.className = 'nav-mobile-cta';
      var mobileCta = cta.cloneNode(true);
      mobileCta.removeAttribute('id');
      item.appendChild(mobileCta);
      m.appendChild(item);
    }
    t.addEventListener('click', function () {
      var open = m.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
    });
  }
})();

// About-page endorsement letter preview; other pages are unchanged.
(function () {
  var thumbnail = document.querySelector('.endorse img[src="/assets/images/Andy-Cook---Billy-Graham-Center-endorsement--b09dd25f50e2.jpg"]');
  if (!thumbnail) return;

  var source = thumbnail.getAttribute('src');
  var style = document.createElement('style');
  style.textContent = '.tgp-letter-trigger{display:block;max-width:100%;padding:0;border:0;background:none;color:inherit;text-align:left;cursor:zoom-in;font:inherit}.tgp-letter-trigger:focus-visible{outline:3px solid #C1C549;outline-offset:5px}.tgp-letter-hint{display:block;margin-top:8px;color:#fff;font-size:12px;text-decoration:underline}.tgp-letter-dialog{width:min(960px,calc(100% - 32px));max-width:none;max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);padding:0;border:0;background:#fff;color:#313131;overflow:auto;overscroll-behavior:contain;box-shadow:0 18px 60px rgba(0,0,0,.3)}.tgp-letter-dialog::backdrop{background:rgba(10,31,54,.8)}.tgp-letter-toolbar{position:sticky;top:0;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 16px;padding:10px 16px;background:#fff;border-bottom:1px solid #D8D5D0}.tgp-letter-title{flex:1 1 180px;margin:0;font:700 16px/1.4 var(--sans,system-ui,sans-serif);color:#1B538D}.tgp-letter-original{color:#1B538D;font-size:13px;text-decoration:underline}.tgp-letter-close{flex:none;min-width:44px;min-height:44px;padding:8px 12px;border:0;background:#1B538D;color:#fff;font:600 14px/1.4 var(--sans,system-ui,sans-serif);cursor:pointer}.tgp-letter-close:focus-visible,.tgp-letter-original:focus-visible{outline:3px solid #0D90A2;outline-offset:3px}.tgp-letter-dialog .tgp-letter-image{display:block;width:100%;max-width:100%;height:auto;margin:0;aspect-ratio:auto;object-fit:contain}';
  document.head.appendChild(style);

  var trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'tgp-letter-trigger';
  trigger.setAttribute('aria-label', 'Read the endorsement letter from Andrew J. Cook');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', 'tgp-letter-preview');
  thumbnail.parentNode.insertBefore(trigger, thumbnail);
  trigger.appendChild(thumbnail);
  var hint = document.createElement('span');
  hint.className = 'tgp-letter-hint';
  hint.textContent = 'Click to read letter';
  trigger.appendChild(hint);

  var dialog = document.createElement('dialog');
  dialog.id = 'tgp-letter-preview';
  dialog.className = 'tgp-letter-dialog';
  dialog.setAttribute('aria-labelledby', 'tgp-letter-title');
  var toolbar = document.createElement('div');
  toolbar.className = 'tgp-letter-toolbar';
  var title = document.createElement('h2');
  title.id = 'tgp-letter-title';
  title.className = 'tgp-letter-title';
  title.textContent = 'Letter from Andrew J. Cook';
  var original = document.createElement('a');
  original.className = 'tgp-letter-original';
  original.href = source;
  original.target = '_blank';
  original.rel = 'noopener';
  original.textContent = 'Open full-size image';
  original.setAttribute('aria-label', 'Open full-size letter image in a new tab');
  var close = document.createElement('button');
  close.type = 'button';
  close.className = 'tgp-letter-close';
  close.textContent = 'Close';
  close.setAttribute('autofocus', '');
  toolbar.appendChild(title);
  toolbar.appendChild(original);
  toolbar.appendChild(close);
  dialog.appendChild(toolbar);
  var image = document.createElement('img');
  image.className = 'tgp-letter-image';
  image.alt = 'Endorsement letter from Andrew J. Cook, Billy Graham Center, Wheaton College';
  dialog.appendChild(image);
  document.body.appendChild(dialog);

  var previousOverflow;
  trigger.addEventListener('click', function () {
    if (typeof dialog.showModal !== 'function') {
      window.open(source, '_blank', 'noopener');
      return;
    }
    if (dialog.open) return;
    image.src = source;
    previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
  });
  close.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', function () {
    document.documentElement.style.overflow = previousOverflow;
    trigger.focus({ preventScroll: true });
  });
})();

// Community artwork must not intercept clicks on overlapping content.
(function () {
  document.querySelectorAll('.commband .grid > div > img[src="/assets/images/sj-community-cta--5649420112ef.png"]').forEach(function (image) {
    image.style.pointerEvents = 'none';
    image.draggable = false;
    image.parentElement.style.pointerEvents = 'none';
  });
})();
