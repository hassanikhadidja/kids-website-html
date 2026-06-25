(function(){
  if(window.__signupDrawerInit) return;
  window.__signupDrawerInit = true;

  var SESSION_KEY = 'signupDrawerSessionStart';
  var SIGNED_UP_KEY = 'signupDrawerSignedUp';
  var SHOW_OFFSETS_MS = [2, 15, 35, 60].map(function(m){ return m * 60 * 1000; });
  var CYCLE_MS = 60 * 60 * 1000;
  var MASCOT_URL = 'https://res.cloudinary.com/dbtkfjrvd/image/upload/v1782319393/Design_sans_titre_39_pjdq8g.png';

  function injectSignupDrawer(){
    if(document.getElementById('signupDrawer') || document.getElementById('drawer')) return;

    var wrap = document.createElement('div');
    wrap.innerHTML = [
      '<div class="signup-overlay" id="signupOverlay" aria-hidden="true"></div>',
      '<div class="signup-drawer" id="signupDrawer" role="dialog" aria-modal="true" aria-label="Email signup" aria-hidden="true">',
      '  <button class="close-btn" id="signupCloseBtn" type="button" aria-label="Close">&times;</button>',
      '  <div class="drawer-hero">',
      '    <div class="giraffe-wrap">',
      '      <img src="' + MASCOT_URL + '" alt="ToyHive mascot">',
      '    </div>',
      '    <h2>Bring the fun to your inbox!</h2>',
      '  </div>',
      '  <p class="subtext">Get email updates on hot toys, play ideas &amp; more.</p>',
      '  <input type="email" class="email-input" placeholder="Email" id="signupEmailInput">',
      '  <button class="signup-btn" type="button" id="signupSubmitBtn">Sign Up</button>',
      '  <p class="fine-print">',
      '    By clicking Sign Up, you agree to receive news about hot toys, toy reviews, DIY play and other promotional materials from Toys&quot;R&quot;Us. You also consent to Toys&quot;R&quot;Us processing your personal data for these purposes and as described in the <a href="#" id="signupPrivacyLink">privacy policy</a>. You understand you can withdraw your consent at any time.',
      '  </p>',
      '</div>'
    ].join('');
    while(wrap.firstChild) document.body.appendChild(wrap.firstChild);
  }

  function getElements(){
    var overlay = document.getElementById('signupOverlay') || document.getElementById('overlay');
    var drawer = document.getElementById('signupDrawer') || document.getElementById('drawer');
    var closeBtn = document.getElementById('signupCloseBtn') || document.getElementById('closeBtn');
    var signupBtn = document.getElementById('signupSubmitBtn') || document.getElementById('signupBtn');
    var emailInput = document.getElementById('signupEmailInput') || document.getElementById('emailInput');
    var privacyLink = document.getElementById('signupPrivacyLink') || document.getElementById('privacyLink');
    return { overlay: overlay, drawer: drawer, closeBtn: closeBtn, signupBtn: signupBtn, emailInput: emailInput, privacyLink: privacyLink };
  }

  function getSessionStart(){
    var start = sessionStorage.getItem(SESSION_KEY);
    if(!start){
      start = String(Date.now());
      sessionStorage.setItem(SESSION_KEY, start);
    }
    return Number(start);
  }

  function getNextShowDelay(){
    var elapsed = Date.now() - getSessionStart();
    var cycleIndex = Math.floor(elapsed / CYCLE_MS);
    var posInCycle = elapsed % CYCLE_MS;

    for(var i = 0; i < SHOW_OFFSETS_MS.length; i++){
      if(posInCycle < SHOW_OFFSETS_MS[i]){
        return cycleIndex * CYCLE_MS + SHOW_OFFSETS_MS[i] - elapsed;
      }
    }
    return (cycleIndex + 1) * CYCLE_MS + SHOW_OFFSETS_MS[0] - elapsed;
  }

  function initSignupDrawer(){
    injectSignupDrawer();

    var els = getElements();
    if(!els.overlay || !els.drawer) return;

    function isOpen(){
      return els.drawer.classList.contains('show');
    }

    function openDrawer(){
      if(sessionStorage.getItem(SIGNED_UP_KEY)) return;
      els.overlay.classList.add('show');
      els.drawer.classList.add('show');
      els.overlay.setAttribute('aria-hidden', 'false');
      els.drawer.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer(){
      els.overlay.classList.remove('show');
      els.drawer.classList.remove('show');
      els.overlay.setAttribute('aria-hidden', 'true');
      els.drawer.setAttribute('aria-hidden', 'true');
    }

    function scheduleNextShow(){
      var delay = getNextShowDelay();
      setTimeout(function(){
        if(!sessionStorage.getItem(SIGNED_UP_KEY) && !isOpen()){
          openDrawer();
        }
        scheduleNextShow();
      }, delay);
    }

    if(els.closeBtn){
      els.closeBtn.addEventListener('click', closeDrawer);
    }
    els.overlay.addEventListener('click', closeDrawer);

    if(els.signupBtn && els.emailInput){
      els.signupBtn.addEventListener('click', function(){
        var value = els.emailInput.value.trim();
        if(!value || value.indexOf('@') === -1){
          els.emailInput.style.borderColor = '#ed1c24';
          els.emailInput.focus();
          return;
        }
        els.emailInput.style.borderColor = '#39b54a';
        els.signupBtn.textContent = 'Thanks for signing up!';
        els.signupBtn.disabled = true;
        sessionStorage.setItem(SIGNED_UP_KEY, '1');
        setTimeout(closeDrawer, 1200);
      });
    }

    if(els.privacyLink){
      els.privacyLink.addEventListener('click', function(e){
        e.preventDefault();
      });
    }

    scheduleNextShow();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initSignupDrawer);
  } else {
    initSignupDrawer();
  }
})();
