var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    Usuario = mongoose.model('Usuario');

module.exports = function() {

  passport.use(new GitHubStrategy({
    clientID: 'b348bbe5c6de9dc1a6e8',
    clientScret: '8980ea3e2b7a26517d288616ee5a40f080a65d61',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {

    Usuario.findOrCreate(
      { 'login': profile.username },
      { 'nome': profile.username },
      function(error, usuario) {
        if(error) {
          console.log(error);
          return done(error);
        } else {
          return done(null, usuario)
        }
      }
    );

  }));

  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });
}
