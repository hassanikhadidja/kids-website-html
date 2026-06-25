(function(){
  var PDP = 'product detail page mega bloks.html';

  function parsePrice(text){
    if(!text) return '';
    var t = text.trim();
    if(t === '$—' || t === '$-' || t === '—') return '—';
    return t.replace(/^\$/, '').trim();
  }

  function parseRating(text){
    if(!text) return {};
    var m = text.trim().match(/([\d.]+)\s*\((\d+)\)/);
    if(m) return { rating: m[1], reviews: m[2] };
    return {};
  }

  function getProductData(card){
    var titleEl = card.querySelector('.product-title');
    var priceEl = card.querySelector('.price, .product-price');
    var ratingEl = card.querySelector('.rating-num, .rating-text');
    var ratingWrap = card.querySelector('.rating-row > div, .rating');

    var title = titleEl ? titleEl.textContent.trim() : '';
    var price = priceEl ? parsePrice(priceEl.textContent) : '';
    var ratingText = '';

    if(ratingEl){
      ratingText = ratingEl.textContent;
    } else if(ratingWrap){
      ratingText = ratingWrap.textContent;
    }

    var parsed = parseRating(ratingText);
    if(!parsed.reviews && ratingText){
      var rev = ratingText.match(/\((\d+)\)/);
      if(rev) parsed.reviews = rev[1];
    }
    if(!parsed.rating){
      var starEl = card.querySelector('.rating .stars, .rating-row .stars');
      if(starEl){
        var count = (starEl.textContent.match(/★/g) || []).length;
        if(count) parsed.rating = String(count);
      }
    }
    return {
      title: title,
      price: price,
      rating: parsed.rating || '',
      reviews: parsed.reviews !== undefined ? parsed.reviews : ''
    };
  }

  function buildPdpUrl(data){
    var params = new URLSearchParams();
    if(data.title) params.set('title', data.title);
    if(data.price) params.set('price', data.price);
    if(data.rating) params.set('rating', data.rating);
    if(data.reviews !== '') params.set('reviews', data.reviews);
    var qs = params.toString();
    return qs ? PDP + '?' + qs : PDP;
  }

  function goToProduct(card){
    window.location.href = buildPdpUrl(getProductData(card));
  }

  function initCard(card){
    if(card.dataset.pdpBound === '1') return;
    card.dataset.pdpBound = '1';
    card.style.cursor = 'pointer';
    if(!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    card.addEventListener('click', function(e){
      if(e.target.closest('button, a, input, label, select, textarea')) return;
      goToProduct(card);
    });
    card.addEventListener('keydown', function(e){
      if(e.key !== 'Enter' && e.key !== ' ') return;
      if(e.target.closest('button, a, input, label, select, textarea')) return;
      e.preventDefault();
      goToProduct(card);
    });
  }

  function bindProductCards(root){
    var scope = root || document;
    scope.querySelectorAll('.product-card').forEach(initCard);
  }

  window.bindProductCards = bindProductCards;

  function boot(){
    bindProductCards();
    new MutationObserver(function(mutations){
      mutations.forEach(function(m){
        m.addedNodes.forEach(function(node){
          if(node.nodeType !== 1) return;
          if(node.classList && node.classList.contains('product-card')) initCard(node);
          if(node.querySelectorAll) node.querySelectorAll('.product-card').forEach(initCard);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.loadProductDetailFromQuery = function(){
    var params = new URLSearchParams(window.location.search);
    var title = params.get('title');
    var price = params.get('price');
    var rating = params.get('rating');
    var reviews = params.get('reviews');

    if(title){
      var titleEl = document.getElementById('productTitle') || document.querySelector('.title');
      if(titleEl) titleEl.textContent = title;
      document.title = title + ' | AJ BLOKS';
    }

    if(price){
      var priceEl = document.getElementById('productPrice') || document.querySelector('.title + .price');
      if(priceEl){
        if(price === '—'){
          priceEl.textContent = '$—';
        } else {
          var num = parseFloat(price);
          priceEl.textContent = isNaN(num) ? ('$' + price) : ('$' + num.toFixed(2));
        }
      }
    }

    var countEl = document.querySelector('.rating .count');
    if(countEl && reviews !== null && reviews !== ''){
      countEl.textContent = '(' + reviews + ')';
    }

    var starsEl = document.getElementById('stars');
    if(starsEl && rating){
      var r = Math.max(0, Math.min(5, parseFloat(rating)));
      if(!isNaN(r)){
        var pct = (r / 5) * 100;
        var filled = '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="1.5"/></svg>';
        var empty = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" stroke="#1a1a1a" stroke-width="1.5" fill="none"/></svg>';
        starsEl.innerHTML = '';
        for(var i = 0; i < 5; i++){
          starsEl.insertAdjacentHTML('beforeend', i < Math.round(r) ? filled : empty);
        }
      }
    }
  };
})();
