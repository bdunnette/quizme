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
      getCollections: function () {
        var collections = q.defer();
        http.get(rootScope.omeka.apiUrl + 'collections').then(function (data) {
          collections.resolve(data);
        }, function (err) {
          collections.reject(err);
        });
        return collections.promise;
      },
      getCollection: function (collectionId) {
        var collection = q.defer();
        http.get(rootScope.omeka.apiUrl + 'collections/' + collectionId).then(function (data) {
          collection.resolve(data);
        }, function (err) {
          collection.reject(err);
        });
        return collection.promise;
      },
      getCollectionItems: function (collectionId) {
        var items = q.defer();
        http.get(rootScope.omeka.apiUrl + 'items?collection=' + collectionId).then(function (data) {
          items.resolve(data);
        }, function (err) {
          items.reject(err);
        });
        return items.promise;
      },
      getItem: function (itemId) {
        var items = q.defer();
        http.get(rootScope.omeka.apiUrl + 'items/' + itemId).then(function (data) {
          items.resolve(data);
        }, function (err) {
          items.reject(err);
        });
        return items.promise;
      },
      getItemFiles: function (itemId) {
        var files = q.defer();
        http.get(rootScope.omeka.apiUrl + 'files?item=' + itemId).then(function (data) {
          files.resolve(data);
        }, function (err) {
          files.reject(err);
        });
        return files.promise;
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
