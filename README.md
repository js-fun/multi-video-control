# Restriction

1. Browser compatiability. (chrome)
2. A little lag (start / pause)

# PaSS

  - https://www.nitrous.io/

# Fullscreen

  - https://developer.mozilla.org/samples/domref/fullscreen.html

```javascript
var videoElement = document.getElementById("myvideo");
    
  function toggleFullScreen() {
    if (!document.mozFullScreen && !document.webkitFullScreen) {
      if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else {
        videoElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }
  
  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      toggleFullScreen();
    }
  }, false);
```
