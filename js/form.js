'use strict';

(function () {
  var homeType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };
  var countRoomsGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var addRooms = document.querySelector('#room_number');
  var addCapacity = document.querySelector('#capacity');
  var addType = document.querySelector('#type');
  var addPrice = document.querySelector('#price');
  var addCheckIn = document.querySelector('#timein');
  var addCheckOut = document.querySelector('#timeout');

  // установка соответствия количества гостей количеству комнат
  var getRooms = function () {
    /*var rooms = addRooms.value;
    var capacity = addCapacity.value;
    var message = (countRoomsGuests[rooms].indexOf(capacity) === -1) ? 'Количество гостей не соответствует количеству комнат' : '';
    */var message = (addRooms.value <= addCapacity.value) ? 'Количество гостей не соответствует количеству комнат' : '';
    if (addRooms.value === '100') {
      message = (addCapacity.value !== '0') ? 'Количество гостей не соответствует количеству комнат' : '';
    }
    if ((addRooms.value === null) && (addCapacity.value === null)) {
      message = 'Количество гостей не соответствует количеству комнат';
    }
    addCapacity.setCustomValidity(message);
  };

  // изменение типа жилья в зависимости от цены
  var changeType = function () {
    var minPrice = homeType[addType.value];
    addPrice.placeholder = minPrice;
    addPrice.min = minPrice;
  };

  // изменение время заезда
  var changeCheckIn = function () {
    addCheckOut.value = addCheckIn.value;
  };

  // изменение время выезда
  var changeCheckOut = function () {
    addCheckIn.value = addCheckOut.value;
  };

  var syncronizeFields = function () {
    addType.addEventListener('change', changeType);
    addCheckIn.addEventListener('change', changeCheckIn);
    addCheckOut.addEventListener('change', changeCheckOut);
    addRooms.addEventListener('change', getRooms);
    addCapacity.addEventListener('change', getRooms);
  };
  window.syncronizeFields = syncronizeFields;
})();
