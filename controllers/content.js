// Require needed modules
let express = require('express')


// Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

// Include our custom middleware to ensure that users are logged in
let adminLoggedIn = require('../middleware/adminLoggedIn')
let loggedIn = require('../middleware/loggedIn')
let QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;


// GET /content
router.get('/', (req, res) => {
	db.content.findAll()
	.then((content)=>{
		res.render('content/index', { 
		 	content: content
		})
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



// POST /content - create a new post
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
      res.redirect('content/'+content.id)
    })

  .catch(function(error) {
    // console.log('Error in POST /merch', error)
    res.status(400).render('404')
  })
})

// edit single content item

router.put('/edit/:id', (req,res)=>{
  //now do the merch database update
  db.content.update(
  {
  	id: req.body.id,
    description: req.body.description,
    meat: req.body.meat,
    featured: req.body.featured,
  },
    { where: {id: req.params.id} }
  )
  .then((updatedRows)=>{
    // console.log('success', updatedRows)
    res.redirect('/content/' + req.params.id)
  })
  .catch((err) => {
      // console.log('Error in PUT /:id', err)
      res.render('404')
    })
})

// needs to be below others so it doesn't catch them too
router.get('/edit/:id', (req, res) => {
	db.content.findOne({
		where: {id: req.params.id }
	})
	.then((content)=>{

		var cfg = {};
		console.log('')
		console.log('content.meat',JSON.parse(content.meat).ops)
		console.log('')
		//do some converting
		var parsed = JSON.parse(content.meat).ops
		var converter = new QuillDeltaToHtmlConverter(parsed, cfg);
		 
		var html = converter.convert(); 

		console.log('')
		 console.log('html',html)
		 console.log('')

		if (!content) throw Error()
		res.render('content/edit', {
			content: content,
			htmlContent: html
		})
	})
	.catch((err) => {
	    console.log('Error in GET /edit/:id', err)
	    res.status(400).render('404')
	  })
})



// needs to be below others so it doesn't catch them too
router.get('/:id', (req, res) => {
	db.content.findOne({
		where: {id: req.params.id }
	})
	.then((content)=>{

		var cfg = {};
		console.log('')
		console.log('content.meat',JSON.parse(content.meat).ops)
		console.log('')
		//do some converting
		var parsed = JSON.parse(content.meat).ops
		var converter = new QuillDeltaToHtmlConverter(parsed, cfg);
		 
		var html = converter.convert(); 

		console.log('')
		 console.log('html',html)
		 console.log('')

		if (!content) throw Error()
		res.render('content/show', {
			content: content,
			htmlContent: html
		})
	})
	.catch((err) => {
	    console.log('Error in POST /reviews', err)
	    res.status(400).render('404')
	  })
})


// Export the routes from this file
module.exports = router
