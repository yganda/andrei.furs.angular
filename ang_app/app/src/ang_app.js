(function () {
	'use strict';
	var app = angular.module('ang_app',[
		'ui.router',
		'moduleLogin',
		'moduleLogout',
		'moduleHome',
		'moduleForgot',
		'modulePersonal',
		'moduleEdit'
	]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");
	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl: "app/src/home/homePage.tpl.html",
			controller: 'homeCtrl'
		})
		.state('personal', {
			url: "/home/personal",
			templateUrl: "app/src/home/tabs/personalTab.tpl.html",
			controller: 'personalCtrl'
		})
		.state('edit', {
			url: "/home/edit",
			templateUrl: "app/src/home/tabs/editTab.tpl.html",
			controller: 'editCtrl'
		})
		.state('login', {
			url: "/login",
			templateUrl: "app/src/login/loginForm.tpl.html",
			controller: 'loginCtrl'
		})
		.state('logout', {
			url: '/logout',
			controller: 'logoutCtrl'
		})
		.state('forgot', {
			url: "/forgot-password",
			templateUrl: "app/src/forgot/forgotForm.tpl.html",
			controller: 'forgotCtrl'
		});
});
})();
