module.exports = (req, res, next) => {
  if(req.user && req.user.admin) {
    // Someone is logged in and they are an admin!
    // So, we allow them to proceed
    next()
  }
  else {
    req.flash('error', 'You must be an ADMIN to view this page!')
    res.redirect('/profile')
  }
}
