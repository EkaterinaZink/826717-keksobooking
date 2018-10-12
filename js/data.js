'use strict';

(function () {

  var itemTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var itemType = ['palace', 'flat', 'house', 'bungalo'];
  var timeCheck = ['12:00', '13:00', '14:00'];
  var typeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var containerWidth = document.querySelector('.map__pins').offsetWidth;
  var avatars = [];

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomPhoto = function () {
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
    return avatars;
  };
  generateAvatars();

  var getBooking = function () {
    var card = {
      avatar: avatars.splice(getRandomInt(0, avatars.length - 1), 1)[0],
      price: getRandomInt(1000, 1000000),
      guests: getRandomInt(1, 10),
      rooms: getRandomInt(1, 5),
      title: itemTitle[getRandomInt(0, itemTitle.length)],
      type: itemType[getRandomInt(0, 2)],
      checkin: timeCheck[getRandomInt(0, 2)],
      checkout: timeCheck[getRandomInt(0, 2)],
      features: typeFeatures.slice(0, getRandomInt(1, typeFeatures.length - 1)),
      description: '',
      photos: getRandomPhoto(),
      xLocation: getRandomInt(0, containerWidth),
      yLocation: getRandomInt(130, 630)
    };
    card.location = card.xLocation + ', ' + card.yLocation;
    return card;
  };

  window.getBooking = getBooking;
})();

