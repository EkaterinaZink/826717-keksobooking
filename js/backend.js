'use strict';

(function () {

  var url = {
    load: 'https://js.dump.academy/keksobooking/data',
    save: 'https://js.dump.academy/keksobooking'
  };
  var succesStatus = 200;
  // функция запроса
  var getServerRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === succesStatus) {
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
    xhr.timeout = 10000;
    return xhr;
  };

  // загрузка данных с сервера
  var load = function (onLoad, onError) {
    var request = getServerRequest(onLoad, onError);
    request.open('GET', url.load);
    request.send();
  };

  // отправка данных на сервер
  var save = function (data, onLoad, onError) {
    var request = getServerRequest(onLoad, onError);
    request.open('POST', url.save);
    request.send(data);
  };
  window.backebd = {
    load: load,
    save: save
  };
})();
