(function(){
  if(window.__authLinksInit) return;
  window.__authLinksInit = true;

  function getSigninPath(tab){
    var path = window.location.pathname.replace(/\\/g, '/');
    var inDone = path.indexOf('/done/') !== -1;
    var base = inDone ? '../signin.html' : 'signin.html';
    return tab === 'login' ? base + '?tab=login' : base;
  }

  function bindAuthLinks(root){
    root = root || document;

    root.querySelectorAll('button[aria-label="Account"]').forEach(function(btn){
      if(btn.dataset.authBound === '1') return;
      btn.dataset.authBound = '1';
      btn.addEventListener('click', function(){
        window.location.href = getSigninPath();
      });
    });

    root.querySelectorAll('a').forEach(function(link){
      var text = (link.textContent || '').replace(/\s+/g, ' ').trim();
      var href = link.getAttribute('href');

      if(text === 'Track Your Order' && (!href || href === '#')){
        link.setAttribute('href', getSigninPath('login'));
      }

      if(text === 'Log in' && (!href || href === '#')){
        link.setAttribute('href', getSigninPath('login'));
      }
    });
  }

  function boot(){
    bindAuthLinks();
    new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
        mutation.addedNodes.forEach(function(node){
          if(node.nodeType !== 1) return;
          bindAuthLinks(node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  window.getSigninPath = getSigninPath;

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
