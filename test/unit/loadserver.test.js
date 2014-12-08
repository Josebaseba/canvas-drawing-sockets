var Sails = require('sails');

before(function(done) {
  Sails.lift({
    // configuration for testing purposes
    environment: 'test',
    log: {level: process.env.log || 'info'}
  }, function(err, sails) {
    if(sails.config.environment !== 'test') return done('Please, check the environment');
    if(err) return done(err);
    done(err, sails);
  });
});

after(function(done) {
  sails.lower(done);
});