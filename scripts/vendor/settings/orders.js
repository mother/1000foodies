const nunjucks = require('nunjucks')
const data = require('../../../data/tagliere') // Sample Data

function OrdersSettings() {}

OrdersSettings.prototype.render = function() {
   // API Call can go here to GET actual vendor data from server
   const template = 'views/vendor/settings/orders.html'
   const html = nunjucks.render(template, { vendor: data })
   const modal = new Modal({
      w: 780,
      fullHeight: true,
      stacked: true,
      content: html
   })

   this.setupDelegates()
}

OrdersSettings.prototype.setupDelegates = function() {

}

OrdersSettings.prototype.export = function() {
   // API Call to export a csv with all orders
}

//=================================================================
// Exports
//=================================================================

const instance = new OrdersSettings()
exports.render = instance.render.bind(instance)
