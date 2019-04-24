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

// GET /merch/new - display form for creating new articles
router.get('/new', (req, res) =>{

	res.render('content/new')
})





// POST /merch - create a new post
router.post('/', function(req, res) {
  
  // create merch item
  db.content.create({
    title: req.body.title,
    meat: req.body.meat,
    description: req.body.description,
    featured: req.body.featured
  })

  .then((content)=> {
   
      // console.log('EVERYTHING is done. Now redirect or something')
      res.render('content/new')
    })

  .catch(function(error) {
    // console.log('Error in POST /merch', error)
    res.status(400).render('404')
  })
})












// needs to be below others so it doesn't catch them too
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
