'use strict';

angular.module('confusionApp')

.constant("baseURL", "http://localhost:3000/")

.service('GithubFactory', ['$resource', function($resource) {
  this.getDB = function() {
    //return $resource('db.json', null, null);
    return $resource('http://duducheng.github.io/db.json', null, null);
  };
}])

.service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  this.getDishes = function() {
    return $resource(baseURL + "dishes/:id", null, {
      'update': {
        method: 'PUT'
      }
    });
  };

  // implement a function named getPromotion
  // that returns a selected promotion.
  this.getPromotions = function(index) {
    //return promotions[index];
    return $resource(baseURL + "promotions/:id", null, null);
  };


}])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  var corpfac = {};

  // Implement two functions, one named getLeaders,
  corpfac.getLeaders = function() {
    return $resource(baseURL + "leadership/:id", null, null);
  }

  return corpfac;


}])

.service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  this.getFeedback = function() {
    return $resource(baseURL + "feedback/:id", null, null);
  };


}])

;
