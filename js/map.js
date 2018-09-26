'use strict';

var random = Math.floor(Math.random());
var numberGuests = random * 100;
var numberRooms = random * 5 + 1;
var priceRandom = random * 999001 + 1000;
var yLocation = random * 501 + 130;
var itemTitle = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var itemType = ["palace", "flat", "house", "bungalo"];
var timeCheckin = ["12:00", "13:00", "14:00"];
var timeCheckout = ["12:00", "13:00", "14:00"];
var typeFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var xLocation = map.offsetWidth;

function getAvatar (){
  return "0" + (random * 8 + 1);
}

var offerInformation = []

function getBooking (array) {
  author = {
    avatar: "user(getAvatar).png", //где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },

  offer = {
    title: itemTitle[random*itemTitle.length],
    address: [location.x, location.y],
    price: priceRandom,
    type:  itemType[random*itemType.length],
    rooms: numberRooms,
    guests: numberGuests,
    checkin: timeCheckin[random*timeCheckin.length],
    checkout: timeCheckout[random*timeCheckout .length],
    features : typeFeatures.slice(random*7,random*8+1),
    description : '',
    photos : ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  },

  location = {
    x : xLocation, //координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    y : yLocation
  }

  return array;
};

for (var i=0; i<10; i++){
  offerInformation.push (array);

}
