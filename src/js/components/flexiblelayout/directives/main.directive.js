//########################################################################
//###################START main###########################################
flexibleLayoutDirectives.main = function(){
  var linker = function(iScope, iElement, iAttrs){};
  return {
    restrict:    "EA",
    replace:     true,
    link:        linker,
    templateUrl: '.tmp/tpls/main.tpl.html'
  };
};
//###################END main#############################################
//########################################################################
