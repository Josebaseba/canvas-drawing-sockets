/* Drawing with sockets */

module.exports = {

  subscribe: function(req, res){
    req.socket.on('drawClick', function (data) {
      /* BLAST - EVENTNAME, DATA {}, AVOID THIS SOCKET */
      sails.sockets.blast('draw', data, req.socket);
    });
    return res.ok('Subscribed to the room!');
  }

}