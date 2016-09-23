//=======================================================
// Declarations
//=======================================================

const express = require('express')
const ms = require('ms')
const nunjucks = require('nunjucks')

const rootDir = require('path').resolve('.') + '/'
const staticOptions = {
   maxAge: process.env.NODE_ENV === 'production' ? ms('1d') : ms('1s')
}

const app = express()

//=======================================================
// Template Engine
//=======================================================

const loader  = new nunjucks.FileSystemLoader(`${rootDir}/views`, { watch: false, noCache: true })
const tmplEnv = new nunjucks.Environment(loader, { autoescape: false })

app.locals.env = process.env.NODE_ENV
tmplEnv.addGlobal('env', process.env.NODE_ENV)
tmplEnv.express(app)

//=======================================================
// Static Routes
//=======================================================

app.use('/plugins', express.static('plugins', staticOptions), notFoundHandler)
app.use('/assets', express.static(`assets`, staticOptions), notFoundHandler)
app.use('/dist', express.static(`dist`, staticOptions), notFoundHandler)

//=======================================================
// Stripe Routes
//=======================================================

app.get('/stripe/connect/authorize', function(req, res, next) {
   // Stripe Authorization Route Goes Here
   // const query = qs.stringify(params)
   // res.redirect(`https://connect.stripe.com/oauth/authorize?${query}`)
})

app.get('/stripe/connect/callback', function(req, res, next) {
   // Decrypt and verify req.query.state
   res.status(200).end('Stripe account connected')
})

//=======================================================
// Application Routes
//=======================================================

app.get('*', function(req, res, next) {
   res.render('index.html')
})

//=======================================================
// Error Handlers
//=======================================================

function notFoundHandler(req, res, next) {
   return res.status(404).end()
}

app.use(notFoundHandler)

app.use(function(err, req, res, next) {
   res.status(500).end(err.message)
})

//=======================================================
// Start Server
//=======================================================

const server = app.listen(8080, function() {
   const port = server.address().port
   console.log(`Started 1000 Fooodies on port ${port}`)
})
