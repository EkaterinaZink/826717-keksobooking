'use strict';

(function () {
  var adFields = document.querySelectorAll('.ad-form-header, .ad-form__element');
  var pinAdress = document.querySelector('[name=address]');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapFilter = document.querySelectorAll('.map__filter, .map__features');
  var mainItem = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var showPins = false;

  var lockFields = function (arr, data, classType) {
    arr.forEach(function (field) {
      field.setAttribute('disabled', '');
    });
    data.classList.add(classType);
  };

  var unlockFields = function (arr, data, classType) {
    arr.forEach(function (field) {
      field.removeAttribute('disabled', '');
    });
    data.classList.remove(classType);
  };

  var onError = function (errorMessage) {
    window.form.renderMessage(mainItem, errorTemplate, errorMessage);
  };

  var onLoad = function (data) {
    window.pins.updatePins(data);
    window.filters.enable(data);
    showPins = true;
  };

  var getPins = function () {
    window.backend.load(onLoad, onError);
  };

  var unlockScreen = function () {
    getPins();
    unlockFields(mapFilter, map, 'map--faded');
    unlockFields(adFields, adForm, 'ad-form--disabled');
  };

  var lockScreen = function () {
    lockFields(adFields, map, 'map--faded');
    lockFields(mapFilter, adForm, 'ad-form--disabled');
    if (showPins) {
      showPins = false;
      window.pins.deletePins();
      window.card.closeCard();
    }
    window.filters.reset();
    window.mainPin.resetPin();
    pinAdress.value = window.mainPin.getPinLocation();
  };
  lockScreen();

  window.map = {
    lockScreen: lockScreen,
    unlockScreen: unlockScreen,
  };
})();
