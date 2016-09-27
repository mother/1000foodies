const nunjucks = require('nunjucks')
const vendorData = require('../../../data/tagliere') // Sample Data
const AboutSettings = require('./about.js')
const ContactSettings = require('./contact.js')
const DesignSettings = require('./design.js')
const OrdersSettings = require('./orders.js')
const ProductsSettings = require('./products.js')

function Settings() {}

//=================================================================
// Render Settings
//=================================================================

Settings.prototype.render = function() {
   // API Call can go here to get actual vendor data from server
   const template = 'views/vendor/settings/index.html'
   const html = nunjucks.render(template, { vendor: vendorData })
   const modal = new Modal({
      w: 900,
      h: 540,
      content: html
   })

   this.setupDelegates()
}

//=================================================================
// Setup Delegates and Events
//=================================================================

Settings.prototype.setupDelegates = function() {
   // The below presumeably would be done with routing instead of click events
   $('body')
      .off('click')
      .on('click', '.action-show-about-settings', AboutSettings.render)
      .on('click', '.action-show-design-settings', DesignSettings.render)
      .on('click', '.action-show-na-setting', showNotAvailable)
      .on('click', '.action-show-orders-settings', OrdersSettings.render)
      .on('click', '.action-show-product-settings', ProductsSettings.render)
      .on('click', '.action-show-contact-settings', ContactSettings.render)
}

//=================================================================
// Functions
// Modal window to show functionality that will need to be created
//=================================================================

function showNotAvailable() {
   const html = nunjucks.render('views/vendor/settings/na.html')
   const modal = new Modal({
      w: 360,
      h: 360,
      stacked: true,
      content: html
   })
}

//=================================================================
// Exports
//=================================================================

const instance = new Settings()
exports.render = instance.render.bind(instance)
