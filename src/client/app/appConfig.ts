import RouteDefinition = angular.RouteDefinition;
import IControllerProvider = angular.IControllerProvider;
import IProvideService = angular.auto.IProvideService;
import ICompileProvider = angular.ICompileProvider;
import IFilterProvider = angular.IFilterProvider;
import IQService = angular.IQService;
import IModule = angular.IModule;

import {UserFactory, User} from './pages/userManagement/user/factory';
import {DefinitionRouter, definition} from './Definition';
import {AppController} from './appController';
import {PagesModule, loadRouter} from './pages/module';
import {ComponentsModule} from './component/module';

// api has to be of type :any to compile... registerController and $register are dynamic.
export let app: IModule = angular.module('app', [
	'ui.router', // angular ui router
	'googlechart', // google charts
	'720kb.tooltips', // small lib for tooltips
	'infinite-scroll', // angular infinite scroll
	'ngMaterial', // angular material
	'dtrw.bcrypt', // angular bcrypt module
	'ui.bootstrap', // ui bootstrap
	'ui.bootstrap.datetimepicker', // angular datepicker
	ComponentsModule.name,
	PagesModule.name,
]);

GoogleOAuthController.$inject = ['$location', '$stateParams', 'UserFactory'];
function GoogleOAuthController($location, $stateParams, userFactory: UserFactory) {
	let accessToken = $stateParams.accessToken;

	userFactory.httpServerCall('/api/user/loginGoogle', 'PUT', {access_token: accessToken}, (data) => {
		let user = new User(data.data.user, userFactory);
		userFactory.StoreCredentials(user, data.data.token);
		$location.path('/account');
	});
}

function LogoutController($location, userFactory: UserFactory) {
	userFactory.ClearCredentials();
	$location.path('/');
}
LogoutController.$inject = ['$location', 'UserFactory'];

app.config([
	'$stateProvider',
	'$compileProvider',
	function ($stateProvider, $compileProvider) {
		$compileProvider.debugInfoEnabled(true); // keep the dom insync with under the hood stuff. For server pre-gen

		loadRouter($stateProvider); // add states for each page

		$stateProvider.state('logout', {
			url: '/logout',
			controller: LogoutController,
			template: ''
		});
		$stateProvider.state('googleOAuth2', {
			url: '/state=:state&access_token=:accessToken&token_type=:tokenType&expires_in=:expires',
			template: 'Loading data from google\'s servers...',
			controller: GoogleOAuthController
		});
		$stateProvider.state('otherwise', new DefinitionRouter('', definition.login));

	}
]);

app.controller('main-controller', [
	'$scope'
	, AppController
]);

// This is required so that I can load entire modules after bootstrap.
angular.module = function () {
	return app;
};
