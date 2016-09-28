const nunjucks = require('nunjucks')
const Cart = require('./cart.js')
const Map = require('./map.js')
const News = require('./news.js')
const Product = require('./product.js')
const Settings = require('./settings')

function Vendor() {}

//=================================================================
// Render
//=================================================================

Vendor.prototype.render = function() {
   Cart.render()
   Map.render({
      zoom: 10,
      address: $('#vendor-address').text().trim(),
      container: "#mo-vendor-map-container"
   })

   this.setupDelegates()
}

//=================================================================
// Delegates
//=================================================================

Vendor.prototype.setupDelegates = function() {
   var $viewport = $('#viewport')
   // The below presumeably would be done with routing instead of click events
   $viewport
      .on('click', '.action-goto-home', gotoHome)
      .on('click', '.action-goto-about', gotoAbout)
      .on('click', '.action-goto-products', gotoProducts)
      .on('click', '.action-goto-contact', gotoContact)
      .on('click', '.action-show-news', News.render)
      .on('click', '.action-view-product', Product.render)
      .on('click', '.action-show-settings', Settings.render)

   $viewport.on('scroll', function() {
      var scroll = $viewport.scrollTop()
      if( scroll > 200 ) $viewport.addClass('-scrolled')
      else $viewport.removeClass('-scrolled')
   })

   function gotoHome() {
      $viewport.scrollTo(0, 400 )
   }

   function gotoAbout() {
      $viewport.scrollTo( $('.vendor-about'), 400 )
   }

   function gotoProducts() {
      $viewport.scrollTo( $('.vendor-products'), 400 )
   }

   function gotoContact() {
      $viewport.scrollTo( $('.vendor-contact'), 400 )
   }
}

//=================================================================
// Exports
//=================================================================

const instance = new Vendor()
exports.render = instance.render.bind(instance)
