'use strict';

(function () {

  var HomeType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var adSelect = adForm.querySelectorAll('select');
  var addRooms = adForm.querySelector('[name=rooms]');
  var addTitle = adForm.querySelector('[name=title]');
  var addCapacity = adForm.querySelector('[name=capacity]');
  var addType = adForm.querySelector('[name=type]');
  var addPrice = adForm.querySelector('[name=price]');
  var addCheckIn = adForm.querySelector('[name=timein]');
  var addCheckOut = adForm.querySelector('[name=timeout]');
  var addFeatures = adForm.querySelectorAll('[name=features]');
  var addDescription = adForm.querySelector('[name=description]');
  var mainItem = document.querySelector('main');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');

  var initialFilter = {
    'type': 'flat',
    'timein': '12:00',
    'timeout': '12:00',
    'rooms': '1',
    'capacity': '1'
  };

  var roomParams = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  // установка соответствия количества гостей количеству комнат
  var getRooms = function () {
    var rooms = addRooms.value;
    var capacity = addCapacity.value;
    var message = (roomParams[rooms].indexOf(capacity) === -1) ? 'Количество гостей не соответствует количеству комнат' : '';
    addCapacity.setCustomValidity(message);
  };

  // изменение типа жилья в зависимости от цены
  var changeType = function () {
    var minPrice = HomeType[addType.value];
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

  var resetAll = function (arr) {
    arr.forEach(function (item) {
      item.value = initialFilter[item.name];
    });
  };

  var clearAll = function () {
    window.utils.deleteCheckboxes(addFeatures);
    resetAll(adSelect);
    addTitle.value = '';
    addPrice.value = '';
    addDescription.value = '';
  };

  var onReset = function (evt) {
    evt.preventDefault();
    clearAll();
    window.map.lockScreen();
  };

  var syncronizeFields = function () {
    addType.addEventListener('change', changeType);
    addCheckIn.addEventListener('change', changeCheckIn);
    addCheckOut.addEventListener('change', changeCheckOut);
    addRooms.addEventListener('change', getRooms);
    addCapacity.addEventListener('change', getRooms);
    adFormReset.addEventListener('click', onReset);
  };

  var onError = function (errorMessage) {
    window.utils.renderMessageItem(mainItem, error, errorMessage);
  };

  var onLoad = function () {
    clearAll();
    window.map.unlockScreen();
    window.utils.renderMessageItem(mainItem, success);
  };

  var onFormSend = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onLoad, onError);
  };

  adForm.addEventListener('submit', onFormSend);
  window.syncronizeFields = syncronizeFields;
})();
