// Include .env variables
require('dotenv').config()

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const fs = require('fs')

// Require necessary modules
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')
let methodOverride = require('method-override')
const stripe = require('stripe')(stripeSecretKey)


// Include passport configuration
let passport = require('./config/passportConfig')

// Declare Express app
let app = express()

// Set view engine
app.set('view engine', 'ejs')

// Include (use) middleware
app.use('/', express.static('static'))
app.use(layouts)
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Custom middleware - write data to locals on EVERY page
app.use((req, res, next) => {
  res.locals.alerts = req.flash()
  res.locals.user = req.user
  next()
})

// Include routes from controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/content', require('./controllers/content'))
app.use('/merch', require('./controllers/merch'))
app.use('/cart', require('./controllers/cart'))


// Make a home route: GET /
app.get('/', (req, res) => {
  res.render('home')
})

// Catch-all route - render the 404 page
app.get('*', (req, res) => {
  res.render('404')
})


app.post('/purchase', (req, res)=>{
  // fs.readFile('items.json', (error, data)=>{
  //   if (error) {
  //     res.status(500).end()
  //   } else {
  //     const itemsJson = JSON.parse(data)
  //     const  itemsArray = itemsJson.music.concat(itemsJson.merch)
  //     let total = 0
  //     req.body.items.forEach((item)=>{
  //       const itemsJson = itemsArray.find((i)=>{
  //         return i.id ==item.id
  //       })
  //       total = total + itemsJson.price * item.quantity
  //     })
  		console.log('')
  		console.log('')
  		console.log('req.body', req.body)
      stripe.charges.create({
        amount: 200,
        source: req.body.stripeTokenId,
        currency: 'usd'
      }).then(()=>{
        console.log('Charge Successful')
        res.json({message: 'Successfully purchased items'})
      }).catch((err) => {
          console.log('Error in POST /reviews', err)
          res.status(500).end()
        })
  //   }
  // })
})



// Listen from your port
app.listen(process.env.PORT || 3000)


