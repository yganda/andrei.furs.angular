var moduleLogout = angular.module('moduleLogout',[]);

moduleLogout.controller('logoutCtrl', ['$scope', '$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state) {
    $http({
        method: 'POST',
        url: '/api/logout'
      })
      .success(function(data, status) {
            $rootScope.logged = false;
            $state.go('login');
      });
}]);
