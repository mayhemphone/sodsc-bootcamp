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



// POST /merch - create a new post
router.post('/', function(req, res) {
  
  // create merch item
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
    no_size: req.body.no_size,
    desc: req.body.desc
  })
	.then(merch=>{
		
	    // so relationships can be made
	    
		if ( merch.no_size == true ) {
				// create 0 inventory records for s, m, l, xl
			db.inventory.create({
			  	merchId: merch.id,
			  	size: 'none'
		 	})

		} else {

			let defaultSizes = ['x-small','small','medium','large','x-large','xx-large']
			console.log(defaultSizes)
		    async.forEach(defaultSizes, (cat, done) => {
		      db.inventory.create({
		      		merchId: merch.id,
		      		size: cat
		      })
		      .spread((inventory, wasCreated) => {
		        merch.addInventory(inventory)
		        .then(() => {
		          // res.redirect, or whatevs
		          console.log('done adding', cat)
		          done()
		        })
		      })



		    }, () => {
		      console.log('EVERYTHING is done. Now redirect or something')
		      res.redirect('/')
		    })	  
			} //close if / else statement
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
		 res.render('merch/index', { merch: merch})
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
	db.merch.findAll({ include:[ db.inventory]} )
	.then((merch)=>{
		 res.render('merch/inventory', { merch: merch })
	})
	.catch((err) => {
	    console.log('Error in GET /merch/inventory', err)
	    res.render('/404')
	  })
})

router.put('/:id', (req,res)=>{
  console.log('Reached PUT route')
  console.log('---------req.body.item:',req.body.item)
  db.merch.update(
  {
  	id: req.body.id,
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
    no_size: req.body.no_size,
    desc: req.body.desc
  },
    { where: {id: req.params.id} }
  )
  .then((updatedRows)=>{
    console.log('success', updatedRows)
    res.redirect('/merch/' + req.params.id)
  })
  .catch((err) => {
      console.log('Error in PUT /:id', err)
      res.render('404')
    })
})

router.get('/:id', (req,res)=>{
  console.log('Reached get route')

	db.merch.findOne({
	    where: { id: req.params.id },
	    include: [db.inventory]
	  })
    .then(function(merch) {
  		console.log('found:', merch)
	    if (!merch) throw Error()
	    res.render('merch/edit', { merch: merch })
  })

  .catch((err) => {
        console.log('Error in POST /reviews', err)
        res.render('404')
    })
})

router.put('/inventory', (req,res)=>{
  console.log('Reached PUT route')

  // TODO
  // COME BACK AND MAKE THIS A LOOP YOU LAZY FUCK.
  	db.inventory.update({ count : req.body['none']  },{ 
		where : { 
			merchId: req.body.merchId, 
			size: 'none' 
		}
	})
	db.inventory.update({ count : req.body['x-small']  },{ 
		where : { 
			merchId: req.body.merchId, 
			size: 'x-small' 
		}
	})
	db.inventory.update({ count : req.body['small']  },{ 
		where : { 
			merchId: req.body.merchId, 
			size: 'small' 
		}
	})
	db.inventory.update({ count : req.body['medium']  },{ 
		where : { 
			merchId: req.body.merchId, 
			size: 'medium' 
		}
	})
	db.inventory.update({ count : req.body['large']  },{ 
		where : { 
			merchId: req.body.merchId, 
			size: 'large' 
		}
	})
	db.inventory.update({ count : req.body['x-large']  },{ 
		where : { 
			merchId: req.body.merchId, 
			size: 'x-large' 
		}
	})
	db.inventory.update({ count : req.body['xx-large']  },{ 
		where : { 
			merchId: req.body.merchId, 
			size: 'xx-large' 
		}
	})

	// db.inventory.update({ count : '666' },{ where : { merchId : 4 }}) 


  .then((updatedRows)=>{
    console.log('success', updatedRows)
    // res.redirect('/merch/inventory')
  })
  .catch((err) => {
      console.log('Error in POST /reviews', err)
      res.render('404')
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
