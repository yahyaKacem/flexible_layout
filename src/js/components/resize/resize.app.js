//########################################################################
var resizeApp = angular.module('resize', []);
//########################################################################
//######injecting the dependencies########################################
resizeDirectives.resize.$inject = ['$window', '$timeout'];
//########################################################################
//####assigning the controllers and the directives to the application#####
resizeApp.directive(resizeDirectives);
//########################################################################
