var modulePersonal = angular.module('modulePersonal',[]);

moduleHome.controller('personalCtrl', ['$scope','$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state) {
    $scope.title = 'Personal info';
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
    $http({
      method: 'GET',
      url: '/get-details/' + $rootScope.logged
    }).success(function(data) {
      $scope.firstName = data.details.firstName;
      $scope.lastName = data.details.lastName;
      $state.go('personal');
    });
}]);
