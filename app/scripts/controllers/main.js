'use strict';

angular.module('herokuApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Testacular'
    ];
    $scope.awesomeCats = {
        "gato": {
            "name": "Felix";
            "images": ["url1", "url2", "url3"];
        }
    }
  });
