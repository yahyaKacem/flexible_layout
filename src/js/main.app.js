//########################################################################
var app = angular.module('app', ['flexibleLayout', 'resize']);
//########################################################################
//######injecting the dependencies########################################
controllers.MainCtrl.$inject = ['$scope', '$window'];
//########################################################################
//####assigning the controllers and the directives to the application#####
app.controller(controllers);
//########################################################################
