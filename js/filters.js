'use strict';

(function () {
  var NUMBER_CARD = 5;

  var priceElement = {
    'low': {
      MIN: 0,
      MAX: 9999
    },
    'middle': {
      MIN: 10000,
      MAX: 49999
    },
    'high': {
      MIN: 50000,
      MAX: 1000000
    }
  };
  var filtersElement = document.querySelector('.map__filters');
  var typeFilter = filtersElement.querySelector('[name=housing-type]');
  var priceFilter = filtersElement.querySelector('[name=housing-price]');
  var roomsFilter = filtersElement.querySelector('[name=housing-rooms]');
  var guestsFilter = filtersElement.querySelector('[name=housing-guests]');
  var featuresFilter = filtersElement.querySelectorAll('.map__checkbox');
  var filtersSelects = filtersElement.querySelectorAll('select');

  var startFilter = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var getCheckedElements = function (arr) {
    var result = [];
    arr.forEach(function (item) {
      if (item.checked) {
        result.push(item.value);
      }
    });
    return result;
  };

  var filterChange = {
    type: typeFilter.value,
    price: priceFilter.value,
    rooms: roomsFilter.value,
    guests: guestsFilter.value,
    features: getCheckedElements(featuresFilter)
  };

  var getPropertyFilter = function (name) {
    var arr = name.split('-');
    return arr[arr.length - 1];
  };


  var updateFilter = function (data) {
    if (data.classList.contains('map__filter')) {
      var filterProperty = getPropertyFilter(data.name);
      filterChange[filterProperty] = data.value;
    } else {
      filterChange.features = getCheckedElements(featuresFilter);
    }
  };

  var onFormChange = function (arr) {
    return function (data) {
      updateFilter(data.target);
      window.pins.updatePins(arr);
    };
  };

  var enableFilters = function (arr) {
    filtersElement.addEventListener('change', window.debounce(onFormChange(arr)));
  };

  var filterByParam = function (param, value) {
    return param === value;
  };

  var filterByPrice = function (price, value) {
    return price >= priceElement[value].MIN && price <= priceElement[value].MAX;
  };

  var filterByFeatures = function (features, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (!features.includes(arr[i])) {
        return false;
      }
    }
    return true;
  };

  var checkFilter = function (param, fun, value) {
    return filterChange[param] === startFilter[param] ? true : fun(value, filterChange[param]);
  };

  var filteredCard = function (card) {
    return checkFilter('type', filterByParam, card.offer.type)
      && checkFilter('price', filterByPrice, card.offer.price)
      && checkFilter('rooms', filterByParam, card.offer.rooms.toString())
      && checkFilter('guests', filterByParam, card.offer.guests.toString())
      && checkFilter('features', filterByFeatures, card.offer.features);
  };

  var filterArray = function (arr) {
    arr = arr.filter(filteredCard);
    if (arr.length > NUMBER_CARD) {
      window.utils.shuffleArray(arr);
      arr.splice(NUMBER_CARD, arr.length - NUMBER_CARD);
    }
    return arr;
  };

  var reset = function (arr) {
    arr.forEach(function (element) {
      element.value = startFilter[getPropertyFilter(element.name)];
    });
  };

  var resetFilters = function () {
    reset(filtersSelects);
    window.utils.deleteCheckboxes(featuresFilter);
  };

  window.filters = {
    enableFilters: enableFilters,
    resetFilters: resetFilters,
    filterArray: filterArray
  };

})();
