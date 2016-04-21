(function() {
  'use strict';

  angular
    .module('teslaAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/yoman',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider.state('login',{
      url: '/',
      templateUrl: ''
    });

    $urlRouterProvider.otherwise('/');
  }

})();
