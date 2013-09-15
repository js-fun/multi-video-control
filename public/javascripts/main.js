;(function($, io) {

   this.App = {
      getSocket : function () {
         return io.connect('http://localhost:3000');
      }

   };

})(jQuery, io);
