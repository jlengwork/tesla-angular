/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('teslaAngular')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('LOCALES', {
      'locales': {
        'es_MX': 'Español',
        'en_US': 'English'
      },
      'preferredLocale': 'en_US'
    });

})();
