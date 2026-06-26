window.renderDiyActivityCard = function (activity) {
  var card = document.createElement('article');
  card.className = 'activity-card';

  var url = window.getDiyActivityUrl(activity);
  var tagsHtml = activity.tags.map(function (tag) {
    var color = window.DIY_TAG_COLORS[tag] || 'blue';
    return '<a href="toysrus-diy-tag.html?tag=' + encodeURIComponent(tag) + '" class="tag ' + color + '">' + tag + '</a>';
  }).join('');

  card.innerHTML =
    '<a class="card-link" href="' + url + '">' +
      '<div class="card-img"><div class="img-placeholder"><span>' + activity.placeholder + '</span></div></div>' +
      '<h3>' + activity.title + '</h3>' +
    '</a>' +
    '<p>' + activity.description + '</p>' +
    '<div class="card-tags">' + tagsHtml + '</div>';

  return card;
};

window.renderDiyActivityCards = function (activities, container) {
  if (!container) return;
  container.innerHTML = '';
  activities.forEach(function (activity) {
    container.appendChild(window.renderDiyActivityCard(activity));
  });
};
