// Borrowed from https://scotch.io/tutorials/internationalization-of-angularjs-applications

angular.module('teslaAngular') .directive('ngTranslateLanguageSelect', function (LocaleService) {
  'use strict';
  return {
    restrict: 'A',
    replace: true,
    template: ''+
    '<div class="language-select" ng-if="visible" style="margin-top:1rem">'+
    '<label class="control-label">'+
    '{{"directives.language-select.Language" | translate}}:'+
    '</label>'+

    '<select ng-model="currentLocaleDisplayName"'+
    'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
    'ng-change="changeLanguage(currentLocaleDisplayName)" class="form-control">'+
    '</select>'+
    '</div>'+
    '',
    controller: function ($scope) {
      $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
      $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
      $scope.visible = $scope.localesDisplayNames &&
        $scope.localesDisplayNames.length > 1;

      $scope.changeLanguage = function (locale) {
        LocaleService.setLocaleByDisplayName(locale);
      };
    }
  };
});
