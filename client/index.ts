let angular: any;

let mod = angular.module('app', ['elo-app']);
mod.controller('ctrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	let vm = $scope;
	vm.loggedIn = true;
	let users = ['Administrator', 'User'];
	vm.menu = [
		{name: 'Game', url: 'game', baseName: 'game', requireLogin: true, users: users},
		{name: 'Event', url: 'event', baseName: 'event', requireLogin: true, users: users},
		{name: 'Match', url: 'match', baseName: 'match', requireLogin: true, users: users},
		{name: 'Team', url: 'team', baseName: 'team', requireLogin: true, users: users},
		{name: 'Player', url: 'player', baseName: 'player', requireLogin: true, users: users},
	];
	vm.root = $rootScope;
	vm.userRole = 'Guest';
	vm.userless = false;
}]);