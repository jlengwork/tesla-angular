(function () {
  angular.module('teslaAngular').controller('listing.ctrl', ctrlFn);

  ctrlFn.$inject = ['$firebaseArray', '$log', 'Notification'];
  function ctrlFn($firebaseArray, $log, Notification) {
    var vm = this;
    var ref = new Firebase('https://blistering-inferno-7880.firebaseIO.com/listitems');
    vm.listitems = $firebaseArray(ref);

    var loadedPrms = vm.listitems.$loaded();
    loadedPrms.then(function(){
      vm.listitems.$watch(function(){
          Notification.primary("New Request Submitted!");
      });
    });
  } // end ctrlFn
})();

