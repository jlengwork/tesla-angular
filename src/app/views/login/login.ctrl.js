(function () {
  angular.module('teslaAngular').controller('login.ctrl', ctrlFn);

  ctrlFn.$inject = ['$firebaseAuth', '$log', 'Notification', '$state'];
  function ctrlFn($firebaseAuth, $log, Notification, $state) {
    var vm = this;
    var ref = new Firebase('https://blistering-inferno-7880.firebaseIO.com');
    vm.auth = $firebaseAuth(ref);


    vm.signIn = function () {
      var authPrms = vm.auth.$authWithPassword({
        email: vm.email,
        password: vm.password
      })

      authPrms.then(function (user) {
        Notification.primary("Login Successful!")
        $log.info("Login Successful with "+vm.email);
        $state.transitionTo('listing');
      });
      authPrms.catch(function (error) {
        Notification.error("Username or Password are invalid");
      });
    }

    vm.signUp = function () {
      var prms = vm.auth.$createUser(vm.email, vm.password);
      prms.then(function (resp) {
        Notification.primary = 'Signed Up';
      });
      prms.error(function (resp) {
        Notification.error("The username and password combination you entered is invalid.");
      });
    };
  } // end ctrlFn
})();

