(function() {
  var App;
  App = {};
  var COLORS = ['#00CCFF', '#00FF00', '#FF3300', '#FF3399', '#3366FF', '#663300'];
  var MY_COLOR = COLORS[Math.floor(Math.random() * COLORS.length)];
  /*
    Init
  */
  App.init = function() {
    App.canvas = document.createElement('canvas');
    App.canvas.height = 700;
    App.canvas.width = 800;
    document.getElementsByTagName('article')[0].appendChild(App.canvas);
    App.ctx = App.canvas.getContext('2d');
    App.ctx.fillStyle = 'solid';
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = 'round';

    /* */
    /* SOCKETS
    /* Socket will listen to the server draw event
    /* to draw it with the App.draw method
    /* */
    io.socket.on('draw', function(data) {
      return App.draw(data.x, data.y, data.type, data.color);
    });
  };

  App.draw = function(x, y, type, color) {
    App.ctx.strokeStyle = color;
    if (type === 'dragstart') {
      App.ctx.beginPath();
      return App.ctx.moveTo(x, y);
    } else if (type === 'drag') {
      App.ctx.lineTo(x, y);
      return App.ctx.stroke();
    } else {
      return App.ctx.closePath();
    }
  };

  /*
    Draw Events
  */
  $('canvas').live('drag dragstart dragend', function(e) {
    var offset, type, x, y;
    type = e.handleObj.type;
    offset = $(this).offset();
    e.offsetX = e.layerX;
    e.offsetY = e.layerY;
    x = e.offsetX;
    y = e.offsetY;
    App.draw(x, y, type, MY_COLOR);

    /* */
    /* SOCKETS
    /* Emit from our socket to the server with the drawclick event
    /* data of our super cool draw in the canvas
    /* */
    io.socket.emit('drawClick', {
      x: x,
      y: y,
      type: type,
      color: MY_COLOR
    });
  });

  $(function() {
    /* */
    /* SOCKETS
    /* Use Sails.io library method to subscribe the socket to the
    /* drawClick event in the server to send the draw data after
    /* */

    io.socket.get('/subscribe', {}, function(data, res){
      console.log(data);
    });

    return App.init();
  });

}).call(this);