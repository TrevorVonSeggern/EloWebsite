/**
 * Created by trevor on 7/8/2016.
 */
// my ui components:
require('web-input-text/module');
require('web-datetime/module');

let app = angular.module('elo-app', ['input-text-module', 'datetime-module']);

app.controller('ctrl', ['$scope', function ($scope) {
	$scope.asdfvar = 'asdfvar var';
}]);
