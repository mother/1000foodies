const nunjucks = require('nunjucks')
const data = require('../../../data/tagliere') // Sample Data

function ProductSettings() {}

ProductSettings.prototype.render = function() {
   // API Call can go here to GET actual vendor data from server
   const template = 'views/vendor/settings/products.html'
   const html = nunjucks.render(template, { vendor: data })
   const modal = new Modal({
      w: 780,
      fullHeight: true,
      stacked: true,
      content: html
   })

   this.setupDelegates()
}

ProductSettings.prototype.setupDelegates = function() {

}

ProductSettings.prototype.save = function() {
   // API Call / PUT to save vendor settings
}

//=================================================================
// Exports
//=================================================================

const instance = new ProductSettings()
exports.render = instance.render.bind(instance)
