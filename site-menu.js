(function () {
  function assetPrefix() {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('site-menu.js') !== -1) {
        var match = src.match(/^((?:\.\.\/)+)/);
        return match ? match[1] : '';
      }
    }
    return '';
  }

  function buildMenuHtml(p) {
    return "<!-- mobile menu -->\n<div class=\"mobile-menu\" id=\"mobileMenu\" aria-hidden=\"true\">\r\n<div class=\"mobile-menu-header\">\r\n  <form class=\"menu-search-form\" id=\"menuSearchForm\" role=\"search\">\r\n    <input class=\"menu-search-input\" id=\"menuSearchInput\" type=\"search\" name=\"q\" placeholder=\"Search for fun!\" autocomplete=\"off\" aria-label=\"Search for fun\">\r\n    <button class=\"menu-search-btn\" type=\"submit\" aria-label=\"Search\">\r\n      <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M16.5 16.5L21 21\"/></svg>\r\n    </button>\r\n  </form>\r\n  <button class=\"icon-btn menu-close\" type=\"button\" id=\"menuCloseBtn\" aria-label=\"Close menu\">\r\n    <svg class=\"nav-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M18 6L6 18M6 6l12 12\"/></svg>\r\n  </button>\r\n</div>\r\n<nav class=\"mobile-menu-body\">\r\n  <div class=\"menu-panels\" id=\"menuPanels\">\r\n\r\n    <!-- root -->\r\n    <div class=\"menu-panel is-active\" data-panel=\"root\">\r\n      <ul class=\"menu-primary\">\r\n        <li><button type=\"button\" class=\"menu-drill-root\" data-panel=\"category\">Shop By Category <span class=\"menu-chevron\" aria-hidden=\"true\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill-root\" data-panel=\"age\">Shop By Age <span class=\"menu-chevron\" aria-hidden=\"true\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill-root\" data-panel=\"brand\">Shop By Character <span class=\"menu-chevron\" aria-hidden=\"true\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill-root\" data-panel=\"play\">Play <span class=\"menu-chevron\" aria-hidden=\"true\">›</span></button></li>\r\n      </ul>\r\n      <ul class=\"menu-secondary\">\r\n        <li>\r\n          <a href=\"__P__signup-email form.html\" class=\"menu-link-blue menu-close-link\">\r\n            <span class=\"menu-item-icon icon-blue\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M3 7l9 6 9-6\"/></svg></span>\r\n            Email Signup for Deals &amp; Updates!\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"__P__done/wishlist.html\" class=\"menu-close-link\">\r\n            <span class=\"menu-item-icon icon-blue icon-fill\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.502 5.502 0 0 0 16.503 3c-1.76 0-3 .56-4.5 2.17C10.503 3.56 9.263 3 7.503 3A5.502 5.502 0 0 0 2 8.5c0 2.29 1.5 4.04 3 5.5l7 7Z\"/></svg></span>\r\n            Wishlist\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"__P__toysrus-account.html\" class=\"menu-link-grey menu-close-link\">\r\n            <span class=\"menu-item-icon icon-grey\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6\"/></svg></span>\r\n            Account\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"__P__done/find us.html\">\r\n            <span class=\"menu-item-icon\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z\"/><circle cx=\"12\" cy=\"11\" r=\"2.5\"/></svg></span>\r\n            Find a Store\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"#\">\r\n            <span class=\"menu-item-icon\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M1 6h13v9H1z\"/><path d=\"M14 9h4l3 4v2h-7V9z\"/><circle cx=\"5.5\" cy=\"17.5\" r=\"1.5\"/><circle cx=\"17.5\" cy=\"17.5\" r=\"1.5\"/></svg></span>\r\n            Track Your Order\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"__P__toysrus-faq (2).html\" class=\"menu-close-link\">\r\n            <span class=\"menu-item-icon\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.5 9.5a2.5 2.5 0 1 1 3.5 3.5c-.9.9-1.5 1.2-1.5 2\"/><circle cx=\"12\" cy=\"17\" r=\".75\" fill=\"currentColor\" stroke=\"none\"/></svg></span>\r\n            Help Center\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"#\">\r\n            <span class=\"menu-item-icon\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 5h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V5z\"/><path d=\"M7 5a3 3 0 0 1 3-3h9v16H10a3 3 0 0 1-3-3\"/></svg></span>\r\n            Catalogue grossiste\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- shop by category -->\r\n    <div class=\"menu-panel\" data-panel=\"category\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"root\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">Shop By Category</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__shop all categories page.html\" class=\"menu-plain menu-close-link\">Shop All Categories</a></li>\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"category-trending\">New &amp; Trending <span class=\"menu-chevron\">›</span></button></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Action Figures &amp; Playsets</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Arts &amp; Crafts</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Baby &amp; Toddler Toys</a></li>\r\n        <li><a href=\"__P__books page.html\" class=\"menu-plain menu-close-link\">Books</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Building Sets &amp; Blocks</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Dolls, Collectibles &amp; Stuffed Animals</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Electronics</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Games &amp; Puzzles</a></li>\r\n        <li><a href=\"__P__outdoor play.html\" class=\"menu-plain menu-close-link\">Outdoor Play</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- new & trending -->\r\n    <div class=\"menu-panel\" data-panel=\"category-trending\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"category\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">New &amp; Trending</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__new and trending.html\" class=\"menu-plain menu-close-link\">Shop All New &amp; Trending</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Action Figures &amp; Playsets</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Arts &amp; Crafts</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Baby &amp; Toddler Toys</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Building Sets &amp; Blocks</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Dolls, Collectibles &amp; Stuffed Animals</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Electronics</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Games &amp; Puzzles</a></li>\r\n        <li><a href=\"__P__outdoor play.html\" class=\"menu-plain menu-close-link\">Outdoor Play</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- shop by age -->\r\n    <div class=\"menu-panel\" data-panel=\"age\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"root\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">Shop By Age</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"age-0-2\">0-2 years <span class=\"menu-chevron\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"age-3-4\">3-4 years <span class=\"menu-chevron\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"age-5-7\">5-7 years <span class=\"menu-chevron\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"age-8-10\">8-10 years <span class=\"menu-chevron\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"age-11-12\">11-12 years <span class=\"menu-chevron\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"age-13\">13+ years <span class=\"menu-chevron\">›</span></button></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- 0-2 years -->\r\n    <div class=\"menu-panel\" data-panel=\"age-0-2\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"age\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">0-2 years</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__shop by age products page.html#age-0-2\" class=\"menu-plain menu-close-link\">Shop All 0-2 years</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Activity Centers</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Baby &amp; Toddler Toys</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Bath Toys</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Blocks, Sorting &amp; Stacking</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Development &amp; Learning</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Musical &amp; Sound Toys</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Dolls &amp; Stuffed Animals</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Rattles &amp; Teethers</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- 3-4 years -->\r\n    <div class=\"menu-panel\" data-panel=\"age-3-4\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"age\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">3-4 years</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__shop by age products page.html#age-3-4\" class=\"menu-plain menu-close-link\">Shop All 3-4 years</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Preschool Learning</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Building Sets &amp; Blocks</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Dolls &amp; Playsets</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Ride-Ons &amp; Scooters</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Pretend Play</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- 5-7 years -->\r\n    <div class=\"menu-panel\" data-panel=\"age-5-7\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"age\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">5-7 years</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__shop by age products page.html#age-5-7\" class=\"menu-plain menu-close-link\">Shop All 5-7 years</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Action Figures</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Arts &amp; Crafts</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Games &amp; Puzzles</a></li>\r\n        <li><a href=\"__P__outdoor play.html\" class=\"menu-plain menu-close-link\">Outdoor Play</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- 8-10 years -->\r\n    <div class=\"menu-panel\" data-panel=\"age-8-10\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"age\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">8-10 years</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__shop by age products page.html#age-8-10\" class=\"menu-plain menu-close-link\">Shop All 8-10 years</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">STEM &amp; Robotics</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Board Games</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Sports &amp; Outdoor</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Collectibles</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- 11-12 years -->\r\n    <div class=\"menu-panel\" data-panel=\"age-11-12\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"age\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">11-12 years</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__shop by age products page.html#age-11-12\" class=\"menu-plain menu-close-link\">Shop All 11-12 years</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Advanced Building Sets</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Electronics &amp; Gadgets</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Strategy Games</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- 13+ years -->\r\n    <div class=\"menu-panel\" data-panel=\"age-13\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"age\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">13+ years</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__shop by age products page.html#age-13\" class=\"menu-plain menu-close-link\">Shop All 13+ years</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Model Kits</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Tech &amp; Gaming</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Puzzles &amp; Brain Teasers</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- shop by character -->\r\n    <div class=\"menu-panel\" data-panel=\"brand\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"root\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">Shop By Character</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"brand-all\">Explore All Brands <span class=\"menu-chevron\">›</span></button></li>\r\n        <li><button type=\"button\" class=\"menu-drill\" data-panel=\"brand-characters\">Explore All Characters <span class=\"menu-chevron\">›</span></button></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- explore all brands -->\r\n    <div class=\"menu-panel\" data-panel=\"brand-all\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"brand\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">Explore All Brands</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__all selection page.html\" class=\"menu-plain menu-close-link\">Shop All Characters</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Made For AJ BLOKS</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">little tikes</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Bella Doll Co.</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">BrickWorks</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- explore all characters -->\r\n    <div class=\"menu-panel\" data-panel=\"brand-characters\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"brand\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">Explore All Characters</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Bluey</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">DC Heroes</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Disney Princess</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Harry Potter</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Hello Kitty</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Lilo &amp; Stitch</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Marvel Heroes</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Minecraft</a></li>\r\n        <li><a href=\"#\" class=\"menu-plain menu-close-link\">Mickey Mouse &amp; Minnie Mouse</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- play -->\r\n    <div class=\"menu-panel\" data-panel=\"play\">\r\n      <div class=\"menu-subheader\">\r\n        <button type=\"button\" class=\"menu-back\" data-panel=\"root\" aria-label=\"Back\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg></button>\r\n        <h2 class=\"menu-subtitle title\">Play</h2>\r\n      </div>\r\n      <ul class=\"menu-sublist\">\r\n        <li><a href=\"__P__tiktok like video.html\" class=\"menu-plain menu-close-link\">Toys in Action</a></li>\r\n        <li><a href=\"__P__toysrus-diy-activities.html\" class=\"menu-plain menu-close-link\">DIY Activities</a></li>\r\n        <li><a href=\"__P__toysrus-printables.html\" class=\"menu-plain menu-close-link\">Printables</a></li>\r\n        <li><a href=\"__P__toysrus-bobs-world.html\" class=\"menu-plain menu-close-link\">Bob's World</a></li>\r\n      </ul>\r\n    </div>\r\n\r\n  </div>\r\n</nav>\r\n</div>".replace(/__P__/g, p);
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
