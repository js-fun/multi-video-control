
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/admin', routes.admin);


var io = require('socket.io').listen(http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
}));


// ----------------------------------------
// FIXME: use namespace to separate action control and others
//
io.sockets.on('connection', function (socket) {

   socket.emit('message', { message: 'welcome to the chat' });

   socket.on('take control', function (data) {
      console.log(">> Take Control of ", data);
      socket.emit('finish take control', data);
   });

   socket.on('action playing', function (data) {
      socket.broadcast.emit('video play', data);
   });

   socket.on('action pause', function (data) {
      socket.broadcast.emit('video pause', data);
   });

});
