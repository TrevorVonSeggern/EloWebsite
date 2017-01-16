let config = {
	bundles: {
		'kick-start_bundle': [
			'jquery',
			'angular',
			'text'
		],
		'angular-plugins_bundle': [
			'googlechart',
			'angularAnimate',
			'angular_aria',
			'material',
			'uiRoute',
			'ngInfiniteScroll',
			'bcrypt',
			'ngTooltips',
			'datetimepicker',
			'bootstrapSelect',
		],
		'startApp': [
			'src/client/app/app'
		]
	},
	depCache: {
		'angular-plugins_bundle': ['kick-start_bundle'],
		'startApp': ['angular-plugins_bundle'],
	},
	map: {
		text: 'bower_components/plugin-text/text',
		jquery: 'bower_components/jquery/dist/jquery',
		angular: 'bower_components/angular/angular',
		ngAria: 'bower_components/angular-aria/angular-aria',
		uiRoute: 'bower_components/angular-ui-router/release/angular-ui-router',
		ngRoute: 'bower_components/angular-route/angular-route',
		ngCookies: 'bower_components/angular-cookies/angular-cookies',
		ngAnimate: 'bower_components/angular-animate/angular-animate',
		ngMaterial: 'bower_components/angular-material/angular-material',
		ngGoogleMaps: 'bower_components/angular-google-maps/dist/angular-google-maps',
		ngTooltips: 'bower_components/angular-tooltips/dist/angular-tooltips',
		ngInfiniteScroll: 'bower_components/ngInfiniteScroll/build/ng-infinite-scroll',
		googlechart: 'bower_components/angular-google-chart/ng-google-chart',

		bcrypt: 'bower_components/angular-bcrypt/dist/dtrw.bcrypt',
		Node: 'bower_components/Node/Node',
		crypto: 'bower_components/cryptojslib/components/core',

		uiBootstrap: 'bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker.min',
		dateTimePicker: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
		bootstrapSelect: 'bower_components/angular-bootstrap-select/angular-bootstrap-select',
	},
	meta: {
		jquery: {exports: "$", global: 'angular', format: 'global'},
		angular: {exports: 'angular', global: 'angular', deps: ['jquery'], format: 'global'},
		ngCookie: {deps: ['angular']},
		uiBootstrap: {deps: ['angular']},
		dateTimePicker: {deps: ['angular', 'uiBootstrap']},
		bootstrapSelect: {deps: ['angular']},
		ngAnimate: {deps: ['angular']},
		ngAria: {deps: ['angular']},
		ngMaterial: {deps: ['angular']},
		uiRoute: {deps: ['angular']},
		ngRoute: {deps: ['angular']},
		bcrypt: {deps: ['angular']},
	},
	defaultJSExtensions: true,
};
// Configure module loader
let System;
if (System) {
	System.defaultJSExtensions = true;
	System.config(config);
}

// So that the configuration can be loaded in either commonjs or amd.
let module;
if (module) {
	module.exports = {config: config};
}
