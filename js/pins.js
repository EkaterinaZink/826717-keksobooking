'use strict';

(function () {
  var pins = [];
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    var pinTemplate = document.querySelector('#pin');

    window.pins.pins.forEach(function (item) {
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
 /* var renderPin = function (data) {
    var item = document.createDocumentFragment();
    data.forEach(function (element) {
      item.appendChild(renderPins(element));
    });
    document.querySelector('map__pins').appendChild(item);
  };*/

  var deletePins = function () {
    pins.forEach(function (item) {
      document.querySelector('.map__pins').removeChild(item);
    });
    pins = [];
  };

  var updatePins = function (arr) {
    var cards = window.filters.filterArray(arr);
    deletePins();
    window.card.closePopup();
    window.pins.renderPins(cards);
  };

  window.pins = {
    renderPins: renderPins,
    deletePins: deletePins,
    updatePins: updatePins,
    pins: pins
  };
})();
