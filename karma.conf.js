// Karma configuration
// Generated on Sat Feb 18 2017 14:51:09 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

      
      
      "../node_modules/bower_components/jquery/dist/jquery.min.js",
			"../node_modules/bower_components/angular/angular.min.js",
			"../node_modules/bower_components/angular-resource/angular-resource.min.js",
			"../node_modules/bower_components/angular-cookies/angular-cookies.min.js",
			"../node_modules/bower_components/angular-ui-router/release/angular-ui-router.min.js",
			"../node_modules/bower_components/bootstrap/dist/js/bootstrap.min.js",
			"../node_modules/bower_components/angular-bootstrap/ui-bootstrap.min.js",
			"../node_modules/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
			"../node_modules/bower_components/angucomplete-alt/angucomplete-alt.js",
			"../node_modules/bower_components/custom-select/js/customSelect.js",
			"../node_modules/bower_components/angular-confirm/angular-confirm.js",
			"../node_modules/bower_components/angularjs-toaster/toaster.js",
			"../node_modules/bower_components/angular-base64/angular-base64.min.js",
			"../node_modules/bower_components/angular-spring-data-rest/dist/angular-spring-data-rest.min.js",
			"../node_modules/bower_components/ng-flow/dist/ng-flow-standalone.min.js",
			"../node_modules/bower_components/angular-animate/angular-animate.min.js",
			"../node_modules/bower_components/angular-sanitize/angular-sanitize.min.js",
			"../node_modules/bower_components/json3/lib/json3.min.js",
			"../node_modules/bower_components/oclazyload/dist/ocLazyLoad.min.js",
			"../node_modules/bower_components/angular-loading-bar/build/loading-bar.min.js",
			"../node_modules/bower_components/metisMenu/dist/metisMenu.min.js",
			"../node_modules/bower_components/Chart.js/Chart.min.js",
			"../node_modules/bower_components/angular-smart-table/dist/smart-table.js",
			"../node_modules/bower_components/angular-ngcsv/ng-csv.min.js",
			"../node_modules/bower_components/angular-route/angular-route.js",
			"../node_modules/bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
			"../node_modules/bower_components/ngProgress/build/ngProgress.js",
			"../node_modules/bower_components/lodash/dist/lodash.js",
			"../node_modules/bower_components/underscore/underscore-min.js",
			"../node_modules/bower_components/dist/plugins/chart/d3.js",
			"../node_modules/bower_components/dist/plugins/chart/c3.js",
			"../node_modules/bower_components/angular-ui-switch/angular-ui-switch.js",
			"../node_modules/bower_components/angular-mocks/angular-mocks.js",
			"../node_modules/bower_components/moment/moment.js",


      '../public_development/ng/controller/*.js',
      '../public_development/ng/app.js',
      
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Chrome'],
   // browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
