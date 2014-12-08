/**/
/*
/* SUBSCRIBE CONTROLLER METHODS TEST
/*
/**/

var opts = require('../../testOptions');

/* IF SUBSCRIBE FLAG IS ENABLED TEST THIS CONTROLLER */

if(opts.allTests || opts.controller.subscribe){

  var should  = require('should');
  var request = require('supertest');

  describe('01 SubscribeController Test', function(){

    var user;
    var socketIOClient = require('socket.io-client');
    var sailsIOClient = require('sails.io.js');

    it('should return html HOMEPAGE INDEX', function(done){
      request(sails.hooks.http.app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        if(res.text.indexOf('<title>HTML5 Canvas + Sails.JS</title>') > -1){
          done();
        }else{
          done('This is not the index homepage!');
        }
      });
    });

    it('should badRequest trying to subscribe', function(done){
      request(sails.hooks.http.app)
      .get('/subscribe')
      .expect(400, done);
    });

    it('user should subscribe to the socket', function(done){
      user = sailsIOClient(socketIOClient);
      user.sails.url = 'http://localhost:2000';
      /* Avoid development sails.io logs */
      user.sails.environment = 'production';
      user.socket.get('/subscribe', function(data){
        data.should.be.instanceOf(String);
        data.should.be.equal('Listening to the socket!');
        done();
      });
    });

  });

}