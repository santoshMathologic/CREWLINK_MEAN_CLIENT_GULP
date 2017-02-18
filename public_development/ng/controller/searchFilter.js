/**
 * 
 */

' use strict';

var app = angular.module('crewMeanApp')
    .filter('reverse', [function ($scope) {
        return function (userString) {
            return userString.split('').reverse().join('');
        };
    }]);

