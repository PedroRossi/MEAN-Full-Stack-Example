var passport = require('passport');

module.exports = function(app) {
  // console.log(app);
  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/'
    })
  );

  app.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      // allows other routes being processed
      return next();
    } else {
      // shows login pag
      res.render("auth");
    }
  });

  app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
  });

};
