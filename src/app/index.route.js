(function() {
  'use strict';

  angular
    .module('teslaAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/entry');

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


    $urlRouterProvider.when('/entry', '/entry/entry-form');
    $stateProvider.state('entry',{
      url: '/entry',
      templateUrl: 'app/views/entry/entry.tpl.html'
    });

    $stateProvider.state('entry.form',{
      url: '/entry-form',
      templateUrl: 'app/views/entry/entry.form.tpl.html'
    });

    $stateProvider.state('entry.form.esMX',{
      url: '/entry-form',
      templateUrl: 'app/views/entry/entry.form.tpl.html'
    });


    $stateProvider.state('entry.complete',{
      url: '/entry-complete',
      templateUrl: 'app/views/entry/entry.complete.tpl.html'
    });



    $stateProvider.state('listing',{
      url: '/listing',
      templateUrl: 'app/views/listing/listing.tpl.html'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
