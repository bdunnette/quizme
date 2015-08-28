'use strict';

/**
 * @ngdoc service
 * @name deckhandAngularApp.omeka
 * @description
 * # omeka
 * Service in the deckhandAngularApp.
 */
angular.module('deckhandAngularApp')
  .service('Omeka', ['$http', '$q', function(http, q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getCollections: function() {
        var collections = q.defer();
        http.get('http://archive.pathology.umn.edu/api/collections').then(function(data) {
          collections.resolve(data);
        }, function(err) {
          collections.reject(err);
        });
        return collections.promise;
      },
      getCollection: function(collectionId) {
        var collection = q.defer();
        http.get('http://archive.pathology.umn.edu/api/collections/' + collectionId).then(function(data) {
          collection.resolve(data);
        }, function(err) {
          collection.reject(err);
        });
        return collection.promise;
      },
      getCollectionItems: function(collectionId) {
        var items = q.defer();
        http.get('http://archive.pathology.umn.edu/api/items?collection=' + collectionId).then(function(data) {
          items.resolve(data);
        }, function(err) {
          items.reject(err);
        });
        return items.promise;
      }
    };
  }])
  // localstorage service, from http://learn.ionicframework.com/formulas/localstorage/
  .factory('$localstorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }]);
