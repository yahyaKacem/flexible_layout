//########################################################################
var flexibleLayoutApp = angular.module('flexibleLayout', []);
//########################################################################
flexibleLayoutDirectives.handle.$inject = ['$window'];
//####assigning the controllers and the directives to the application#####
flexibleLayoutApp.directive(flexibleLayoutDirectives);
//########################################################################
