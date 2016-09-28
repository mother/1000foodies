const nunjucks = require('nunjucks')

function Product() {}

Product.prototype.render = function() {
   // API Call can go here to GET actual vendor data from server
   const template = 'views/vendor/products/view.html'
   const html = nunjucks.render(template)
   const modal = new Modal({
      w: 960,
      h: 510,
      stacked: true,
      content: html
   })

   this.setupDelegates()
}

Product.prototype.setupDelegates = function() {
   $('.product-view')
      .on('click', '.action-add-to-cart', this.addToCart.bind(this))
}

Product.prototype.addToCart = function() {

}

//=================================================================
// Exports
//=================================================================

const instance = new Product()
exports.render = instance.render.bind(instance)
