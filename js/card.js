'use strict';
(function () {
  var housesTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var popup;
  var cardClose;
  var cardElement = document.querySelector('#card');
  var mapItem = document.querySelector('.map');
  var myPin = cardElement.cloneNode(true);
  document.querySelector('.map__pin').appendChild(myPin);

  var renderCard = function (data) {
    var cardTemplate = cardElement.cloneNode(true).content;
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
  window.card = {
    renderCard: renderCard,
    onCardCloseClick: onCardCloseClick
  };
})();
