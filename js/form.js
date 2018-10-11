'use strict';

(function () {
  var homeType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var addRooms = document.querySelector('#room_number');
  var addCapacity = document.querySelector('#capacity');
  var addType = document.querySelector('#type');
  var addPrice = document.querySelector('#price');
  var addCheckIn = document.querySelector('#timein');
  var addCheckOut = document.querySelector('#timeout');

  var successTemplate = document.querySelector('#succes');
  var errorTemplate = document.querySelector('#error');
  var mainItem = document.querySelector('main');

  // установка соответствия количества гостей количеству комнат
  var getRooms = function () {
    var message = (addRooms.value <= addCapacity.value) ? 'Количество гостей не соответствует количеству комнат' : '';
    if (addRooms.value === '100') {
      message = (addCapacity.value !== '0') ? 'Количество гостей не соответствует количеству комнат' : '';
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
  var onMessageClick = function (messageItem) {
    return function () {
      closeMessage(messageItem);
    };
  };
  var onButtonErrorClick = function (messageItem) {
    return function () {
      closeMessage(messageItem);
    };
  };
  var closeMessage = function (messageItem) {
    if (messageItem) {
      var parent = messageItem.parentNode;
      if (parent) {
        parent.remouveChild(messageItem);
      }
      document.removeEventListener('click', onMessageClick);
    }
  };
  var renderMessage = function (template, message) {
    var messageItem = template.cloneNode(true);
    document.addEventListener('click', onMessageClick(messageItem));
    if (message) {
      var messageError = messageItem.querySelector('.error__message');
      var buttonError = messageItem.querySelector('.error__button');
      messageError.textContent = message;
      buttonError.addEventListener('click', onButtonErrorClick(messageItem));
    }
    return messageItem;
  };
  var renderMessageItem = function (parent, template, message) {
    parent.appendChild(renderMessage(template, message));
  };

  var onError = function (errorMessage) {
    renderMessageItem(mainItem, errorTemplate, errorMessage);
  };
  var onLoad = function () {
    renderMessageItem(mainItem, successTemplate);
  };

  var onFormSend = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(document.querySelector('.ad-form')), onLoad, onError);
  };
  document.querySelector('.ad-form').addEventListener('submit', onFormSend);
  window.form = {
    syncronizeFields: syncronizeFields,
    renderMessageItem: renderMessageItem
  };
})();
