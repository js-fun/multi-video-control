;(function($, global) {

   $(function () {

      var messages = [];
      var s = global.App.getSocket();

      // random user name
      var userName = 'user' + parseInt(99999 * Math.random());
      $('#username').text(userName);

      // take control handler
      $('#takeControl').click(function (x) {
         if (!global.App.isControl) {
            s.emit('take control', {userName: userName});
         }
      });
      s.on('finish take control', function (data) {
         global.App.isControl = true;
         $('#isControl').text('true');
      });


      // start / pause video
      var v = $('#testVideo')[0];
      $('#startOrPause').click(function (x) {
         if (v.paused) { v.play(); } else { v.pause(); }
      });

      v.addEventListener("timeupdate", function() {
         if (!!global.App.isControl) {
            s.emit('action playing', {time: v.currentTime});
         }
         //console.log(">> video time update", v.currentTime);
      }, true);

      v.addEventListener("pause", function() {
         if (global.App.isControl) {
            s.emit('action pause', { time: v.currentTime });
         }
      }, true);

      // receive broadcast messages
      s.on('video play', function (x) {
         console.log(" -- broadcast msg --", x);
         //var estimatedTimeOnMaster = parseInt(x.time) + 1;
         //if (Math.abs(estimatedTimeOnMaster - v.currentTime) > 5 ) {
         v.currentTime = x.time;
         //}
         if (v.paused) {
            v.play();
         }
      });

      s.on('video pause', function (x) {
         v.currentTime = x.time;
         v.pause();
      });


      // debug log
      console.log("-- Socket info --", s);
      s.on('message', function (data) {
         console.log("-- Socket on Messaage --", data);

      });

   });

})(jQuery, this);


window.onload = function() {

    //socket.on('message', function (data) {
       //if(data.message) {
       //     messages.push(data);
       //     var html = '';
       //     for(var i=0; i<messages.length; i++) {
       //         html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
       //         html += messages[i].message + '<br />';
       //     }
       //     content.innerHTML = html;
       // } else {
       //     console.log("There is a problem:", data);
       // }
    //});

    //sendButton.onclick = function() {
        //if(name.value == "") {
        //    alert("Please type your name!");
        //} else {
        //    var text = field.value;
        //    socket.emit('send', { message: text, username: name.value });
        //   field.value = '';
        //}
//    };

};
