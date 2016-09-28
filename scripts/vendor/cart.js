const nunjucks = require('nunjucks')

// In our platform, cart items are stored using local storage.
// You may decide to do another way

function Cart() {}

Cart.prototype.render = function() {
   this.setupDelegates()
}

Cart.prototype.setupDelegates = function() {
   $('.action-show-cart').on('click', this.show.bind(this))
   $('.action-hide-cart').on('click', this.hide.bind(this))
   $('.action-cart-remove-item').on('click', this.removeFromCart.bind(this))
   $('.cart-overlay').on('click', this.hide.bind(this))
}

Cart.prototype.show = function() {
   $('body').addClass('show-cart')
}

Cart.prototype.hide = function() {
   $('body').removeClass('show-cart')
}

Cart.prototype.calculateSubtotal = function() {

}

Cart.prototype.removeFromCart = function(event) {

}

//=================================================================
// Exports
//=================================================================

const instance = new Cart()
exports.render = instance.render.bind(instance)
