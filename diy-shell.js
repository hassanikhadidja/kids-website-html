(function () {
  var PROMO_NAV_HTML =
    '<div class="promo-bar">Free Shipping for Orders Over 6500 DZD</div>' +
    '<header class="nav" id="mainNav">' +
      '<div class="nav-default">' +
        '<div class="nav-icons">' +
          '<button class="icon-btn" type="button" id="menuOpenBtn" aria-label="Menu">' +
            '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
          '</button>' +
          '<button class="icon-btn" type="button" aria-label="Account">' +
            '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>' +
          '</button>' +
        '</div>' +
        '<a class="logo" href="home-page.html" aria-label="AJ BLOKS home">' +
          '<img src="https://res.cloudinary.com/dbtkfjrvd/image/upload/v1782245376/Design_sans_titre_31_azudmo.png" alt="AJ BLOKS">' +
        '</a>' +
        '<div class="nav-icons">' +
          '<button class="icon-btn" type="button" id="searchOpenBtn" aria-label="Search">' +
            '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="M16.5 16.5L21 21"/></svg>' +
          '</button>' +
          '<a class="icon-btn" href="done/wishlist.html" aria-label="Wishlist">' +
            '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.502 5.502 0 0 0 16.503 3c-1.76 0-3 .56-4.5 2.17C10.503 3.56 9.263 3 7.503 3A5.502 5.502 0 0 0 2 8.5c0 2.29 1.5 4.04 3 5.5l7 7Z"/></svg>' +
          '</a>' +
          '<button class="icon-btn" type="button" aria-label="Cart">' +
            '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="nav-search">' +
        '<form class="search-form" id="searchForm" role="search">' +
          '<input class="search-input" id="searchInput" type="search" name="q" placeholder="Search toys, brands &amp; more" autocomplete="off" aria-label="Search">' +
        '</form>' +
        '<button class="icon-btn search-close" type="button" id="searchCloseBtn" aria-label="Close search">' +
          '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>' +
      '</div>' +
    '</header>';

  function initNavSearch() {
    var mainNav = document.getElementById('mainNav');
    var searchOpenBtn = document.getElementById('searchOpenBtn');
    var searchCloseBtn = document.getElementById('searchCloseBtn');
    var searchForm = document.getElementById('searchForm');
    var searchInput = document.getElementById('searchInput');
    if (!mainNav || !searchOpenBtn || !searchCloseBtn || !searchForm || !searchInput) return;

    function closeSearch() {
      mainNav.classList.remove('is-search-active');
      searchInput.blur();
    }

    function openSearch() {
      mainNav.classList.add('is-search-active');
      searchInput.value = '';
      requestAnimationFrame(function () { searchInput.focus(); });
    }

    searchOpenBtn.addEventListener('click', openSearch);
    searchCloseBtn.addEventListener('click', closeSearch);
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      closeSearch();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-search-active')) closeSearch();
    });
  }

  function wrapDiyContent() {
    var content = document.querySelector('.diy-content');
    if (!content || content.dataset.shellWrapped === 'true') return;

    var shell = document.createElement('div');
    shell.className = 'app-shell';
    shell.insertAdjacentHTML('afterbegin', PROMO_NAV_HTML);

    var phone = document.createElement('div');
    phone.className = 'phone';

    content.parentNode.insertBefore(shell, content);
    shell.appendChild(phone);
    phone.appendChild(content);

    content.dataset.shellWrapped = 'true';
    document.body.classList.add('diy-page');

    initNavSearch();
    if (window.SiteFooter) window.SiteFooter.mount();
    if (window.SiteMenu && window.SiteMenu.init) window.SiteMenu.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapDiyContent);
  } else {
    wrapDiyContent();
  }
})();
