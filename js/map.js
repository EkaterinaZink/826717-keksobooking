'use strict';

var random = Math.random();
var numberGuests = array (1,2,3,4,...10);
var numberRooms = array (1,2,3,4,5);
var randomPrice = Math.round(random * 999001 + 1000);
var itemTitle = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var itemType = ["palace", "flat", "house", "bungalo"];
var timeCheck = ["12:00", "13:00", "14:00"];
var typeFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var randomGuests = numberGuests[Math.round(Math.random()*numberGuests.length)];
var randomRooms = numberRooms[Math.round(Math.random()*numberRooms.length)];
var randomTitle = itemTitle[Math.random(random*itemTitle.length)];
var randomType = itemType[Math.round(random*itemType.length)];
var randomTime = timeCheck[Math.random(random*timeCheck.length)];
var randomFeature = typeFeatures[Math.round(random*typeFeatures.length)];
var randomPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var offerInformation = [];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    randomIndex = Math.round(random*currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

randomPhotos = shuffle(randomPhotos);

function getAvatar (){
  return "0" + Math.round(random * 8 + 1);
};

function getBooking (array) {

  var xLocation = document.querySelector('map_pins').offsetWidth;
  var yLocation = Math.round(random * 501 + 130);

  {
  author = {
    avatar: "img/avatars/user.(" + getAvatar() + ").png", //где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },

  offer = {
    title: randomTitle,
    address: [xLocation, yLocation],
    price: randomPrice,
    type:  randomType,
    rooms: randomRooms,
    guests: randomGuests,
    checkin: randomTime,
    checkout: randomTime,
    features : randomFeature,
    description : '',
    photos : randomPhotos
  },

  location = {
    x : xLocation, //координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    y : yLocation
  };
  }

  return array;
};

for (var i=0; i<8; i++){
  offerInformation.push (array);

}
