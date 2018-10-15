'use strict';

(function () {

  var SUCCESS_STATUS = 200;
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT_TIME = 10000;
  // функция запроса
  var getServerRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_TIME;
    return xhr;
  };

  // загрузка данных с сервера
  var load = function (onLoad, onError) {
    var request = getServerRequest(onLoad, onError);
    request.open('GET', Url.LOAD);
    request.send();
  };

  // отправка данных на сервер
  var save = function (data, onLoad, onError) {
    var request = getServerRequest(onLoad, onError);
    request.open('POST', Url.SAVE);
    request.send(data);
  };
  window.backend = {
    load: load,
    save: save
  };
})();
