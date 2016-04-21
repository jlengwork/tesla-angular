(function () {
  angular.module('teslaAngular').controller('login.ctrl', ctrlFn);

  ctrlFn.$inject = ['$firebaseAuth', $log];
  function ctrlFn($firebaseAuth, $log) {
    var vm = this;
    var ref = new Firebase('https://blistering-inferno-7880.firebaseIO.com');
    vm.auth = $firebaseAuth(ref);


    vm.signIn = function () {
      vm.auth.$login('password', {
        email: vm.email,
        password: vm.password
      }).then(function (user) {
        $rootScope.alert.message = '';
      }, function (error) {
        if (error = 'INVALID_EMAIL') {
          $log.warn('email invalid or not signed up — trying to sign you up!');
          vm.signUp();
        } else if (error = 'INVALID_PASSWORD') {
          $log.error('wrong password!');
        } else {
          $log.error(error);
        }
      });
    }

    vm.signUp = function () {
      vm.auth.$createUser(vm.email, vm.password, function (error, user) {
        if (!error) {
          $rootScope.alert.message = '';
        } else {
          $rootScope.alert.class = 'danger';
          $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        }
      });
    }
  } // end ctrlFn
})();

app.controller('AlertCtrl', [
  '$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.alert = {};
  }
]);
