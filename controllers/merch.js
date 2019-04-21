// Require needed modules
let express = require('express')

// Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

// Include our custom middleware to ensure that users are logged in
let adminLoggedIn = require('../middleware/adminLoggedIn')
let loggedIn = require('../middleware/loggedIn')

// GET /content
router.get('/', (req, res) => {
	db.merch.findAll()
	.then((merch)=>{
		 res.render('merch/index', { merch: merch })
	})
	.catch((err) => {
	    console.log('Error in POST /merch', err)
	    res.render('main/404')
	  })
})

// GET /merch/new - display form for creating new articles
router.get('/new', (req, res) =>{

	res.render('merch/new')
})

router.get('/:id', (req, res) => {
	db.merch.findOne({
		where: {id: req.params.id }
	})
	.then((merch)=>{
		if (!merch) throw Error()
		res.render('merch/show', {merch: merch})
	})
	.catch((err) => {
	    console.log('Error in POST /reviews', err)
	    res.status(400).render('main/404')
	  })
})





// Export the routes from this file
module.exports = router
