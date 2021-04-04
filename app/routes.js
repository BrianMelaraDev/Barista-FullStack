const Order = require('./models/order');

module.exports = setupRoutes;

function setupRoutes(app, passport) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', async (req, res) => {
    const uncompletedOrders = await Order.find({ completed: { $ne: true } })
    const completedOrders = await Order.find({ completed: true })

    res.render("index.ejs", { uncompletedOrders, completedOrders, loggedIn: Boolean(req.user) })
  });

  app.post('/orders', async (req, res) => {
    const newOrder = new Order({
      name: req.body.name,
      order: req.body.order,
      complete: true
    })
    await newOrder.save()

    console.log("saved to database");
    res.redirect("/");
  });

  app.put('/orders', isLoggedIn, async (req, res) => {
    const orderToUpdate = await Order.findById(req.body.id)

    orderToUpdate.completed = true
    await orderToUpdate.save()

    console.log("saved to database");
    res.json({ success: true });
  });

  app.delete('/orders', async (req, res) => {
    const orderToDelete = await Order.findById(req.body.id)
    await orderToDelete.remove()

    console.log("deleted from database");
    res.json({ success: true });
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
