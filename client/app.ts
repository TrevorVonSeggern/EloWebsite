import {DefinitionRouter, definition} from "./app/Definition";
/**
 * Created by trevor on 7/8/2016.
 */
// my ui components:
require('web-input-text/module');
require('web-datetime/module');
require('web-nav/module');

let app = angular.module('elo-app', [
	'input-text-module',
	'datetime-module',
	'nav-module'
]);

// let router = angular.module('router-module', ['ui.router']);
// app.config([
// 	'$stateProvider',
// 	'$compileProvider',
// 	function ($stateProvider, $compileProvider) {
// 		$compileProvider.debugInfoEnabled(true); // keep the dom insync with under the hood stuff. For server pre-gen
//
// 		// loadRouter($stateProvider); // add states for each page
//
// 		// $stateProvider.state('logout', {
// 		// 	url: '/logout',
// 		// 	controller: LogoutController,
// 		// 	template: ''
// 		// });
// 		// $stateProvider.state('googleOAuth2', {
// 		// 	url: '/state=:state&access_token=:accessToken&token_type=:tokenType&expires_in=:expires',
// 		// 	template: 'Loading data from google\'s servers...',
// 		// 	controller: GoogleOAuthController
// 		// });
// 		$stateProvider.state('otherwise', new DefinitionRouter('', definition.login));
//
// 	}
// ]);


app.controller('ctrl', ['$scope', function ($scope) {
	$scope.asdfvar = 'asdfvar var';
}]);
