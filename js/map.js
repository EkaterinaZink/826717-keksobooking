'use strict';

var itemTitle = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var itemType = ["palace", "flat", "house", "bungalo"];
var timeCheck = ["12:00", "13:00", "14:00"];
var typeFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var pinWidth = document.getElementById(".map_pins").querySelector("width")/2;
var pinHeight = document.getElementById(".map_pins").querySelector("height");

var offerInformation = [];

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem (randomPhotos) {

  var randomPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.round(Math.random*currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  return array;
  }

  randomPhotos = shuffle(randomPhotos);
}

function getAvatar (){
  return "0" + getRandomInt(1,8);
};

function getBooking (array) {

  var randomPrice = getRandomInt(1000,1000000);
  var randomGuests = getRandomInt(1,numberGuests.length);
  var randomRooms = getRandomInt(1,5);
  var randomTitle = itemTitle[getRandomInt(0,itemTitle.length)];
  var randomType = itemType[getRandomInt(0,itemType.length)];
  var randomTime = timeCheck[getRandomInt(0,timeCheck.length)];
  var randomFeature = typeFeatures[getRandomInt(0,typeFeatures.length)];
  var xLocation = document.querySelector('map_pins').offsetWidth;
  var yLocation = getRandomInt(130,630);

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
    photos : getRandomItem
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

document.getElementsByClassName("#map map--faded").className = "map";

var myPin = document.getElementById(".map__card").cloneNode(true);
document.getElementById(".map__pin").appendChild(myPin);



for (var i=0; i<offerInformation.length; i++){
  var newPin = document.getElementById(".map_pins").createDocumentFragment();
  document.getElementById(".map_pin").style = "left:" + getBooking(location.xLocation)+pinWidth + "px; top: " + getBooking(location.yLocation) + pinHeight + "px;"
  document.getElementById(".map_pin").querySelector("src") = getBooking(author.avatar);
  document.getElementById(".map_pin").querySelector("alt") = getBooking(offer.title);
}

offerInformation[0].forEach(getBooking){
document.getElementsByClassName(".popup__title") = offer.title;
document.getElementsByClassName(".popup__text popup__text--address") = offer.address;
document.getElementsByClassName(".popup__text--price") = offer.price + "₽/ночь";
if (offer.type = "flat") document.getElementsByClassName(".popup__type") = "Квартира";
if (offer.type = "bungalo") document.getElementsByClassName(".popup__type") = "Бунгало";
if (offer.type = "house") document.getElementsByClassName(".popup__type") = "Дом";
if (offer.type = "palace") document.getElementsByClassName(".popup__type") = "Дворец";
document.getElementsByClassName(".popup__text popup__text--capacity") = offer.rooms + "комнаты для" +  offer.guests + "гостей";
document.getElementsByClassName(".popup__text popup__text--time") = "Заезд после" + offer.checkin + ", выезд до" + offer.checkout + "offer.checkout";
document.getElementsByClassName(".popup__features") = offer.features;
document.getElementsByClassName(".popup__description") = offer.description;
document.getElementsByClassName(".popup__photos").src = offer.photos;
document.getElementsByClassName(".popup__avatar").src = author.avatar;
}



