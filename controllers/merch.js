// Require needed modules
let express = require('express')
let async = require('async')

// Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')
let cloudinary = require('cloudinary')
let multer = require('multer')

// Include our custom middleware to ensure that users are logged in
let adminLoggedIn = require('../middleware/adminLoggedIn')
let loggedIn = require('../middleware/loggedIn')



// POST /articles - create a new post
router.post('/', function(req, res) {
  db.merch.create({
    item: req.body.item,
    category: req.body.category,
    sex: req.body.sex,
    collection: req.body.collection,
    pre_order: req.body.pre_order,
    members_only: req.body.members_only,
    img_1: req.body.img_1,
    img_2: req.body.img_2,
    img_3: req.body.img_3,
    price: req.body.price,
    active: req.body.active,
    color: req.body.color,
    one_size: req.body.one_size
  })
  .then(function(merch) {
   
      console.log('EVERYTHING is done. Now redirect or something')
      res.render('merch/new')
    })

  .catch(function(error) {
    console.log('Error in POST /merch', error)
    res.status(400).render('main/404')
  })
})

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
router.get('/new',  (req, res) =>{

	res.render('merch/new')
})

// GET /merch/inventory
router.get('/inventory', (req, res) => {
	db.merch.findAll()
	.then((merch)=>{
		 res.render('merch/inventory', { merch: merch })
	})
	.catch((err) => {
	    console.log('Error in POST /merch', err)
	    res.render('main/404')
	  })
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

//cloudinary widget
 function cloudwidget (req, res) {
      var post = new Model({
          title: req.body.title,
          description: req.body.description,
          created_at: new Date(),
          // Now we are requesting the image
          // from a form text input
          image: req.body.image
      });

      post.save(function (err) {
          if(err){
              res.send(err)
          }
          res.redirect('/');
      });
  }


// Export the routes from this file
module.exports = router
