// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/scripts/*.js',
      'test/unit/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      'test/protractor.conf.js', 'test/e2e/*.js'
    ],
  })
}
