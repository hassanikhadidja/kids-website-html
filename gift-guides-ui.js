window.renderGiftGuideCard = function (guide) {
  var card = document.createElement('article');
  card.className = 'activity-card';

  var url = window.getGiftGuideUrl(guide);
  var tagsHtml = guide.tags.map(function (tag) {
    var color = window.GIFT_GUIDE_TAG_COLORS[tag] || 'blue';
    return '<a href="toysrus-gift-guide-tag.html?tag=' + encodeURIComponent(tag) + '" class="tag ' + color + '">' + tag + '</a>';
  }).join('');

  card.innerHTML =
    '<a class="card-link" href="' + url + '">' +
      '<div class="card-img"><div class="img-placeholder"><span>' + guide.placeholder + '</span></div></div>' +
      '<h3>' + guide.title + '</h3>' +
    '</a>' +
    '<p>' + guide.description + '</p>' +
    '<div class="card-tags">' + tagsHtml + '</div>';

  return card;
};

window.renderGiftGuideCards = function (guides, container) {
  if (!container) return;
  container.innerHTML = '';
  guides.forEach(function (guide) {
    container.appendChild(window.renderGiftGuideCard(guide));
  });
};
