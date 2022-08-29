const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  }
  else {
    next();
  }
};

module.exports = { withAuth };

/* Might not want to use these, just make a withAuth and use res.session.isOrganiser 

const withAuthOrganiser = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  }
  // If the 'Organiser' user isn't logged in, redirect them to home
  if (req.session.role_type != "organiser") {
    res.redirect('/').json({ message: "Only for authorised Organisers" });
  }
  else {
    next();
  }
};

const withAuthStallholder = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  // console.log(req.session.loggedIn + '\n'+ req.session.role_type)
  if (!req.session.loggedIn) {
    res.redirect('/login');
  }
  if (req.session.role_type != "Stallholder") {
    res.redirect('/').json({ message: "Only for authorised Stallholders" });
  }
  else {
    next();
  }
};

module.exports = { withAuthOrganiser, withAuthStallholder };
*/
