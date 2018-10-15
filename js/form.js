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
  var avatar = adForm.querySelector('[name=avatar]');
  var imagesName = adForm.querySelector('[name=images]');
  var avatarElement = adForm.querySelector('.ad-form-header__preview img');
  var imagesContainer = adForm.querySelector('.ad-form__photo-container');
  var images = [];

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

  var PHOTO_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var CONTAINER_CLASS = 'ad-form__photo';

  var photoParams = {
    WIDTH: 70,
    HEIGHT: 70,
    ALT_TEXT: 'Фотография жилья',
    CLASS_NAME: 'popup__photo'
  };

  var initialAvatar = {
    WIDTH: 40,
    HEIGHT: 44,
    SRC: 'img/muffin-grey.svg'
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

  var deleteImage = function () {
    images.forEach(function (item) {
      imagesContainer.removeChild(item);
    });
    images = [];
  };


  var clearAll = function () {
    window.utils.deleteCheckboxes(addFeatures);
    resetAll(adSelect);
    addTitle.value = '';
    addPrice.value = '';
    addDescription.value = '';
    changeImg(avatarElement, initialAvatar);
    deleteImage();
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
    window.utils.renderMessageItem(mainItem, success);
    window.map.lockScreen();
  };

  var onFormSend = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onLoad, onError);
  };

  var changeImg = function (item, obj) {
    item.src = obj.SRC;
    item.width = obj.WIDTH;
    item.height = obj.HEIGHT;
  };

  var photosContainer = adForm.querySelector('.ad-form__photo');
  var renderPhoto = function (item, value) {
    var preview = document.createElement('div');
    preview.classList.add(CONTAINER_CLASS);
    preview.appendChild(window.utils.render(value, photoParams));
    images.push(preview);
    item.appendChild(preview);
    photosContainer.style.display = 'none';
  };

  var readFile = function (file, data) {
    var fileName = file.name.toLowerCase();
    var matches = PHOTO_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (data.nodeName === 'IMG') {
          photoParams.SRC = reader.result;
          changeImg(data, photoParams);
        } else {
          renderPhoto(data, reader.result);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var onInputFileChange = function (elementNode) {
    return function (evt) {
      if (evt.target.multiple) {
        var files = evt.target.files;
        for (var i = 0; i < files.length; i++) {
          readFile(files[i], elementNode);
        }
      } else {
        var file = evt.target.files[0];
        readFile(file, elementNode);
      }
    };
  };
  avatar.addEventListener('change', onInputFileChange(avatarElement));
  imagesName.addEventListener('change', onInputFileChange(imagesContainer));
  adForm.addEventListener('submit', onFormSend);
  window.syncronizeFields = syncronizeFields;
})();
