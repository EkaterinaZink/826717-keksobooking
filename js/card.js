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
  var mapItem = document.querySelector('.map');
  var activePin = 'map__pin--active';

  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderCard = function (data) {
    var cardTemplate = cardTemplateElement.cloneNode(true);
    var avatarPopup = cardTemplate.querySelector('.popup__avatar');
    cardClose = cardTemplate.querySelector('.popup__close');
    var titlePopup = cardTemplate.querySelector('.popup__title');
    var addressPopup = cardTemplate.querySelector('.popup__text--address');
    var pricePopup = cardTemplate.querySelector('.popup__text--price');
    var typePopup = cardTemplate.querySelector('.popup__type');
    var capacityPopup = cardTemplate.querySelector('.popup__text--capacity');
    var timePopup = cardTemplate.querySelector('.popup__text--time');
    var featuresPopup = cardTemplate.querySelector('.popup__features');
    var descriptionPopup = cardTemplate.querySelector('.popup__description');
    var photosPopup = cardTemplate.querySelector('.popup__photos img');
    avatarPopup.src = data.author.avatar;
    titlePopup.textContent = data.offer.title;
    addressPopup.textContent = data.offer.address;
    pricePopup.textContent = data.offer.price + '₽/ночь';
    typePopup.textContent = housesTypes[data.offer.type];
    capacityPopup.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    timePopup.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    descriptionPopup.textContent = data.offer.description;
    data.offer.photos.forEach(function (item) {
      var photo = photosPopup.cloneNode(true);
      photo.src = item;
      cardTemplate.querySelector('.popup__photos').appendChild(photo);
    });
    cardTemplate.querySelector('.popup__photos img:nth-child(1)').remove();
    var features = featuresPopup.cloneNode(true);
    featuresPopup.innerHTML = '';
    data.offer.features.forEach(function (item) {
      var featuresItem = features.querySelector('.popup__feature--' + item).cloneNode(true);
      featuresPopup.appendChild(featuresItem);
    });
    popup = cardTemplate;
    cardClose.addEventListener('click', onCardCloseClick(data));
    cardClose.addEventListener('keydown', onPressEnter(data));
    document.addEventListener('keydown', onPressEsc(data));
    return cardTemplate;
  };

  var renderCardElement = function (card, data) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(card, data));
    mapItem.insertBefore(fragment, mapFiltersContainer);
  };

  var renderPopup = function (card, data) {
    closeCard(data);
    renderCardElement(card, data);
    data.classList.add(activePin);
  };

  var closeCard = function (data) {
    if (popup) {
      mapItem.removeChild(popup);
      popup = null;
      cardClose = null;
      document.removeEventListener('keydown', onPressEsc);
    }
    if (data) {
      data.classList.remove(activePin);
    }
  };

  var onCardCloseClick = function (data) {
    return function () {
      closeCard(data);
    };
  };

  var onPressEsc = function (data) {
    return function (evt) {
      window.utils.isEvtEsc(evt, closeCard, data);
    };
  };

  var onPressEnter = function (data) {
    return function (evt) {
      window.utils.isEvtEnter(evt, closeCard, data);
    };
  };

  window.card = {
    renderPopup: renderPopup,
    closeCard: closeCard
  };
})();
