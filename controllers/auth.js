// Require needed modules
let express = require('express')


// Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

// Declare routes
router.get('/login', (req, res) => {
	res.render('auth/login')
})

router.post('/login', (req, res) => {
	res.send('Reached the route POST to /auth/login')
})

router.get('/signup', (req, res) => {
	
	res.render('auth/signup')
})

router.post('/signup', (req, res) => {
	console.log(req.body)
	if (req.body.password !== req.body.password_verify) {
		console.log('password_verify does not match')
		req.flash('error', 'Passwords do not match')
		res.redirect('/auth/signup')
	} else{
		db.user.findOrCreate({
			where: { email: req.body.email },
			defaults: req.body
		})
		.spread((user, wasCreated)=> {
			req.flash('success', 'You successuflly created a profile')
			res.redirect('/')	
		})
		.catch((err) =>{
			console.log('Error in POST /auth/signup', err)
			req.flash('error', 'Something went wrong :(')
			res.redirect('/auth/signup')
		})

	}
	
})

// Export the router object so it can be used elsewhere
module.exports = router