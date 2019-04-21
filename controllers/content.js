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
	db.content.findAll()
	.then((content)=>{
		 res.render('content/index', { content: content })
	})
	.catch((err) => {
	    console.log('Error in POST /reviews', err)
	    res.render('main/404')
	  })
})

router.get('/:id', (req, res) => {
	db.content.findOne({
		where: {id: req.params.id }
	})
	.then((content)=>{
		if (!content) throw Error()
		res.render('content/show', {content: content})
	})
	.catch((err) => {
	    console.log('Error in POST /reviews', err)
	    res.status(400).render('main/404')
	  })
})
// Export the routes from this file
module.exports = router
