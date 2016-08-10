var moduleForgot = angular.module('moduleForgot',[]);

moduleLogout.controller('forgotCtrl', ['$scope', '$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state) {
   $scope.title = 'Forgot password';
   $scope.getPass = function() {
     $http({
       method: 'POST',
       url: '/api/forgot-pass',
       data: {
         uLogin: $scope.forgotForm.login.$viewValue,
       }
     })
     .success(function(data, status) {
       $state.go('login');
       alert(data.uPassword);
     });
   }
}]);
