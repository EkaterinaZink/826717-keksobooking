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
    var pinHeight = mapPin.offsetHeight;
    pin.style.left = item.location.x - pinWidth / 2 + 'px';
    pin.style.top = item.location.y - pinHeight + 'px';
    imgPin.src = item.author.avatar;
    imgPin.alt = item.offer.title;
    pin.addEventListener('click', onClick(pin, item));
    pin.addEventListener('keydown', onPinPress(pin, item));
    pins.push(pin);
    return (pin);
  };

  var renderMapPins = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderPin(item));
    });
    mapPins.appendChild(fragment);
  };

  var deleteMapPins = function () {
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
    window.card.render(item, pinCurrent);
    pinCurrent.classList.add(activePin);
    pinActive = pinCurrent;
  };

  var onClick = function (data, item) {
    return function () {
      activatePin(data, item);
    };
  };

  var onPinPress = function (data, item) {
    return function (evt) {
      window.utils.isEvtEnter(evt, activatePin, data, item);
    };
  };

  var updateMapPins = function (arr) {
    var cards = window.filters.filterArray(arr);
    deleteMapPins();
    window.card.close();
    window.pins.render(cards);
  };

  window.pins = {
    delete: deleteMapPins,
    update: updateMapPins,
    render: renderMapPins
  };
})();

