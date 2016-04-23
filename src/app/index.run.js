(function() {
  'use strict';

  angular
    .module('teslaAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, formlyConfig, formlyValidationMessages) {
    var ngModelAttrs = {};

    /*
     timepicker
     */

    ngModelAttrs = {};

    // Set up validate on form submissions
    formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
    formlyValidationMessages.addStringMessage('required', 'This field is required');

    // attributes
    angular.forEach([
      'meridians',
      'readonly-input',
      'mousewheel',
      'arrowkeys'
    ], function(attr) {
      ngModelAttrs[camelize(attr)] = {attribute: attr};
    });

    // bindings
    angular.forEach([
      'hour-step',
      'minute-step',
      'show-meridian'
    ], function(binding) {
      ngModelAttrs[camelize(binding)] = {bound: binding};
    });

    formlyConfig.setType({
      name: 'timepicker',
      template: '<timepicker ng-model="model[options.key]" show-spinners="false"></timepicker>',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: ngModelAttrs,
        templateOptions: {
          datepickerOptions: {}
        }
      }
    });

    formlyConfig.setType({
      name: 'datepicker',
      templateUrl:  'app/directives/datepicker.html',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: ngModelAttrs,
        templateOptions: {
          datepickerOptions: {
            format: 'MMMM dd, yyyy',
            initDate: new Date()
          }
        }
      },
      controller: ['$scope', function ($scope) {
        $scope.datepicker = {};
        $scope.datepicker.opened = false;
        $scope.datepicker.open = function ($event) {
          $scope.datepicker.opened = !$scope.datepicker.opened;
        };
      }]
    });

    $log.debug('runBlock end');
  }

  function camelize(string) {
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.replace(/^([A-Z])/, function(match, chr) {
      return chr ? chr.toLowerCase() : '';
    });
  }

})();
