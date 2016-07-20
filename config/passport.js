var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    mongoose = require('mongoose'),
    Usuario = mongoose.model('Usuario');

module.exports = function() {

  passport.use(new GitHubStrategy({
    clientID: 'b348bbe5c6de9dc1a6e8',
    clientSecret: 'dd947e898cb49078eaf01c12f7e770c054e5a071',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {

    Usuario.findOrCreate(
      {'login': profile.username},
      {'nome': profile.username},
      function(error, usuario) {
        if(error) console.log(error);
        return done(error, usuario)
      }
    );

  }));

  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id, function(error, usuario) {
      if(error) {
        console.log(error);
      } else {
        done(null, usuario);
      }
    })
  });
}
