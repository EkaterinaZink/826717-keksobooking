'use strict';

(function () {
  var numberCard = 5;
  var price = {
    lowPrice: '9999',
    middlePrice: '49999',
    highPRice: '1000000'
  };
  var filtersElement = document.querySelector('.map__filters');
  var typeFilter = filtersElement.querySelector('.housing-type');
  var priceFilter = filtersElement.querySelector('.housing-price');
  var roomsFilter = filtersElement.querySelector('.housing-rooms');
  var guestsFilter = filtersElement.querySelector('.housing-guests');
  var featuresFilter = filtersElement.querySelectorAll('.map__checkbox');
  var filtersSelects = filtersElement.querySelectorAll('select');
  var DEBOUNCE_INTERVAL = 500;

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

  var enableFilers = function (arr) {
    filtersElement.addEventListener('change', window.debounce(onFormChange(arr)));
  };

  var filterByParam = function (param, value) {
    return param === value;
  };

  var filterByFeatures = funciton(features, arr) {
    for (var i = 0; i < arr.length; i++) {
    if (!features.includes(arr[i])) {
      return false;
    }
  }
  return true;

function debounce(fun) {
  var lastTimeout = null;

  return function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
}
window.filters = {
  enableFilers: enableFilers
};


}) ();
