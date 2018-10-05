'use strict';

var itemTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var itemType = ['palace', 'flat', 'house', 'bungalo'];
var timeCheck = ['12:00', '13:00', '14:00'];
var typeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var pinWidth = document.querySelector('.map__pins').offsetWidth / 2;
// var pinHeight = document.querySelector('.map__pins').offsetHeight;
var containerWidth = document.querySelector('.map__pins').offsetWidth;
var housesTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var avatars = [];
var offerInformation = [];
var fieldsLock = document.querySelectorAll('.ad-form__element');
var pinSize = document.querySelector('.map__pin--main').getBoundingClientRect();
var pinAdress = document.querySelector('#address');
var mapItem = document.querySelector('.map');
var popup;
var cardClose;
var addRooms = document.querySelector('#room_number');
var addCapacity = document.querySelector('#capacity');
var addType = document.querySelector('#type');
var addPrice = document.querySelector('#price');
var addCheckIn = document.querySelector('#timein');
var addCheckOut = document.querySelector('#timeout');

var countRoomsGuests = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
var homeType = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};
// отключение полей
fieldsLock.forEach(function (field) {
  field.setAttribute('disabled', 'disabled');
  return false;
});

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItem = function () {
  var randomPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var newPhotosArray = [];
  for (var i = 0; i < 3; i++) {
    newPhotosArray.push(randomPhotos.splice(getRandomInt(0, randomPhotos.length - 1), 1)[0]);
  }
  return newPhotosArray;
};

var generateAvatars = function () {
  for (var i = 1; i <= 8; i++) {
    avatars.push('img/avatars/user0' + i + '.png');
  }
};

var myPin = document.querySelector('#card').cloneNode(true);
document.querySelector('.map__pin').appendChild(myPin);

var getBooking = function () {
  var randomPrice = getRandomInt(1000, 1000000);
  var randomGuests = getRandomInt(1, 10);
  var randomRooms = getRandomInt(1, 5);
  var randomTitle = itemTitle[getRandomInt(0, itemTitle.length)];
  var randomType = itemType[getRandomInt(0, 2)];
  var randomCheckin = timeCheck[getRandomInt(0, 2)];
  var randomCheckout = timeCheck[getRandomInt(0, 2)];
  var randomFeature = typeFeatures.slice(0, getRandomInt(1, typeFeatures.length - 1));
  var xLocation = getRandomInt(0, containerWidth);
  var yLocation = getRandomInt(130, 630);
  var locationAddress = xLocation + ', ' + yLocation;

  return {
    author: {
      avatar: avatars.splice(getRandomInt(0, avatars.length - 1), 1)[0],
    },
    offer: {
      title: randomTitle,
      address: locationAddress,
      price: randomPrice,
      type: randomType,
      rooms: randomRooms,
      guests: randomGuests,
      checkin: randomCheckin,
      checkout: randomCheckout,
      features: randomFeature,
      description: '',
      photos: getRandomItem()
    },
    location: {
      x: xLocation, // координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      y: yLocation
    }
  };
};

var generateMockData = function () {
  generateAvatars();
  for (var i = 0; i < 8; i++) {
    offerInformation.push(getBooking());
  }
};
generateMockData();

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin');
  offerInformation.forEach(function (item) {
    var pin = pinTemplate.cloneNode(true).content;
    pin.querySelector('.map__pin').style.left = item.location.x + 'px';
    pin.querySelector('.map__pin').style.top = item.location.y + 'px';
    pin.querySelector('img').src = item.author.avatar;
    pin.querySelector('img').alt = item.offer.title;
    pin.addEventListener('click', function () {
      renderCard(item);
    });
    pin.querySelector('.map__pin').addEventListener('click', function () {
      renderCard(item);
    });
    fragment.appendChild(pin);
  });
  document.querySelector('.map__pins').appendChild(fragment);
};

var renderCard = function (data) {
  var cardTemplate = document.querySelector('#card').cloneNode(true).content;
  cardClose = cardTemplate.querySelector('.popup__close');
  cardTemplate.querySelector('.popup__title').textContent = data.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = data.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  cardTemplate.querySelector('.popup__type').textContent = housesTypes[data.offer.type];
  cardTemplate.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  cardTemplate.querySelector('.popup__description').textContent = data.offer.description;

  var getPhoto = cardTemplate.querySelector('.popup__photos img');
  data.offer.photos.forEach(function (item) {
    var photo = getPhoto.cloneNode(true);
    photo.src = item;
    cardTemplate.querySelector('.popup__photos').appendChild(photo);
  });
  cardTemplate.querySelector('.popup__photos img:nth-child(1)').remove();
  cardTemplate.querySelector('.popup__avatar').src = data.author.avatar;
  var features = cardTemplate.querySelector('.popup__features').cloneNode(true);
  var featuresElement = cardTemplate.querySelector('.popup__features');
  featuresElement.innerHTML = '';
  data.offer.features.forEach(function (item) {
    var featuresItem = features.querySelector('.popup__feature--' + item).cloneNode(true);
    featuresElement.appendChild(featuresItem);
  });

  popup = cardTemplate;
  mapItem.insertBefore(cardTemplate, document.querySelector('.map__filters-container'));
  cardClose.addEventListener('click', onCardCloseClick(data));
  return cardTemplate;
};

// удаление объявления из DOMа
var closeCard = function (data) {
  if (popup) {
    document.querySelector('.popup').remove();
  }
  if (data) {
    data.classList.remove('map__pin--active');
  }
};

// при нажатии клика на закрытие
var onCardCloseClick = function (data) {
  return function () {
    closeCard(data);
  };
};

// при нажатии на пин
document.querySelector('.map__pin--main').addEventListener('mouseup', function () {
  unlockScreen();
  renderPins();
  pinAdress.value = Math.round(pinSize.left) + ', ' + Math.round(pinSize.top);
});

// установка соответствия количества гостей количеству комнат
var getRooms = function () {
  var rooms = addRooms.value;
  var capacity = addCapacity.value;
  var message = (countRoomsGuests[rooms].indexOf(capacity) === -1) ? 'Количество гостей не соответствует количеству комнат' : '';
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

// снять неактивное состояние
var unlockScreen = function () {
  document.querySelector('.map--faded').classList.remove('map--faded');
  document.querySelector('.ad-form--disabled').classList.remove('ad-form--disabled');
  fieldsLock.forEach(function (field) {
    field.disabled = false;
  });
  addType.addEventListener('change', changeType);
  addCheckIn.addEventListener('change', changeCheckIn);
  addCheckOut.addEventListener('change', changeCheckOut);
  addRooms.addEventListener('change', getRooms);
  addCapacity.addEventListener('change', getRooms);
};
