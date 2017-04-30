import * as angular from 'angular';
import {LoadRouter, EloModule} from './client/app';
import 'angular-ui-router';
import {UserManagementModule} from 'web-user-management'
import {SingleSelectModule} from 'web-input-select-list';

angular.module('app', [
	EloModule.name,
	UserManagementModule.name,
	SingleSelectModule.name,
	'ui.router'
]).controller('ctrl', function ($scope, $rootScope) {
	let vm = $scope;

	vm.root = $rootScope;
	vm.loggedIn = false;
	vm.userRole = 'Guest';
	vm.userless = false;

	let users = ['Administrator', 'User'];
	vm.menu = [
		{name: 'Game', url: 'game', baseName: 'game', requireLogin: true, users: users},
		{name: 'Event', url: 'event', baseName: 'event', requireLogin: true, users: users},
		{name: 'Match', url: 'match', baseName: 'match', requireLogin: true, users: users},
		{name: 'Team', url: 'team', baseName: 'team', requireLogin: true, users: users},
		{name: 'Player', url: 'player', baseName: 'player', requireLogin: true, users: users},
	];
}).config(($stateProvider, $urlRouterProvider) => {
	LoadRouter($stateProvider, $urlRouterProvider);
});

