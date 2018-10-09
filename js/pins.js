'use strict';

(function () {
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    var pinTemplate = document.querySelector('#pin');
    window.data.generateMockData.forEach(function (item) {
      var pin = pinTemplate.cloneNode(true).content;
      pin.querySelector('.map__pin').style.left = item.location.x + 'px';
      pin.querySelector('.map__pin').style.top = item.location.y + 'px';
      pin.querySelector('img').src = item.author.avatar;
      pin.querySelector('img').alt = item.offer.title;
      pin.addEventListener('click', function () {
        window.card.renderCard(item);
      });
      pin.querySelector('.map__pin').addEventListener('click', function () {
        window.card.renderCard(item);
      });
      fragment.appendChild(pin);
    });
    document.querySelector('.map__pins').appendChild(fragment);
  };
  window.pins = {
    renderPins: renderPins
  };
})();
