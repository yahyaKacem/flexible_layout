//########################################################################
//###################START handle############################################
flexibleLayoutDirectives.handle = function($window){
  var linker = function(iScope, iElement, iAttrs){
    var __slice  = [].slice;
    var throttle = function(delay, fn){
      var throttled = false;
      return function() {
        if (throttled) {
          return;
        }
        throttled = true;
        setTimeout((function() {
          return throttled = false;
        }), delay);
        return fn.call.apply(fn, [this].concat(__slice.call(arguments)));
      };
    };
    iScope.$on('SizeIsSet', function(event, data){
      var heights        = data.getHeights();
      var oldMainHeight  = heights.mainHeight;
      var oldNotesHeight = heights.notesHeight;
      iScope.trackMove   = function($event){
        $event.preventDefault();
        var headerHeight  = $('header#header').outerHeight();
        var footerHeight  = $('footer#footer').outerHeight();
        var limitTop      = headerHeight;
        var limitBottom   = $('footer#footer').offset().top;
        var contentHeight = heights.contentHeight;
        var initialCoord  = $event.pageY - $event.offsetY + 8;
        var mouseMoveFunc = function(e){
          e.preventDefault();
          e.stopPropagation();
          if(typeof iElement[0].setCapture === "function"){
            iElement[0].setCapture();
          }
          return iScope.$apply(function(){
            var newMainHeight  = oldMainHeight  + (e['y'] - initialCoord);
            var newNotesHeight = oldNotesHeight - (e["y"] - initialCoord);
            initialCoord       = e["y"];
            if(newNotesHeight < 8){
              newNotesHeight = 7;
              return;
            }
            if(newNotesHeight > heights.contentHeight){
              newNotesHeight = heights.contentHeight;
              return;
            }
            iScope.constrained = newNotesHeight !== oldNotesHeight;
            oldMainHeight      = newMainHeight;
            oldNotesHeight     = newNotesHeight;
            iScope.$emit('HeightsChanged', {
              setNewHeight: function(){
                return {
                  mainHeight: newMainHeight,
                  notesHeight: newNotesHeight,
                };
              }
            });
            return iScope.moving = true;
          });
        };
        var inRange = function(y){
          return y > limitTop && y < limitBottom;
        };
        var mouseMove = function(e){
          if(inRange(e['y'])){
            throttle(10, mouseMoveFunc(e));
          }else if(e['y'] < limitTop){
            iScope.$emit('HeightsChanged', {
              setNewHeight: function(){
                return {
                  mainHeight: 0,
                  notesHeight: contentHeight,
                };
              }
            });
          }else if(e['y'] > limitBottom){
            iScope.$emit('HeightsChanged', {
              setNewHeight: function(){
                return {
                  mainHeight: contentHeight - 8,
                  notesHeight: 8,
                };
              }
            });
          }
        };
        var mouseUp   = function(e){
          e.preventDefault();
          iScope.$apply(function(){
            iScope.constrained   = false;
            return iScope.moving = false;
          });
          $window.removeEventListener("mousemove", mouseMove, true);
          $window.removeEventListener("mouseup", mouseUp, true);
          return typeof iElement[0].releaseCapture === "function" ? iElement[0].releaseCapture() : void 0;
        };
        iElement[0].unselectable  = "on";
        iElement[0].onselectstart = function() {
          return false;
        };
        iElement[0].style.userSelect = iElement[0].style.MozUserSelect = "none";
        $window.addEventListener("mousemove", mouseMove, true);
        return $window.addEventListener("mouseup", mouseUp, true);
      };
    });
  };
  return {
    restrict:    "EA",
    replace:     true,
    link:        linker,
    templateUrl: '.tmp/tpls/handle.tpl.html'
  };
};
//###################END handle##############################################
//########################################################################
