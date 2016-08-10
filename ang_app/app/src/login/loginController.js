var moduleLogin = angular.module('moduleLogin',[]);

moduleLogin.controller('loginCtrl', ['$scope', '$rootScope', '$http','$state',
	function($scope, $rootScope, $http, $state) {
		$scope.title = 'Log in';
		$scope.logUserIn = function() {
			$http({
				method: 'POST',
				url: '/api/login',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {'uLogin': $scope.userForm.login.$viewValue, 'uPassword': $scope.userForm.password.$viewValue}
			})
			.success(function(data, status) {
				$rootScope.user_name = data.user_name;
				$rootScope.logged = data.uId;
				if (data.success) {
					$state.go('home');
				}
			});
	}
}]);
