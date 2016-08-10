var moduleHome = angular.module('moduleHome',[]);

moduleHome.controller('homeCtrl', ['$scope','$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state) {
    $scope.title = 'Home page';
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
}]);
