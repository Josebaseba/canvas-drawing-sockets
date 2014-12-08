/* Drawing with sockets */

module.exports = {

  subscribe: function(req, res){
    if(!req.isSocket) return res.badRequest('We need a socket here!');
    req.socket.on('drawClick', function (data) {
      /* BLAST - EVENTNAME, DATA {}, AVOID THIS SOCKET */
      sails.sockets.blast('draw', data, req.socket);
    });
    return res.ok('Listening to the socket!');
  }

}