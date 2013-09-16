;(function($, io) {

   this.App = {
      getSocket : function () {
         return io.connect('/');
      }

   };

})(jQuery, io);
