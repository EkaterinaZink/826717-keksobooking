'use strict';

(function () {
  var pins = [];
  var activePin = 'map__pin--active';
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var mapPin = document.querySelector('.map__pin');
  var pinActive;

  var renderPin = function (item) {
    var pin = pinTemplate.cloneNode(true);
    var imgPin = pin.querySelector('img');
    var pinWidth = mapPin.offsetWidth;
    var pinHeight = mapPin.ofssetHight;
    pin.style.left = item.location.x - pinWidth / 2 + 'px';
    pin.style.top = item.location.y - pinHeight + 'px';
    imgPin.src = item.author.avatar;
    imgPin.alt = item.offer.title;
    pin.addEventListener('click', onClick(pin, item));
    pin.addEventListener('keydown', onPinPress(pin, item));
    pins.push(pin);
    return (pin);
  };
  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderPin(item));
    });
    mapPins.appendChild(fragment);
  };

  var deletePins = function () {
    pins.forEach(function (item) {
      mapPins.removeChild(item);
    });
    pins = [];
  };

  var activatePin = function (data, item) {
    if (pinActive) {
      pinActive.classList.remove(activePin);
    }
    var pinCurrent = data.classList.contains('map__pin') ? data : data.parentElement;
    window.card.renderPopup(item, pinCurrent);
    pinCurrent.classList.add(activePin);
    pinActive = pinCurrent;
  };

  var onClick = function (data, item) {
    return function () {
      activatePin(data, item);
    };
  };

  var onPinPress = function (data, item) {
    return function (event) {
      window.utils.isEvtEnter(event, activatePin, data, item);
    };
  };

  var updatePins = function (arr) {
    var cards = window.filters.filterArray(arr);
    deletePins();
    window.card.closeCard();
    window.pins.renderPins(cards);
  };

  window.pins = {
    renderPins: renderPins,
    deletePins: deletePins,
    updatePins: updatePins
  };
})();

