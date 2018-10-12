'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinAdress = document.querySelector('[name=address]');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var mapPin = mapPins.querySelector('.map__pin');


  var mainPinSize = {
    width: 65,
    height: 65
  };

  var pinMoveLimits = {
    xMin: 0,
    yMin: 130 - mainPinSize.height,
    xMax: mapPins.offsetWidth - mapPin.offsetWidth,
    yMax: 630 - mainPinSize.height
  };

  var initialPinLocation = {
    x: mainPin.style.left,
    y: mainPin.style.top
  };

  var getRandomValue = function (value, min, max) {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    return value;
  };

  // координаты в пределах экрана
  var getNewCoord = function (coordinateX, coordinateY, screenLimit) {
    var coordinates = {
      x: getRandomValue(coordinateX, screenLimit.xMin, screenLimit.xMax),
      y: getRandomValue(coordinateY, screenLimit.yMin, screenLimit.yMax)
    };
    return coordinates;
  };

  var getPinLocation = function () {
    var xCoord = Math.round(mainPin.offsetLeft + mainPinSize.width / 2);
    var yCoord = mainPin.offsetTop + mainPinSize.height;
    return xCoord + ', ' + yCoord;
  };

  // при клике на мышку
  var onMouseDown = function (evt) {
    evt.stopPropagation();

    // перемещение мышки
    var onMouseMove = function (evtMove) {
      var boundary = document.querySelector('.map__pins').getBoundingClientRect();
      var move = {
        x: evtMove.clientX - boundary.x - mainPinSize.width / 2,
        y: evtMove.clientY - boundary.y - mainPinSize.height / 2
      };
      var newCoord = getNewCoord(move.x, move.y, pinMoveLimits);
      mainPin.style.left = newCoord.x + 'px';
      mainPin.style.top = newCoord.y + 'px';
      pinAdress.value = getPinLocation();
    };

    // отпускание мышки
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    if (map.classList.contains('map--faded')) {
      window.map.unlockScreen();
    }
    pinAdress.value = getPinLocation();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.syncronizeFields();
  };

  var resetPin = function () {
    mainPin.style.top = initialPinLocation.y;
    mainPin.style.left = initialPinLocation.x;
  };

  mainPin.addEventListener('mousedown', onMouseDown);

  window.mainPin = {
    getPinLocation: getPinLocation,
    resetPin: resetPin
  };
})();
