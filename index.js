// Include .env variables
require('dotenv').config()

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


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
  const itemsJson = JSON.parse(req.body.main)

  stripe.charges.create({
    amount: itemsJson.total,
    source: itemsJson.stripeTokenId,
    currency: 'usd',
    description: 'SODSC Order',
    statement_descriptor: 'SODSC MERCH',
    metadata: {order_id: 6735}
  }).then(()=>{
    console.log('Charge Successful')
    res.json({message: 'Successfully purchased items'})
  }).catch((err) => {
      console.log('Error in POST /reviews', err)
      res.status(500).end()
    })

})



// Listen from your port
app.listen(process.env.PORT || 3000)


