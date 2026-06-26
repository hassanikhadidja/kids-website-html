const fs = require('fs');
const path = require('path');

function readText(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf[0] === 0xff && buf[1] === 0xfe) return buf.toString('utf16le');
  return buf.toString('utf8');
}

const ROOT = __dirname;

const htmlSourcePath = fs.existsSync(path.join(ROOT, 'site-menu-markup.html'))
  ? path.join(ROOT, 'site-menu-markup.html')
  : path.join(ROOT, 'home-page.html');

const cssSourceCandidates = [
  '_home-git-utf8.html',
  '_home-git.html',
  'home-page.html',
];
const cssSourcePath = cssSourceCandidates
  .map((name) => path.join(ROOT, name))
  .find((filePath) => fs.existsSync(filePath)) || path.join(ROOT, 'home-page.html');

let home = readText(htmlSourcePath);
if (htmlSourcePath.endsWith('site-menu-markup.html')) {
  home = home.replace(/^\s*<!-- mobile menu -->\s*/i, '');
  home = `<!-- mobile menu -->\n${home}\n<!-- cart drawer -->`;
}

const cssHome = readText(cssSourcePath);
const cssStart = cssHome.indexOf('  .mobile-menu{');
const cssEnd = cssHome.indexOf('  /* ---------- cart drawer ---------- */');
if (cssStart === -1 || cssEnd === -1) {
  throw new Error('Could not extract mobile menu CSS from ' + cssSourcePath);
}
let menuCss = cssHome.slice(cssStart, cssEnd);
menuCss = menuCss
  .replace(/var\(--blue\)/g, 'var(--menu-blue)')
  .replace(/var\(--line\)/g, 'var(--menu-line)')
  .replace(/var\(--radius-pill\)/g, 'var(--menu-radius-pill)')
  .replace(/var\(--ink-soft\)/g, 'var(--menu-ink-soft)');
menuCss += '\n  .mobile-menu-header .icon-btn{color:#fff;}\n';

const cssOut = `:root {
  --menu-blue: #004ebc;
  --menu-line: #E4E7F2;
  --menu-radius-pill: 999px;
  --menu-ink-soft: #5B6685;
  --page-pad: 16px;
}
${menuCss}`;

const menuStart = home.indexOf('<!-- mobile menu -->');
const menuEnd = home.indexOf('<!-- cart drawer -->');
let menuHtml = home.slice(menuStart, menuEnd).trim().replace(/^  /gm, '');

menuHtml = menuHtml
  .replace(/href="signup-email form\.html"/g, 'href="__P__signup-email form.html"')
  .replace(/href="done\/wishlist\.html"/g, 'href="__P__done/wishlist.html"')
  .replace(/href="toysrus-account\.html"/g, 'href="__P__toysrus-account.html"')
  .replace(/href="done\/find us\.html"/g, 'href="__P__done/find us.html"')
  .replace(/href="toysrus-faq \(2\)\.html"/g, 'href="__P__toysrus-faq (2).html"')
  .replace(/href="shop by age products page\.html/g, 'href="__P__shop by age products page.html')
  .replace(/href="tiktok like video\.html"/g, 'href="__P__tiktok like video.html"')
  .replace(/href="toysrus-diy-activities\.html"/g, 'href="__P__toysrus-diy-activities.html"')
  .replace(/href="#categorySection"/g, 'href="__P__shop all categories page.html"')
  .replace(/href="#productCarousel"/g, 'href="__P__outdoor play.html"')
  .replace(/href="#brandSection"/g, 'href="__P__all selection page.html"')
  .replace(/href="#" class="menu-plain menu-close-link">Shop All New &amp; Trending/g, 'href="__P__new and trending.html" class="menu-plain menu-close-link">Shop All New &amp; Trending')
  .replace(/href="#" class="menu-plain menu-close-link">Books/g, 'href="__P__books page.html" class="menu-plain menu-close-link">Books');

const js = `(function () {
  function assetPrefix() {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('site-menu.js') !== -1) {
        var match = src.match(/^((?:\\.\\.\\/)+)/);
        return match ? match[1] : '';
      }
    }
    return '';
  }

  function buildMenuHtml(p) {
    return ${JSON.stringify(menuHtml)}.replace(/__P__/g, p);
  }

  function upgradeMenuButton() {
    var btn = document.getElementById('menuOpenBtn');
    if (btn) return btn;
    var link = document.querySelector('#mainNav .nav-icons a.icon-btn[aria-label="Menu"], #mainNav .nav-icons a.icon-btn[href*="home-page"]');
    if (!link) return null;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = link.className;
    button.id = 'menuOpenBtn';
    button.setAttribute('aria-label', 'Menu');
    button.innerHTML = link.innerHTML;
    link.parentNode.replaceChild(button, link);
    return button;
  }

  function injectMenu() {
    if (document.getElementById('mobileMenu')) return;
    var nav = document.getElementById('mainNav');
    if (!nav) return;
    nav.insertAdjacentHTML('afterend', buildMenuHtml(assetPrefix()));
  }

  function initSiteMenu() {
    injectMenu();
    upgradeMenuButton();

    var mobileMenu = document.getElementById('mobileMenu');
    var menuOpenBtn = document.getElementById('menuOpenBtn');
    var menuCloseBtn = document.getElementById('menuCloseBtn');
    var menuSearchForm = document.getElementById('menuSearchForm');
    var menuPanels = document.querySelectorAll('.menu-panel');
    if (!mobileMenu || !menuOpenBtn || !menuCloseBtn || !menuPanels.length) return;

    var menuPanelStack = window.menuPanelStack && Array.isArray(window.menuPanelStack) ? window.menuPanelStack : ['root'];
    window.menuPanelStack = menuPanelStack;

    function getMenuPanel(panelId) {
      return document.querySelector('.menu-panel[data-panel="' + panelId + '"]');
    }

    function applyMenuPanelClasses() {
      var activeId = menuPanelStack[menuPanelStack.length - 1];
      var activeIndex = menuPanelStack.indexOf(activeId);
      menuPanels.forEach(function (panel) {
        var id = panel.dataset.panel;
        var index = menuPanelStack.indexOf(id);
        panel.classList.remove('is-active', 'is-left', 'is-right');
        if (id === activeId) panel.classList.add('is-active');
        else if (index !== -1 && index < activeIndex) panel.classList.add('is-left');
        else panel.classList.add('is-right');
      });
    }

    window.applyMenuStack = function (stack) {
      menuPanelStack.length = 0;
      stack.forEach(function (id) { menuPanelStack.push(id); });
      applyMenuPanelClasses();
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    };

    function saveMenuState() {
      if (typeof window.savePageState === 'function') window.savePageState();
    }

    function resetMenuPanels(instant) {
      menuPanelStack.length = 0;
      menuPanelStack.push('root');
      if (instant) mobileMenu.classList.add('menu-no-transition');
      applyMenuPanelClasses();
      menuPanels.forEach(function (panel) { panel.scrollTop = 0; });
      if (instant) {
        void mobileMenu.offsetWidth;
        mobileMenu.classList.remove('menu-no-transition');
      }
    }

    function pushMenuPanel(panelId) {
      var currentId = menuPanelStack[menuPanelStack.length - 1];
      var currentPanel = getMenuPanel(currentId);
      var nextPanel = getMenuPanel(panelId);
      if (!currentPanel || !nextPanel) return;
      menuPanelStack.push(panelId);
      nextPanel.classList.remove('is-left', 'is-right');
      nextPanel.classList.add('is-right');
      void nextPanel.offsetWidth;
      currentPanel.classList.remove('is-active');
      currentPanel.classList.add('is-left');
      nextPanel.classList.remove('is-right');
      nextPanel.classList.add('is-active');
      nextPanel.scrollTop = 0;
      saveMenuState();
    }

    function popMenuPanel() {
      if (menuPanelStack.length <= 1) return;
      var currentId = menuPanelStack.pop();
      var previousId = menuPanelStack[menuPanelStack.length - 1];
      var currentPanel = getMenuPanel(currentId);
      var previousPanel = getMenuPanel(previousId);
      if (!currentPanel || !previousPanel) return;
      if (!previousPanel.classList.contains('is-left')) {
        previousPanel.classList.remove('is-active', 'is-right');
        previousPanel.classList.add('is-left');
        void previousPanel.offsetWidth;
      }
      currentPanel.classList.remove('is-active');
      currentPanel.classList.add('is-right');
      previousPanel.classList.remove('is-left');
      previousPanel.classList.add('is-active');
      previousPanel.scrollTop = 0;
      saveMenuState();
    }

    function closeSearchNav() {
      var mainNav = document.getElementById('mainNav');
      var searchInput = document.getElementById('searchInput');
      if (mainNav) mainNav.classList.remove('is-search-active');
      if (searchInput) searchInput.blur();
    }

    function closeCartNav() {
      if (typeof window.closeCart === 'function') window.closeCart();
    }

    function openMenu() {
      closeSearchNav();
      closeCartNav();
      resetMenuPanels(true);
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
      saveMenuState();
    }

    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
      resetMenuPanels(true);
      saveMenuState();
    }

    if (!menuOpenBtn.dataset.menuWired) {
      menuOpenBtn.dataset.menuWired = 'true';
      menuOpenBtn.addEventListener('click', openMenu);
    }
    if (!menuCloseBtn.dataset.menuWired) {
      menuCloseBtn.dataset.menuWired = 'true';
      menuCloseBtn.addEventListener('click', closeMenu);
    }
    if (menuSearchForm && !menuSearchForm.dataset.menuWired) {
      menuSearchForm.dataset.menuWired = 'true';
      menuSearchForm.addEventListener('submit', function (e) { e.preventDefault(); });
    }

    document.querySelectorAll('[data-panel].menu-drill-root, [data-panel].menu-drill').forEach(function (btn) {
      if (btn.dataset.menuWired) return;
      btn.dataset.menuWired = 'true';
      btn.addEventListener('click', function () { pushMenuPanel(btn.dataset.panel); });
    });
    document.querySelectorAll('.menu-back').forEach(function (btn) {
      if (btn.dataset.menuWired) return;
      btn.dataset.menuWired = 'true';
      btn.addEventListener('click', popMenuPanel);
    });
    document.querySelectorAll('.menu-close-link').forEach(function (link) {
      if (link.dataset.menuWired) return;
      link.dataset.menuWired = 'true';
      link.addEventListener('click', closeMenu);
    });

    if (!document.body.dataset.menuEscapeWired) {
      document.body.dataset.menuEscapeWired = 'true';
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (!mobileMenu.classList.contains('is-open')) return;
        if (menuPanelStack.length > 1) popMenuPanel();
        else closeMenu();
      });
    }

    applyMenuPanelClasses();
    window.SiteMenu = { open: openMenu, close: closeMenu, reset: resetMenuPanels, init: initSiteMenu };
  }

  window.SiteMenu = window.SiteMenu || { init: initSiteMenu };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteMenu);
  } else {
    initSiteMenu();
  }
})();
`;

fs.writeFileSync(path.join(ROOT, 'site-menu.css'), cssOut);
fs.writeFileSync(path.join(ROOT, 'site-menu.js'), js);
console.log('Built site-menu.css and site-menu.js');
