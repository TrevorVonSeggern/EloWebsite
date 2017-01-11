// Karma configuration
export = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: './',

		frameworks: ['jasmine', 'commonjs'],

		plugins: [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-commonjs',
			'karma-coverage'
		],

		// list of files / patterns to load in the browser
		files: [
			'bower_components/jquery/dist/jquery.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-bcrypt/dist/dtrw.bcrypt.js',

			'bower_components/angular-material/angular-material.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/angular-aria/angular-aria.js',

			{pattern: 'src/client/**/*.js', included: true},
			{pattern: 'src/models/**/*.js', included: true},
			{pattern: 'test/**/*.js', included: true}
		],
		exclude: [
			'src/**/app.js',
			'src/**/appConfig.js'
		],

		preprocessors: {
			'test/**/*.js': ['commonjs'],
			'src/models/**/*.js': ['commonjs'],
			'src/client/**/*.js': ['coverage', 'commonjs'],
			'src/server/**/*.js': ['commonjs']
		},

		reporters: ['progress', 'coverage'],

		remapIstanbulReporter: {
			reports: {
				html: 'coverage'
			}
		},

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		},

		port: 9876, // web server port
		colors: true, // enable / disable colors in the output (reporters and logs)
		logLevel: config.LOG_INFO, // config.LOG_DISABLE, config.LOG_ERROR, config.LOG_WARN, config.LOG_INFO, config.LOG_DEBUG
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false, // if true, Karma captures browsers, runs the tests and exits
		concurrency: Infinity// how many browser should be started simultaneous
	})
};
