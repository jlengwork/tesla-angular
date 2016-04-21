(function() {
  'use strict';

  angular
    .module('teslaAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
