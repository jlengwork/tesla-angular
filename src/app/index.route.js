(function() {
  'use strict';

  angular
    .module('teslaAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/login');

    $stateProvider.state('home', {
        url: '/yoman',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider.state('login',{
      url: '/login',
      templateUrl: 'app/views/login/login.tpl.html'
    });

    $stateProvider.state('entry',{
      url: '/entry',
      templateUrl: 'app/views/entry/entry.tpl.html'
    });

    $stateProvider.state('listing',{
      url: '/listing',
      templateUrl: 'app/views/listing/listing.tpl.html'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
