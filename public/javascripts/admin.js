;(function($, global) {

   $(function () {

      var s = global.App.getSocket();

      // random user name
      var userName = 'user' + parseInt(99999 * Math.random());
      $('#username').text(userName);

      // take control handler
      var takeControl = function (x) {
         if (!global.App.isControl) {
            s.emit('take control', {userName: userName});
         }
      };
      s.on('finish take control', function (data) {
         global.App.isControl = true;
         $('#isControl').text('true');
      });

      takeControl();

      // start / pause video
      var v = $('#testVideo')[0];
      $('#startOrPause').click(function (x) {
         if (v.paused) { v.play(); } else { v.pause(); }
      });

      v.addEventListener("timeupdate", function() {
         if (!!global.App.isControl) {
            s.emit('action playing', {time: v.currentTime});
         }
      }, true);

      v.addEventListener("pause", function() {
         if (!!global.App.isControl) {
            s.emit('action pause', { time: v.currenttime });
         }
      }, true);



      // debug
      s.on('message', function (data) {
         console.log("-- Socket Connected --", data);

      });

   });

})(jQuery, this);
