'use strict';

var fieldsLock = document.querySelectorAll('.ad-form__element');
var pinAdress = document.querySelector('#address');
var mainPin = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');

var mainPinSize = {
  width: 65,
  height: 65
};

var pinMoveLimits = {
  xMin: 0,
  yMin: 130,
  xMax: mapPins.offsetWidth - mapPin.offsetWidth,
  yMax: 630
};

// отключение полей
fieldsLock.forEach(function (field) {
  field.setAttribute('disabled', 'disabled');
  return false;
});

var getPinLocation = function () {
  var xCoord = Math.round(mainPin.offsetLeft + mainPinSize.width / 2);
  var yCoord = mainPin.offsetTop + mainPinSize.height;
  return xCoord + ', ' + yCoord;
};

// число в диапазоне
var getRadomValue = function (value, min, max) {
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
    x: getRadomValue(coordinateX, screenLimit.xMin, screenLimit.xMax),
    y: getRadomValue(coordinateY, screenLimit.yMin, screenLimit.yMax)
  };
  return coordinates;
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
  pinAdress.value = getPinLocation();
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

mainPin.addEventListener('mousedown', onMouseDown);

// разблокировка экрана
var unlockScreen = function () {
  document.querySelector('.map--faded').classList.remove('map--faded');
  document.querySelector('.ad-form--disabled').classList.remove('ad-form--disabled');
  fieldsLock.forEach(function (field) {
    field.disabled = false;
  });
  window.form.syncronizeFields();
};

// функция вызывающаяся после отпускание мышки
document.querySelector('.map__pin--main').addEventListener('mouseup', function () {
  unlockScreen();
  window.pins();
});
