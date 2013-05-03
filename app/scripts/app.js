'use strict';

var app = angular.module('herokuApp', [])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl',
        reloadOnSearch: false

      })
      .when('/projetos', {
        templateUrl: 'partials/projetos.html',
        controller: 'ProjetosCtrl',
        reloadOnSearch: false
      })
      .when('/perfil', {
        templateUrl: 'partials/perfil.html',
        controller: 'ProjetosCtrl',
        reloadOnSearch: false
      })
      .when('/contato', {
        templateUrl: 'partials/contato.html',
        controller: 'ProjetosCtrl',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
