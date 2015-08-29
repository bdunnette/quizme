'use strict';

/**
 * @ngdoc service
 * @name deckhandAngularApp.omeka
 * @description
 * # omeka
 * Service in the deckhandAngularApp.
 */
angular.module('quizme')
  .service('Omeka', ['$http', '$q', '$rootScope', function (http, q, rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getData: function (omekaObject) {
        var omekaData = q.defer();
        var objectUrl = rootScope.omeka.apiUrl + 'collections';
        if (omekaObject) {
          if (omekaObject.hasOwnProperty('url')) {
            objectUrl = omekaObject.url;
          }
          else if (omekaObject.hasOwnProperty('type')) {
            switch (omekaObject.type) {
              case 'collection':
                objectUrl = rootScope.omeka.apiUrl + 'collections/' + omekaObject.id;
                break;
              case 'collectionItems':
                objectUrl = rootScope.omeka.apiUrl + 'items?collection=' + omekaObject.id;
                break;
              case 'item':
                objectUrl = rootScope.omeka.apiUrl + 'items/' + omekaObject.id;
                break;
              case 'itemFiles':
                objectUrl = rootScope.omeka.apiUrl + 'files?item=' + omekaObject.id;
                break;
              case 'collections':
              default:
                objectUrl = rootScope.omeka.apiUrl + 'collections';
            }
          }
        }
        http.get(objectUrl).then(function (data) {
          omekaData.resolve(data);
        }, function (err) {
          omekaData.reject(err);
        });
        return omekaData.promise;
      }
    };
  }])
  // localstorage service, from http://learn.ionicframework.com/formulas/localstorage/
  .factory('$localstorage', ['$window', function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }]);
