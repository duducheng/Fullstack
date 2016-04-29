'use strict';

angular.module('conFusion.services', ['ngResource'])

.constant("baseURL", "http://192.168.16.171:3000/")

.factory('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  return $resource(baseURL + "dishes/:id", null, {
    'update': {
      method: 'PUT'
    }
  });

}])

.factory('promotionFactory', ['$resource', 'baseURL', function($resource, baseURL) {
  return $resource(baseURL + "promotions/:id");
}])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  return $resource(baseURL + "leadership/:id");

}])

.factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  return $resource(baseURL + "feedback/:id");

}])

.factory('favoriteFactory', ['$resource', '$localStorage', 'baseURL', function($resource, $localStorage, baseURL) {
  var favFac = {};
  var favorites = $localStorage.getObject('myFavorite', '[]');

  favFac.addToFavorites = function(index) {
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i].id == index)
        return;
    }
    favorites.push({
      id: index
    });
    $localStorage.storeObject('myFavorite', favorites);
  };

  favFac.deleteFromFavorites = function(index) {
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i].id == index) {
        favorites.splice(i, 1);
      }
    }
    $localStorage.storeObject('myFavorite', favorites);
  }

  favFac.getFavorites = function() {
    return favorites;
  };

  return favFac;
}])

.factory('$localStorage', ['$window', function($window) { //$localStorage is just a normal varible
  return {
    store: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    storeObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    }
  }
}])

;
