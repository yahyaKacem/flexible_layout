//########################################################################
//###################START notes##########################################
flexibleLayoutDirectives.notes = function(){
  var linker = function(iScope, iElement, iAttrs){};
  return {
    restrict:    "EA",
    replace:     true,
    transclude:  true,
    link:        linker,
    templateUrl: '.tmp/tpls/notes.tpl.html'
  };
};
//###################END notes############################################
//########################################################################
