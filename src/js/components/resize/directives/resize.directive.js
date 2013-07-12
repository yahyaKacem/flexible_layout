//########################################################################
//###################START resize#########################################
resizeDirectives.resize = function ($window, $timeout) {
  return function (iScope, iElement, iAttrs) {
    var setContentHeight = function(){
      var headerHeight       = $('header#header').outerHeight();
      var footerHeight       = $('footer#footer').outerHeight();
      var headerFooterHeight = headerHeight + footerHeight;
      var contentHeight      = $window.innerHeight - headerFooterHeight;
      var isMain             = (iAttrs.resize === iElement[0].className);
      iElement.height(contentHeight);
      if(isMain){
        var main           = iElement.find('.main');
        var notes          = iElement.find('.notes');
        var notesHeight    = notes.height();
        var mainHeight     = contentHeight - notesHeight;
        main.height(mainHeight);
        iScope.$emit('MainHeightIsSet', {
          getHeights: function(){
            return {
              mainHeight: mainHeight,
              notesHeight: notesHeight,
              contentHeight: contentHeight,
              headerFooterHeight: headerFooterHeight,
            };
          }
        });
      }
    };
    $timeout(setContentHeight, 0);
    var whenResized      = function(fn){
      iElement.resize(fn);
      $(window).resize(fn);
    };
    whenResized(setContentHeight);
  };
};
//###################END notes############################################
//########################################################################
