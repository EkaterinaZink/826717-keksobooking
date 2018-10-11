'use strict';

(function () {

  var itemTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var itemType = ['palace', 'flat', 'house', 'bungalo'];
  var timeCheck = ['12:00', '13:00', '14:00'];
  var typeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var containerWidth = document.querySelector('.map__pins').offsetWidth;
  var avatars = [];
  var offerInformation = [];

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
        x: xLocation,
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

  window.data = {
    generateMockData: generateMockData,
    getRandomItem: getRandomItem
  };
})();


