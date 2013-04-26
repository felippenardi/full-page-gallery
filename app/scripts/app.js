'use strict';

var app = angular.module('herokuApp', [])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl',
        reloadOnSearch: false

      })
      .when('/projetos', {
        templateUrl: 'partials/projetos',
        controller: 'ProjetosCtrl',
        reloadOnSearch: false
      })
      .when('/perfil', {
        templateUrl: 'partials/perfil',
        controller: 'ProjetosCtrl',
        reloadOnSearch: false
      })
      .when('/contato', {
        templateUrl: 'partials/contato',
        controller: 'ProjetosCtrl',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
