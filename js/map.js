'use strict';

var numberGuests = Math.floor(Math.random() * 100);
var numberRooms = Math.floor(Math.random() * 5) + 1;
var priceRandom = Math.floor(Math.random() * 999001) + 1000;
var yLocation = Math.floor(Math.random() * 501) + 130;
var userAvatar = Math.floor(Math.random() * 8) + 1;

var offerInformation = [
{
  author = {
    avatar: "user(userAvatar).png", //где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },

  offer = {
    title: ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"],
    address: "location.x, location.y",
    price: priceRandom,
    type: "palace, flat, house, bungalo",
    rooms: numberRooms,
    guests: numberGuests,
    checkin: "12:00, 13:00, 14:00",
    checkout: "12:00, 13:00, 14:00",
    features : ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
    description : '',
    photos : ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  },

  location = {
    x : случайное число, //координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    y : yLocation
  }
}
];
