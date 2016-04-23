(function () {
  angular.module('teslaAngular').controller('entry.ctrl', ctrlFn);

  ctrlFn.$inject = ['$firebaseArray', '$log', 'Notification','$filter', '$rootScope','$state'];
  function ctrlFn($firebaseArray, $log, Notification,$filter, $rootScope,$state) {
    var vm = this;
    var ref = new Firebase('https://blistering-inferno-7880.firebaseIO.com/listitems');
    vm.listitems = $firebaseArray(ref);

    vm.options = {};
    vm.options.formState = {};
    formState = vm.options.formState;
    formState.$filter = $filter;
    formState.labels = {};
    updateLabels($filter,formState.labels);

    // Update labels on change
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      updateLabels($filter,formState.labels);
    });

    vm.entryFields = getFields(vm.labels);
    vm.submit = function(){
      // Make sure form is valid before saving it
      if (vm.entryForm.$valid) {
        if (vm.entry.timeRequested != null){ //remember that double equals will try to convert it
          vm.entry.dateRequested.setHours(vm.entry.timeRequested.getHours());
          vm.entry.dateRequested.setMinutes(vm.entry.timeRequested.getMinutes());
          vm.entry.timeRequested = vm.entry.dateRequested;
          vm.entry.timeSubmitted = new Date();
        }
        vm.listitems.$add(vm.entry);
        $state.transitionTo('entry.complete');
      }
    }

  } // end ctrlFn


  function updateLabels($filter, labels){
    labels.firstName = $filter('translate')('views.firstName');
    labels.lastName = $filter('translate')('views.lastName');
    labels.email = $filter('translate')('views.email');
    labels.phone = $filter('translate')('views.phone');
    labels.postalcode = $filter('translate')('views.postalcode');
    labels.requestDate = $filter('translate')('views.requestDate');
    labels.requestTime = $filter('translate')('views.requestTime');
    labels.submitTime = $filter('translate')('views.submitTime');
    labels.location = $filter('translate')('views.location');
  }

  function getFields(){
    return [
      {
       // className: "row",
        fieldGroup: [
          {
            className: "col-sm-6",
            key: 'firstname',
            type: 'input',
            templateOptions: {
              type: 'text',
              //placeholder: 'Enter your first name',
              required: true,
              //label:labels.firstName
            }, //end templateOptions
            expressionProperties:{
             'templateOptions.label':"formState.labels.firstName"
            }
          },
          {
            className: "col-sm-6",
            key: 'lastname',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Last Name',
              // placeholder: 'Enter your last name',
              required: true
            }, //end templateOptions
            expressionProperties:{
              'templateOptions.label':"formState.labels.lastName"
            }
          }
        ]
      },
      {
       // className: "row",
        fieldGroup: [
          {
            className: "col-sm-6",
            key: 'email',
            type: 'input',
            templateOptions: {
              type: 'email',
              label: 'Email address',
             // placeholder: 'Enter email',
              required: true
            }, //end templateOptions
            expressionProperties:{
              'templateOptions.label':"formState.labels.email"
            }
          },
          {
            className: "col-sm-6",
            key: 'phone',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Phone',
              //placeholder: 'Enter phone',
              required: true
            }, //end templateOptions
            expressionProperties:{
              'templateOptions.label':"formState.labels.phone"
            }
          }
        ]
      },
      {
        //className: "row",
        fieldGroup: [
          {
            className: "col-sm-6",
            key: 'postalcode',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Zip',
            //  placeholder: 'Enter Zip',
              required: true
            } , //end templateOptions
            expressionProperties:{
              'templateOptions.label':"formState.labels.postalcode"
            }
          }
        ]
      },
      //{
      //  className:"row",
      //  template:''
      //},
      {
        // className: "row",
        fieldGroup: [
          {
            className: "col-sm-6",
            key: 'location',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Location',
            //  placeholder: 'Location',
              required: true
            }, //end templateOptions
            expressionProperties:{
              'templateOptions.label':"formState.labels.location"
            }
          },
          {
            className: "col-sm-6",
            key: 'requestDate',
            type: 'datepicker',
            templateOptions: {
              type: 'text',
              label: 'Date Requested',
             // placeholder: 'Date',
              required: true,
              datepickerPopup: "dd-MMMM-yyyy"
            }, //end templateOptions
            expressionProperties:{
              'templateOptions.label':"formState.labels.requestDate"
            }
          },
          {
            className: "col-sm-6",
            key: 'requestTime',
            type: 'timepicker',
            templateOptions: {
              label: 'Time Requested',
            }, //end templateOptions
            expressionProperties:{
              'templateOptions.label':"formState.labels.requestTime"
            }
          }
        ]
      },
    ];
  }
})();

