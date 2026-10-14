(function () {
  var t = document.querySelector('.navtoggle');
  var m = document.getElementById('menu');
  if (t && m) {
    t.addEventListener('click', function () {
      var open = m.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
    });
  }
})();
