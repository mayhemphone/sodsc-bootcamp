// Require needed modules
let express = require('express')


// Declare an express router
let router = express.Router()

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
	res.send('Reached the route POST to /auth/signup')
})

// Export the router object so it can be used elsewhere
module.exports = router