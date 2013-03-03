'use strict';

angular.module('herokuApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Testacular'
    ];
    $scope.gallery = {
        "group": {
            "name": "Felix";
            "images": ["http://placekitten.com/2000/2000"];
        },
        "group": {
            "name": "Sortudo";
            "images": ["http://placekitten.com/2001/2000"];
        },
        "group": {
            "name": "Soft Kitty";
            "images": [
                "http://placekitten.com/2001/2000",
                "http://placekitten.com/1001/1000",
                "http://placekitten.com/1001/1005",
                "http://placekitten.com/1011/1005",
                "http://placekitten.com/1150/1055",
                "http://placekitten.com/1150/1080"
            ];
        },
        "group": {
            "name": "Camisa";
            "images": ["http://skreened.com/render-product/c/u/i/cuiccqawsyevvvcgqeoo/you-ve-cat-to-be-kitten-me-right-meow-v-neck.american-apparel-unisex-v-neck-tee.athletic-grey.w760h760.jpg"];
        }
    }
  });
