var nunjucks = require('nunjucks')
var map = require('./map.js')

$(function() {
   var $viewport = $('#viewport')
   var address = $('#vendor-address').text().trim()

   map.render({
      zoom: 6,
      address: address,
      container: "#mo-vendor-map-container"
   })

   $viewport
      .on('click', '.action-goto-home', gotoHome)
      .on('click', '.action-goto-about', gotoAbout)
      .on('click', '.action-goto-products', gotoProducts)
      .on('click', '.action-goto-contact', gotoContact)

   $viewport.on('scroll', function() {
      var scroll = $viewport.scrollTop()

      if( scroll > 200 ) $viewport.addClass('-scrolled')
      else $viewport.removeClass('-scrolled')
   })

   $('.page-account').on('click', function() {
      var settingsHTML = nunjucks.render('views/vendor/settings/index.html')
      var modal = new Modal({
         w: 900,
         h: 540,
         content: settingsHTML
      })
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
})
