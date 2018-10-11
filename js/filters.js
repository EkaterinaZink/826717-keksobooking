'use strict';

(function () {
  var numberCard = 5;
  var priceElement = {
    'lowPrice': {
      min: 0,
      max: 9999
    },
    'middlePrice': {
      min: 10000,
      max: 49999
    },
    'highPRice': {
      min: 50000,
      max: 1000000
    }
  };
  var filtersElement = document.querySelector('.map__filters');
  var typeFilter = filtersElement.querySelector('.housing-type');
  var priceFilter = filtersElement.querySelector('.housing-price');
  var roomsFilter = filtersElement.querySelector('.housing-rooms');
  var guestsFilter = filtersElement.querySelector('.housing-guests');
  var featuresFilter = filtersElement.querySelectorAll('.map__checkbox');
  var filtersSelects = filtersElement.querySelectorAll('select');
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
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
    return function (event) {
      updateFilter(event.target);
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
    return price >= priceElement[value].min && price <= priceElement[value].max;
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
    return filterChange[param] === filterChange[param] ? true : fun(value, filterChange[param]);
  };

  var filteredCard = function (card) {
    return checkFilter('type', filterByParam, card.offer.type) && checkFilter('price', filterByPrice, card.offer.price)
      && checkFilter('rooms', filterByParam, card.offer.rooms.toString()) && checkFilter('features', filterByFeatures, card.offer.features);
  };

  var shuffleArray = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var random = window.data.getRandomItem(0, i);
      var temp = arr[i];
      arr[i] = arr[random];
      arr[random] = temp;
    }
    return arr;
  };

  var filterArray = function (arr) {
    arr = arr.filter(filteredCard);
    if (arr.length > numberCard) {
      shuffleArray(arr);
      arr.splice(numberCard, arr.length - numberCard);
    }
    return arr;
  };

  var reset = function (arr) {
    arr.forEach(function (element) {
      element.value = checkFilter[getPropertyFilter(element.name)];
    });
  };

  var clearAll = function (arr) {
    arr.forEach(function (item) {
      if (item.checked) {
        item.checked = false;
      }
    });
  };

  var resetFilters = function () {
    reset(filtersSelects);
    clearAll(featuresFilter);
  };

  window.filters = {
    enableFilters: enableFilters,
    resetFilters: resetFilters,
    filterArray: filterArray,
    debounce: debounce
  };


})();
