//########################################################################
//###################START flexibleLayout#################################
flexibleLayoutDirectives.flexibleLayout = function(){
  var linker = function(iScope, iElement, iAttrs){
    iScope.$on('MainHeightIsSet', function(event, data){
      var heights        = data.getHeights();
      iScope.mainHeight  = heights.mainHeight;
      iScope.notesHeight = heights.notesHeight;
      iScope.$broadcast('SizeIsSet', data);
      iScope.$on('HeightsChanged', function(event, data){
        newHeights         = data.setNewHeight();
        iScope.mainHeight  = newHeights.mainHeight;
        iScope.notesHeight = newHeights.notesHeight;
      });
    });
    // iScope.$on(iAttrs.handleEvent, function(event, data){
    //   var scale = data.getScale();
    //   iScope.$broadcast(iAttrs.broadcastEvent, {
    //     getNewScale: function(){
    //       return scale;
    //     }
    //   });
    // });
  };
  return {
    restrict: "EA",
    link:     linker
  };
};
//###################END flexibleLayout###################################
//########################################################################
