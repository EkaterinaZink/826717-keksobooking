'use strict';

(function () {
  var keyCodes = {
    ESC: 27,
    ENTER: 13
  };

  // число в диапазоне
  var getRandomValue = function (value, min, max) {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    return value;
  };

  var renderPhoto = function (data, params) {
    var img = document.createElement('img');
    if (params.CLASS_NAME) {
      img.classList.add(params.CLASS_NAME);
    }
    img.src = data;
    img.width = params.WIDTH;
    img.height = params.HEIGHT;
    img.alt = params.ALT_TEXT;
    return img;
  };
  var isEvtEsc = function (data, action, element) {
    if (data.keyCode === keyCodes.ESC) {
      action(element);
    }
  };
  var isEvtEnter = function (data, action, firstElement, secondElement) {
    if (data.keyCode === keyCodes.ENTER) {
      action(firstElement, secondElement);
    }
  };

  var renderMessage = function (template, messageItem) {
    var message = template.cloneNode(true);
    document.addEventListener('keydown', onEscPress(message));
    document.addEventListener('click', onClick(message));
    if (messageItem) {
      var messageError = message.querySelector('.error__message');
      var buttonError = message.querySelector('.error__button');
      messageError.textContent = message;
      buttonError.addEventListener('click', onErrorClick(message));
    }
    return message;
  };

  var renderMessageItem = function (parent, template, message) {
    parent.appendChild(renderMessage(template, message));
  };

  var deleteCheckboxes = function (arr) {
    arr.forEach(function (item) {
      if (item.checked) {
        item.checked = false;
      }
    });
  };

  var onEscPress = function (message) {
    return function (data) {
      isEvtEsc(data, closeMessage, message);
    };
  };

  var onClick = function (message) {
    return function () {
      closeMessage(message);
    };
  };

  var onErrorClick = function (message) {
    return function () {
      closeMessage(message);
    };
  };

  var closeMessage = function (message) {
    if (message) {
      var parent = message.parentNode;
      if (parent) {
        parent.removeChild(message);
      }
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onClick);
    }
  };

  var shuffleArray = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var random = getRandomValue(0, i);
      var temp = arr[i];
      arr[i] = arr[random];
      arr[random] = temp;
    }
    return arr;
  };

  window.utils = {
    shuffleArray: shuffleArray,
    getRandomValue: getRandomValue,
    renderPhoto: renderPhoto,
    isEvtEsc: isEvtEsc,
    isEvtEnter: isEvtEnter,
    renderMessageItem: renderMessageItem,
    deleteCheckboxes: deleteCheckboxes
  };
})();
