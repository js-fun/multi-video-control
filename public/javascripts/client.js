;(function($, global) {

   $(function () {

      var s = global.App.getSocket();

      // random user name
      var userName = 'user' + parseInt(99999 * Math.random());
      $('#username').text(userName);

      // video
      var v = $('#testVideo')[0];

      s.on('video pause', function (x) {
         v.currentTime = x.time;
         v.pause();
      });

      s.on('video play', function (x) {
         //var estimatedTimeOnMaster = parseInt(x.time) + 1;
         //if (Math.abs(estimatedTimeOnMaster - v.currentTime) > 5 ) {
         v.currentTime = x.time;
         //}
         if (v.paused) {
            v.play();
         }
      });

      s.on('message', function (data) {
         console.log("-- Socket Connected --", data);

      });

   });

})(jQuery, this);
