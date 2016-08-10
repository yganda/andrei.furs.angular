var moduleEdit = angular.module('moduleEdit',[]);

moduleHome.controller('editCtrl', ['$scope', '$rootScope', '$http','$state',
	function($scope, $rootScope, $http, $state) {
  $scope.title = 'Edit personal info';
  $scope.updateBio = function() {
    $http({
        method: 'POST',
        url: '/api/login'
    })
    .success(function(data, status) {
      $rootScope.logged = data.uId;
      if (!data.uId) {
        $rootScope.logged = data.uId;
        $state.go('login');
      }
    });
    console.log($rootScope);
    $http({
      method: 'GET',
      url: '/get-details/' + $rootScope.logged
    }).success(function(data,details) {
      //console.log();
      //$scope.firstName = data.details.firstName;
      //$scope.lastName = data.details.lastName;
      //$state.go('personal');
    });
  }
}]);
